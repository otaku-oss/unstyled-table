import { type CustomComponentProps } from '@/lib/customtypes';
import { Cell } from '@tanstack/react-table';
import { CellProvider } from '@/lib/hooks';

export function BodyCell<T, U = unknown>({ children, renderer: Renderer, instance }: CustomComponentProps<Cell<T, U>>) {
  return Renderer ? (
    <CellProvider value={instance}>
      <Renderer>{children}</Renderer>
    </CellProvider>
  ) : (
    <td>{children}</td>
  );
}
