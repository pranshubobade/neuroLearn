import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText, Presentation, Video, StickyNote, Upload,
  Volume2, Wand2, Hand, FileDown, Loader2, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const mockLesson = {
  title: "AI Generated Lesson",
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  transcript: "This is a science lesson explaining motion and energy..."
};

const uploadTypes = [
  { icon: FileText, label: "PDF", accept: ".pdf" },
  { icon: Presentation, label: "Slides", accept: ".pptx,.ppt" },
  { icon: Video, label: "Video", accept: "video/*" },
  { icon: StickyNote, label: "Notes", accept: ".txt,.docx,.md" },
];

const conversions = [
  { icon: Volume2, label: "Convert to Audio", description: "Generate speech from uploaded content" },
  { icon: Wand2, label: "Summarized Notes", description: "AI-generated summary of key points" },
  { icon: FileDown, label: "Simplified Text", description: "Rewrite for easier comprehension" },
  { icon: Hand, label: "Sign Translation", description: "Generate sign language animation" },
];

export default function ContentUploadPage() {
  const [uploaded, setUploaded] = useState(false);
  const [converting, setConverting] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const [step, setStep] = useState("");
  const processingTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      processingTimeoutsRef.current.forEach(clearTimeout);
      processingTimeoutsRef.current = [];
    };
  }, []);

  const handleUpload = () => {
    processingTimeoutsRef.current.forEach(clearTimeout);
    processingTimeoutsRef.current = [];

    setIsProcessing(true);
    setUploadResult(null);
    setUploaded(false);
    setStep("Extracting audio...");

    const t1 = setTimeout(() => setStep("Generating transcript..."), 650);
    const t2 = setTimeout(() => setStep("Applying accessibility..."), 1300);
    const t3 = setTimeout(() => {
      setIsProcessing(false);
      setUploaded(true);
      setUploadResult("Video processed successfully. You can now choose a conversion option.");
      localStorage.setItem("latestLesson", JSON.stringify(mockLesson));
      setStep("");
    }, 2000);

    processingTimeoutsRef.current = [t1, t2, t3];
  };

  const handleConvert = (label: string) => {
    setConverting(label);
    setTimeout(() => setConverting(null), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <p className="text-sm text-primary font-medium mb-1">Platform Tool</p>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading">Accessible Content Upload</h1>
            <p className="text-muted-foreground text-sm mt-1">Upload learning material and convert it to accessible formats.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8 max-w-4xl">
          {/* Upload Area */}
          <div className="bg-card rounded-2xl border border-border p-8 mb-8">
            <h2 className="text-sm font-bold font-heading text-foreground mb-6 uppercase tracking-wider">Upload Content</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {uploadTypes.map((type) => (
                <label
                  key={type.label}
                  className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/30 transition-colors group"
                >
                  <type.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
                  <span className="text-sm font-medium text-foreground">{type.label}</span>
                  <input type="file" accept={type.accept} className="hidden" onChange={handleUpload} />
                </label>
              ))}
            </div>

            {isProcessing && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" /> Processing...
                </div>
                {step && (
                  <p className="text-xs pl-6 text-muted-foreground/90 animate-pulse">{step}</p>
                )}
              </motion.div>
            )}

            {uploaded && !isProcessing && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-primary">
                <Check className="w-4 h-4" /> File ready for conversion. Select a format below.
              </motion.div>
            )}

            {uploadResult && !isProcessing && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-xs text-muted-foreground">
                {uploadResult}
                <div className="mt-3">
                  <Link to="/dashboard">
                    <Button size="sm" variant="outline">View in Dashboard</Button>
                  </Link>
                </div>
              </motion.div>
            )}

            {!uploaded && !isProcessing && (
              <div className="flex items-center justify-center py-4">
                <Button variant="outline" className="gap-2" onClick={handleUpload}>
                  <Upload className="w-4 h-4" /> Or drag and drop files here
                </Button>
              </div>
            )}
          </div>

          {/* Conversion Options */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <h2 className="text-sm font-bold font-heading text-foreground mb-6 uppercase tracking-wider">Convert To</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {conversions.map((conv) => (
                <button
                  key={conv.label}
                  onClick={() => handleConvert(conv.label)}
                  disabled={!uploaded || isProcessing}
                  className="flex items-start gap-4 p-5 rounded-xl border border-border hover:border-primary/30 transition-all text-left disabled:opacity-40 disabled:cursor-not-allowed group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {converting === conv.label ? <Loader2 className="w-5 h-5 animate-spin" /> : <conv.icon className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{conv.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{conv.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {!uploaded && (
              <p className="text-xs text-muted-foreground text-center mt-6">Upload content first to enable conversions.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
