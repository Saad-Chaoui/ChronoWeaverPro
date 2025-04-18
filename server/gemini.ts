import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

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

    // Generate content
    const result = await model.generateContent(prompt);
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
    throw new Error("Failed to generate prediction");
  }
}