import { type CustomComponentProps } from '@/lib/customtypes';
import { Row } from '@tanstack/react-table';
import { RowProvider } from '@/lib/hooks';

export function BodyRow<T>({
  children,
  renderer: Renderer,
  instance,
}: CustomComponentProps<Row<T>>) {
  return (
    <RowProvider value={instance}>
      {Renderer ? <Renderer>{children}</Renderer> : <tr>{children}</tr>}
    </RowProvider>
  );
}
