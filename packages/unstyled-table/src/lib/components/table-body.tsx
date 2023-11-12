import { type CustomComponentProps } from '@/lib/customtypes';

export function TableBody<T = undefined>({
  children,
  renderer: Renderer,
}: Omit<CustomComponentProps<T>, 'instance'>) {
  return Renderer ? <Renderer>{children}</Renderer> : <tbody>{children}</tbody>;
}
