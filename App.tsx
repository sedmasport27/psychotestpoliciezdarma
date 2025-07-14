
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Section } from './components/Section';
import { Accordion, AccordionItem } from './components/Accordion';
import { ALL_TESTS_DATA, ICON_MAP } from './constants';
import { TrainingButton } from './components/TrainingButton';
import { Modal } from './components/Modal';
import { AnyTest, ModalContent, ResultsHistory, TestType } from './types';
import { D2TestComponent } from './components/tests/D2TestComponent';
import { SpatialCubesTest } from './components/tests/SpatialCubesTest';
import { QuestionnaireTestComponent } from './components/tests/QuestionnaireTestComponent';
import { VerbalAnalogyTest } from './components/tests/SimpleQuestionTest';
import { VisualMemoryTest } from './components/tests/VisualMemoryTest';
import { StroopTestComponent } from './components/tests/StroopTestComponent';
import { SentenceCompletionTest } from './components/tests/SimpleQuestionTest';
import { GeneralizationTest } from './components/tests/SimpleQuestionTest';
import { MathematicalEquationTest } from './components/tests/SimpleQuestionTest';
import { NumberSequenceTest } from './components/tests/SimpleQuestionTest';
import { OperatorPlacementTest } from './components/tests/OperatorPlacementTest';
import { RavenMatricesTest } from './components/tests/SimpleQuestionTest';
import { WechslerTest } from './components/tests/SimpleQuestionTest';
import { LuscherColorTest } from './components/tests/LuscherColorTest';
import { BeckDepressionTest } from './components/tests/BeckDepressionTest';
import { DrawingTest } from './components/tests/DrawingTest';
import { GeminiInterviewPrep } from './components/GeminiInterviewPrep';
import { HistoryCard } from './components/HistoryCard';


const App: React.FC = () => {
    const [modalContent, setModalContent] = useState<ModalContent>(null);
    const [resultsHistory, setResultsHistory] = useState<ResultsHistory>({});

    const handleSaveResult = useCallback((testType: TestType, resultData: object) => {
        const newResult = { type: testType, timestamp: new Date(), ...resultData };
        setResultsHistory(prev => {
            const newHistory = { ...prev };
            if (!newHistory[testType]) {
                newHistory[testType] = [];
            }
            newHistory[testType] = [newResult, ...newHistory[testType]].slice(0, 5);
            return newHistory;
        });
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalContent(null);
    }, []);

    const getTestComponent = (test: AnyTest) => {
        const onComplete = (resultData: object) => {
            handleSaveResult(test.type, resultData);
            // The result view is usually part of the component itself,
            // which will then call handleCloseModal.
        };

        switch (test.type) {
            case TestType.D2Attention:
                return <D2TestComponent test={test} onComplete={onComplete} closeModal={handleCloseModal} />;
            case TestType.SpatialCubes:
                return <SpatialCubesTest test={test} onComplete={onComplete} closeModal={handleCloseModal} />;
            case TestType.PersonalityQuestionnaire:
            case TestType.SixteenPF:
            case TestType.NeoBigFive:
            case TestType.MBTI:
            case TestType.GenericQuestionnaire:
                 return <QuestionnaireTestComponent test={test} onComplete={onComplete} closeModal={handleCloseModal} />;
            case TestType.VerbalAnalogy:
                 return <VerbalAnalogyTest test={test} onComplete={onComplete} closeModal={handleCloseModal} />;
            case TestType.VisualMemory:
                return <VisualMemoryTest test={test} onComplete={onComplete} closeModal={handleCloseModal}/>;
            case TestType.Stroop:
                return <StroopTestComponent test={test} onComplete={onComplete} closeModal={handleCloseModal}/>
            case TestType.SentenceCompletion:
                return <SentenceCompletionTest test={test} onComplete={onComplete} closeModal={handleCloseModal}/>
            case TestType.Generalization:
                return <GeneralizationTest test={test} onComplete={onComplete} closeModal={handleCloseModal}/>
            case TestType.MathematicalEquation:
                return <MathematicalEquationTest test={test} onComplete={onComplete} closeModal={handleCloseModal}/>
            case TestType.NumberSequence:
                return <NumberSequenceTest test={test} onComplete={onComplete} closeModal={handleCloseModal}/>
            case TestType.OperatorPlacement:
                return <OperatorPlacementTest test={test} onComplete={onComplete} closeModal={handleCloseModal}/>
            case TestType.RavenMatrices:
                return <RavenMatricesTest test={test} onComplete={onComplete} closeModal={handleCloseModal}/>
            case TestType.WechslerIntelligence:
                return <WechslerTest test={test} onComplete={onComplete} closeModal={handleCloseModal}/>
            case TestType.LuscherColor:
                return <LuscherColorTest test={test} onComplete={onComplete} closeModal={handleCloseModal}/>
            case TestType.BeckDepression:
                return <BeckDepressionTest test={test} onComplete={onComplete} closeModal={handleCloseModal}/>
            case TestType.ClockDrawing:
            case TestType.BentonVisual:
                return <DrawingTest test={test} onComplete={onComplete} closeModal={handleCloseModal}/>
            default:
                return <p>Tento interaktivní test se připravuje.</p>;
        }
    };

    const handleStartTest = useCallback((testId: string) => {
        const test = ALL_TESTS_DATA.find(t => t.id === testId);
        if (test) {
            setModalContent({
                title: test.name,
                body: getTestComponent(test),
            });
        }
    }, [handleSaveResult, handleCloseModal]);
    
    const handleStartInterviewPrep = useCallback(() => {
        setModalContent({
            title: 'Generátor Otázek pro Pohovor ✨',
            body: <GeminiInterviewPrep />,
        });
    }, []);


    return (
        <>
            <Header />
            <main className="container mx-auto px-6 py-12">
                <Section id="home" className="text-center min-h-[60vh] flex flex-col justify-center items-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Připravte se na psychotesty k Policii ČR</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">Seznamte se se strukturou testů, snižte stres z neznámého a vyzkoušejte si interaktivní trénink nanečisto.</p>
                    <a href="#interactive-training" className="bg-[#0056b3] hover:bg-[#004494] text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors">Spustit trénink</a>
                </Section>

                <Section id="test-overview" className="py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">Přehled Testů</h2>
                        <p className="text-gray-600 mt-2">Seznamte se s typy testů, které vás mohou u přijímacího řízení potkat. Kliknutím na název zobrazíte podrobnosti.</p>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        <Accordion>
                            {ALL_TESTS_DATA.map(test => (
                                <AccordionItem key={test.id} title={test.name}>
                                    <div className="p-4 border-t border-gray-200 text-gray-600" dangerouslySetInnerHTML={{ __html: test.description }}></div>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </Section>

                <Section id="interactive-training" className="py-16 bg-white rounded-2xl shadow-lg">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">Interaktivní Trénink</h2>
                        <p className="text-gray-600 mt-2">Vyzkoušejte si zjednodušené verze testů a zjistěte, co vás čeká.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
                       {ALL_TESTS_DATA.filter(test => 
                            (test as any).questions || 
                            test.type === TestType.D2Attention || 
                            test.type === TestType.LuscherColor || 
                            test.type === TestType.ClockDrawing || 
                            test.type === TestType.BentonVisual
                        ).map(test => (
                           <TrainingButton
                               key={test.id}
                               test={test}
                               icon={ICON_MAP[test.type] || '❓'}
                               onStart={() => handleStartTest(test.id)}
                           />
                       ))}
                    </div>
                </Section>

                <Section id="interview-prep" className="py-16">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">Příprava na Rozhovor s Psychologem</h2>
                        <p className="text-gray-600 mt-2">Rozhovor je klíčovou součástí výběrového řízení. Buďte připraveni.</p>
                    </div>
                    <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-bold text-lg mb-2">Nejčastější otázky</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>Proč chcete pracovat u policie?</li>
                                <li>Jak zvládáte stresové situace?</li>
                                <li>Jaké jsou vaše silné a slabé stránky?</li>
                                <li>Co víte o práci policisty?</li>
                                <li>Měl jste někdy konflikt se zákonem?</li>
                                <li>Jak byste reagoval v hypotetické krizové situaci?</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-bold text-lg mb-2">Tipy a doporučení</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>Buďte upřímní a autentičtí.</li>
                                <li>Vaše odpovědi by měly být konzistentní.</li>
                                <li>Přemýšlejte o své motivaci předem.</li>
                                <li>Udržujte oční kontakt a dbejte na neverbální projev.</li>
                                <li>Nesnažte se psychologa "obelstít".</li>
                                <li>Ukažte zodpovědnost a zralost.</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 md:col-span-2 text-center">
                            <div className="text-4xl mb-4">✨</div>
                            <h3 className="text-xl font-bold mb-2">Generátor otázek pro pohovor</h3>
                            <p className="text-gray-600 mb-4">Získejte personalizované otázky pro pohovor s psychologem. Popište, na co byste se chtěli zaměřit.</p>
                            <button onClick={handleStartInterviewPrep} className="bg-[#0056b3] hover:bg-[#004494] text-white font-semibold py-2 px-6 rounded-lg transition-colors">Generovat otázky ✨</button>
                        </div>
                    </div>
                </Section>
                
                <Section id="results-history" className="py-16 bg-white rounded-2xl shadow-lg">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">Historie Výsledků</h2>
                        <p className="text-gray-600 mt-2">Zde najdete přehled vašich posledních výsledků z interaktivních tréninků.</p>
                    </div>
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {ALL_TESTS_DATA.map(test => (
                            <HistoryCard 
                                key={test.id} 
                                title={test.name} 
                                results={resultsHistory[test.type] || []} 
                            />
                        ))}
                    </div>
                </Section>

            </main>
            <Footer />

            <Modal isVisible={!!modalContent} onClose={handleCloseModal}>
                {modalContent && (
                    <>
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="text-xl font-bold">{modalContent.title}</h3>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            {modalContent.body}
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
};

export default App;