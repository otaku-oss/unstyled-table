import { type ReactNode } from 'react';

export const HeaderCell = ({ children }: { children: ReactNode }) => {
  return <th>{children}</th>;
};
