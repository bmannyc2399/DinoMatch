export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameMode = 'classic' | 'timed' | 'learning';

export interface Dinosaur {
  name: string;
  image: string; // Used to display the dinosaur image directly
  difficulty: Difficulty;
}

export interface DinosaurFact {
  diet: string;
  size: string;
  era: string;
  location: string;
  funFact: string;
}
