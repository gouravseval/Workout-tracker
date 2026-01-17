import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { getNutritionAdvice } from "../services/gemini";

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hi! I'm your AI Nutrition Coach. Need a meal swap or advice?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    const botResponse = await getNutritionAdvice(userMessage, "User is a vegetarian. Goal: Build lean muscle.");
    
    setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[500px] glass-panel overflow-hidden">
      <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-3">
        <Bot className="text-white" />
        <h3 className="font-bold text-white">AI Coach</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user" ? "bg-white text-black" : "bg-white/10 text-white"
              }`}
            >
              {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-white text-black rounded-tr-none font-medium"
                  : "bg-white/10 text-gray-200 rounded-tl-none border border-white/5"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Bot size={16} />
            </div>
            <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-75" />
                <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-white/10 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about food..."
          className="flex-1 bg-white/5 border-white/10 focus:border-white focus:ring-0 text-white placeholder-gray-500"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-white hover:bg-gray-200 text-black p-3 rounded-lg disabled:opacity-50 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
