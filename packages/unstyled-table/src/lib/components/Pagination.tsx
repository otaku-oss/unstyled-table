import type { PaginationProps } from '../customtypes';
import { chevronDoubleLeft, chevronDoubleRight, chevronLeft, chevronRight } from './icons';
import { type CSSProperties } from 'react';
import PaginationButton from './renderers/PaginationButton';

const btnStyle: CSSProperties = {
  padding: 4,
};

export const PaginationComponent = <TData extends any>({ tableInstance, ...props }: PaginationProps<TData>) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <PaginationButton
        renderer={props.firstBtn ?? props.btn}
        props={{
          style: btnStyle,
          onClick: () => tableInstance.setPageIndex(0),
          disabled: !tableInstance.getCanPreviousPage(),
        }}
      >
        {chevronDoubleLeft}
      </PaginationButton>
      <PaginationButton
        renderer={props.prevBtn ?? props.btn}
        props={{
          style: btnStyle,
          onClick: () => tableInstance.previousPage(),
          disabled: !tableInstance.getCanPreviousPage(),
        }}
      >
        {chevronLeft}
      </PaginationButton>
      <PaginationButton
        renderer={props.nextBtn ?? props.btn}
        props={{
          style: btnStyle,
          onClick: () => tableInstance.nextPage(),
          disabled: !tableInstance.getCanNextPage(),
        }}
      >
        {chevronRight}
      </PaginationButton>
      <PaginationButton
        renderer={props.lastBtn ?? props.btn}
        props={{
          style: btnStyle,
          onClick: () => tableInstance.setPageIndex(tableInstance.getPageCount() - 1),
          disabled: !tableInstance.getCanNextPage(),
        }}
      >
        {chevronDoubleRight}
      </PaginationButton>
      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div>Page</div>
        <strong>
          {tableInstance.getState().pagination.pageIndex + 1} of {tableInstance.getPageCount()}
        </strong>
      </span>
      <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        | Go to page:
        {props.gotoPageInput ? (
          <props.gotoPageInput
            props={{
              type: 'number',
              defaultValue: tableInstance.getState().pagination.pageIndex + 1,
              onChange: (e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                tableInstance.setPageIndex(page);
              },
            }}
          />
        ) : (
          <input
            type="number"
            defaultValue={tableInstance.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              tableInstance.setPageIndex(page);
            }}
            style={{ width: 64 }}
          />
        )}
      </label>
      {props.perpageSelect ? (
        <props.perpageSelect
          props={{
            value: tableInstance.getState().pagination.pageSize,
            onChange: (e) => {
              tableInstance.setPageSize(Number(e.target.value));
            },
          }}
          itemsPerPageOptions={props.itemsPerPageOptions ?? [10, 20, 30, 40, 50]}
        />
      ) : (
        <select
          value={tableInstance.getState().pagination.pageSize}
          onChange={(e) => {
            tableInstance.setPageSize(Number(e.target.value));
          }}
        >
          {(props.itemsPerPageOptions ?? [10, 20, 30, 40, 50]).map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
