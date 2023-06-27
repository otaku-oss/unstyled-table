import { useMemo, useState } from 'react';
import {
  SortingFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from '@tanstack/react-table';
import { compareItems, rankItem, type RankingInfo } from '@tanstack/match-sorter-utils';
import * as renderers from './components/renderers';
import type { ReactNode } from 'react';
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  FilterFn,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from './components/icons';
import type { TableProps } from './customtypes';
import PaginationComponent from './components/Pagination';
import Filter from './components/Filter';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(rowA.columnFiltersMeta[columnId]! as any, rowB.columnFiltersMeta[columnId]! as any);
  }

  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

const ReactTable = <TData, TValue = any>({ renders, ...props }: TableProps<TData, TValue>) => {
  const { manualFiltering, manualSorting, manualPagination, state } = props;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState<string>();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable<TData>({
    columns: props.columns,
    data: props.data,
    initialState: props.initialState,
    defaultColumn: props.defaultColumn,
    state: {
      sorting: state?.sorting ?? sorting,
      columnFilters: state?.columnFilters ?? columnFilters,
      globalFilter: state?.globalFilter ?? globalFilter,
      columnVisibility: state?.columnVisibility ?? columnVisibility,
      pagination: state?.pagination ?? pagination,
    },
    filterFns: { fuzzy: fuzzyFilter },
    manualSorting,
    manualFiltering,
    manualPagination,
    pageCount: props.manualPagination ? props.pageCount ?? props.pageCount : undefined,
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
    debugAll: props.debugAll,
    debugTable: props.debugTable,
    debugColumns: props.debugColumns,
    debugHeaders: props.debugHeaders,
    debugRows: props.debugRows,
  });

  return (
    <>
      <renderers.Table renderer={renders?.table} tableInstance={table}>
        <renderers.Header renderer={renders?.header} headerGroups={table.getHeaderGroups()}>
          {table.getHeaderGroups().map((headerGroup) => (
            <renderers.HeaderRow headerGroup={headerGroup} key={headerGroup.id} renderer={renders?.headerRow}>
              {headerGroup.headers.map((header) => (
                <renderers.HeaderCell
                  renderer={renders?.headerCell}
                  props={{ colSpan: header.colSpan }}
                  header={header}
                  key={header.id}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        {...{
                          style: {
                            display: header.column.getCanSort() ? 'flex' : 'block',
                            cursor: header.column.getCanSort() ? 'pointer' : 'default',
                            alignItems: 'center',
                          },

                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext()) as ReactNode}
                        {{
                          asc: ChevronUp,
                          desc: ChevronDown,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} inputComponent={renders?.filterInput} />
                        </div>
                      ) : null}
                    </>
                  )}
                </renderers.HeaderCell>
              ))}
            </renderers.HeaderRow>
          ))}
        </renderers.Header>
        <renderers.Body renderer={renders?.body} rowModel={table.getRowModel()}>
          {table.getRowModel().rows.map((row) => {
            return (
              <renderers.BodyRow renderer={renders?.bodyRow} row={row} key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <renderers.BodyCell renderer={renders?.bodyCell} props={{}} cell={cell} key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext()) as ReactNode}
                    </renderers.BodyCell>
                  );
                })}
              </renderers.BodyRow>
            );
          })}
        </renderers.Body>
        {props.showFooter ? (
          <renderers.Footer renderer={renders?.footer} footerGroups={table.getFooterGroups()}>
            {table.getFooterGroups().map((footerGroup) => (
              <renderers.FooterRow key={footerGroup.id} renderer={renders?.footerRow} footerGroup={footerGroup}>
                {footerGroup.headers.map((header) => (
                  <renderers.FooterCell
                    props={{ colSpan: header.colSpan }}
                    key={header.id}
                    renderer={renders?.footerCell}
                    header={header}
                  >
                    {header.isPlaceholder
                      ? null
                      : (flexRender(header.column.columnDef.footer, header.getContext()) as ReactNode)}
                  </renderers.FooterCell>
                ))}
              </renderers.FooterRow>
            ))}
          </renderers.Footer>
        ) : null}
      </renderers.Table>

      {props.hidePaginationBar ? null : renders?.paginationBar ? (
        <renders.paginationBar tableInstance={table} />
      ) : (
        <PaginationComponent tableInstance={table} />
      )}
    </>
  );
};

export default ReactTable;
