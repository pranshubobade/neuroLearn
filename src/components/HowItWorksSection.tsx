import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Settings, BookOpen, Award } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description: "Sign up and tell us about your learning preferences, accessibility needs, and goals.",
  },
  {
    icon: Settings,
    step: "02",
    title: "AI Personalizes Your Path",
    description: "Our AI engine analyzes your profile and creates a customized learning path just for you.",
  },
  {
    icon: BookOpen,
    step: "03",
    title: "Learn at Your Pace",
    description: "Access courses in your preferred format — text, audio, video, or interactive exercises.",
  },
  {
    icon: Award,
    step: "04",
    title: "Track & Celebrate",
    description: "Monitor your progress with detailed analytics and earn certificates as you complete courses.",
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="relative group"
            >
              <div className="bg-background border border-border rounded-2xl p-6 h-full card-hover hover:border-primary/30 transition-colors">
                <span className="text-6xl font-bold font-heading text-primary/10 group-hover:text-primary/20 transition-colors">
                  {step.step}
                </span>
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mt-4 mb-3">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold font-heading mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 items-center">
                  <div className="w-6 h-0.5 bg-primary/20" />
                  <div className="w-2 h-2 rounded-full bg-primary/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
