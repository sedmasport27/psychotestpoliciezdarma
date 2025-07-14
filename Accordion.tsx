
import React, { useState, ReactNode } from 'react';

interface AccordionItemProps {
    title: string;
    children: ReactNode;
    isOpen?: boolean;
    onClick?: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick }) => {
    return (
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
            <button
                className="w-full text-left p-4 flex justify-between items-center font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={onClick}
            >
                <span>{title}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>
            <div
                className="accordion-content transition-all duration-500 ease-in-out"
                style={{ maxHeight: isOpen ? '1000px' : '0' }}
            >
                {children}
            </div>
        </div>
    );
};

interface AccordionProps {
    children: ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleItemClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<AccordionItemProps>, {
                        isOpen: openIndex === index,
                        onClick: () => handleItemClick(index),
                    });
                }
                return child;
            })}
        </div>
    );
};
