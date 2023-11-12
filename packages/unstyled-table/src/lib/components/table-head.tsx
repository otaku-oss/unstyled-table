import { type CustomComponentProps } from '@/lib/customtypes';

export function TableHead<T = undefined>({
  children,
  renderer: Renderer,
}: Omit<CustomComponentProps<T>, 'instance'>) {
  return Renderer ? <Renderer>{children}</Renderer> : <thead>{children}</thead>;
}
