import { ReactNode } from 'react';
import type { BodyComponent } from '../../customtypes';

const BodyRenderer = ({ children, renderer: Renderer }: { children: ReactNode; renderer?: BodyComponent }) => {
    if (Renderer) return <Renderer>{children}</Renderer>;
    return <tbody>{children}</tbody>;
};

export default BodyRenderer;
