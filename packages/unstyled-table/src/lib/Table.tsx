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
import {
  TableProvider,
  CellProvider,
  HeaderGroupProvider,
  HeaderProvider,
  RowProvider,
} from '@/lib/hooks';

import { Filter } from '@/lib/components/filter';
import { Pagination } from '@/lib/components/pagination';
import { ChevronDown, ChevronUp, ChevronUpDown } from '@/lib/components/icons';

import type { ReactNode } from 'react';
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  FilterFn,
} from '@tanstack/react-table';
import type { TableProps } from './customtypes';
import { DynamicComponent } from '@/lib/components/dynamic-component';

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
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]! as any,
      rowB.columnFiltersMeta[columnId]! as any
    );
  }

  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export const ReactTable = <TData, TValue = any>({
  components,
  ...props
}: TableProps<TData, TValue>) => {
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
    <TableProvider value={table}>
      <DynamicComponent tagName="table" Renderer={components?.table}>
        <DynamicComponent tagName="thead" Renderer={components?.header}>
          {table.getHeaderGroups().map((headerGroup) => (
            <HeaderGroupProvider value={headerGroup} key={headerGroup.id}>
              <DynamicComponent tagName="tr" Renderer={components?.headerRow}>
                {headerGroup.headers.map((header) => (
                  <HeaderProvider value={header} key={header.id}>
                    <DynamicComponent tagName="th" Renderer={components?.headerCell}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              style: {
                                display: header.column.getCanSort() ? 'flex' : 'block',
                                cursor: header.column.getCanSort() ? 'pointer' : 'default',
                                alignItems: 'center',
                                justifyContent: header.column.getCanSort()
                                  ? 'space-between'
                                  : undefined,
                              },

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
                              asc: ChevronUp,
                              desc: ChevronDown,
                            }[header.column.getIsSorted() as string] ?? null}
                            {header.column.getCanSort() && !header.column.getIsSorted()
                              ? ChevronUpDown
                              : null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter
                                inputComponent={components?.filterInput}
                                selectComponent={components?.filterSelect}
                              />
                            </div>
                          ) : null}
                        </>
                      )}
                    </DynamicComponent>
                  </HeaderProvider>
                ))}
              </DynamicComponent>
            </HeaderGroupProvider>
          ))}
        </DynamicComponent>
        <DynamicComponent tagName="tbody" Renderer={components?.body}>
          {table.getRowModel().rows.length === 0 ? (
            <DynamicComponent tagName="tr" Renderer={components?.empty}>
              <td
                colSpan={length}
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  fontSize: '1.2rem',
                }}
              >
                <i>No Data</i>
              </td>
            </DynamicComponent>
          ) : null}
          {table.getRowModel().rows.map((row) => (
            <RowProvider value={row} key={row.id}>
              <DynamicComponent tagName="tr" Renderer={components?.bodyRow}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <CellProvider value={cell} key={cell.id}>
                      <DynamicComponent tagName="td" Renderer={components?.bodyCell}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext()) as ReactNode}
                      </DynamicComponent>
                    </CellProvider>
                  );
                })}
              </DynamicComponent>
            </RowProvider>
          ))}
        </DynamicComponent>
        {props.showFooter ? (
          <DynamicComponent tagName="tfoot" Renderer={components?.footer}>
            {table.getFooterGroups().map((footerGroup) => (
              <HeaderGroupProvider value={footerGroup} key={footerGroup.id}>
                <DynamicComponent tagName="tr" Renderer={components?.footerRow}>
                  {footerGroup.headers.map((header) => (
                    <HeaderProvider value={header} key={header.id}>
                      <DynamicComponent tagName="th" Renderer={components?.footerCell}>
                        {header.isPlaceholder
                          ? null
                          : (flexRender(
                              header.column.columnDef.footer,
                              header.getContext()
                            ) as ReactNode)}
                      </DynamicComponent>
                    </HeaderProvider>
                  ))}
                </DynamicComponent>
              </HeaderGroupProvider>
            ))}
          </DynamicComponent>
        ) : null}
      </DynamicComponent>

      {props.hidePagination ? null : components?.pagination ? (
        <components.pagination />
      ) : (
        <Pagination />
      )}
    </TableProvider>
  );
};
