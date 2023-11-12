import { type CustomComponentProps } from '@/lib/customtypes';

export function TableFoot<T = undefined>({
  children,
  renderer: Renderer,
}: Omit<CustomComponentProps<T>, 'instance'>) {
  return Renderer ? <Renderer>{children}</Renderer> : <tfoot>{children}</tfoot>;
}
