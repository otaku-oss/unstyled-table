import { type CustomComponentProps } from '@/lib/customtypes';
import { Header } from '@tanstack/react-table';
import { HeaderProvider } from '@/lib/hooks';

export function FooterCell<T, U = unknown>({
  children,
  renderer: Renderer,
  instance,
}: CustomComponentProps<Header<T, U>>) {
  return (
    <HeaderProvider value={instance}>
      {Renderer ? <Renderer>{children}</Renderer> : <td>{children}</td>}
    </HeaderProvider>
  );
}
