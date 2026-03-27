import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cpu, FileText, BarChart3, Settings, User, Activity,
  Volume2, Languages, Hand, Mic, BookOpen, Eye,
  Upload, TrendingUp, Clock, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: Cpu, label: "AI Tools", active: true },
  { icon: FileText, label: "Uploaded Content" },
  { icon: BarChart3, label: "Learning Progress" },
  { icon: Settings, label: "Accessibility Settings" },
  { icon: User, label: "Profile" },
  { icon: Activity, label: "Usage Stats" },
];

const aiTools = [
  { icon: Volume2, title: "Text to Speech", description: "Convert any text content into natural speech" },
  { icon: Mic, title: "Speech to Text", description: "Transcribe spoken words into editable text" },
  { icon: Hand, title: "Sign Language Overlay", description: "AI avatar translates content into sign language" },
  { icon: Languages, title: "Multi-Language", description: "Translate learning material into 40+ languages" },
  { icon: Eye, title: "Screen Reader Mode", description: "Optimized content for screen reader navigation" },
  { icon: BookOpen, title: "Dyslexia Mode", description: "Reading-friendly formatting and font options" },
];

const statsCards = [
  { icon: Upload, label: "Content Uploaded", value: "—", note: "Data will appear once backend is connected" },
  { icon: TrendingUp, label: "Learning Progress", value: "—", note: "Data will appear once backend is connected" },
  { icon: Clock, label: "Time Spent Learning", value: "—", note: "Data will appear once backend is connected" },
  { icon: Cpu, label: "AI Conversions Used", value: "—", note: "Data will appear once backend is connected" },
];

type Lesson = {
  title: string;
  videoUrl: string;
  transcript: string;
};

const DashboardPage = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const [accessibilityActive, setAccessibilityActive] = useState(false);
  const recognitionRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const rawLesson = localStorage.getItem("latestLesson");
    if (!rawLesson) return;

    try {
      const parsedLesson = JSON.parse(rawLesson) as Lesson;
      if (!parsedLesson?.title || !parsedLesson?.videoUrl || !parsedLesson?.transcript) return;
      setLessons((prev) => {
        const alreadyExists = prev.some(
          (lesson) => lesson.title === parsedLesson.title && lesson.videoUrl === parsedLesson.videoUrl
        );
        return alreadyExists ? prev : [parsedLesson, ...prev];
      });
    } catch {
      // Ignore malformed mock data
    }
  }, []);

  useEffect(() => {
    const refreshAccessibilityState = () => {
      const body = document.body;
      const hasAccessibilityMode =
        body.classList.contains("high-contrast") ||
        body.classList.contains("large-text") ||
        body.classList.contains("dyslexia");
      setAccessibilityActive(hasAccessibilityMode);
    };

    refreshAccessibilityState();
    const observer = new MutationObserver(refreshAccessibilityState);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [recognitionRef]);

  const handleSpeakTranscript = (lesson: Lesson) => {
    if (!lesson.transcript) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(lesson.transcript);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const startVoiceControl = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      setVoiceStatus("Voice control is not supported in this browser.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    setVoiceStatus('Listening for "play video" or "pause video"...');

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    setIsListening(true);
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => {
      setIsListening(false);
      setVoiceStatus("Voice control stopped due to an error.");
    };

    recognition.onresult = (event: any) => {
      const transcript = String(event.results[event.results.length - 1][0].transcript || "").toLowerCase();
      console.log("Voice Command:", transcript);

      if (transcript.includes("play")) {
        videoRef.current?.play();
        setVoiceStatus('Command received: play');
      }

      if (transcript.includes("pause") || transcript.includes("stop")) {
        videoRef.current?.pause();
        setVoiceStatus('Command received: pause');
      }

      if (transcript.includes("scroll down")) {
        window.scrollBy({ top: 200, behavior: "smooth" });
        setVoiceStatus('Command received: scroll down');
      }
    };

    recognition.start();
  };

  const stopVoiceControl = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setVoiceStatus("Voice control stopped.");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border p-6 sticky top-0 h-screen">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">N</span>
            </div>
            <span className="text-foreground font-heading font-bold text-lg">Dashboard</span>
          </div>

          <nav className="flex flex-col gap-1 flex-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                  item.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <Link to="/">
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
            </Button>
          </Link>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-10">
          {/* Mobile sidebar nav */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6 -mx-2 px-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  item.active
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-card text-muted-foreground border border-border"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Manage your accessible learning tools and track your progress.</p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {statsCards.map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl p-5 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold font-heading text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.note}</p>
              </div>
            ))}
          </div>

          {/* AI Tools */}
          <div className="mb-10">
            <h2 className="text-xl font-bold font-heading text-foreground mb-5">AI Accessibility Tools</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiTools.map((tool) => (
                <div key={tool.title} className="bg-card rounded-2xl p-5 border border-border card-hover hover:border-primary/30 transition-colors group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold font-heading text-foreground mb-1">{tool.title}</h3>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                  <p className="text-xs text-primary/60 mt-3 italic">Connect backend to activate</p>
                </div>
              ))}
            </div>
          </div>

          {/* Placeholder sections */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-semibold font-heading text-foreground mb-2">Uploaded Content</h3>
              {lessons.length > 0 ? (
                <div className="space-y-4">
                  {lessons.map((lesson) => (
                    <div key={`${lesson.title}-${lesson.videoUrl}`} className="rounded-xl border border-border p-4 bg-background">
                      <h4 className="text-sm font-semibold text-foreground mb-3">{lesson.title}</h4>
                      <video
                        ref={videoRef}
                        className="w-full rounded-lg border border-border mb-3"
                        controls
                        src={lesson.videoUrl}
                      >
                        Your browser does not support the video tag.
                      </video>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSpeakTranscript(lesson)}
                          disabled={isSpeaking}
                        >
                          {isSpeaking ? "Speaking..." : "Read Transcript"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={startVoiceControl}
                          disabled={isListening}
                        >
                          {isListening ? "Listening..." : "Voice Control"}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={stopVoiceControl} disabled={!isListening}>
                          Stop Voice
                        </Button>
                      </div>
                      {voiceStatus && (
                        <p className="text-[11px] text-muted-foreground mb-2">{voiceStatus}</p>
                      )}
                      <p className={`text-xs text-muted-foreground ${accessibilityActive ? "font-medium" : ""}`}>
                        {lesson.transcript}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Data will load here once backend API is connected.</p>
                </div>
              )}
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-semibold font-heading text-foreground mb-2">Learning Progress</h3>
              <div className="py-10 text-center">
                <BarChart3 className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Data will load here once backend API is connected.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
