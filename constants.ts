import { Dinosaur, Difficulty } from './types';
import { DINO_API_DATA } from './dino-api-data';

const capitalize = (s: string) => {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export const DINOSAURS: Dinosaur[] = DINO_API_DATA.map((dino, index) => {
    // FIX: The Difficulty type was not imported, causing a build error.
    let difficulty: Difficulty;
    if (index < 7) {
        difficulty = 'easy';
    } else if (index < 14) {
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