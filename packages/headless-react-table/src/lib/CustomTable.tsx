import { rankItem } from '@tanstack/match-sorter-utils';
import {
    flexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type Column,
    type ColumnDef,
    type ColumnFiltersState,
    type FilterFn,
    type PaginationState,
    type Row,
    type SortingState,
    type Table,
    type VisibilityState,
} from '@tanstack/react-table';
import {
    useEffect,
    useMemo,
    useState,
    type Dispatch,
    type HTMLAttributes,
    type ReactNode,
    type SetStateAction,
} from 'react';
import { ChevronDown, ChevronUp } from './components/icons';

interface Props<TData extends Record<string, unknown>, TValue = any> {
    tableTitle?: ReactNode;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading?: boolean;
    isRefetching?: boolean;
    isError?: boolean;
    state?: {
        sorting?: SortingState;
        columnFilters?: ColumnFiltersState;
        pagination?: PaginationState;
        columnVisibility?: VisibilityState;
        globalFilter?: string;
    };
    setSorting?: Dispatch<SetStateAction<SortingState>>;
    setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
    setPagination?: Dispatch<SetStateAction<PaginationState>>;
    setColumnVisibility?: Dispatch<SetStateAction<VisibilityState>>;
    setGlobalFilter?: Dispatch<SetStateAction<string>>;
    manualSorting?: boolean;
    manualFiltering?: boolean;
    manualPagination?: boolean;
    disableGlobalFilter?: boolean;
    disableColumnVisibility?: boolean;
    itemsPerPageOptions?: number[];
    itemsCount?: number;
    headerRowProps?: HTMLAttributes<HTMLTableRowElement>;
    headerCellProps?: HTMLAttributes<HTMLTableCellElement>;
    bodyRowProps?: ((row: Row<TData>) => HTMLAttributes<HTMLTableRowElement>) | HTMLAttributes<HTMLTableRowElement>;
    bodyCellProps?: HTMLAttributes<HTMLTableCellElement>;
    footerRowProps?: HTMLAttributes<HTMLTableRowElement>;
    footerCellProps?: HTMLAttributes<HTMLTableCellElement>;
    ascendingSortIndecator?: ReactNode;
    descendingSortIndecator?: ReactNode;
    onRowClick?: (row: Row<TData>) => void;
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item

    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
        itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
};

const CustomTable = <TData extends Record<string, unknown>, TValue = any>(props: Props<TData, TValue>) => {
    const { manualFiltering, manualSorting, manualPagination, state } = props;

    const [sorting, setSorting] = useState<SortingState>(state?.sorting ? [...state?.sorting] : []);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        state?.columnFilters ? [...state?.columnFilters] : []
    );
    const [globalFilter, setGlobalFilter] = useState<string>(state?.globalFilter ?? '');
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        state?.columnVisibility ? { ...state?.columnVisibility } : {}
    );
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: state?.pagination?.pageIndex ?? 0,
        pageSize: state?.pagination?.pageSize ?? 10,
    });
    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    );
    const table = useReactTable<TData>({
        columns: props.columns,
        data: props.data,
        state: {
            sorting,
            columnFilters,
            globalFilter,
            pagination,
            columnVisibility,
        },
        filterFns: { fuzzy: fuzzyFilter },
        manualSorting,
        pageCount:
            manualPagination && props.itemsCount
                ? Math.ceil(props.itemsCount / (props.state?.pagination?.pageSize ?? pagination.pageSize))
                : undefined,
        manualFiltering,
        manualPagination,
        onSortingChange: props.setSorting ?? setSorting,
        onColumnFiltersChange: props.setColumnFilters ?? setColumnFilters,
        onGlobalFilterChange: props.setGlobalFilter ?? setGlobalFilter,
        onPaginationChange: props.setPagination ?? setPagination,
        onColumnVisibilityChange: props.setColumnVisibility ?? setColumnVisibility,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        globalFilterFn: fuzzyFilter,
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
    });

    return (
        <>
            <div className="table-wrapper">
                <table className="table table-compact table-zebra w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr {...(props.headerRowProps ?? {})} key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th {...(props.headerCellProps ?? {})} key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div
                                                    {...{
                                                        style: { display: 'flex', alignItems: 'center' },
                                                        onClick: header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {
                                                        flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        ) as ReactNode
                                                    }
                                                    {{
                                                        asc: props.ascendingSortIndecator ?? ChevronUp,
                                                        desc: props.descendingSortIndecator ?? ChevronDown,
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                                {header.column.getCanFilter() ? (
                                                    <div>
                                                        <Filter column={header.column} table={table} />
                                                    </div>
                                                ) : null}
                                            </>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {props.isLoading || props.isRefetching ? (
                            <tr>
                                <td className="px-4" colSpan={table.getVisibleLeafColumns().length}>
                                    <div className="py-6 text-center text-lg">{'Loading...'}</div>
                                </td>
                            </tr>
                        ) : null}
                        {!(props.isLoading && props.isRefetching) && props.isError ? (
                            <tr>
                                <td className="px-4" colSpan={table.getVisibleLeafColumns().length}>
                                    <div className="py-6 text-center text-lg">An error occured!</div>
                                </td>
                            </tr>
                        ) : null}
                        {!(props.isLoading || props.isRefetching || props.isError)
                            ? table.getRowModel().rows.map((row) => {
                                  return (
                                      <tr
                                          onClick={
                                              typeof props.onRowClick === 'function'
                                                  ? () => props.onRowClick?.(row)
                                                  : undefined
                                          }
                                          className={props.onRowClick ? 'hover cursor-pointer' : ''}
                                          {...(typeof props.bodyRowProps === 'function'
                                              ? props.bodyRowProps(row)
                                              : props.bodyRowProps ?? {})}
                                          key={row.id}
                                      >
                                          {row.getVisibleCells().map((cell) => {
                                              return (
                                                  <td {...(props.bodyCellProps ?? {})} key={cell.id}>
                                                      {flexRender(cell.column.columnDef.cell, cell.getContext()) as any}
                                                  </td>
                                              );
                                          })}
                                      </tr>
                                  );
                              })
                            : null}
                        {!(props.isLoading || props.isRefetching || props.isError) && props.data.length === 0 ? (
                            <tr>
                                <td className="px-4" colSpan={table.getVisibleLeafColumns().length}>
                                    <div className="py-6 text-center text-lg">No data available.</div>
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>

            <div className="h-2" />
            <div className="flex flex-col md:flex-row items-center gap-2">
                <span className="gap-2 flex">
                    <button
                        className="relative rounded-full overflow-hidden"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="absolute inset-0 hover:bg-black hover:bg-opacity-25 transition-colors z-10"></span>
                        <img
                            src="/icons/arrow-up.png"
                            width={35}
                            height={35}
                            alt="Previous Page"
                            className="transform -rotate-90 -z-10"
                        />
                    </button>
                    <button
                        className="relative rounded-full overflow-hidden"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="absolute inset-0 hover:bg-black hover:bg-opacity-25 transition-colors z-10"></span>
                        <img
                            src="/icons/arrow-up.png"
                            width={35}
                            height={35}
                            alt="Previous Page"
                            className="transform rotate-90 -z-10"
                        />
                    </button>
                </span>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <div className="form-control max-w-[100px]">
                        <input
                            type="number"
                            className="input input-sm input-bordered"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                table.setPageIndex(page);
                            }}
                        />
                    </div>
                </span>
                <div className="form-control">
                    <select
                        className="select select-sm select-bordered"
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>{' '}
                <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
            </div>
        </>
    );
};

export default CustomTable;

const Filter = <TData, TValue = any>({ column, table }: { column: Column<TData, TValue>; table: Table<TData> }) => {
    const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();

    const sortedUniqueValues = useMemo(
        () => (typeof firstValue === 'number' ? [] : Array.from(column.getFacetedUniqueValues().keys()).sort()),
        [column, firstValue]
    );

    return typeof firstValue === 'number' ? (
        <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
            placeholder={`${
                column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0] ?? 0}` : ''
            } ~ ${column.getFacetedMinMaxValues()?.[1] ? `${column.getFacetedMinMaxValues()?.[1] ?? 0})` : ''}`}
            className={'input input-sm input-bordered w-36 mt-1'}
        />
    ) : (
        <>
            <datalist id={column.id + 'list'}>
                {sortedUniqueValues.slice(0, 5000).map((value: any) => (
                    <option value={value} key={value} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '') as string}
                onChange={(value) => column.setFilterValue(value)}
                placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
                className={'input input-sm input-bordered w-64 mt-1'}
                list={column.id + 'list'}
            />
        </>
    );
};

// A debounced input react component
const DebouncedInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
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

    return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
};
