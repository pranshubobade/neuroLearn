import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, EarOff, Brain, Focus, ScanEye } from "lucide-react";

const learnerProfiles = [
  {
    icon: Eye,
    title: "For Blind Students",
    description: "Complete audio-based learning experience with AI text-to-speech for all content, screen reader optimization with semantic ARIA labels, voice navigation for hands-free control, and audio descriptions for images and diagrams.",
    features: ["Neural text-to-speech", "Full keyboard navigation", "Audio image descriptions", "Voice command interface"],
  },
  {
    icon: EarOff,
    title: "For Deaf Students",
    description: "Visual-first learning environment with AI sign language avatar overlay on all video content, real-time captions and transcription, visual notification alerts, and speech-to-text conversion for live lectures.",
    features: ["Sign language avatar overlay", "Real-time captions", "Visual alerts system", "Speech-to-text transcription"],
  },
  {
    icon: Brain,
    title: "For Dyslexic Students",
    description: "Reading-optimized interface with OpenDyslexic font support, adjustable line and letter spacing, colored overlays and reading rulers, syllable highlighting, and text-to-speech integration for multi-sensory learning.",
    features: ["OpenDyslexic font option", "Adjustable spacing", "Color overlay filters", "Syllable highlighting"],
  },
  {
    icon: Focus,
    title: "For ADHD Learners",
    description: "Distraction-minimized learning space with focus mode that hides non-essential UI, bite-sized micro-lessons, gamified progress rewards, built-in break reminders, and task prioritization tools.",
    features: ["Focus mode", "Micro-lesson format", "Break reminders", "Progress gamification"],
  },
  {
    icon: ScanEye,
    title: "For Low Vision Learners",
    description: "Enhanced visual accessibility with dynamic text scaling, high contrast mode options, magnification controls, customizable color schemes, and zoom-friendly layouts that reflow content without horizontal scrolling.",
    features: ["Dynamic text scaling", "High contrast modes", "Screen magnification", "Reflowable layouts"],
  },
];

const ExpandedAccessibilitySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <div className="space-y-6">
          {learnerProfiles.map((profile, i) => (
            <motion.div
              key={profile.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-background rounded-2xl p-6 lg:p-8 border border-border card-hover hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <profile.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold font-heading text-foreground">{profile.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{profile.description}</p>
                </div>
                <div className="lg:w-64 flex-shrink-0">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Key Features</p>
                  <ul className="space-y-2">
                    {profile.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpandedAccessibilitySection;
