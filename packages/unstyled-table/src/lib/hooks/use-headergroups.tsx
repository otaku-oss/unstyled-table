import { createContext, useContext, type ReactNode } from 'react';
import { type HeaderGroup } from '@tanstack/react-table';

export const HeaderGroupsContext = createContext<HeaderGroup<unknown>[] | undefined>(undefined);

interface HeaderGroupsProviderProps<T extends unknown> {
  children: ReactNode;
  value: HeaderGroup<T>[];
}
export const HeaderGroupsProvider = <T extends unknown>({ children, value }: HeaderGroupsProviderProps<T>) => {
  return (
    <HeaderGroupsContext.Provider value={value as HeaderGroup<unknown>[]}>{children}</HeaderGroupsContext.Provider>
  );
};

export function useHeaderGroups<T extends unknown>(): HeaderGroup<T>[] {
  const headerGroups = useContext(HeaderGroupsContext);
  if (!headerGroups) throw new Error('useHeaderGroups must be used within a HeaderGroupsProvider');
  return headerGroups as HeaderGroup<T>[];
}
