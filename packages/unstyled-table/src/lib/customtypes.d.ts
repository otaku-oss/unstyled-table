import type {
  FC,
  Dispatch,
  HTMLProps,
  ReactNode,
  SetStateAction,
  InputHTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import type {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  Header,
  HeaderGroup,
  InitialTableState,
  PaginationState,
  Row,
  SortingState,
  Table,
  VisibilityState,
} from '@tanstack/react-table';

export type PaginationButtonComponenet = FC<{ props: ButtonHTMLAttributes<HTMLButtonElement>; children: ReactNode }>;
export type FilterInputComponent = FC<{ props: InputHTMLAttributes<HTMLInputElement> }>;
export type ItemsPerPageSelectComponenet = FC<{
  props: InputHTMLAttributes<HTMLSelectElement>;
  itemsPerPageOptions: number[];
}>;
export type GotoPageInputComponent = FC<{ props: InputHTMLAttributes<HTMLInputElement> }>;

export type TableComponent<TData> = FC<{ children: ReactNode; tableInstance: Table<TData> }>;
export type HeaderComponent<TData> = FC<{ children: ReactNode; headerGroups: HeaderGroup<TData>[] }>;
export type HeaderRowComponent<TData> = FC<{ children: ReactNode; headerGroup: HeaderGroup<TData> }>;
export type HeaderCellComponent<TData> = FC<{
  children: ReactNode;
  props: HTMLProps<HTMLTableHeaderCellElement>;
  header: Header<TData, unknown>;
}>;
export type BodyComponent = FC<{ children: ReactNode }>;
export type BodyRowComponent<TData> = FC<{ children: ReactNode; row: Row<TData> }>;
export type BodyCellComponent<TData> = FC<{
  children: ReactNode;
  props: HTMLProps<HTMLTableCellElement>;
  cell: Cell<TData, unknown>;
}>;

export type FooterComponent<TData> = FC<{ children: ReactNode; footerGroups: HeaderGroup<TData>[] }>;
export type FooterRowComponent<TData> = FC<{ children: ReactNode; footerGroup: HeaderGroup<TData> }>;
export type FooterCellComponent<TData> = FC<{
  children: ReactNode;
  props: HTMLProps<HTMLTableHeaderCellElement>;
  header: Header<TData, unknown>;
}>;

export interface PaginationProps<TData extends any> {
  tableInstance: Table<TData>;
  itemsPerPageOptions?: number[];
  btn?: PaginationButtonComponenet;
  prevBtn?: PaginationButtonComponenet;
  nextBtn?: PaginationButtonComponenet;
  firstBtn?: PaginationButtonComponenet;
  lastBtn?: PaginationButtonComponenet;
  perpageSelect?: ItemsPerPageSelectComponenet;
  gotoPageInput?: GotoPageInputComponent;
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
  itemsCount?: number;
  showFooter?: boolean;
  hidePaginationBar?: boolean;

  // renderers
  renders?: {
    table?: TableComponent<TData>;
    header?: HeaderComponent<TData>;
    headerRow?: HeaderRowComponent<TData>;
    headerCell?: HeaderCellComponent<TData>;
    body?: BodyComponent;
    bodyRow?: BodyRowComponent<TData>;
    bodyCell?: BodyCellComponent<TData>;
    footer?: FooterComponent<TData>;
    footerRow?: FooterRowComponent<TData>;
    footerCell?: FooterCellComponent<TData>;
    paginationBar?: FC<PaginationProps<TData>>;
    filterInput?: FilterInputComponent;
  };
}
