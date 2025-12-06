import { DinosaurFact } from '../types';
import { DINO_API_DATA } from '../dino-api-data';

const getDinoData = (name: string) => {
    if (!name) return undefined;
    return DINO_API_DATA.find(d => d.name.toLowerCase().trim() === name.toLowerCase().trim());
}

const formatDinoFact = (dinoData: any): DinosaurFact | null => {
    if (!dinoData) return null;
    
    const sizeParts = [dinoData.length, dinoData.height, dinoData.weight].filter(p => p && p !== 'N/A');
    const size = sizeParts.length > 0 ? sizeParts.join(' / ') : 'Size not available.';

    const era = dinoData.period && dinoData.existed ? `${capitalize(dinoData.period)} (${dinoData.existed})` : 'Era not available.';
    
    const funFact = dinoData.description?.split('.')[0] + '.' || 'No fun fact available.';

    return {
        diet: capitalize(dinoData.diet) || 'N/A',
        size: size,
        era: era,
        location: capitalize(dinoData.region) || 'N/A',
        funFact: funFact,
    };
}

const capitalize = (s: string) => {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export const getDinosaurFact = async (dinosaurName: string): Promise<DinosaurFact | null> => {
    const dinoData = getDinoData(dinosaurName);
    const fact = formatDinoFact(dinoData);
    return Promise.resolve(fact);
};
