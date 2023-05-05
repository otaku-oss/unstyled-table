import type { ComponentProps } from 'react';
import type { BodyRowComponent } from '../../customtypes';

const BodyRowRenderer = <TData extends any>({
    children,
    renderer: Renderer,
    row,
}: ComponentProps<BodyRowComponent<TData>> & { renderer?: BodyRowComponent<TData> }) => {
    if (Renderer) return <Renderer row={row}>{children}</Renderer>;
    return <tr>{children}</tr>;
};

export default BodyRowRenderer;
