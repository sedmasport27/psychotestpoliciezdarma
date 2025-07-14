
import React, { useState, useEffect } from 'react';
import { VisualMemoryTest as VisualMemoryTestType } from '../../types';
import { GenericTestFlow } from './GenericTestFlow';
import { TestButton } from '../common/TestButton';

interface VisualMemoryTestProps {
    test: VisualMemoryTestType;
    onComplete: (result: object) => void;
    closeModal: () => void;
}

const PatternGrid: React.FC<{ pattern: number[] }> = ({ pattern }) => (
    <div className="grid grid-cols-3 gap-1 w-36 h-36 border border-gray-300 mx-auto">
        {pattern.map((cell, i) => (
            <div key={i} className={`w-full h-full ${cell === 1 ? 'bg-[#0056b3]' : 'bg-gray-100'}`}></div>
        ))}
    </div>
);

export const VisualMemoryTest: React.FC<VisualMemoryTestProps> = ({ test, onComplete, closeModal }) => {

    const renderQuestion = (
        question: VisualMemoryTestType['questions'][0],
        qIndex: number,
        totalQ: number,
        onAnswer: (isCorrect: boolean) => void
    ) => {
        const [showPattern, setShowPattern] = useState(true);
        const [answered, setAnswered] = useState<number | null>(null);

        useEffect(() => {
            const timer = setTimeout(() => setShowPattern(false), test.memorizeTimeSeconds * 1000);
            return () => clearTimeout(timer);
        }, [qIndex]);

        const handleSelect = (selectedIndex: number) => {
            setAnswered(selectedIndex);
            onAnswer(selectedIndex === question.correct);
        };

        return (
            <div className="text-center">
                <div className="mb-2 text-gray-500">Otázka {qIndex + 1} / {totalQ}</div>
                {showPattern ? (
                    <>
                        <p className="mb-4">Zapamatujte si vzor:</p>
                        <PatternGrid pattern={question.pattern} />
                    </>
                ) : (
                    <>
                        <p className="mb-4">Který vzor jste viděli?</p>
                        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                            {question.options.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => answered === null && handleSelect(index)}
                                    className={`p-2 border-2 rounded-lg cursor-pointer transition-colors 
                                        ${answered === null ? 'hover:border-blue-500 border-transparent' :
                                        index === question.correct ? 'border-green-500' :
                                        index === answered ? 'border-red-500' : 'border-transparent'}`}
                                >
                                    <PatternGrid pattern={option} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    };
    
    const renderResults = (correctCount: number, totalQuestions: number) => (
        <>
            <h4 className="text-2xl font-bold mb-4">Výsledek testu Vizuální paměti!</h4>
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
