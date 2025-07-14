import React, { useState, useEffect } from 'react';
import { StroopTest } from '../../types';
import { TestButton } from '../common/TestButton';

interface StroopTestComponentProps {
    test: StroopTest;
    onComplete: (result: object) => void;
    closeModal: () => void;
}

export const StroopTestComponent: React.FC<StroopTestComponentProps> = ({ test, onComplete, closeModal }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [errorCount, setErrorCount] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [startTime, setStartTime] = useState(0);

    useEffect(() => {
        setStartTime(Date.now());
    }, []);

    useEffect(() => {
        if (isFinished) {
            const timeTakenMs = Date.now() - startTime;
            onComplete({ correctCount, errorCount, timeTakenMs });
        }
    }, [isFinished, correctCount, errorCount, startTime, onComplete]);


    const handleAnswer = (selectedColor: string) => {
        if (answered) return;

        const q = test.questions[currentQuestionIndex];
        const isCorrect = selectedColor === q.color;
        
        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
        } else {
            setErrorCount(prev => prev + 1);
        }
        setAnswered(true);

        setTimeout(() => {
            if (currentQuestionIndex < test.questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setAnswered(false);
            } else {
                setIsFinished(true);
            }
        }, 1000);
    };

    if (isFinished) {
        const timeTakenMs = Date.now() - startTime;
        return (
            <div className="text-center">
                <h4 className="text-2xl font-bold mb-4">Výsledek Stroopova testu!</h4>
                <p className="text-lg">Správně: {correctCount}</p>
                <p className="text-lg">Chyby: {errorCount}</p>
                <p className="text-lg mb-4">Čas: {(timeTakenMs / 1000).toFixed(2)} sekund</p>
                <TestButton onClick={closeModal}>Zavřít</TestButton>
            </div>
        );
    }
    
    const q = test.questions[currentQuestionIndex];
    const colorOptions = { "red": "Červená", "blue": "Modrá", "green": "Zelená", "yellow": "Žlutá" };

    return (
        <div className="text-center">
            <p className="mb-4">Klikněte na tlačítko s BARVOU, kterou je napsáno slovo.</p>
            <div className="text-5xl font-bold my-8" style={{ color: q.color }}>{q.word}</div>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {Object.entries(colorOptions).map(([colorValue, colorName]) => (
                    <TestButton key={colorValue} variant="secondary" onClick={() => handleAnswer(colorValue)} disabled={answered}>
                        {colorName}
                    </TestButton>
                ))}
            </div>
        </div>
    );
};