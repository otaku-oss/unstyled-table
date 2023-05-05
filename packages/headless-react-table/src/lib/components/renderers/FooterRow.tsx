import type { ComponentProps } from 'react';
import type { FooterRowComponent } from '../../customtypes';

const FooterRowRenderer = <TData extends any>({
    children,
    renderer: Renderer,
    footerGroup,
}: ComponentProps<FooterRowComponent<TData>> & { renderer?: FooterRowComponent<TData> }) => {
    if (Renderer) return <Renderer footerGroup={footerGroup}>{children}</Renderer>;
    return <tr>{children}</tr>;
};

export default FooterRowRenderer;
