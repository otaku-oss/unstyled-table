import type { FC, Dispatch, ReactNode, SetStateAction, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import type {
  ColumnFiltersState,
  InitialTableState,
  PaginationState,
  SortingState,
  VisibilityState,
  ColumnDef,
} from '@tanstack/react-table';

export type PaginationButtonComponenet = FC<{ props: ButtonHTMLAttributes<HTMLButtonElement>; children: ReactNode }>;
export type FilterInputComponent = FC<InputHTMLAttributes<HTMLInputElement>>;
export type FilterSelectComponent = FC<InputHTMLAttributes<HTMLSelectElement>>;

export type Renderer = FC<{ children: ReactNode }>;
export interface CustomComponentProps<T> {
  children: React.ReactNode;
  renderer?: Renderer;
  instance: T;
}

export interface TableProps<TData extends any, TValue = any> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  initialState?: InitialTableState;
  defaultColumn?: Partial<ColumnDef<TData, unknown>>;
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
  pageCount?: number;
  showFooter?: boolean;
  hidePagination?: boolean;
  debugAll?: boolean;
  debugTable?: boolean;
  debugColumns?: boolean;
  debugRows?: boolean;
  debugHeaders?: boolean;

  // renderers
  components?: {
    table?: Renderer;
    header?: Renderer;
    headerRow?: Renderer;
    headerCell?: Renderer;
    body?: Renderer;
    bodyRow?: Renderer;
    bodyCell?: Renderer;
    footer?: Renderer;
    footerRow?: Renderer;
    footerCell?: Renderer;
    empty?: Renderer;
    loading?: Renderer;
    pagination?: FC;
    filterInput?: FilterInputComponent;
    filterSelect?: FilterSelectComponent;
  };
}
