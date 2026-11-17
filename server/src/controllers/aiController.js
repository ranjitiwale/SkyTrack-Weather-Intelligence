
import { getAIResponse } from "../services/aiService.js";
import { getCurrentWeather } from "../services/weatherService.js";

export async function chatWithAI(req, res, next) {
  try {
    const { message, city } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid message.",
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message cannot exceed 2000 characters.",
      });
    }

    let weatherContext = null;

    if (city && typeof city === "string" && city.trim()) {
      weatherContext = await getCurrentWeather(city.trim());
    }

    const answer = await getAIResponse(
      message.trim(),
      weatherContext
    );

    return res.status(200).json({
      success: true,
      data: {
        answer,
        weatherContext,
      },
    });
  } catch (error) {
    next(error);
  }
}
