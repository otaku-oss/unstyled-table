import type { ComponentProps } from 'react';
import type { PaginationButtonComponenet } from '../../customtypes';

const PaginationButton = ({
  renderer: Renderer,
  children,
  props,
}: ComponentProps<PaginationButtonComponenet> & { renderer?: PaginationButtonComponenet }) => {
  if (Renderer) {
    return <Renderer props={props}>{children}</Renderer>;
  }
  return <button {...props}>{children}</button>;
};

export default PaginationButton;
