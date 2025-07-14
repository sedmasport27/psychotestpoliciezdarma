
import React, { useState } from 'react';
import { BeckDepressionTest as TestType } from '../../types';
import { TestButton } from '../common/TestButton';

interface BeckDepressionTestProps {
    test: TestType;
    onComplete: (result: object) => void;
    closeModal: () => void;
}

export const BeckDepressionTest: React.FC<BeckDepressionTestProps> = ({ test, onComplete, closeModal }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleAnswer = (optionIndex: number) => {
        const newScore = score + optionIndex;
        setScore(newScore);

        if (currentQuestionIndex < test.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            let severity = '';
            if (newScore <= 13) severity = 'Minimální deprese';
            else if (newScore <= 19) severity = 'Mírná deprese';
            else if (newScore <= 28) severity = 'Střední deprese';
            else severity = 'Těžká deprese';
            
            onComplete({ score: newScore, severity });
            setIsFinished(true);
        }
    };
    
    if (isFinished) {
        let severity = '';
        if (score <= 13) severity = 'Minimální deprese';
        else if (score <= 19) severity = 'Mírná deprese';
        else if (score <= 28) severity = 'Střední deprese';
        else severity = 'Těžká deprese';

        return (
            <div className="text-center">
                <h4 className="text-2xl font-bold mb-4">Výsledek!</h4>
                <p className="text-lg">Vaše skóre: {score}</p>
                <p className="text-lg mb-4">Interpretace: {severity}</p>
                <p className="text-sm text-gray-500"><em>Upozornění: Toto je pouze screening. V případě obav kontaktujte odborníka.</em></p>
                <TestButton onClick={closeModal}>Zavřít</TestButton>
            </div>
        );
    }
    
    const q = test.questions[currentQuestionIndex];
    return (
        <div className="text-center">
            <div className="mb-2 text-gray-500">Otázka {currentQuestionIndex + 1} / {test.questions.length}</div>
            <p className="text-xl font-semibold mb-6">{q.question}</p>
            <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
                {q.options.map((option, index) => (
                    <TestButton key={index} variant="secondary" className="text-left !font-normal" onClick={() => handleAnswer(index)}>
                        {option}
                    </TestButton>
                ))}
            </div>
        </div>
    );
};
