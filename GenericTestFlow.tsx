import React, { useState, ReactNode, useCallback, useEffect } from 'react';
import { TestButton } from '../common/TestButton';

interface GenericTestFlowProps<T> {
    questions: T[];
    renderQuestion: (question: T, questionIndex: number, totalQuestions: number, onAnswer: (isCorrect: boolean) => void) => ReactNode;
    renderResults: (correctCount: number, totalQuestions: number) => ReactNode;
    onComplete: (result: object) => void;
    closeModal: () => void;
}

export function GenericTestFlow<T> ({
    questions,
    renderQuestion,
    renderResults,
    onComplete,
    closeModal
}: GenericTestFlowProps<T>) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleAnswer = useCallback((isCorrect: boolean) => {
        if (isCorrect) {
            setCorrectAnswers(prev => prev + 1);
        }
        
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            } else {
                setIsFinished(true);
            }
        }, 1200);
    }, [currentQuestionIndex, questions.length]);
    
    useEffect(() => {
        if (isFinished) {
            onComplete({ correctCount: correctAnswers, totalQuestions: questions.length });
        }
    }, [isFinished, onComplete, correctAnswers, questions.length]);


    if (isFinished) {
        return (
            <div className="text-center">
                {renderResults(correctAnswers, questions.length)}
                <TestButton onClick={closeModal} className="mt-6">
                    Zavřít
                </TestButton>
            </div>
        );
    }

    return (
        <div>
            {renderQuestion(questions[currentQuestionIndex], currentQuestionIndex, questions.length, handleAnswer)}
        </div>
    );
};