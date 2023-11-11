import { type CustomComponentProps } from '@/lib/customtypes';
import { HeaderGroup } from '@tanstack/react-table';
import { HeaderGroupProvider } from '@/lib/hooks';

export function FooterRow<T>({ children, renderer: Renderer, instance }: CustomComponentProps<HeaderGroup<T>>) {
  return Renderer ? (
    <HeaderGroupProvider value={instance}>
      <Renderer>{children}</Renderer>
    </HeaderGroupProvider>
  ) : (
    <tr>{children}</tr>
  );
}
