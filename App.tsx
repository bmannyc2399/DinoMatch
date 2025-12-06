import React, { useState, useCallback } from 'react';
import { Difficulty, GameMode } from './types';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import TimedQuizScreen from './components/TimedQuizScreen';
import LearningMode from './components/LearningMode';
import EndScreen from './components/EndScreen';

type GameState = 'start' | 'quiz' | 'timed' | 'learning' | 'end';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [finalScore, setFinalScore] = useState(0);

  const handleGameStart = useCallback((mode: GameMode, diff: Difficulty) => {
    setDifficulty(diff);
    if (mode === 'classic') {
      setGameState('quiz');
    } else if (mode === 'timed') {
      setGameState('timed');
    } else {
      setGameState('learning');
    }
  }, []);

  const handleGameEnd = useCallback((score: number) => {
    setFinalScore(score);
    setGameState('end');
  }, []);

  const handlePlayAgain = useCallback(() => {
    setGameState('start');
  }, []);

  const renderGameState = () => {
    switch (gameState) {
      case 'start':
        return <StartScreen onGameStart={handleGameStart} />;
      case 'quiz':
        return <QuizScreen difficulty={difficulty} onGameEnd={handleGameEnd} />;
      case 'timed':
        return <TimedQuizScreen difficulty={difficulty} onGameEnd={handleGameEnd} />;
      case 'learning':
        return <LearningMode onBack={handlePlayAgain} />;
      case 'end':
        return <EndScreen score={finalScore} onPlayAgain={handlePlayAgain} />;
      default:
        return <StartScreen onGameStart={handleGameStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-green-100 to-sky-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {renderGameState()}
      </div>
    </div>
  );
};

export default App;