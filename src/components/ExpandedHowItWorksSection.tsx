import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, Cpu, SlidersHorizontal, GraduationCap, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Learning Material",
    description: "Upload your course content in any format — PDFs, documents, presentations, videos, or audio files. Our system accepts all standard formats.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Converts to Accessible Formats",
    description: "Our AI engine automatically analyzes the content and generates accessible versions including audio narration, sign language overlays, dyslexia-friendly text, and more.",
  },
  {
    icon: SlidersHorizontal,
    step: "03",
    title: "Select Your Accessibility Mode",
    description: "Choose the accessibility features that match your needs — text-to-speech, high contrast, voice navigation, reading mode, or any combination of tools.",
  },
  {
    icon: GraduationCap,
    step: "04",
    title: "AI Tutor Assists Learning",
    description: "An AI study assistant guides you through the material, answers questions, generates practice quizzes, and adapts to your learning pace.",
  },
  {
    icon: BarChart3,
    step: "05",
    title: "Track Progress on Dashboard",
    description: "Monitor your learning journey with the accessibility dashboard — see completed lessons, time spent, accessibility tool usage, and improvement areas.",
  },
];

const ExpandedHowItWorksSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl" ref={ref}>
        <div className="relative">
          {/* Vertical line connector */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden lg:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="relative flex gap-6 items-start"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 relative z-10">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="bg-background border border-border rounded-2xl p-6 flex-1 card-hover hover:border-primary/30 transition-colors">
                  <span className="text-xs font-bold text-primary/50 font-heading mb-1 block">STEP {step.step}</span>
                  <h3 className="text-lg font-semibold font-heading mb-2 text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpandedHowItWorksSection;
