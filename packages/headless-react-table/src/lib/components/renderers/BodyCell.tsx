import type { ComponentProps } from 'react';
import type { BodyCellComponent } from '../../customtypes';

const BodyCellRenderer = <TData extends any>({
    children,
    renderer: Renderer,
    props,
    cell,
}: ComponentProps<BodyCellComponent<TData>> & { renderer?: BodyCellComponent<TData> }) => {
    if (Renderer)
        return (
            <Renderer props={props} cell={cell}>
                {children}
            </Renderer>
        );
    return <td {...props}>{children}</td>;
};

export default BodyCellRenderer;
