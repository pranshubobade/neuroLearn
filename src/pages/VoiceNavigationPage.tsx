import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, MessageSquare, Navigation, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const exampleCommands = [
  { command: "Open lesson 2", response: "Navigating to Lesson 2: Introduction to Algebra..." },
  { command: "Summarize this page", response: "Generating AI summary of current content..." },
  { command: "Read aloud", response: "Starting text-to-speech for current section..." },
  { command: "Switch to dyslexia mode", response: "Applying dyslexia-friendly font and spacing..." },
  { command: "Go to dashboard", response: "Navigating to your learning dashboard..." },
];

export default function VoiceNavigationPage() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  const handleCommand = (cmd: string) => {
    setTranscript(cmd);
    const match = exampleCommands.find((c) => c.command === cmd);
    setResponse(match?.response || "Backend API will process this command.");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <p className="text-sm text-primary font-medium mb-1">Platform Tool</p>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading">Voice Navigation</h1>
            <p className="text-muted-foreground text-sm mt-1">Navigate the entire platform using voice commands — hands-free learning.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Mic Button */}
            <div className="flex flex-col items-center text-center">
              <button
                onClick={() => setListening(!listening)}
                className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 ${
                  listening
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110"
                    : "bg-card border-2 border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
                aria-label={listening ? "Stop listening" : "Start listening"}
              >
                {listening ? <Mic className="w-10 h-10" /> : <MicOff className="w-10 h-10" />}
              </button>
              <p className="text-sm text-muted-foreground mt-4">
                {listening ? "Listening... speak a command" : "Tap to start voice navigation"}
              </p>
            </div>

            {/* Transcript */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-sm font-bold font-heading text-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" /> Voice Transcript
              </h2>
              <div className="min-h-[60px] bg-background rounded-xl p-4 text-sm text-foreground">
                {transcript || <span className="text-muted-foreground">Your voice command will appear here...</span>}
              </div>
            </div>

            {/* Response */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-sm font-bold font-heading text-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                <Navigation className="w-4 h-4 text-primary" /> Navigation Response
              </h2>
              <div className="min-h-[60px] bg-background rounded-xl p-4 text-sm text-foreground">
                {response || <span className="text-muted-foreground">Waiting for AI model response...</span>}
              </div>
            </div>

            {/* Example Commands */}
            <div>
              <h3 className="text-sm font-bold font-heading text-foreground mb-3 uppercase tracking-wider">Try These Commands</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {exampleCommands.map((cmd) => (
                  <button
                    key={cmd.command}
                    onClick={() => handleCommand(cmd.command)}
                    className="bg-card border border-border rounded-xl p-4 text-left hover:border-primary/30 transition-colors group"
                  >
                    <p className="text-sm font-medium text-foreground flex items-center gap-2">
                      "{cmd.command}"
                      <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
