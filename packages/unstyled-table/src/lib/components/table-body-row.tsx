import { type CustomComponentProps } from '@/lib/customtypes';
import { Row } from '@tanstack/react-table';
import { RowProvider } from '@/lib/hooks';

export function BodyRow<T>({ children, renderer: Renderer, instance }: CustomComponentProps<Row<T>>) {
  return Renderer ? (
    <RowProvider value={instance}>
      <Renderer>{children}</Renderer>
    </RowProvider>
  ) : (
    <tr>{children}</tr>
  );
}
