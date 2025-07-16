import { GoogleGenAI, Type } from "@google/genai";
import { ArchitectureData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        projectName: { type: Type.STRING },
        projectSummary: { type: Type.STRING },
        architecture: {
            type: Type.OBJECT,
            properties: {
                overview: { type: Type.STRING },
                frontend: {
                    type: Type.OBJECT,
                    properties: {
                        techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
                        description: { type: Type.STRING },
                    },
                    required: ['techStack', 'description']
                },
                backend: {
                    type: Type.OBJECT,
                    properties: {
                        techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
                        description: { type: Type.STRING },
                    },
                    required: ['techStack', 'description']
                },
                database: {
                    type: Type.OBJECT,
                    properties: {
                        techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
                        description: { type: Type.STRING },
                    },
                    required: ['techStack', 'description']
                },
                deployment: {
                    type: Type.OBJECT,
                    properties: {
                        techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
                        description: { type: Type.STRING },
                    },
                    required: ['techStack', 'description']
                },
            },
            required: ['overview', 'frontend', 'backend', 'database', 'deployment']
        },
        scalability: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                points: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['title', 'points']
        },
        security: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                points: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['title', 'points']
        },
        costEstimation: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                breakdown: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            category: { type: Type.STRING },
                            cost: { type: Type.NUMBER },
                            details: { type: Type.STRING },
                        },
                        required: ['category', 'cost', 'details']
                    },
                },
            },
            required: ['title', 'breakdown']
        },
        roadmap: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    phase: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['phase', 'duration', 'tasks']
            },
        },
        prd: {
            type: Type.OBJECT,
            properties: {
                introduction: { type: Type.STRING },
                userPersonas: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            description: { type: Type.STRING },
                        },
                        required: ['name', 'description']
                    }
                },
                features: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                            userStories: { type: Type.ARRAY, items: { type: Type.STRING } },
                        },
                        required: ['title', 'description', 'userStories']
                    }
                },
                nonFunctionalRequirements: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            type: { type: Type.STRING },
                            details: { type: Type.STRING },
                        },
                        required: ['type', 'details']
                    }
                },
            },
            required: ['introduction', 'userPersonas', 'features', 'nonFunctionalRequirements']
        },
    },
    required: ['projectName', 'projectSummary', 'architecture', 'scalability', 'security', 'costEstimation', 'roadmap', 'prd'],
};

export const generateArchitecturePlan = async (projectDescription: string): Promise<ArchitectureData> => {
    try {
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on the following project description, generate a comprehensive software architecture plan and a detailed Product Requirements Document (PRD).

            Project Description: "${projectDescription}"

            Provide a professional and detailed analysis covering architecture (frontend, backend, database, deployment), scalability, security best practices, a monthly cost estimation, a project roadmap, and the full PRD. Ensure all fields in the JSON schema are populated with high-quality, relevant information. For cost, provide realistic monthly estimates in USD.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.3,
            }
        });

        const jsonText = result.text.trim();
        const parsedData = JSON.parse(jsonText);

        return parsedData as ArchitectureData;

    } catch (error) {
        console.error("Error generating architecture plan:", error);
        if (error instanceof Error && error.message.includes('JSON')) {
             throw new Error("Failed to parse the AI's response. The data format might be invalid. Please try again.");
        }
        throw new Error("An error occurred while communicating with the AI. Please check your connection and API key.");
    }
};