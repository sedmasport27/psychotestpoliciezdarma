
import React from 'react';
import { AnyTest } from '../types';

interface TrainingButtonProps {
    test: AnyTest;
    icon: string;
    onStart: () => void;
}

export const TrainingButton: React.FC<TrainingButtonProps> = ({ test, icon, onStart }) => {
    return (
        <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-md border border-gray-200 flex flex-col items-center justify-between">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{test.name}</h3>
            <p className="text-gray-600 mb-4 text-sm flex-grow">
                {test.description.substring(0, 70).replace(/<[^>]*>/g, '') + '...'}
            </p>
            <button 
                onClick={onStart} 
                className="bg-[#0056b3] hover:bg-[#004494] text-white font-semibold py-2 px-6 rounded-lg transition-colors mt-auto"
            >
                Spustit
            </button>
        </div>
    );
};
