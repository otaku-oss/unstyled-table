import type { ComponentProps } from 'react';
import type { HeaderRowComponent } from '../../customtypes';

const HeaderRowRenderer = <TData extends unknown>({
    children,
    renderer: Renderer,
    headerGroup,
}: ComponentProps<HeaderRowComponent<TData>> & { renderer?: HeaderRowComponent<TData> }) => {
    if (Renderer) return <Renderer headerGroup={headerGroup}>{children}</Renderer>;
    return <tr>{children}</tr>;
};

export default HeaderRowRenderer;
