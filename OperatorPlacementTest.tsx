
import React, { useState } from 'react';
import { OperatorPlacementTest as TestType } from '../../types';
import { GenericTestFlow } from './GenericTestFlow';
import { TestButton } from '../common/TestButton';

interface OperatorPlacementTestProps {
    test: TestType;
    onComplete: (result: object) => void;
    closeModal: () => void;
}

export const OperatorPlacementTest: React.FC<OperatorPlacementTestProps> = ({ test, onComplete, closeModal }) => {

    const renderQuestion = (
        question: TestType['questions'][0],
        qIndex: number,
        totalQ: number,
        onAnswer: (isCorrect: boolean) => void
    ) => {
        const equationParts = question.equation_template.split('?');
        const [selectedOperators, setSelectedOperators] = useState<string[]>(Array(equationParts.length - 1).fill('+'));
        const [answered, setAnswered] = useState(false);
        const [isCorrect, setIsCorrect] = useState(false);
        
        const handleCheck = () => {
            const correct = JSON.stringify(selectedOperators) === JSON.stringify(question.correct_operators);
            setIsCorrect(correct);
            setAnswered(true);
            onAnswer(correct);
        };

        const handleSelectChange = (index: number, value: string) => {
            const newOps = [...selectedOperators];
            newOps[index] = value;
            setSelectedOperators(newOps);
        };

        const operators = ['+', '-', '*', '/'];

        return (
            <div className="text-center">
                <div className="mb-2 text-gray-500">Otázka {qIndex + 1} / {totalQ}</div>
                <div className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                    {equationParts.map((part, index) => (
                        <React.Fragment key={index}>
                            <span>{part}</span>
                            {index < equationParts.length - 1 && (
                                <select 
                                    value={selectedOperators[index]}
                                    onChange={(e) => handleSelectChange(index, e.target.value)}
                                    disabled={answered}
                                    className="p-2 border rounded-md text-gray-800 bg-white"
                                >
                                    {operators.map(op => <option key={op} value={op}>{op}</option>)}
                                </select>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <TestButton onClick={handleCheck} disabled={answered}>Zkontrolovat</TestButton>
                {answered && (
                    <div className={`mt-4 font-bold h-6 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {isCorrect ? 'Správně!' : `Špatně. Správně je: ${question.correct_operators.join(', ')}`}
                    </div>
                )}
            </div>
        );
    };

    const renderResults = (correctCount: number, totalQuestions: number) => (
        <>
            <h4 className="text-2xl font-bold mb-4">Výsledek testu Početní znaménka!</h4>
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
