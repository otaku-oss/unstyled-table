import { chevronDoubleLeft, chevronDoubleRight, chevronLeft, chevronRight } from './icons';
import { type CSSProperties } from 'react';
import PaginationButton from './PaginationButton';
import { useTable } from '@/lib/hooks';

const btnStyle: CSSProperties = {
  padding: 4,
};

export const PaginationComponent = <TData extends any>() => {
  const table = useTable<TData>();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <PaginationButton
        props={{
          style: btnStyle,
          onClick: () => table.setPageIndex(0),
          disabled: !table.getCanPreviousPage(),
        }}
      >
        {chevronDoubleLeft}
      </PaginationButton>
      <PaginationButton
        props={{
          style: btnStyle,
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
        }}
      >
        {chevronLeft}
      </PaginationButton>
      <PaginationButton
        props={{
          style: btnStyle,
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
        }}
      >
        {chevronRight}
      </PaginationButton>
      <PaginationButton
        props={{
          style: btnStyle,
          onClick: () => table.setPageIndex(table.getPageCount() - 1),
          disabled: !table.getCanNextPage(),
        }}
      >
        {chevronDoubleRight}
      </PaginationButton>
      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        | Go to page:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          style={{ width: 64 }}
        />
      </label>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};
