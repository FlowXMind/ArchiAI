import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { ArchitectureData } from '../types';

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("REACT_APP_GEMINI_API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3,
    }
});

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

export const generateArchitecturePlan = async (projectDescription: string): Promise<ArchitectureData> => {
    const prompt = `
    Based on the following project description, generate a comprehensive software architecture plan and a detailed Product Requirements Document (PRD).

    Project Description: "${projectDescription}"

    Provide a professional and detailed analysis covering architecture (frontend, backend, database, deployment), scalability, security best practices, a monthly cost estimation, a project roadmap, and the full PRD. 
    
    Ensure the output is a single, valid JSON object that conforms to the following TypeScript interface:
    
    interface ArchitectureData {
        projectName: string;
        projectSummary: string;
        architecture: {
            overview: string;
            frontend: { techStack: string[]; description: string; };
            backend: { techStack: string[]; description: string; };
            database: { techStack: string[]; description: string; };
            deployment: { techStack: string[]; description: string; };
        };
        scalability: { title: string; points: string[]; };
        security: { title: string; points: string[]; };
        costEstimation: {
            title: string;
            breakdown: Array<{ category: string; cost: number; details: string; }>;
        };
        roadmap: Array<{ phase: string; duration: string; tasks: string[]; }>;
        prd: {
            introduction: string;
            userPersonas: Array<{ name: string; description: string; }>;
            features: Array<{ title: string; description: string; userStories: string[]; }>;
            nonFunctionalRequirements: Array<{ type: string; details: string; }>;
        };
    }

    Do not include any markdown formatting (e.g., \`\`\`json) in the response. The entire output must be only the JSON object.
    `;

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            safetySettings,
        });

        const response = result.response;
        const jsonText = response.text();
        
        // Basic validation to ensure the response is likely JSON
        if (!jsonText.trim().startsWith('{') || !jsonText.trim().endsWith('}')) {
            console.error("Invalid JSON response from AI:", jsonText);
            throw new Error("The AI returned a response that is not valid JSON. Please try again.");
        }

        const parsedData: ArchitectureData = JSON.parse(jsonText);

        return parsedData;

    } catch (error) {
        console.error("Error generating architecture plan:", error);
        if (error instanceof SyntaxError) {
             throw new Error("Failed to parse the AI's response. The data format might be invalid. Please try again.");
        }
        if (error instanceof Error && error.message.includes('SAFETY')) {
            throw new Error("The request was blocked due to safety concerns. Please modify your project description and try again.");
        }
        throw new Error("An error occurred while communicating with the AI. Please check your connection and API key.");
    }
};