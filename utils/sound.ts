let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window !== 'undefined') {
    if (!audioContext) {
      try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.error("Web Audio API is not supported in this browser");
        return null;
      }
    }
    return audioContext;
  }
  return null;
};

const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  const context = getAudioContext();
  if (!context) return;

  // Resume context if it's suspended (autoplay policies)
  if (context.state === 'suspended') {
    context.resume();
  }

  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  
  gainNode.gain.setValueAtTime(0.5, context.currentTime); // Start at half volume
  gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);

  oscillator.start(context.currentTime);
  oscillator.stop(context.currentTime + duration);
};

export const playCorrectSound = () => {
  playTone(523.25, 0.1, 'sine'); // C5
  setTimeout(() => playTone(783.99, 0.15, 'sine'), 100); // G5
};

export const playIncorrectSound = () => {
  playTone(164.81, 0.25, 'sawtooth'); // E3
};

export const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.2;
        window.speechSynthesis.cancel(); // Cancel any previous speech
        window.speechSynthesis.speak(utterance);
    } else {
        console.error("Speech Synthesis not supported in this browser.");
    }
};