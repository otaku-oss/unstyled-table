import { type CustomComponentProps } from '@/lib/customtypes';
import { HeaderGroup } from '@tanstack/react-table';
import { HeaderGroupProvider } from '@/lib/hooks';

export function HeaderRow<T>({
  children,
  renderer: Renderer,
}: CustomComponentProps<HeaderGroup<T>>) {
  return Renderer ? <Renderer>{children}</Renderer> : <tr>{children}</tr>;
}
