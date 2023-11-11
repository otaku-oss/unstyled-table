import { createContext, useContext, type ReactNode } from 'react';
import { type HeaderGroup } from '@tanstack/react-table';

export const HeaderGroupContext = createContext<HeaderGroup<unknown> | undefined>(undefined);

interface HeaderGroupProviderProps<T extends unknown> {
  children: ReactNode;
  value: HeaderGroup<T>;
}
export const HeaderGroupProvider = <T extends unknown>({ children, value }: HeaderGroupProviderProps<T>) => {
  return <HeaderGroupContext.Provider value={value as HeaderGroup<unknown>}>{children}</HeaderGroupContext.Provider>;
};

export function useHeaderGroup<T extends unknown>(): HeaderGroup<T> {
  const headerGroup = useContext(HeaderGroupContext);
  if (!headerGroup) throw new Error('useHeaderGroup must be used within a HeaderGroupProvider');
  return headerGroup as HeaderGroup<T>;
}
