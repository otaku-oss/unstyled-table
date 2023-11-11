import { createContext, useContext, type ReactNode } from 'react';
import { type Header } from '@tanstack/react-table';

export const HeaderContext = createContext<Header<unknown, unknown> | undefined>(undefined);

interface HeaderProviderProps<T extends unknown, U = unknown> {
  children: ReactNode;
  value: Header<T, U>;
}
export const HeaderProvider = <T extends unknown, U = unknown>({ children, value }: HeaderProviderProps<T>) => {
  return <HeaderContext.Provider value={value as Header<unknown, U>}>{children}</HeaderContext.Provider>;
};

export function useHeader<T extends unknown, U = unknown>(): Header<T, U> {
  const header = useContext(HeaderContext);
  if (!header) throw new Error('useHeader must be used within a HeaderProvider');
  return header as Header<T, U>;
}
