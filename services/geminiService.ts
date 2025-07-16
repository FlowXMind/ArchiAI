
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ArchitectureResponse, ArchitectureType } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY environment variable not set");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


export const generateArchitecturePlan = async (
    projectDescription: string,
    architectureType: ArchitectureType
): Promise<ArchitectureResponse> => {
    const prompt = `
        As an expert software architect, create a detailed architectural plan for the following project.
        The user has specified an interest in a "${architectureType}" architecture.
        Your analysis should be comprehensive, practical, and tailored to the project description.

        Project Description: "${projectDescription}"

        Please generate a response in a clean, stringified JSON format. The Mermaid diagram should be valid and represent the core components and data flow.
    `;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Clean the response text by removing markdown backticks and "json" identifier
        const cleanedText = responseText.replace(/```json\n|```/g, '').trim();

        const parsedData: ArchitectureResponse = JSON.parse(cleanedText);

        // Basic validation
        if (!parsedData.overview || !parsedData.techStack || !parsedData.diagram) {
             throw new Error("AI response is missing required fields.");
        }

        return parsedData;

    } catch (error) {
        console.error("Error generating architecture plan from Gemini API:", error);
        if (error instanceof Error) {
            if (error.message.includes("SAFETY")) {
                throw new Error("The request was blocked due to safety settings. Please modify your project description.");
            }
            if (error.message.includes("JSON")) {
                throw new Error("Failed to parse the AI's response. The format was invalid.");
            }
        }
        throw new Error("Failed to get a valid response from the AI. Please try again.");
    }
};
