import { createContext, useContext, type ReactNode, type FC } from 'react';
import { Table } from '@tanstack/react-table';

export const TableContext = createContext<Table<unknown> | undefined>(undefined);

interface TableProviderProps<T> {
  children: ReactNode;
  initialValue: Table<T>;
}
export const TableProvider: FC<TableProviderProps<unknown>> = ({ children, initialValue }) => {
  return <TableContext.Provider value={initialValue}>{children}</TableContext.Provider>;
};

export function useTable<T extends unknown>(): Table<T> {
  const table = useContext(TableContext);
  if (!table) throw new Error('useTable must be used within a TableProvider');
  return table as Table<T>;
}
