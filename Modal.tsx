
import React, { ReactNode } from 'react';

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};
