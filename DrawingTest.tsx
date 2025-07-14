
import React, { useState, useRef, useEffect } from 'react';
import { ClockDrawingTest, BentonVisualTest } from '../../types';
import { TestButton } from '../common/TestButton';

interface DrawingTestProps {
    test: ClockDrawingTest | BentonVisualTest;
    onComplete: (result: object) => void;
    closeModal: () => void;
}

const PatternDisplay: React.FC<{ shapes: BentonVisualTest['questions'][0]['shapes'] }> = ({ shapes }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0056b3';
        ctx.strokeStyle = '#0056b3';
        ctx.lineWidth = 2;

        shapes.forEach(shape => {
            if (shape.type === 'circle') {
                ctx.beginPath();
                ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (shape.type === 'square') {
                ctx.fillRect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
            } else if (shape.type === 'line' && shape.x1 && shape.y1 && shape.x2 && shape.y2) {
                ctx.beginPath();
                ctx.moveTo(shape.x1, shape.y1);
                ctx.lineTo(shape.x2, shape.y2);
                ctx.stroke();
            }
        });

    }, [shapes]);

    return <canvas ref={canvasRef} width="300" height="300" className="rounded-lg shadow-md mb-6 border border-gray-300"></canvas>;
}

export const DrawingTest: React.FC<DrawingTestProps> = ({ test, onComplete, closeModal }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [showDrawingArea, setShowDrawingArea] = useState(test.type !== 'benton_visual');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        if (test.type === 'benton_visual') {
            const timer = setTimeout(() => {
                setShowDrawingArea(true);
            }, test.memorizeTimeSeconds * 1000);
            return () => clearTimeout(timer);
        }
    }, [currentQuestionIndex, test]);

    const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = nativeEvent;
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const stopDrawing = () => setIsDrawing(false);

    const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    };
    
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleFinish = () => {
        if (test.type === 'benton_visual' && currentQuestionIndex < test.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setShowDrawingArea(false);
            clearCanvas();
        } else {
            onComplete({ completed: true });
            closeModal();
        }
    };
    
    return (
        <div className="text-center">
            {test.type === 'benton_visual' && !showDrawingArea ? (
                 <>
                    <p className="mb-4">Zapamatujte si vzor. Za {test.memorizeTimeSeconds}s budete moci kreslit.</p>
                    <PatternDisplay shapes={test.questions[currentQuestionIndex].shapes} />
                 </>
            ) : (
                <>
                    <p className="mb-4">{test.type === 'clock_drawing' ? test.instructions : "Nakreslete vzor, který jste si zapamatovali."}</p>
                    <canvas 
                        ref={canvasRef} 
                        width="300" 
                        height="300" 
                        className="rounded-lg shadow-md bg-white border border-gray-300 cursor-crosshair mx-auto"
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        onMouseMove={draw}
                    />
                    <div className="mt-4 flex justify-center gap-4">
                        <TestButton variant="secondary" onClick={clearCanvas}>Vymazat</TestButton>
                        <TestButton onClick={handleFinish}>
                            {test.type === 'benton_visual' && currentQuestionIndex < test.questions.length - 1 ? 'Další vzor' : 'Dokončit'}
                        </TestButton>
                    </div>
                </>
            )}
        </div>
    );
};
