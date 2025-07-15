
import { GoogleGenAI, Type } from "@google/genai";
import { ArchitectureResponse, ArchitectureType } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        overview: {
            type: Type.STRING,
            description: "A high-level overview of the proposed architecture, explaining why it's a good fit for the project.",
        },
        techStack: {
            type: Type.OBJECT,
            properties: {
                frontend: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Suggested frontend technologies (e.g., 'React with TypeScript', 'Vue.js').",
                },
                backend: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Suggested backend technologies (e.g., 'Node.js with Express', 'Python with Django').",
                },
                database: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Suggested database technologies (e.g., 'PostgreSQL', 'MongoDB Atlas').",
                },
                devops: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Suggested DevOps and deployment tools (e.g., 'Docker', 'Kubernetes', 'GitHub Actions').",
                },
                messaging: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Suggested message brokers or event streaming platforms, if applicable (e.g., 'RabbitMQ', 'Apache Kafka'). Only include if relevant to the architecture type.",
                    nullable: true,
                },
            },
            required: ["frontend", "backend", "database", "devops"],
        },
        pros: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of key advantages (pros) for choosing this architecture for the described project.",
        },
        cons: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of key disadvantages or trade-offs (cons) for this architecture.",
        },
        scalability: {
            type: Type.STRING,
            description: "A paragraph explaining how the proposed architecture addresses scalability.",
        },
        security: {
            type: Type.STRING,
            description: "A paragraph outlining key security considerations and best practices for this architecture.",
        },
        diagram: {
            type: Type.STRING,
            description: "A Mermaid.js graph definition (using 'graph TD' or 'graph LR') that visually represents the architecture. The diagram should be clear and show the main components and their interactions. E.g., 'graph TD; User-->Frontend; Frontend-->API_Gateway; API_Gateway-->AuthService; API_Gateway-->ProductService;'",
        },
    },
    required: ["overview", "techStack", "pros", "cons", "scalability", "security", "diagram"],
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

        Please generate a response in JSON format according to the provided schema. The Mermaid diagram should be valid and represent the core components and data flow.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);

        // Basic validation to ensure the parsed data looks like our expected type
        if (!parsedData.overview || !parsedData.techStack || !parsedData.diagram) {
             throw new Error("AI response is missing required fields.");
        }

        return parsedData as ArchitectureResponse;

    } catch (error) {
        console.error("Error generating architecture plan from Gemini API:", error);
        if(error instanceof Error && error.message.includes("SAFETY")) {
             throw new Error("The request was blocked due to safety settings. Please modify your project description.");
        }
        throw new Error("Failed to get a valid response from the AI. Please try again.");
    }
};
