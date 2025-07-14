
import React, { useState } from 'react';
import { LuscherColorTest as TestType } from '../../types';
import { TestButton } from '../common/TestButton';

interface LuscherColorTestProps {
    test: TestType;
    onComplete: (result: object) => void;
    closeModal: () => void;
}

export const LuscherColorTest: React.FC<LuscherColorTestProps> = ({ test, onComplete, closeModal }) => {
    const [selectedColors, setSelectedColors] = useState<{name:string, value:string}[]>([]);
    const [isFinished, setIsFinished] = useState(false);

    const handleColorSelect = (color: {name:string, value:string}) => {
        if (selectedColors.find(c => c.value === color.value)) return;
        setSelectedColors(prev => [...prev, color]);
    };

    const handleSubmit = () => {
        onComplete({ orderedColors: selectedColors });
        setIsFinished(true);
    };

    if (isFinished) {
        let interpretation = "Zjednodušená interpretace: ";
        if (selectedColors.length > 0) {
            const firstColor = test.colors.find(c => c.value === selectedColors[0].value);
            interpretation += `Vaše první volba (${firstColor?.name}) naznačuje zaměření na: ${firstColor?.meaning}.`;
        }
        return (
            <div className="text-center">
                <h4 className="text-2xl font-bold mb-4">Výsledek testu!</h4>
                <p className="text-lg mb-4">{interpretation}</p>
                <p className="text-sm text-gray-500"><em>Upozornění: Toto je velmi zjednodušená interpretace.</em></p>
                <TestButton onClick={closeModal}>Zavřít</TestButton>
            </div>
        );
    }

    return (
        <div className="text-center">
            <p className="mb-4">Seřaďte barvy od nejpříjemnější po nejméně příjemnou klikáním v pořadí preference.</p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                {test.colors.map(color => (
                    <div 
                        key={color.value}
                        className={`w-16 h-16 rounded-md shadow-md cursor-pointer transition-all ${selectedColors.find(c => c.value === color.value) ? 'opacity-25 scale-90' : 'hover:scale-105'}`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => handleColorSelect(color)}
                    ></div>
                ))}
            </div>
            <div className="text-lg font-semibold mb-4 h-12">
                Pořadí: {selectedColors.map(c => c.name).join(', ')}
            </div>
            <TestButton onClick={handleSubmit} disabled={selectedColors.length !== test.colors.length}>
                Dokončit
            </TestButton>
        </div>
    );
};
