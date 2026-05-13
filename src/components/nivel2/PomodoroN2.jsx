import { useState, useEffect, useRef } from 'react';

// Definición de constantes fuera del componente para tiempos de trabajo y descanso
const WORK_TIME = 10;
const BREAK_TIME = 3;

function PomodoroN2() {

    // Declaración de los estados timeLeft e isRunning
    const [timeLeft, setTimeLeft] = useState(WORK_TIME);
    const [isRunning, setIsRunning] = useState(false);
    
    // Declaración de intervalRef con useRef
    const intervalRef = useRef(null);

    // Declaración de un estado 'mode' inicializado en "work" y un estado 'sessions' inicializado como array vacio [].
    const [mode, setMode] = useState("work");
    const [sessions, setSessions] = useState([]);

    // Implementación de useEffect copiado del timer del Nivel 1
    useEffect(() => {
            if (isRunning && timeLeft > 0) {
                intervalRef.current = setInterval(() => {
                    setTimeLeft(prev => prev - 1);
                }, 1000);
            } 

            return () => clearInterval(intervalRef.current);
        }, [isRunning, timeLeft]);

    // Implementación de un segundo 'useEffect' que se ejecute cuando 'timeLeft' cambie. Cuando 'timeLeft === 0':
    // - Si el modo actual es "work", agrega una nueva sesion al array 'sessions'
    // - Cambia el modo al opuesto
    // - Resetea 'timeLeft' al tiempo del nuevo modo
    // - Arranca el timer automaticamente poniendo 'isRunning' en 'true'
    useEffect(() => {
        if (timeLeft === 0) {
            if (mode === "work") {
                setSessions(prev => [...prev, {
                    id: Date.now(),
                    type: "work",
                    duration: WORK_TIME,
                    completedAt: new Date()
                }]);
                setMode("break");
                setTimeLeft(BREAK_TIME);
            } else {
                setMode("work");
                setTimeLeft(WORK_TIME);
            }
            setIsRunning(true);
        }
    }, [timeLeft, mode]);

    // Función formatTime(seconds) copiada del Nivel 1
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // Función toggleTimer copiada del Nivel 1
    const toggleTimer = () => {
        setIsRunning(prev => !prev);
    };

    // Modificación de función 'resetTimer' para que tambien resetee 'mode' a "work" y 'sessions' a [].
    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(WORK_TIME);
        setMode("work");
        setSessions([]);
        clearInterval(intervalRef.current);
    };

    return (
        <div>
            <h1>Pomodoro Timer: Nivel 2</h1>
            <h2>Timer</h2>
            <p>Modo: {mode === "work" ? "Trabajo" : "Descanso"}</p>
            <p>{formatTime(timeLeft)}</p>
            <button onClick={toggleTimer}>
                {isRunning ? "Pausar" : "Iniciar"}
            </button>
            <button onClick={resetTimer}>Reiniciar</button>
            <h3>Sesiones</h3>
            <ul>
                {sessions.map((session, index) => (
                    <li key={session.id}>
                        Sesión {index + 1}: {formatTime(session.duration)} - Hora de finalización: {session.completedAt.toLocaleTimeString()}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PomodoroN2;