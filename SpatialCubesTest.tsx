
import React, { useState } from 'react';
import { SpatialCubesTest as SpatialCubesTestType } from '../../types';
import { GenericTestFlow } from './GenericTestFlow';
import { TestButton } from '../common/TestButton';

interface SpatialCubesTestProps {
    test: SpatialCubesTestType;
    onComplete: (result: object) => void;
    closeModal: () => void;
}

const CubeOption: React.FC<{ option: {t:string,f:string,r:string}, index: number, onSelect: (index:number)=>void, disabled: boolean }> = ({ option, index, onSelect, disabled }) => {
    return (
        <div 
            className={`cursor-pointer p-2 border-2 rounded-lg transition-colors ${disabled ? 'cursor-not-allowed' : 'hover:border-blue-500'}`} 
            onClick={() => !disabled && onSelect(index)}
        >
            <div className="w-24 h-24 relative mx-auto" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-20deg) rotateY(-30deg)' }}>
                <div className="border border-gray-400 bg-white absolute w-24 h-24 flex items-center justify-center text-2xl font-bold" style={{ transform: 'rotateY(0deg) translateZ(48px)' }}>{option.f}</div>
                <div className="border border-gray-400 bg-white absolute w-24 h-24 flex items-center justify-center text-2xl font-bold" style={{ transform: 'rotateY(90deg) translateZ(48px)' }}>{option.r}</div>
                <div className="border border-gray-400 bg-white absolute w-24 h-24 flex items-center justify-center text-2xl font-bold" style={{ transform: 'rotateX(90deg) translateZ(48px)' }}>{option.t}</div>
            </div>
        </div>
    );
};

export const SpatialCubesTest: React.FC<SpatialCubesTestProps> = ({ test, onComplete, closeModal }) => {
    
    const renderQuestion = (
        question: SpatialCubesTestType['questions'][0], 
        qIndex: number, 
        totalQ: number,
        onAnswer: (isCorrect: boolean) => void
    ) => {
        const [answered, setAnswered] = useState<number|null>(null);

        const handleSelect = (selectedIndex: number) => {
            setAnswered(selectedIndex);
            onAnswer(selectedIndex === question.correct);
        };
        
        return (
            <div className="text-center">
                <div className="mb-2 text-gray-500">Otázka {qIndex + 1} / {totalQ}</div>
                <p className="mb-4">Která ze složených krychlí může vzniknout složením předlohy?</p>
                <div className="flex flex-col md:flex-row justify-around items-center gap-8">
                    <div>
                        <h4 className="font-bold mb-2">Předloha</h4>
                        <div className="grid w-[120px] h-[120px] mx-auto" style={{gridTemplateAreas: '". t ." "l c r" ". b ."'}}>
                            {Object.entries(question.unfolded).map(([pos, val]) => (
                                <div key={pos} className="border border-gray-400 bg-white flex items-center justify-center text-2xl font-bold" style={{gridArea: pos}}>{val}</div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Možnosti</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {question.options.map((opt, index) => (
                                <div key={index} className={answered !== null ? (index === question.correct ? 'border-green-500' : (index === answered ? 'border-red-500' : 'border-transparent')) : 'border-transparent'}>
                                  <CubeOption option={opt} index={index} onSelect={handleSelect} disabled={answered !== null} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {answered !== null && (
                    <div className={`mt-4 font-bold h-6 ${answered === question.correct ? 'text-green-600' : 'text-red-600'}`}>
                        {answered === question.correct ? 'Správně!' : 'Špatně.'}
                    </div>
                )}
            </div>
        );
    };

    const renderResults = (correctCount: number, totalQuestions: number) => (
        <>
            <h4 className="text-2xl font-bold mb-4">Výsledek testu prostorové představivosti!</h4>
            <p className="text-lg mb-4">Správně zodpovězeno: {correctCount} z {totalQuestions} otázek.</p>
        </>
    );

    return (
        <GenericTestFlow
            questions={test.questions}
            renderQuestion={renderQuestion}
            renderResults={renderResults}
            onComplete={onComplete}
            closeModal={closeModal}
        />
    );
};
