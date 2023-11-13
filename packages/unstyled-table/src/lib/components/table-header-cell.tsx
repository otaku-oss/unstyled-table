import { type CustomComponentProps } from '@/lib/customtypes';
import { Header } from '@tanstack/react-table';
import { HeaderProvider } from '@/lib/hooks';

export function HeaderCell<T, U = unknown>({
  children,
  renderer: Renderer,
  instance,
}: CustomComponentProps<Header<T, U>>) {
  console.log('HeaderCell', Renderer);
  return (
    <HeaderProvider value={instance}>
      {Renderer ? <Renderer>{children}</Renderer> : <th colSpan={instance.colSpan}>{children}</th>}
    </HeaderProvider>
  );
}
