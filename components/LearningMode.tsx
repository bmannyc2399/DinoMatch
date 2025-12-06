import React, { useState, useCallback } from 'react';
import { DINOSAURS } from '../constants';
import { Dinosaur, DinosaurFact } from '../types';
import { getDinosaurFact } from '../services/geminiService';
import { GlobeIcon, LeafIcon, RulerIcon, SpeakerIcon, TimerIcon } from './Icons';
import { speakText } from '../utils/sound';

interface LearningModeProps {
  onBack: () => void;
}

const DinosaurCard: React.FC<{ dinosaur: Dinosaur; onSelect: (dino: Dinosaur) => void }> = ({ dinosaur, onSelect }) => {
  return (
      <div 
        className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 group border-b-4 border-green-300"
        onClick={() => onSelect(dinosaur)}
      >
        <div className="w-full h-40 bg-slate-100">
            <img src={dinosaur.image} alt={dinosaur.name} className="w-full h-40 object-cover" />
        </div>
        <div className="p-4 bg-green-50">
          <h3 className="text-xl font-extrabold text-slate-800 group-hover:text-green-600 transition-colors text-center">{dinosaur.name}</h3>
        </div>
      </div>
  )
};

const LearningMode: React.FC<LearningModeProps> = ({ onBack }) => {
  const [selectedDino, setSelectedDino] = useState<Dinosaur | null>(null);
  const [fact, setFact] = useState<DinosaurFact | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectDino = useCallback(async (dino: Dinosaur) => {
    setSelectedDino(dino);
    setIsLoading(true);
    setFact(null);

    const fetchedFact = await getDinosaurFact(dino.name);

    setFact(fetchedFact);
    setIsLoading(false);
  }, []);
  
  const handleCloseModal = () => {
    setSelectedDino(null);
    setFact(null);
    window.speechSynthesis.cancel(); // Stop speech on close
  }

  const handleSpeak = (textToSpeak: string) => {
    if (fact) {
        speakText(textToSpeak);
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl md:text-5xl font-black text-purple-600">Dino Book</h1>
        <button
          onClick={onBack}
          className="bg-sky-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-sky-600 transition-transform transform hover:scale-105 shadow-lg border-b-4 border-sky-700 active:border-b-0"
        >
          Back
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {DINOSAURS.map(dino => (
          <DinosaurCard key={dino.name} dinosaur={dino} onSelect={handleSelectDino} />
        ))}
      </div>

      {selectedDino && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={handleCloseModal}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 relative pop-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={handleCloseModal} className="absolute top-2 right-4 text-slate-400 hover:text-slate-800 text-4xl font-bold">&times;</button>
            <h2 className="text-5xl font-black text-purple-600 mb-4">{selectedDino.name}</h2>
            
            <div className="w-full aspect-video bg-slate-100 rounded-lg mb-4 shadow-md">
                <img src={selectedDino.image} alt={selectedDino.name} className="w-full h-full object-cover rounded-lg"/>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg min-h-[150px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-pulse text-slate-500 font-bold text-lg">Finding dino details...</div>
                </div>
              ) : fact ? (
                 <div className="text-left animate-fade-in-up">
                    <ul className="space-y-2 text-md text-slate-700">
                      <li className="flex items-center text-lg"><LeafIcon className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" /><div className="font-bold"><strong>Eats:</strong> {fact.diet}</div></li>
                      <li className="flex items-center text-lg"><RulerIcon className="w-6 h-6 mr-3 text-blue-500 flex-shrink-0" /><div className="font-bold"><strong>Size:</strong> {fact.size}</div></li>
                      <li className="flex items-center text-lg"><TimerIcon className="w-6 h-6 mr-3 text-purple-500 flex-shrink-0" /><div className="font-bold"><strong>Lived:</strong> {fact.era}</div></li>
                      <li className="flex items-center text-lg"><GlobeIcon className="w-6 h-6 mr-3 text-orange-500 flex-shrink-0" /><div className="font-bold"><strong>Found in:</strong> {fact.location}</div></li>
                    </ul>
                    <div className="mt-3 bg-yellow-50 p-2 rounded-lg border-l-4 border-yellow-400 flex items-center justify-between">
                      <div>
                        <p className="font-extrabold text-yellow-800">Fun Fact:</p>
                        <p className="text-yellow-900 font-semibold">{fact.funFact}</p>
                      </div>
                      <button onClick={() => handleSpeak(fact.funFact)} className="ml-2 bg-yellow-400 text-white p-3 rounded-full hover:bg-yellow-500 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-300">
                          <SpeakerIcon className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-slate-700 text-lg font-bold">Could not load fact.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningMode;