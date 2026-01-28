import { GoogleGenAI } from '@google/genai';
import { DinosaurFact } from '../types';
import { DINO_API_DATA } from '../dino-api-data';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getDinoData = (name: string) => {
    if (!name) return undefined;
    return DINO_API_DATA.find(d => d.name.toLowerCase().trim() === name.toLowerCase().trim());
}

const capitalize = (s: string) => {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

// Keep the local formatter for structured data
const formatBaseFact = (dinoData: any): Omit<DinosaurFact, 'funFact'> | null => {
    if (!dinoData) return null;
    
    const sizeParts = [dinoData.length, dinoData.height, dinoData.weight].filter(p => p && p !== 'N/A');
    const size = sizeParts.length > 0 ? sizeParts.join(' / ') : 'Size not available.';

    const era = dinoData.period && dinoData.existed ? `${capitalize(dinoData.period)} (${dinoData.existed})` : 'Era not available.';
    
    return {
        diet: capitalize(dinoData.diet) || 'N/A',
        size: size,
        era: era,
        location: capitalize(dinoData.region) || 'N/A',
    };
}

export const getDinosaurFact = async (dinosaurName: string): Promise<DinosaurFact | null> => {
    const dinoData = getDinoData(dinosaurName);
    if (!dinoData) {
        console.error(`No data found for ${dinosaurName}`);
        return null;
    }

    const baseFact = formatBaseFact(dinoData);
    if (!baseFact) {
        return null;
    }

    try {
        const prompt = `Based on the following description for the dinosaur '${dinoData.name}', create one short, exciting fun fact suitable for a child under 10 years old. Make it sound very exciting. Just return the single fun fact text, nothing else. Description: ${dinoData.description}`;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });

        const funFact = response.text || 'This dinosaur is super interesting!';

        return {
            ...baseFact,
            funFact: funFact.trim(),
        };

    } catch (error) {
        console.error("Error fetching dinosaur fact from Gemini:", error);
        // Fallback to the old method if API fails, ensuring reliability
        const fallbackFunFact = dinoData.description?.split('.')[0] + '.' || 'A very mysterious dinosaur!';
        return {
            ...baseFact,
            funFact: fallbackFunFact,
        };
    }
};