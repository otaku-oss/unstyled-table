import type { ComponentProps } from 'react';
import type { FilterInputComponent } from '../../customtypes';

const FilterInput = ({
  props,
  renderer: Renderer,
}: ComponentProps<FilterInputComponent> & { renderer?: FilterInputComponent }) => {
  if (Renderer) {
    return <Renderer props={props} />;
  }
  return <input {...props} />;
};

export default FilterInput;
