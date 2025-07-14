
import React, { useState } from 'react';
import { GenericTestFlow } from './GenericTestFlow';
import { TestButton } from '../common/TestButton';

interface SimpleQuestion {
    questionText: string;
    options: string[];
    correctOption: string;
}

interface SimpleQuestionTestProps<T extends SimpleQuestion> {
    testName: string;
    questions: T[];
    onComplete: (result: object) => void;
    closeModal: () => void;
}

export function SimpleQuestionTest<T extends SimpleQuestion>({
    testName,
    questions,
    onComplete,
    closeModal
}: SimpleQuestionTestProps<T>) {

    const renderQuestion = (
        question: T,
        qIndex: number,
        totalQ: number,
        onAnswer: (isCorrect: boolean) => void
    ) => {
        const [answered, setAnswered] = useState<string | null>(null);

        const handleSelect = (selectedOption: string) => {
            setAnswered(selectedOption);
            onAnswer(selectedOption === question.correctOption);
        };

        return (
            <div className="text-center">
                <div className="mb-2 text-gray-500">Otázka {qIndex + 1} / {totalQ}</div>
                <p className="text-xl font-semibold mb-6" dangerouslySetInnerHTML={{ __html: question.questionText }}></p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                    {question.options.map((option, index) => (
                        <TestButton
                            key={index}
                            variant="secondary"
                            onClick={() => handleSelect(option)}
                            disabled={answered !== null}
                            className={`
                                ${answered !== null && option === question.correctOption ? '!bg-green-300 !text-black' : ''}
                                ${answered !== null && option === answered && option !== question.correctOption ? '!bg-red-300 !text-white' : ''}
                            `}
                        >
                            {option}
                        </TestButton>
                    ))}
                </div>
                {answered !== null && (
                    <div className={`mt-4 font-bold h-6 ${answered === question.correctOption ? 'text-green-600' : 'text-red-600'}`}>
                        {answered === question.correctOption ? 'Správně!' : 'Špatně.'}
                    </div>
                )}
            </div>
        );
    };

    const renderResults = (correctCount: number, totalQuestions: number) => (
        <>
            <h4 className="text-2xl font-bold mb-4">Výsledek testu {testName}!</h4>
            <p className="text-lg mb-4">Správně zodpovězeno: {correctCount} z {totalQuestions} otázek.</p>
        </>
    );

    return (
        <GenericTestFlow
            questions={questions}
            renderQuestion={renderQuestion}
            renderResults={renderResults}
            onComplete={onComplete}
            closeModal={closeModal}
        />
    );
}

export const VerbalAnalogyTest: React.FC<any> = ({ test, ...props }) => {
    const questions = test.questions.map((q: any) => ({
        questionText: `${q.analogy_part1} :: ${q.analogy_part2_stem}?`,
        options: q.options,
        correctOption: q.correct_option
    }));
    return <SimpleQuestionTest testName={test.name} questions={questions} {...props} />;
};

export const SentenceCompletionTest: React.FC<any> = ({ test, ...props }) => {
    const questions = test.questions.map((q: any) => ({
        questionText: q.sentence_template.replace('...', '<span class="text-blue-600">...</span>'),
        options: q.options,
        correctOption: q.correct_option
    }));
    return <SimpleQuestionTest testName={test.name} questions={questions} {...props} />;
};

export const GeneralizationTest: React.FC<any> = ({ test, ...props }) => {
    const questions = test.questions.map((q: any) => ({
        questionText: `Které slovo nejlépe zobecňuje slova: <strong>${q.words.join(', ')}</strong>?`,
        options: q.options,
        correctOption: q.correct_concept
    }));
    return <SimpleQuestionTest testName={test.name} questions={questions} {...props} />;
};

export const MathematicalEquationTest: React.FC<any> = ({ test, ...props }) => {
    const questions = test.questions.map((q: any) => ({
        questionText: q.question,
        options: q.options.map(String),
        correctOption: String(q.correct_answer)
    }));
    return <SimpleQuestionTest testName={test.name} questions={questions} {...props} />;
};

export const NumberSequenceTest: React.FC<any> = ({ test, ...props }) => {
    const questions = test.questions.map((q: any) => ({
        questionText: `${q.sequence.join(', ')}, ?`,
        options: q.options.map(String),
        correctOption: String(q.correct_next_number)
    }));
    return <SimpleQuestionTest testName={test.name} questions={questions} {...props} />;
};

export const RavenMatricesTest: React.FC<any> = ({ test, ...props }) => {
    const questions = test.questions.map((q: any) => ({
        questionText: `<div class="grid grid-cols-3 gap-2 text-3xl font-bold mb-6 mx-auto w-48">${q.matrix.flat().map((cell: string) => `<div class="border p-2 flex items-center justify-center h-16">${cell}</div>`).join('')}</div> Doplňte chybějící symbol.`,
        options: q.options,
        correctOption: q.options[q.correct]
    }));
    return <SimpleQuestionTest testName={test.name} questions={questions} {...props} />;
};

export const WechslerTest: React.FC<any> = ({ test, ...props }) => {
    const questions = test.questions.map((q: any) => ({
        questionText: q.question,
        options: q.options.map(String),
        correctOption: String(q.correct_answer)
    }));
    return <SimpleQuestionTest testName={test.name} questions={questions} {...props} />;
};
