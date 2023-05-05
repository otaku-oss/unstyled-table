import type { ComponentProps } from 'react';
import type { FooterComponent } from '../../customtypes';

const FooterRenderer = <TData extends any>({
    children,
    renderer: Renderer,
    footerGroups,
}: ComponentProps<FooterComponent<TData>> & { renderer?: FooterComponent<TData> }) => {
    if (Renderer) return <Renderer footerGroups={footerGroups}>{children}</Renderer>;
    return <thead>{children}</thead>;
};

export default FooterRenderer;
