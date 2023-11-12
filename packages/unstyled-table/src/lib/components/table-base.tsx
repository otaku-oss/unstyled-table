import { type CustomComponentProps } from '@/lib/customtypes';

export function CustomTable<T = undefined>({
  children,
  renderer: Renderer,
}: Omit<CustomComponentProps<T>, 'instance'>) {
  return Renderer ? <Renderer>{children}</Renderer> : <table>{children}</table>;
}
