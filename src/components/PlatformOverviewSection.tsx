import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Shield, Cpu } from "lucide-react";

const pillars = [
  {
    icon: Sparkles,
    title: "AI-Driven Personalization",
    description: "Our machine learning engine analyzes each student's strengths, challenges, and preferences to deliver a truly individualized learning path that evolves over time.",
  },
  {
    icon: Shield,
    title: "Accessibility-First Design",
    description: "Every UI element, interaction, and content format is built to meet WCAG 2.1 AAA standards, ensuring the platform works seamlessly with assistive technologies.",
  },
  {
    icon: Cpu,
    title: "Adaptive Content Engine",
    description: "Upload any learning material and our AI converts it into multiple accessible formats — audio, sign language overlay, dyslexia-friendly text, and more.",
  },
];

const PlatformOverviewSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
            Platform Overview
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
            The Future of <span className="text-primary">Inclusive Education</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            NeuroLearn combines cutting-edge artificial intelligence with inclusive design principles to create a learning experience that adapts to you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="bg-card rounded-2xl p-8 border border-border card-hover hover:border-primary/30 transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <pillar.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold font-heading mb-3 text-foreground">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformOverviewSection;
