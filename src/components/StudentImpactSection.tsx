import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, EarOff, Brain, Focus, ScanEye } from "lucide-react";

const learnerTypes = [
  {
    icon: Eye,
    title: "Blind Learners",
    description: "Full audio-based navigation, AI-powered text-to-speech for all content, and screen reader optimization make every lesson fully accessible.",
    color: "text-primary",
  },
  {
    icon: ScanEye,
    title: "Low-Vision Learners",
    description: "High contrast modes, scalable typography, magnification controls, and customizable color overlays adapt to each student's visual needs.",
    color: "text-yellow",
  },
  {
    icon: EarOff,
    title: "Deaf Learners",
    description: "AI sign language avatar overlay, real-time captions, visual alerts, and speech-to-text transcription ensure nothing is missed.",
    color: "text-teal",
  },
  {
    icon: Brain,
    title: "Dyslexic Learners",
    description: "OpenDyslexic font support, adjustable line spacing, reading rulers, and syllable highlighting make reading comfortable and effective.",
    color: "text-pink",
  },
  {
    icon: Focus,
    title: "ADHD Learners",
    description: "Focus mode minimizes distractions, bite-sized lesson chunks, progress micro-rewards, and built-in break reminders sustain attention.",
    color: "text-orange",
  },
];

const StudentImpactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 lg:py-28 bg-section-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
            Student Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
            Designed for <span className="text-primary">Every Learner</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform adapts to the unique needs of students with different disabilities, ensuring no one is left behind.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {learnerTypes.map((learner, i) => (
            <motion.div
              key={learner.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 card-hover hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <learner.icon className={`w-6 h-6 ${learner.color}`} />
              </div>
              <h3 className="text-lg font-semibold font-heading mb-2 text-foreground">{learner.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{learner.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentImpactSection;
