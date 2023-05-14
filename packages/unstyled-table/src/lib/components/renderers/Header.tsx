import type { ComponentProps } from 'react';
import type { HeaderComponent } from '../../customtypes';

const HeaderRenderer = <TData extends any>({
  children,
  renderer: Renderer,
  headerGroups,
}: ComponentProps<HeaderComponent<TData>> & { renderer?: HeaderComponent<TData> }) => {
  if (Renderer) return <Renderer headerGroups={headerGroups}>{children}</Renderer>;
  return <thead>{children}</thead>;
};

export default HeaderRenderer;
