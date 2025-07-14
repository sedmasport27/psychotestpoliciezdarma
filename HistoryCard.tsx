
import React from 'react';
import { Result, TestType } from '../types';

interface HistoryCardProps {
    title: string;
    results: Result[];
}

const formatResult = (result: Result): string => {
    const date = result.timestamp.toLocaleString('cs-CZ', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    let text = `${date}: `;

    switch (result.type) {
        case TestType.D2Attention:
            return text + `Výkon: ${result.overallPerformance} (Správně: ${result.score}, Chyby: ${result.errors})`;
        case TestType.SpatialCubes:
        case TestType.VerbalAnalogy:
        case TestType.SentenceCompletion:
        case TestType.Generalization:
        case TestType.MathematicalEquation:
        case TestType.NumberSequence:
        case TestType.OperatorPlacement:
        case TestType.RavenMatrices:
        case TestType.WechslerIntelligence:
        case TestType.VisualMemory:
            return text + `Správně: ${result.correctCount} / ${result.totalQuestions}`;
        case TestType.Stroop:
            return text + `Správně: ${result.correctCount}, Chyby: ${result.errorCount}, Čas: ${(result.timeTakenMs / 1000).toFixed(1)}s`;
        case TestType.PersonalityQuestionnaire:
        case TestType.SixteenPF:
        case TestType.NeoBigFive:
        case TestType.MBTI:
            return text + `${result.profileSummary}`;
        case TestType.LuscherColor:
            return text + `Hotovo`;
        case TestType.BeckDepression:
            return text + `Skóre: ${result.score} (${result.severity})`;
        case TestType.ClockDrawing:
        case TestType.BentonVisual:
            return text + 'Dokončeno';
        default:
            return text + 'Výsledek zaznamenán.';
    }
};


export const HistoryCard: React.FC<HistoryCardProps> = ({ title, results }) => {
    return (
        <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <ul className="list-none text-gray-700 space-y-2 text-sm">
                {results.length > 0 ? (
                    results.map((res, index) => <li key={index}>{formatResult(res)}</li>)
                ) : (
                    <li className="text-gray-500">Žádné výsledky k zobrazení.</li>
                )}
            </ul>
        </div>
    );
};
