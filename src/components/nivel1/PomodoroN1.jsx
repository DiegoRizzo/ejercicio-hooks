import { useState, useEffect, useRef } from 'react';

function PomodoroN1() {

    // Declaración de los estados timeLeft e isRunning
    const [timeLeft, setTimeLeft] = useState(1500);
    const [isRunning, setIsRunning] = useState(false);

    // Declaración de intervalRef con useRef
    const intervalRef = useRef(null);

    // Implementación de useEffect para el timer
    // - Crear el intervalo si isRunning && timeLeft > 0
    // - Detener si timeLeft === 0
    // - Retornar la funcion de limpieza
        useEffect(() => {
            if (isRunning && timeLeft > 0) {
                intervalRef.current = setInterval(() => {
                    setTimeLeft(prev => prev - 1);
                }, 1000);
            } 

            if (timeLeft === 0) {
                setIsRunning(false);
                clearInterval(intervalRef.current);
            }

            return () => clearInterval(intervalRef.current);
        }, [isRunning, timeLeft]);

    // Funcion formatTime(seconds) => "MM:SS"
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // Funciones toggleTimer y resetTimer
    const toggleTimer = () => {
        setIsRunning(prev => !prev);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(1500);
        clearInterval(intervalRef.current);
    };

    return (
        <div>
            <h2>Pomodoro Timer</h2>
            <p>{formatTime(timeLeft)}</p>
            <button onClick={toggleTimer}>
                {isRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    );
}

export default PomodoroN1;