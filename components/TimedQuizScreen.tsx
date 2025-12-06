import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Difficulty, Dinosaur } from '../types';
import { DINOSAURS } from '../constants';
import { CheckIcon, TimerIcon } from './Icons';
import { playCorrectSound, playIncorrectSound } from '../utils/sound';

interface TimedQuizScreenProps {
  difficulty: Difficulty;
  onGameEnd: (score: number) => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const TOTAL_TIME = 60;

const TimedQuizScreen: React.FC<TimedQuizScreenProps> = ({ difficulty, onGameEnd }) => {
  const allQuestions = useMemo(() => {
    const difficulties: Difficulty[] =
      difficulty === 'easy' ? ['easy'] :
      difficulty === 'medium' ? ['easy', 'medium'] :
      ['easy', 'medium', 'hard'];
    
    const filteredDinos = DINOSAURS.filter(dino => difficulties.includes(dino.difficulty));
    return shuffleArray(filteredDinos);
  }, [difficulty]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect'; answer: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  
  const stableOnGameEnd = useCallback(onGameEnd, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      stableOnGameEnd(score);
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, stableOnGameEnd]);


  const currentQuestion = allQuestions[currentQuestionIndex];

  useEffect(() => {
    if (!currentQuestion) return;

    const correctAnswer = currentQuestion.name;
    const wrongAnswers = shuffleArray(
      DINOSAURS.filter((d) => d.name !== correctAnswer)
    )
      .slice(0, 3)
      .map((d) => d.name);

    setShuffledAnswers(shuffleArray([correctAnswer, ...wrongAnswers]));
    setFeedback(null);
  }, [currentQuestionIndex, allQuestions, currentQuestion]);

  const handleAnswer = (answer: string) => {
    if (feedback) return;

    const isCorrect = answer === currentQuestion.name;

    if (isCorrect) {
      playCorrectSound();
      setScore(score + 10);
      setFeedback({ type: 'correct', answer });
      setTimeout(() => {
        if (timeLeft > 0) {
          setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % allQuestions.length);
        }
      }, 500);
    } else {
      playIncorrectSound();
      setFeedback({ type: 'incorrect', answer });
      if (timeLeft > 2) {
          setTimeLeft(timeLeft - 2); // Time penalty
      }
      setTimeout(() => {
        if (timeLeft > 0) {
          setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % allQuestions.length);
        }
      }, 500);
    }
  };
  
  if (!currentQuestion) {
    return <div className="text-center p-8 bg-white/70 rounded-2xl shadow-2xl">Loading...</div>;
  }

  const timePercentage = (timeLeft / TOTAL_TIME) * 100;
  const timerColor = timeLeft > 20 ? 'bg-green-500' : timeLeft > 10 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 w-full">
       <div className="flex justify-between items-center mb-2">
        <div className="flex items-center text-3xl font-extrabold bg-orange-100 text-orange-600 px-4 py-2 rounded-full">
          <TimerIcon className="w-8 h-8 mr-2" />
          <span>{timeLeft}s</span>
        </div>
        <div className="text-3xl font-extrabold text-sky-700 bg-sky-100 px-4 py-2 rounded-full">Score: {score}</div>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-5 mb-4 border-2 border-white shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-linear ${timerColor}`}
          style={{ width: `${timePercentage}%` }}
        ></div>
      </div>
      
      <div className="relative mb-6 aspect-video bg-slate-100 rounded-xl">
         <img
            src={currentQuestion.image}
            alt={currentQuestion.name}
            className="w-full h-full object-cover rounded-xl shadow-lg border-8 border-white"
        />
        {feedback?.type === 'correct' && (
           <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center rounded-xl pop-in">
             <CheckIcon className="w-24 h-24 text-white" />
           </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shuffledAnswers.map((answer) => {
          const isSelected = feedback?.answer === answer;
          
          let buttonClass = 'bg-white hover:bg-slate-100 text-slate-800 border-b-4 border-slate-300 active:border-b-0';
          if (isSelected) {
            buttonClass = feedback.type === 'correct' ? 'bg-green-500 text-white border-b-4 border-green-700' : 'bg-red-500 text-white shake border-b-4 border-red-700';
          }

          return (
            <button
              key={answer}
              onClick={() => handleAnswer(answer)}
              disabled={!!feedback}
              className={`p-5 rounded-xl text-2xl font-extrabold transition-all duration-300 shadow-md transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-300 disabled:opacity-70 disabled:transform-none ${buttonClass}`}
            >
              {answer}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimedQuizScreen;