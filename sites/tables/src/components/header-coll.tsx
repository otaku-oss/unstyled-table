import { useHeader } from 'unstyled-table';
import { type ReactNode } from 'react';

export const HeaderCell = ({ children }: { children: ReactNode }) => {
  const cell = useHeader();
  return <th colSpan={cell.colSpan}>{children}</th>;
};
