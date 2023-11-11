import { createContext, useContext, type ReactNode } from 'react';
import { type Cell } from '@tanstack/react-table';

export const CellContext = createContext<Cell<unknown, unknown> | undefined>(undefined);

interface CellProviderProps<T extends unknown, U = unknown> {
  children: ReactNode;
  value: Cell<T, U>;
}
export const CellProvider = <T extends unknown, U = unknown>({ children, value }: CellProviderProps<T>) => {
  return <CellContext.Provider value={value as Cell<unknown, U>}>{children}</CellContext.Provider>;
};

export function useCell<T extends unknown, U = unknown>(): Cell<T, U> {
  const cell = useContext(CellContext);
  if (!cell) throw new Error('useCell must be used within a CellProvider');
  return cell as Cell<T, U>;
}
