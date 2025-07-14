
import { useState, useEffect, useRef, useCallback } from 'react';

export const useTestTimer = (durationSeconds: number, onEnd: () => void) => {
    const [timeLeft, setTimeLeft] = useState(durationSeconds);
    const [isActive, setIsActive] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const stopTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setIsActive(false);
    }, []);
    
    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            stopTimer();
            onEnd();
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isActive, timeLeft, onEnd, stopTimer]);

    const startTimer = () => {
        setTimeLeft(durationSeconds);
        setIsActive(true);
    };

    return { timeLeft, startTimer, stopTimer, isActive };
};
