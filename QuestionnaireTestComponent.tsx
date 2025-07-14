
import React, { useState } from 'react';
import { QuestionnaireTest } from '../../types';
import { TestButton } from '../common/TestButton';

interface QuestionnaireTestComponentProps {
    test: QuestionnaireTest;
    onComplete: (result: object) => void;
    closeModal: () => void;
}

export const QuestionnaireTestComponent: React.FC<QuestionnaireTestComponentProps> = ({ test, onComplete, closeModal }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<any[]>([]);
    const [isFinished, setIsFinished] = useState(false);

    const handleAnswer = (answer: string) => {
        const newAnswers = [...answers, { qIndex: currentQuestionIndex, answer, rawQuestion: test.questions[currentQuestionIndex] }];
        setAnswers(newAnswers);

        if (currentQuestionIndex < test.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // Simplified scoring logic
            let profileSummary = "Váš profil naznačuje: ";
            if (test.type === 'personality_questionnaire') {
                const introversionScore = newAnswers.filter(a => (a.rawQuestion.category === 'introversion' && a.answer === 'agree') || (a.rawQuestion.category === 'extraversion' && a.answer === 'disagree')).length;
                profileSummary += introversionScore >= 2 ? "Spíše introvertní zaměření." : "Spíše extrovertní zaměření.";
            } else {
                profileSummary = "Profil byl úspěšně vyhodnocen.";
            }

            onComplete({ profileSummary });
            setIsFinished(true);
        }
    };
    
    if (isFinished) {
        return (
            <div className="text-center">
                 <h4 className="text-2xl font-bold mb-4">Výsledek orientačního dotazníku</h4>
                 <p className="text-gray-700 max-w-xl mx-auto mb-6">Váš profil byl úspěšně vyhodnocen. Pamatujte, že toto je pouze zjednodušená simulace. Skutečný psychologický test je mnohem komplexnější.</p>
                 <TestButton onClick={closeModal}>Zavřít</TestButton>
            </div>
        );
    }
    
    const q = test.questions[currentQuestionIndex];
    return (
        <div className="text-center">
            <div className="mb-2 text-gray-500">Otázka {currentQuestionIndex + 1} / {test.questions.length}</div>
            <p className="text-xl mb-6">{q.statement}</p>
            <div className="flex justify-center gap-4">
                <TestButton variant="primary" onClick={() => handleAnswer('agree')}>Souhlasím</TestButton>
                <TestButton variant="secondary" onClick={() => handleAnswer('disagree')}>Nesouhlasím</TestButton>
            </div>
        </div>
    );
};
