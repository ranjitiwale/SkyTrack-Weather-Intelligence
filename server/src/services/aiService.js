
import OpenAI from "openai";

export async function getAIResponse(message, weatherContext = null) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing in server/.env");
  }

  const openai = new OpenAI({ apiKey });

  const instructions = `
    You are SkyTrack AI, a weather intelligence assistant.

    Your responsibilities:
    - Explain weather conditions in simple language.
    - Give practical weather-based suggestions.
    - Help users make informed outdoor and travel decisions.
    - Answer follow-up weather questions.

    IMPORTANT RULES:
    - Never invent live weather information.
    - Use only the verified weather context provided below.
    - If weather context is unavailable, ask the user for a city.
    - Clearly distinguish actual weather data from recommendations.
    - Never present suggestions as official weather warnings.
    - Keep responses clear, useful and concise.

    VERIFIED WEATHER CONTEXT:
    ${weatherContext ? JSON.stringify(weatherContext) : "Not available"}
  `;

  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL,
    instructions,
    input: message,
  });

  return response.output_text;
}
