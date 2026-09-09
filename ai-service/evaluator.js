import "dotenv/config";
import Groq from "groq-sdk";
import { buildEvaluationPrompt } from "./prompt.js";
import { evaluationResponseSchema } from "./validator.js";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY is missing. Add it to your .env file.");
}

const groq = new Groq({ apiKey });

// Best available model on this Groq account for structured reasoning and OOD evaluation
const MODEL = "openai/gpt-oss-120b";

export async function evaluateDesign(data) {
  const prompt = buildEvaluationPrompt(data);

  let rawText;

  try {
    const completion = await groq.chat.completions.create({
      model: MODEL,
      temperature: 0.3,
      max_tokens: 4096,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are an expert LLD interviewer and software architect. You always respond with valid JSON only. No markdown, no explanation outside the JSON object.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    rawText = completion.choices[0]?.message?.content;

    if (!rawText) {
      throw new Error("Groq returned an empty response.");
    }

    const parsed = JSON.parse(rawText);

    // Some models wrap the response in an array — unwrap if needed
    const obj = Array.isArray(parsed) ? parsed[0] : parsed;

    const validated = evaluationResponseSchema.parse(obj);

    return validated;

  } catch (error) {
    console.error("\n❌ Evaluation Error:", error.message);

    // Zod validation failure — log what AI returned for debugging
    if (error.name === "ZodError") {
      console.error("❌ Zod Issues:", JSON.stringify(error.issues, null, 2));
      if (rawText) {
        console.error("❌ Raw AI Response (first 500 chars):", rawText.slice(0, 500));
      }
      throw new Error("AI returned an invalid response structure. Please try again.");
    }

    // Groq API errors
    if (error.status === 429) {
      throw new Error("Rate limit reached. Please wait a moment and try again.");
    }

    if (error.status === 401) {
      throw new Error("Invalid GROQ_API_KEY. Check your .env file.");
    }

    throw new Error(`Failed to evaluate LLD design: ${error.message}`);
  }
}
