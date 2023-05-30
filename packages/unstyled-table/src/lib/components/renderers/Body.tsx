import type { ComponentProps, ReactNode } from 'react';
import type { BodyComponent } from '../../customtypes';

const BodyRenderer = <TData extends any>({
  children,
  renderer: Renderer,
  rowModel,
}: ComponentProps<BodyComponent<TData>> & { renderer?: BodyComponent<TData> }) => {
  if (Renderer) return <Renderer rowModel={rowModel}>{children}</Renderer>;
  return <tbody>{children}</tbody>;
};

export default BodyRenderer;
