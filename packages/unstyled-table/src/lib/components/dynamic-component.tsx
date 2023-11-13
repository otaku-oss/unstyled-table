import type { ComponentType, ReactNode } from 'react';
import ErrorBoundary from './error-boundary';

export const DynamicComponent = ({
  tagName: CustomTag,
  children,
  Renderer,
}: {
  tagName: keyof JSX.IntrinsicElements;
  children: ReactNode | ReactNode[];
  Renderer?: ComponentType<{ children: ReactNode | ReactNode[] }>;
}) => {
  if (Renderer) return <Renderer>{children}</Renderer>;
  return <CustomTag>{children}</CustomTag>;
};
