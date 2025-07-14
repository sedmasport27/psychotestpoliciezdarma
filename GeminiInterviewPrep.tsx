
import React, { useState, useCallback } from 'react';
import { generateInterviewQuestions } from '../services/geminiService';

export const GeminiInterviewPrep: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedQuestions, setGeneratedQuestions] = useState('');
    const [error, setError] = useState('');

    const handleGenerate = useCallback(async () => {
        if (!userInput.trim()) {
            setError('Prosím, zadejte popis, na co se chcete zaměřit.');
            setGeneratedQuestions('');
            return;
        }

        setIsLoading(true);
        setError('');
        setGeneratedQuestions('');

        try {
            const questions = await generateInterviewQuestions(userInput);
            setGeneratedQuestions(questions);
        } catch (err: any) {
            setError(err.message || 'Došlo k chybě při generování otázek.');
        } finally {
            setIsLoading(false);
        }
    }, [userInput]);

    return (
        <div className="text-center">
            <p className="mb-4 text-gray-700">Popište, na co byste se chtěli zaměřit při generování otázek (např. 'Jsem trochu nervózní z otázek na stres', 'Chci procvičit otázky na týmovou práci', 'Mám silné vůdčí schopnosti').</p>
            <textarea
                id="llm-input"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 h-32 resize-y focus:ring-2 focus:ring-[#0056b3] focus:border-transparent transition"
                placeholder="Zde napište svůj popis..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={isLoading}
            />
            <button
                onClick={handleGenerate}
                className="bg-[#0056b3] hover:bg-[#004494] text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
            >
                {isLoading ? 'Generuji...' : 'Generovat otázky'}
            </button>

            {isLoading && <div className="mt-4 text-gray-500">Načítám otázky...</div>}
            
            {(generatedQuestions || error) && (
                 <div className="mt-6 text-left p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-lg mb-2">Generované otázky:</h4>
                    {error && <p className="text-red-500">{error}</p>}
                    {generatedQuestions && (
                        <>
                            <ul className="list-disc list-inside space-y-2 text-gray-800">
                                {generatedQuestions.split('* ').filter(q => q.trim()).map((q, i) => (
                                    <li key={i}>{q.trim()}</li>
                                ))}
                            </ul>
                            <p className="text-sm text-gray-500 mt-4"><em>Upozornění: Tyto otázky jsou generovány umělou inteligencí a slouží pouze pro tréninkové účely. Nemusí přesně odpovídat otázkám položeným při skutečném pohovoru.</em></p>
                        </>
                    )}
                 </div>
            )}
        </div>
    );
};
