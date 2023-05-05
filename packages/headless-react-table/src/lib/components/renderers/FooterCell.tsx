import type { ComponentProps } from 'react';
import type { FooterCellComponent } from '../../customtypes';

const FooterCellRenderer = <TData extends any>({
    children,
    renderer: Renderer,
    props,
    header,
}: ComponentProps<FooterCellComponent<TData>> & { renderer?: FooterCellComponent<TData> }) => {
    if (Renderer)
        return (
            <Renderer props={props} header={header}>
                {children}
            </Renderer>
        );
    return <th {...props}>{children}</th>;
};

export default FooterCellRenderer;
