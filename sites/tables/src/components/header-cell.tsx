import { type ReactNode } from 'react';
import { useHeader } from 'unstyled-table';

export const HeaderCell = ({ children }: { children: ReactNode }) => {
  const header = useHeader();
  return <th colSpan={header.colSpan}>{children}</th>;
};
