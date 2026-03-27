import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Accessibility, BookOpen, BarChart3, Globe, Mic, Volume2, Hand, Eye, Focus } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Accessibility Engine",
    description: "Intelligent algorithms analyze uploaded content and automatically generate accessible versions — from alt text to content restructuring.",
    benefits: "Reduces manual conversion time by 90%",
  },
  {
    icon: Volume2,
    title: "Text to Speech System",
    description: "Advanced neural TTS reads any content aloud with natural intonation. Supports adjustable speed, pitch, and multiple voice options.",
    benefits: "Supports 20+ natural-sounding voices",
  },
  {
    icon: Mic,
    title: "Speech to Text Transcription",
    description: "Real-time speech recognition converts spoken words into editable text. Works with lectures, notes, and voice commands.",
    benefits: "98% accuracy across accents",
  },
  {
    icon: Hand,
    title: "Sign Language Avatar Overlay",
    description: "AI-driven avatar translates text and audio into sign language animations, displayed as a toggleable overlay on any content.",
    benefits: "Real-time sign language generation",
  },
  {
    icon: Accessibility,
    title: "Voice Navigation Interface",
    description: "Complete voice-controlled interface for hands-free navigation. Say commands to browse, select, and interact with all platform features.",
    benefits: "50+ voice commands supported",
  },
  {
    icon: Focus,
    title: "Adaptive Learning Engine",
    description: "Machine learning tracks performance patterns and adjusts content difficulty, pacing, and format to match each learner's progress.",
    benefits: "Personalized learning paths for every student",
  },
  {
    icon: BarChart3,
    title: "Accessibility Dashboard",
    description: "Comprehensive analytics showing learning progress, accessibility usage metrics, and personalized improvement recommendations.",
    benefits: "Track progress across all accessibility modes",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Instantly translate course content into 40+ languages while preserving accessibility formatting and layout adaptations.",
    benefits: "40+ languages with accessibility preserved",
  },
  {
    icon: Eye,
    title: "Dyslexia Reading Mode",
    description: "OpenDyslexic font, adjustable line spacing, color overlays, reading rulers, and syllable highlighting make reading comfortable.",
    benefits: "Configurable to individual preferences",
  },
  {
    icon: BookOpen,
    title: "AI Study Assistant",
    description: "Chat-based AI tutor answers questions, generates quizzes, creates summaries, and provides study guidance tailored to accessibility needs.",
    benefits: "Available 24/7 with context awareness",
  },
];

const ExpandedFeaturesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group bg-background rounded-2xl p-6 border border-border card-hover hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold font-heading mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{feature.description}</p>
              <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{feature.benefits}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpandedFeaturesSection;
