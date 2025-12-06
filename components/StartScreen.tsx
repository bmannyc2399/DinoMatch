import React, { useState } from 'react';
import { Difficulty, GameMode } from '../types';
import { MascotDinoIcon, StarIcon } from './Icons';

interface StartScreenProps {
  onGameStart: (mode: GameMode, difficulty: Difficulty) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onGameStart }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center flex flex-col items-center space-y-6 pop-in">
      <MascotDinoIcon className="w-32 h-32 text-green-400" />
      <h1 className="text-6xl md:text-7xl font-black text-green-600 tracking-tighter">
        DinoMatch
      </h1>
      <p className="text-xl text-slate-500 font-bold">A Roar-some Dino Quiz!</p>

      <div className="w-full max-w-sm pt-4">
        <h2 className="text-3xl font-extrabold text-sky-600 mb-4">How Hard?</h2>
        <div className="flex justify-center gap-4">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((d, i) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-300 flex items-center justify-center gap-1 ${
                difficulty === d
                  ? 'bg-yellow-400 text-white shadow-lg'
                  : 'bg-slate-200 text-yellow-400 hover:bg-slate-300'
              }`}
            >
              {[...Array(i + 1)].map((_, starIndex) => <StarIcon key={starIndex} className="w-8 h-8"/>)}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-xs flex flex-col space-y-4 pt-4">
        <button
          onClick={() => onGameStart('classic', difficulty)}
          className="w-full bg-sky-500 text-white font-black py-5 px-6 rounded-2xl text-2xl hover:bg-sky-600 transition-transform transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-sky-300 border-b-4 border-sky-700 active:border-b-0"
        >
          Play Game
        </button>
        <button
          onClick={() => onGameStart('timed', difficulty)}
          className="w-full bg-orange-500 text-white font-black py-5 px-6 rounded-2xl text-2xl hover:bg-orange-600 transition-transform transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300 border-b-4 border-orange-700 active:border-b-0"
        >
          Speedy Game
        </button>
        <button
          onClick={() => onGameStart('learning', difficulty)}
          className="w-full bg-purple-500 text-white font-black py-5 px-6 rounded-2xl text-2xl hover:bg-purple-600 transition-transform transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 border-b-4 border-purple-700 active:border-b-0"
        >
          Dino Book
        </button>
      </div>
    </div>
  );
};

export default StartScreen;