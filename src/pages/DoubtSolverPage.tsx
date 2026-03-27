import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Send, Mic, Volume2, Hand, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function DoubtSolverPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hi! I'm your AI study assistant. Ask me anything about your lessons — type or use voice." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const getAIResponse = (text: string) => {
    const query = text.toLowerCase();

    // GREETING
    if (query.includes("hello") || query.includes("hi") || query.includes("good morning")) {
      return "Good morning! ☀️ I'm your AI assistant. How can I help you with your learning today?";
    }

    // DYSLEXIA
    if (query.includes("dyslexia")) {
      return "Dyslexia is a learning difference that affects reading and language processing. It can make reading, spelling, and writing more challenging, but individuals with dyslexia often have strong creativity and problem-solving skills.";
    }

    // MOTION
    if (query.includes("motion")) {
      return "Motion is the change in position of an object over time. For example, when a car moves from one place to another, it is in motion.";
    }

    // ENERGY
    if (query.includes("energy")) {
      return "Energy is the ability to do work. It exists in forms like kinetic energy, potential energy, heat, and more.";
    }

    // DEFAULT FALLBACK
    return "Our AI is currently handling many requests, so detailed answers may be limited. Please try another question.";
  };

  const handleSend = () => {
    const userText = input.trim();
    if (!userText) return;

    setMessages((m) => [...m, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const response = getAIResponse(userText);
      setMessages((m) => [...m, { role: "ai", text: response }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <p className="text-sm text-primary font-medium mb-1">Platform Tool</p>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading">AI Doubt Solver</h1>
            <p className="text-muted-foreground text-sm mt-1">Ask questions via text or voice — get answers in text, audio, or sign language.</p>
          </div>
        </div>

        <div className="flex-1 container mx-auto px-4 lg:px-8 py-6 flex flex-col max-w-3xl">
          {/* Chat window */}
          <div className="flex-1 bg-card rounded-2xl border border-border p-4 mb-4 overflow-y-auto space-y-4 min-h-[400px] max-h-[60vh]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Response format options */}
          <div className="flex gap-2 mb-3">
            <span className="text-xs text-muted-foreground mr-1 self-center">Response as:</span>
            {[
              { icon: Brain, label: "Text" },
              { icon: Volume2, label: "Voice" },
              { icon: Hand, label: "Sign" },
            ].map((opt) => (
              <button key={opt.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
                <opt.icon className="w-3.5 h-3.5" /> {opt.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <Button variant="outline" size="icon" aria-label="Voice input">
              <Mic className="w-5 h-5" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
              className="flex-1 bg-card"
              aria-label="Question input"
            />
            <Button onClick={handleSend} size="icon" aria-label="Send question">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
