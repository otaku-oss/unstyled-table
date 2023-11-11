import { createContext, useContext, type ReactNode } from 'react';
import { type Table } from '@tanstack/react-table';

export const TableContext = createContext<Table<unknown> | undefined>(undefined);

interface TableProviderProps<T extends unknown> {
  children: ReactNode;
  value: Table<T>;
}
export const TableProvider = <T extends unknown>({ children, value }: TableProviderProps<T>) => {
  return <TableContext.Provider value={value as Table<unknown>}>{children}</TableContext.Provider>;
};

export function useTable<T extends unknown>(): Table<T> {
  const table = useContext(TableContext);
  if (!table) throw new Error('useTable must be used within a TableProvider');
  return table as Table<T>;
}
