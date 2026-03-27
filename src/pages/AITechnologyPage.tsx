import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Mic, Volume2, ScanEye, Cpu, Database, Globe, Layers, Workflow, Shield } from "lucide-react";

const techStack = [
  {
    icon: Brain,
    title: "Large Language Models",
    description: "State-of-the-art transformer-based models power our AI tutor, content summarization, and intelligent question-answering system. Fine-tuned for educational accessibility contexts.",
    tag: "NLP Engine",
  },
  {
    icon: Mic,
    title: "Speech Recognition",
    description: "Advanced automatic speech recognition converts spoken words into text in real-time, enabling voice navigation, dictation, and hands-free platform interaction.",
    tag: "ASR System",
  },
  {
    icon: Volume2,
    title: "Neural Text to Speech",
    description: "Deep learning-based speech synthesis generates natural-sounding audio from any text content. Supports multiple languages, voices, and speed adjustments.",
    tag: "TTS Engine",
  },
  {
    icon: ScanEye,
    title: "Computer Vision",
    description: "AI vision models analyze images, diagrams, and charts in educational materials to generate descriptive alt text and audio descriptions for visually impaired learners.",
    tag: "Vision AI",
  },
  {
    icon: Cpu,
    title: "Accessibility Algorithms",
    description: "Custom-built algorithms analyze content structure and automatically apply accessibility transformations — including reading level adjustment, dyslexia formatting, and cognitive load optimization.",
    tag: "Core Engine",
  },
  {
    icon: Layers,
    title: "Sign Language Generation",
    description: "AI-driven avatar rendering converts text and audio into sign language animations in real-time, providing an overlay that can be activated on any content.",
    tag: "Avatar Engine",
  },
];

const architectureLayers = [
  { icon: Globe, label: "Frontend (React + Tailwind)", detail: "Accessible UI with ARIA labels, keyboard nav, screen reader support" },
  { icon: Workflow, label: "AI Processing Pipeline", detail: "Content ingestion → format detection → accessibility conversion" },
  { icon: Database, label: "Data & Storage Layer", detail: "Encrypted user data, learning progress, accessibility preferences" },
  { icon: Shield, label: "Security & Compliance", detail: "WCAG 2.1 AAA, GDPR compliant, end-to-end encryption" },
];

const AITechnologyPage = () => {
  const archRef = useRef(null);
  const archInView = useInView(archRef, { once: true, margin: "-60px" });
  const techRef = useRef(null);
  const techInView = useInView(techRef, { once: true, margin: "-60px" });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        badge="AI Technology"
        title="The Intelligence Behind"
        highlight="Accessible Learning"
        description="Explore the cutting-edge AI systems that power NeuroLearn's adaptive, accessible education platform."
      />

      {/* Tech Stack Grid */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8" ref={techRef}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 25 }}
                animate={techInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-background rounded-2xl p-6 border border-border card-hover hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <tech.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">{tech.tag}</span>
                </div>
                <h3 className="text-lg font-semibold font-heading mb-2 text-foreground">{tech.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram Placeholder */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8" ref={archRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={archInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
              System <span className="text-primary">Architecture</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {architectureLayers.map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: -20 }}
                animate={archInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="bg-card rounded-2xl p-5 border border-border flex items-center gap-5 card-hover hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <layer.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold font-heading text-foreground">{layer.label}</p>
                  <p className="text-sm text-muted-foreground">{layer.detail}</p>
                </div>
                <span className="ml-auto text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded hidden sm:block">Layer {i + 1}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-5">
            Experience Our <span className="text-primary">AI in Action</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            See how NeuroLearn's AI transforms learning materials into accessible formats in real time.
          </p>
          <Link to="/contact">
            <Button variant="hero" size="xl">
              Request a Demo <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default AITechnologyPage;
