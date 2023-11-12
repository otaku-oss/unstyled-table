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
import { CustomTable } from '@/lib/components/table-base';
import { TableHead } from '@/lib/components/table-head';
import { HeaderRow } from '@/lib/components/table-header-row';
import { HeaderCell } from '@/lib/components/table-header-cell';
import { TableBody } from '@/lib/components/table-body';
import { BodyRow } from '@/lib/components/table-body-row';
import { BodyCell } from '@/lib/components/table-body-cell';
import { TableFoot } from '@/lib/components/table-foot';
import { FooterRow } from '@/lib/components/table-footer-row';
import { FooterCell } from '@/lib/components/table-footer-cell';
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
import { TableProvider } from './hooks/use-table';
import { TableEmpty } from './components/table-empty';

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

export const ReactTable = <TData, TValue = any>({ components, ...props }: TableProps<TData, TValue>) => {
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
      <CustomTable renderer={components?.table}>
        <TableHead renderer={components?.header}>
          {table.getHeaderGroups().map((headerGroup) => (
            <HeaderRow key={headerGroup.id} renderer={components?.headerRow} instance={headerGroup}>
              {headerGroup.headers.map((header) => (
                <HeaderCell renderer={components?.headerCell} instance={header} key={header.id}>
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        {...{
                          style: {
                            display: header.column.getCanSort() ? 'flex' : 'block',
                            cursor: header.column.getCanSort() ? 'pointer' : 'default',
                            alignItems: 'center',
                            justifyContent: header.column.getCanSort() ? 'space-between' : undefined,
                          },

                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext()) as ReactNode}
                        {{
                          asc: ChevronUp,
                          desc: ChevronDown,
                        }[header.column.getIsSorted() as string] ?? null}
                        {header.column.getCanSort() && !header.column.getIsSorted() ? ChevronUpDown : null}
                      </div>
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter inputComponent={components?.filterInput} selectComponent={components?.filterSelect} />
                        </div>
                      ) : null}
                    </>
                  )}
                </HeaderCell>
              ))}
            </HeaderRow>
          ))}
        </TableHead>
        <TableBody renderer={components?.body}>
          {table.getRowModel().rows.length === 0 ? <TableEmpty>no data</TableEmpty> : null}
          {table.getRowModel().rows.map((row) => {
            return (
              <BodyRow key={row.id} renderer={components?.bodyRow} instance={row}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <BodyCell key={cell.id} renderer={components?.bodyCell} instance={cell}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext()) as ReactNode}
                    </BodyCell>
                  );
                })}
              </BodyRow>
            );
          })}
        </TableBody>
        {props.showFooter ? (
          <TableFoot renderer={components?.footer}>
            {table.getFooterGroups().map((footerGroup) => (
              <FooterRow key={footerGroup.id} renderer={components?.footerRow} instance={footerGroup}>
                {footerGroup.headers.map((header) => (
                  <FooterCell key={header.id} renderer={components?.footerCell} instance={header}>
                    {header.isPlaceholder
                      ? null
                      : (flexRender(header.column.columnDef.footer, header.getContext()) as ReactNode)}
                  </FooterCell>
                ))}
              </FooterRow>
            ))}
          </TableFoot>
        ) : null}
      </CustomTable>

      {props.hidePagination ? null : components?.pagination ? <components.pagination /> : <Pagination />}
    </TableProvider>
  );
};
