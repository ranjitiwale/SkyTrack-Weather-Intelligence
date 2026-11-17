
import { useState } from "react";
import {
  Bot,
  Send,
  User,
  Sparkles,
  CloudSun,
  MapPin,
  Plane,
  RefreshCw,
} from "lucide-react";

import { sendMessageToAI } from "../services/aiApi";

function AIChat({ city = "" }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm SkyTrack AI. Ask me about weather conditions, outdoor activities, travel planning, or weather safety.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    {
      label: "Today's Weather",
      question: "Explain today's weather conditions.",
      icon: CloudSun,
    },
    {
      label: "Outdoor Activities",
      question: "Is it a good time for outdoor activities?",
      icon: Sparkles,
    },
    {
      label: "Travel Advice",
      question: "Give me weather-based travel advice.",
      icon: Plane,
    },
    {
      label: "Weather Safety",
      question: "What precautions should I take in this weather?",
      icon: MapPin,
    },
  ];

  const handleSend = async (e, customMessage = null) => {
    e?.preventDefault();

    const userMessage = (customMessage || input).trim();

    if (!userMessage || loading) return;

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const answer = await sendMessageToAI(userMessage, city);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (error) {
      console.error("SkyTrack AI Error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "SkyTrack AI is currently unavailable. Please try again later.";

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/20 p-3 rounded-xl">
            <Bot className="text-blue-400" size={25} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              SkyTrack AI Assistant
            </h2>

            <p className="text-xs text-slate-400">
              Weather Intelligence Assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-green-400">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          {city || "City not selected"}
        </div>
      </div>

      {/* Messages */}
      <div className="h-350px overflow-y-auto space-y-4 mb-5 pr-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <div className="w-9 h-9 shrink-0 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Bot size={19} className="text-blue-400" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                message.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-slate-800 text-slate-200 rounded-bl-sm"
              }`}
            >
              {message.content}
            </div>

            {message.role === "user" && (
              <div className="w-9 h-9 shrink-0 rounded-full bg-slate-700 flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
            )}
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Bot size={19} className="text-blue-400" />
            </div>

            <div className="bg-slate-800 rounded-xl px-4 py-3 text-sm text-blue-300 animate-pulse">
              SkyTrack AI is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="mb-5">
          <p className="text-xs text-slate-400 mb-3">
            Try asking:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestions.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={index}
                  type="button"
                  disabled={loading}
                  onClick={() => handleSend(null, item.question)}
                  className="flex items-center gap-2 text-left text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl p-3 transition disabled:opacity-50"
                >
                  <Icon size={16} className="text-blue-400 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about weather..."
          disabled={loading}
          maxLength={2000}
          className="flex-1 min-w-0 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          {loading ? (
            <RefreshCw size={19} className="animate-spin" />
          ) : (
            <Send size={19} />
          )}
        </button>
      </form>

      <p className="text-[11px] text-slate-500 mt-3 text-center">
        AI responses are informational. Always follow official weather alerts.
      </p>
    </section>
  );
}

export default AIChat;
