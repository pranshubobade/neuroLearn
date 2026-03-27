import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Accessibility, BookOpen, BarChart3, Globe, Mic } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Personalization",
    description: "Intelligent algorithms adapt content difficulty, pace, and format to match each learner's unique needs and abilities.",
  },
  {
    icon: Accessibility,
    title: "Universal Accessibility",
    description: "Built from the ground up with WCAG 2.1 AAA compliance, supporting screen readers, keyboard navigation, and more.",
  },
  {
    icon: BookOpen,
    title: "Multi-Format Content",
    description: "Learn through text, audio, video, sign language, and interactive exercises — all synchronized and accessible.",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Detailed dashboards track learning progress, identify areas of improvement, and celebrate achievements.",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Content available in 40+ languages with real-time translation and culturally adaptive learning paths.",
  },
  {
    icon: Mic,
    title: "Voice Navigation",
    description: "Complete voice-controlled interface allowing hands-free navigation and interaction with all platform features.",
  },
];

const FeaturesSection = () => {
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
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-background rounded-2xl p-6 border border-border card-hover hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold font-heading mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
