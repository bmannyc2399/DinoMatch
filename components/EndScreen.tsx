import React from 'react';
import { TrophyIcon } from './Icons';

interface EndScreenProps {
  score: number;
  onPlayAgain: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, onPlayAgain }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center flex flex-col items-center space-y-6 pop-in">
      <h1 className="text-6xl font-black text-sky-600">Great Job!</h1>
      <div className="text-center">
        <p className="text-3xl text-slate-500 font-bold mb-2">Your Score</p>
        <div className="flex items-center justify-center gap-4">
            <TrophyIcon className="w-24 h-24 text-yellow-400" />
            <p className="text-8xl font-black text-yellow-500">{score}</p>
        </div>
      </div>
      <button
        onClick={onPlayAgain}
        className="w-full max-w-sm bg-green-500 text-white font-black py-5 px-6 rounded-2xl text-2xl hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 border-b-4 border-green-700 active:border-b-0"
      >
        Play Again!
      </button>
    </div>
  );
};

export default EndScreen;