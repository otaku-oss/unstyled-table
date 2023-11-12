import { createContext, useContext, type ReactNode } from 'react';
import { type Row } from '@tanstack/react-table';

const RowContext = createContext<Row<unknown> | undefined>(undefined);

interface RowProviderProps<T extends unknown> {
  children: ReactNode;
  value: Row<T>;
}
export const RowProvider = <T extends unknown>({ children, value }: RowProviderProps<T>) => {
  return <RowContext.Provider value={value as Row<unknown>}>{children}</RowContext.Provider>;
};

export function useRow<T extends unknown>(): Row<T> {
  const rowModel = useContext(RowContext);
  if (!rowModel) throw new Error('useRow must be used within a RowProvider');
  return rowModel as Row<T>;
}
