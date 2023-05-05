import type { ComponentProps } from 'react';
import type { TableComponent } from '../../customtypes';

const TableRenderer = <TData extends any>({
    children,
    renderer: Renderer,
    tableInstance,
}: ComponentProps<TableComponent<TData>> & { renderer?: TableComponent<TData> }) => {
    if (Renderer) return <Renderer tableInstance={tableInstance}>{children}</Renderer>;
    return <table>{children}</table>;
};

export default TableRenderer;
