import { Dinosaur, Difficulty } from './types';
import { DINO_API_DATA } from './dino-api-data';

const capitalize = (s: string) => {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export const DINOSAURS: Dinosaur[] = DINO_API_DATA.map((dino, index) => {
    const total = DINO_API_DATA.length;
    let difficulty: Difficulty;
    
    // Distribute difficulty levels evenly across the dataset
    if (index < total / 3) {
        difficulty = 'easy';
    } else if (index < (total * 2) / 3) {
        difficulty = 'medium';
    } else {
        difficulty = 'hard';
    }

    return {
        name: capitalize(dino.name.trim()),
        image: dino.image,
        difficulty,
    };
});