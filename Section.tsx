
import React, { ReactNode } from 'react';

interface SectionProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export const Section: React.FC<SectionProps> = ({ id, children, className = '' }) => {
    return (
        <section id={id} className={className}>
            {children}
        </section>
    );
};
