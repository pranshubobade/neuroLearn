import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Volume2, Languages, BookMarked } from "lucide-react";

const aiFeatures = [
  {
    icon: MessageSquare,
    title: "AI Study Assistant",
    description: "Ask questions, get explanations, and receive study guidance from an AI tutor trained to support learners with disabilities.",
  },
  {
    icon: Volume2,
    title: "Real-Time Text to Speech",
    description: "Advanced neural voice synthesis reads any content aloud with natural intonation, adjustable speed, and multiple voice options.",
  },
  {
    icon: Languages,
    title: "Multi-Language Translation",
    description: "Instantly translate course content into 40+ languages while preserving accessibility formatting and AI-adapted layouts.",
  },
  {
    icon: BookMarked,
    title: "Smart Content Summarization",
    description: "AI generates concise summaries, key takeaways, and study notes from any uploaded material, saving hours of manual work.",
  },
];

const AILearningSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 lg:py-28 bg-card relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
            AI Learning
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
            AI-Powered <span className="text-primary">Learning Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Harness the power of artificial intelligence for a smarter, more accessible learning journey.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {aiFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-background rounded-2xl p-6 border border-border card-hover hover:border-primary/30 transition-colors group flex gap-5"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold font-heading mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AILearningSection;
