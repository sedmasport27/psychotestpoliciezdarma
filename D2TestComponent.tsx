
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { D2Test } from '../../types';
import { useTestTimer } from '../../hooks/useTestTimer';
import { TestButton } from '../common/TestButton';

interface D2TestComponentProps {
    test: D2Test;
    onComplete: (result: object) => void;
    closeModal: () => void;
}

const D2Cell: React.FC<{ char: string; isTarget: boolean; onClick: (isTarget: boolean) => void }> = React.memo(({ char, isTarget, onClick }) => {
    const [clicked, setClicked] = useState(false);
    const [correct, setCorrect] = useState<boolean | null>(null);

    const handleClick = () => {
        if (clicked) return;
        setClicked(true);
        const isCorrectClick = isTarget;
        setCorrect(isCorrectClick);
        onClick(isCorrectClick);
    };

    let bgColor = 'hover:bg-blue-200';
    if (clicked) {
        bgColor = correct ? 'bg-green-300' : 'bg-red-300';
    }

    return (
        <div
            className={`cursor-pointer p-1 text-center rounded text-xl select-none transition-colors ${bgColor}`}
            onClick={handleClick}
        >
            {char}
        </div>
    );
});


export const D2TestComponent: React.FC<D2TestComponentProps> = ({ test, onComplete, closeModal }) => {
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);

    const D2_TOTAL_CHARACTERS = 200;

    const gridData = useMemo(() => {
        if (!isStarted) return [];
        const data = [];
        for (let i = 0; i < D2_TOTAL_CHARACTERS; i++) {
            let char: string;
            let isTarget = false;
            if (Math.random() * 100 < test.targetPercentage) {
                char = test.targetChar;
                isTarget = true;
            } else {
                const distractor = test.distractors[Math.floor(Math.random() * test.distractors.length)];
                char = distractor;
            }
            data.push({ char, isTarget });
        }
        return data;
    }, [isStarted, test]);
    
    const totalTargets = useMemo(() => gridData.filter(d => d.isTarget).length, [gridData]);

    const handleTestEnd = useCallback(() => {
        setIsFinished(true);
        stopTimer();
        const result = {
            score,
            errors,
            missedTargets: totalTargets - score,
            overallPerformance: score - errors,
        };
        onComplete(result);
    }, [score, errors, totalTargets, onComplete]);

    const { timeLeft, startTimer, stopTimer } = useTestTimer(test.timeLimitMinutes * 60, handleTestEnd);

    const handleStart = () => {
        setIsStarted(true);
        startTimer();
    };

    const handleCellClick = useCallback((isCorrectClick: boolean) => {
        if (isCorrectClick) {
            setScore(prev => prev + 1);
        } else {
            setErrors(prev => prev + 1);
        }
    }, []);
    
    if (isFinished) {
        const missedTargets = totalTargets - score;
        const overallPerformance = score - errors;
        const chartData = [
            { name: 'Správně', value: score, fill: '#4ade80' },
            { name: 'Chyby', value: errors, fill: '#f87171' },
            { name: 'Vynecháno', value: missedTargets, fill: '#f97316' },
        ];

        return (
            <div className="text-center">
                <h4 className="text-2xl font-bold mb-4">Čas vypršel!</h4>
                <div style={{ width: '100%', height: 200 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                                {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="text-left max-w-sm mx-auto space-y-2 mt-4">
                    <p className="flex justify-between"><strong>Správně označené:</strong> <span>{score}</span></p>
                    <p className="flex justify-between"><strong>Chybně označené (omyly):</strong> <span className="text-red-600">{errors}</span></p>
                    <p className="flex justify-between"><strong>Vynechané správné:</strong> <span className="text-orange-600">{missedTargets}</span></p>
                    <hr className="my-2"/>
                    <p className="flex justify-between font-bold"><strong>Celkový výkon (správné - chyby):</strong> <span>{overallPerformance}</span></p>
                </div>
                <TestButton onClick={closeModal} className="mt-6">Zavřít</TestButton>
            </div>
        );
    }

    if (!isStarted) {
        return (
            <div className="text-center">
                <p className="mb-4">Vaším úkolem je najít a kliknout na všechny znaky 'd' se dvěma čárkami (d̈). Máte na to {test.timeLimitMinutes} minut. Test začne po kliknutí na tlačítko Start.</p>
                <TestButton onClick={handleStart}>Start</TestButton>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center font-mono text-xl mb-4 p-2 bg-gray-100 rounded">
                <div>Čas: <span className="font-bold">{timeLeft}s</span></div>
                <div>Skóre: <span className="font-bold text-green-600">{score}</span></div>
                <div>Chyby: <span className="font-bold text-red-600">{errors}</span></div>
            </div>
            <div className="grid grid-cols-10 md:grid-cols-20 gap-1 border p-2 rounded-lg bg-gray-50">
                {gridData.map((item, index) => (
                    <D2Cell key={index} char={item.char} isTarget={item.isTarget} onClick={handleCellClick} />
                ))}
            </div>
        </div>
    );
};
