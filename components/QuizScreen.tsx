import React, { useState, useEffect, useMemo } from 'react';
import { Difficulty, Dinosaur, DinosaurFact } from '../types';
import { DINOSAURS } from '../constants';
import { CheckIcon, CrossIcon, StarIcon, LeafIcon, RulerIcon, TimerIcon, GlobeIcon, SpeakerIcon } from './Icons';
import { getDinosaurFact } from '../services/geminiService';
import { playCorrectSound, playIncorrectSound, speakText } from '../utils/sound';
import ImageWithLoader from './ImageWithLoader';

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const FactDisplay: React.FC<{
  dinoName: string;
  fact: DinosaurFact | null;
  isLoading: boolean;
  onNext: () => void;
  isCorrect: boolean;
}> = ({ dinoName, fact, isLoading, onNext, isCorrect }) => {
  const handleSpeak = (textToSpeak: string) => {
      if (fact) {
        speakText(textToSpeak);
      }
  }

  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-xl z-10 p-4 pop-in">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg text-center relative overflow-hidden">
        {isCorrect ? (
          <>
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping"></div>
              <CheckIcon className="relative w-32 h-32 text-green-500 mx-auto" />
            </div>
            <h2 className="text-4xl font-black text-green-600 mt-2">Awesome!</h2>
          </>
        ) : (
          <>
            <CrossIcon className="w-24 h-24 text-red-500 mx-auto" />
            <h2 className="text-3xl font-bold text-red-600 mt-2">Whoops!</h2>
            <p className="text-slate-500 text-lg mb-2">The right answer was:</p>
          </>
        )}
        <h3 className="text-5xl font-black text-sky-600 my-3 tracking-tight">{dinoName}</h3>

        {isLoading ? (
          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-slate-400 animate-pulse text-xl font-bold">Finding dino facts...</p>
          </div>
        ) : fact ? (
          <div className="text-left my-4 animate-fade-in-up">
            <ul className="space-y-3 text-lg text-slate-700">
              <li className="flex items-center"><LeafIcon className="w-8 h-8 mr-3 text-green-500 flex-shrink-0" /><div><strong className="font-extrabold">Eats:</strong> {fact.diet}</div></li>
              <li className="flex items-center"><RulerIcon className="w-8 h-8 mr-3 text-blue-500 flex-shrink-0" /><div><strong className="font-extrabold">Size:</strong> {fact.size}</div></li>
              <li className="flex items-center"><TimerIcon className="w-8 h-8 mr-3 text-purple-500 flex-shrink-0" /><div><strong className="font-extrabold">Lived:</strong> {fact.era}</div></li>
              <li className="flex items-center"><GlobeIcon className="w-8 h-8 mr-3 text-orange-500 flex-shrink-0" /><div><strong className="font-extrabold">Found in:</strong> {fact.location}</div></li>
            </ul>
            <div className="mt-4 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400 flex items-center justify-between">
              <div className="pr-2">
                <p className="font-extrabold text-yellow-800">Fun Fact:</p>
                <p className="text-yellow-900">{fact.funFact}</p>
              </div>
              <button onClick={() => handleSpeak(fact.funFact)} className="bg-yellow-400 text-white p-3 rounded-full hover:bg-yellow-500 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-300 flex-shrink-0">
                  <SpeakerIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        ) : (
          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-slate-500 font-bold text-lg">Could not find facts for this dino!</p>
          </div>
        )}
        <button
          onClick={onNext}
          className="mt-6 w-full bg-sky-500 text-white font-black py-4 px-6 rounded-xl text-xl hover:bg-sky-600 transition-transform transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-sky-300 border-b-4 border-sky-700 active:border-b-0"
        >
          Next Dino!
        </button>
      </div>
    </div>
  );
};

const QuizScreen: React.FC<{ difficulty: Difficulty; onGameEnd: (score: number) => void; }> = ({ difficulty, onGameEnd }) => {
  const questions = useMemo(() => {
    const difficulties: Difficulty[] =
      difficulty === 'easy' ? ['easy'] :
      difficulty === 'medium' ? ['easy', 'medium'] :
      ['easy', 'medium', 'hard'];
    
    const filteredDinos = DINOSAURS.filter(dino => difficulties.includes(dino.difficulty));
    return shuffleArray(filteredDinos).slice(0, 10);
  }, [difficulty]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect'; answer: string } | null>(null);
  const [fact, setFact] = useState<DinosaurFact | null>(null);
  const [isFactLoading, setIsFactLoading] = useState(false);
  const [showFactModal, setShowFactModal] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (!currentQuestion) {
        if(questions.length > 0 && currentQuestionIndex >= questions.length) {
            onGameEnd(score);
        }
        return;
    };

    const correctAnswer = currentQuestion.name;
    const wrongAnswers = shuffleArray(
      DINOSAURS.filter((d) => d.name !== correctAnswer)
    ).slice(0, 3).map((d) => d.name);

    setShuffledAnswers(shuffleArray([correctAnswer, ...wrongAnswers]));
    setAttempts(0);
    setFeedback(null);
    setFact(null);
    setShowFactModal(false);
  }, [currentQuestionIndex, questions, score, currentQuestion]);

  const handleAnswer = (answer: string) => {
    if (feedback) return;

    const isCorrect = answer === currentQuestion.name;
    setFeedback({ type: isCorrect ? 'correct' : 'incorrect', answer });

    if (isCorrect) {
      playCorrectSound();
      if (attempts === 0) { // CORRECT on 1st try
        let points = 10;
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > 0 && newStreak % 5 === 0) points += 3; // Streak bonus
        const newScore = score + points;
        setScore(newScore);

        setTimeout(() => {
          if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          } else {
            onGameEnd(newScore);
          }
        }, 800);
      } else { // CORRECT on 2nd try
        setScore(score + 5);
        setStreak(0);

        setIsFactLoading(true);
        setShowFactModal(true);
        getDinosaurFact(currentQuestion.name).then(fetchedFact => {
          setFact(fetchedFact);
          setIsFactLoading(false);
        });
      }
    } else { // INCORRECT
      playIncorrectSound();
      setStreak(0);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 2) { // INCORRECT on 2nd try (final fail)
        setIsFactLoading(true);
        setShowFactModal(true);
        getDinosaurFact(currentQuestion.name).then(fetchedFact => {
          setFact(fetchedFact);
          setIsFactLoading(false);
        });
      } else { // INCORRECT on 1st try
        setTimeout(() => setFeedback(null), 1000);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onGameEnd(score);
    }
  };

  if (!currentQuestion) {
    return <div className="text-center p-8 bg-white/70 rounded-2xl shadow-2xl">Calculating score...</div>;
  }
  
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
            <div className="text-xl font-extrabold text-slate-600 bg-slate-200 px-4 py-2 rounded-full">
              {currentQuestionIndex + 1} / {questions.length}
            </div>
            <button
                onClick={() => onGameEnd(score)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-md transition-all shadow focus:outline-none focus:ring-2 focus:ring-red-400 border-b-2 border-red-700 active:border-b-0"
            >
                Stop
            </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-xl font-bold text-yellow-500 bg-yellow-100 px-3 py-1 rounded-full">
            <StarIcon className="w-6 h-6 mr-1" />
            <span className="font-extrabold text-2xl">{streak}</span>
          </div>
          <div className="text-2xl font-extrabold text-sky-700 bg-sky-100 px-4 py-2 rounded-full">Score: {score}</div>
        </div>
      </div>
      
      <div className="relative mb-6 aspect-video bg-slate-100 rounded-xl overflow-hidden">
        <ImageWithLoader
            src={currentQuestion.image}
            alt={currentQuestion.name}
            className="w-full h-full rounded-xl shadow-lg border-8 border-white"
        />
        {showFactModal && (
          <FactDisplay 
            dinoName={currentQuestion.name}
            fact={fact}
            isLoading={isFactLoading}
            onNext={handleNextQuestion}
            isCorrect={feedback?.type === 'correct'}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shuffledAnswers.map((answer) => {
          const isSelected = feedback?.answer === answer;
          const isCorrect = answer === currentQuestion.name;
          
          let buttonClass = 'bg-white hover:bg-slate-100 text-slate-800 border-b-4 border-slate-300 active:border-b-0';
          if (feedback && isSelected) {
            buttonClass = feedback.type === 'correct' ? 'bg-green-500 text-white border-b-4 border-green-700 active:border-b-0' : 'bg-red-500 text-white shake border-b-4 border-red-700 active:border-b-0';
          } else if (feedback && isCorrect && showFactModal) {
              buttonClass = 'bg-green-500 text-white border-b-4 border-green-700 active:border-b-0';
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

export default QuizScreen;