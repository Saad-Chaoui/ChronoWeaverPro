import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Get the API key from environment variables
const apiKey = process.env.GEMINI_API_KEY || "";
console.log("API Key available:", apiKey ? "Yes (length: " + apiKey.length + ")" : "No");

// Initialize the Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(apiKey);

// Model to use - gemini-2.0-flash is the model specified in your API key
const MODEL_NAME = "gemini-2.0-flash";

interface TimelineScenario {
  name: string;
  probability: number;
  description: string;
  outcomes: {
    name: string;
    impact: string;
    description: string;
  }[];
  recommendations: string[];
}

interface TimelinePrediction {
  summary: string;
  scenarios: TimelineScenario[];
  insights: string[];
}

/**
 * Generate a timeline prediction based on user inputs
 */
export async function generateTimelinePrediction(
  goal: string,
  industry: string,
  timeframe: string,
  disruptions: string
): Promise<TimelinePrediction> {
  try {
    // Access the generative model
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Construct the prompt
    const prompt = `
      As Chrono Weaver AI, generate a detailed future timeline analysis based on the following inputs:
      
      Strategic Goal: ${goal}
      Industry: ${industry}
      Time Horizon: ${timeframe} years
      Potential Disruptions: ${disruptions}
      
      Format your response as valid JSON with the following structure:
      {
        "summary": "A general overview of the prediction",
        "scenarios": [
          {
            "name": "Name of the scenario pathway",
            "probability": probability as a number between 0-100,
            "description": "Detailed description of this scenario",
            "outcomes": [
              {
                "name": "Specific outcome name",
                "impact": "Quantitative measure (e.g. Growth +X%)",
                "description": "Detailed description of this outcome"
              }
            ],
            "recommendations": ["Strategic recommendation 1", "Strategic recommendation 2"]
          }
        ],
        "insights": ["Key insight 1", "Key insight 2", "Key insight 3"]
      }
      
      For context: Generate 2-3 different scenario pathways, each with 1-2 outcomes.
      Make the scenarios and outcomes specific to the industry and goal provided.
      Include specific numbers and metrics in the impact assessments.
      Keep the total response compact but insightful.
    `;

    // Generate content with specific safety settings and response format
    const generationConfig = {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
      }
    ];

    console.log("Sending prompt to Gemini API...");
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings,
    });
    
    console.log("Response received from Gemini API");
    const response = await result.response;
    const text = response.text();
    
    // Parse the response as JSON
    try {
      // Find JSON content in the response (in case it has additional text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : text;
      
      const parsedResponse = JSON.parse(jsonString) as TimelinePrediction;
      return parsedResponse;
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", parseError);
      throw new Error("AI response format error");
    }
  } catch (error) {
    console.error("Error generating prediction with Gemini AI:", error);
    
    // Check if it's an API key related error
    if (error.message && error.message.includes("API Key")) {
      throw new Error("API key authentication failed. Please check your Gemini API key.");
    }
    
    // Check if it's a model related error
    if (error.message && error.message.includes("model")) {
      throw new Error("Model error: " + error.message);
    }
    
    // Generic error fallback
    throw new Error("Failed to generate prediction: " + (error.message || "Unknown error"));
  }
}