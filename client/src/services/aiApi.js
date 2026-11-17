
import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
  timeout: 30000,
});

export async function sendMessageToAI(message, city) {
  const response = await API.post("/ai/chat", {
    message,
    city,
  });

  return response.data.data.answer;
}
