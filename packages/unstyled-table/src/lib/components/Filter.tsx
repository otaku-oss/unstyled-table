import { useEffect, useMemo, useState } from 'react';
import { useHeader } from '@/lib/hooks';

import type { InputHTMLAttributes } from 'react';
import type { FilterInputComponent, FilterSelectComponent } from '@/lib/customtypes';
import type { ComponentProps } from 'react';

export function Filter<TData extends any>({
  inputComponent,
  selectComponent,
}: {
  inputComponent?: FilterInputComponent;
  selectComponent?: FilterSelectComponent;
}) {
  const { column } = useHeader<TData>();

  const meta = column.columnDef.meta;
  const columnFilterValue = column.getFilterValue();

  const filterType = useMemo(() => {
    if (meta && 'filter' in meta && typeof meta.filter === 'string') {
      return meta.filter as 'search' | 'select' | 'range' | 'boolean';
    }
    return 'search';
  }, [column.columnDef.meta]);

  const filterOptions = useMemo(() => {
    if (meta && 'options' in meta && isArrayOfStrings(meta.options)) {
      return meta.options;
    }
    return [];
  }, [column.columnDef.meta]);

  const sortedUniqueValues = useMemo(
    () => (filterType === 'range' ? [] : Array.from(column.getFacetedUniqueValues().keys()).sort()),
    [column.getFacetedUniqueValues()]
  );

  if (filterType === 'range') {
    return (
      <div>
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
          placeholder={`Min ${column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''}`}
          component={inputComponent}
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
          placeholder={`Max ${column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''}`}
          component={inputComponent}
        />
      </div>
    );
  }

  if (filterType === 'boolean') {
    return (
      <FilterSelect
        renderer={selectComponent}
        value={(columnFilterValue ?? '') as string}
        onChange={(e) =>
          column.setFilterValue(e.target.value === 'true' ? true : e.target.value === 'false' ? false : undefined)
        }
        placeholder={`Select ${column.columnDef.header}`}
        style={{ minWidth: '100px' }}
      >
        <option value="">Show All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </FilterSelect>
    );
  }
  if (filterType === 'select' && isArrayOfStrings(filterOptions)) {
    return (
      <FilterSelect
        renderer={selectComponent}
        value={(columnFilterValue ?? '') as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`Select ${column.columnDef.header}`}
        style={{ minWidth: '100px' }}
      >
        <option value="">Show All</option>
        {filterOptions.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </FilterSelect>
    );
  }
  return (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 500).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        list={column.id + 'list'}
        component={inputComponent}
      />
    </>
  );
}

function DebouncedInput({
  component,
  value: initialValue,
  onChange,
  debounce = 200,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  component?: FilterInputComponent;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return <FilterInput {...props} onChange={(e) => setValue(e.target.value)} renderer={component} />;
}

const FilterInput = ({
  renderer: Renderer,
  ...props
}: ComponentProps<FilterInputComponent> & { renderer?: FilterInputComponent }) => {
  if (Renderer) {
    return <Renderer {...props} />;
  }
  return <input {...props} />;
};

const FilterSelect = ({
  renderer: Renderer,
  children,
  ...props
}: ComponentProps<FilterSelectComponent> & { renderer?: FilterSelectComponent }) => {
  if (Renderer) {
    return <Renderer {...props}>{children}</Renderer>;
  }
  return <select {...props}>{children}</select>;
};

function isArrayOfStrings(value: any): value is string[] {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.every((element) => typeof element === 'string');
}
