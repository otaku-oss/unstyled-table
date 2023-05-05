import type { ComponentProps } from 'react';
import type { HeaderCellComponent } from '../../customtypes';

const HeaderCellRenderer = <TData extends any>({
    children,
    renderer: Renderer,
    props,
    header,
}: ComponentProps<HeaderCellComponent<TData>> & { renderer?: HeaderCellComponent<TData> }) => {
    if (Renderer)
        return (
            <Renderer props={props} header={header}>
                {children}
            </Renderer>
        );
    return <th {...props}>{children}</th>;
};

export default HeaderCellRenderer;
