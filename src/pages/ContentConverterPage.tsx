import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Volume2, Mic, FileText, Wand2, Languages, Image,
  Play, Loader2, Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const tabs = [
  { id: "tts", label: "Text → Speech", icon: Volume2 },
  { id: "stt", label: "Speech → Text", icon: Mic },
  { id: "summarize", label: "Summarize", icon: FileText },
  { id: "simplify", label: "Simplify", icon: Wand2 },
  { id: "translate", label: "Translate", icon: Languages },
  { id: "alttext", label: "Image → Alt Text", icon: Image },
];

const languages = ["Hindi", "Spanish", "French", "German", "Arabic", "Chinese", "Japanese", "Portuguese", "Tamil", "Bengali"];

export default function ContentConverterPage() {
  const [activeTab, setActiveTab] = useState("tts");
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [outputMessage, setOutputMessage] = useState("Ready.");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);

      if (!selectedVoice && availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;

    return () => {
      synth.onvoiceschanged = null;
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      synth.cancel();
    };
  }, [selectedVoice]);

  const handleAction = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const handleTextToSpeech = () => {
    if (!inputText.trim()) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(inputText);

    if (voices.length > 0) {
      utterance.voice =
        voices.find((voice) => voice.name === selectedVoice) ?? voices[0];
    }

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => {
      setIsSpeaking(true);
      setOutputMessage("Speaking...");
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setOutputMessage("Speech completed.");
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setOutputMessage("Unable to generate speech.");
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setOutputMessage("Speech stopped.");
  };

  const handleStartRecording = () => {
    if (isRecording) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      setOutputMessage("Speech recognition is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsRecording(true);
      setOutputMessage("Recording...");
    };

    recognition.onresult = (event: any) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript;
      }

      setInputText(transcript.trim());
    };

    recognition.onerror = (event: any) => {
      if (event.error === "not-allowed") {
        alert("Microphone permission denied. Please allow microphone access.");
      }
      setIsRecording(false);
      setOutputMessage("Recording stopped due to an error.");
    };

    recognition.onend = () => {
      setIsRecording(false);
      setOutputMessage("Recording stopped.");
    };

    recognition.start();
  };

  const handleStopRecording = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsRecording(false);
    setOutputMessage("Recording stopped.");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <p className="text-sm text-primary font-medium mb-1">Platform Tool</p>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading">AI Content Converter</h1>
            <p className="text-muted-foreground text-sm mt-1">Convert learning material into accessible formats using AI.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8">
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-1 px-1" role="tablist" aria-label="Converter tools">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tool Panels */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-sm font-bold font-heading text-foreground mb-4 uppercase tracking-wider">Input</h2>

              {activeTab === "tts" && (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Enter text to convert to speech..."
                    className="min-h-[180px] bg-background"
                    aria-label="Text input for speech conversion"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <div className="flex items-center gap-3 flex-wrap">
                    <select
                      className="bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground"
                      aria-label="Select voice"
                      value={selectedVoice}
                      onChange={(e) => setSelectedVoice(e.target.value)}
                    >
                      {voices.length === 0 ? (
                        <option value="">Default voice</option>
                      ) : (
                        voices.map((voice) => (
                          <option key={voice.name} value={voice.name}>
                            {voice.name}
                          </option>
                        ))
                      )}
                    </select>
                    <Button onClick={handleTextToSpeech} className="gap-2" disabled={!inputText.trim() || isSpeaking}>
                      <Play className="w-4 h-4" /> Generate Audio
                    </Button>
                    <Button variant="outline" onClick={handleStopSpeaking} className="gap-2" disabled={!isSpeaking}>
                      <Square className="w-4 h-4" /> Stop
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "stt" && (
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-border rounded-xl">
                    <Mic className={`w-10 h-10 mb-3 ${isRecording ? "text-red-500" : "text-primary"}`} />
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                      <Button variant="outline" onClick={handleStartRecording} className="gap-2" disabled={isRecording}>
                      <Mic className="w-4 h-4" /> Start Recording
                      </Button>
                      <Button variant="outline" onClick={handleStopRecording} className="gap-2" disabled={!isRecording}>
                        <Square className="w-4 h-4" /> Stop Recording
                      </Button>
                    </div>
                    {isRecording && <p className="text-xs text-red-500 mt-3">Recording...</p>}
                    <p className="text-xs text-muted-foreground mt-3">or upload an audio file</p>
                    <Input type="file" accept="audio/*" className="mt-2 max-w-xs" aria-label="Upload audio file" />
                  </div>
                  <Textarea
                    placeholder="Live transcript will appear here..."
                    className="min-h-[120px] bg-background"
                    aria-label="Speech transcript"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>
              )}

              {activeTab === "summarize" && (
                <div className="space-y-4">
                  <Textarea placeholder="Paste long text content to summarize..." className="min-h-[180px] bg-background" aria-label="Text to summarize" />
                  <Button onClick={handleAction} className="gap-2"><Wand2 className="w-4 h-4" /> Summarize</Button>
                </div>
              )}

              {activeTab === "simplify" && (
                <div className="space-y-4">
                  <Textarea placeholder="Enter complex text to simplify for easier reading..." className="min-h-[180px] bg-background" aria-label="Text to simplify" />
                  <Button onClick={handleAction} className="gap-2"><Wand2 className="w-4 h-4" /> Simplify Text</Button>
                </div>
              )}

              {activeTab === "translate" && (
                <div className="space-y-4">
                  <Textarea placeholder="Enter text to translate..." className="min-h-[180px] bg-background" aria-label="Text to translate" />
                  <div className="flex items-center gap-3 flex-wrap">
                    <select className="bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground" aria-label="Target language">
                      {languages.map((l) => <option key={l}>{l}</option>)}
                    </select>
                    <Button onClick={handleAction} className="gap-2"><Languages className="w-4 h-4" /> Translate</Button>
                  </div>
                </div>
              )}

              {activeTab === "alttext" && (
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-border rounded-xl">
                    <Image className="w-10 h-10 text-primary mb-3" />
                    <Input type="file" accept="image/*" className="max-w-xs" aria-label="Upload image" />
                    <p className="text-xs text-muted-foreground mt-3">Upload an image to generate alt text</p>
                  </div>
                  <Button onClick={handleAction} className="gap-2"><Wand2 className="w-4 h-4" /> Generate Alt Text</Button>
                </div>
              )}
            </div>

            {/* Output Panel */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-sm font-bold font-heading text-foreground mb-4 uppercase tracking-wider">Output</h2>
              {(activeTab !== "tts" && activeTab !== "stt" && loading) ? (
                <div className="space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-2/3" />
                  <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing with AI model...
                  </div>
                </div>
              ) : activeTab === "tts" || activeTab === "stt" ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {(isRecording || isSpeaking) && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{isRecording ? "Recording..." : isSpeaking ? "Speaking..." : outputMessage}</span>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-4 min-h-[140px]">
                    <p className="text-sm text-foreground whitespace-pre-wrap break-words">
                      {inputText || "Your transcript or text will appear here."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                    <Wand2 className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">AI model output will appear here.</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Waiting for input and backend API connection.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
