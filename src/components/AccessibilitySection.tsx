import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Type, Contrast, Mic, Headphones, Hand, Eye } from "lucide-react";

const accessibilityFeatures = [
  { icon: Type, title: "Large Text Mode", description: "Dynamically scale text sizes to ensure comfortable reading for visually impaired users." },
  { icon: Contrast, title: "High Contrast Mode", description: "Enhanced color contrast options that make content clearly visible for all users." },
  { icon: Mic, title: "Voice Navigation", description: "Navigate the entire platform using voice commands for hands-free learning experiences." },
  { icon: Headphones, title: "Audio Learning", description: "All content available as high-quality audio with adjustable playback speeds and settings." },
  { icon: Hand, title: "Sign Language Support", description: "Video content includes sign language interpretation for deaf and hard-of-hearing learners." },
  { icon: Eye, title: "Screen Reader Optimized", description: "Fully optimized ARIA labels and semantic HTML for seamless screen reader navigation." },
];

const AccessibilitySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left column - info card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28"
          >
            <div className="bg-background rounded-2xl p-8 border border-border glow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                  <Eye className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-3xl font-bold font-heading">WCAG 2.1 AAA</p>
                  <p className="text-sm text-muted-foreground">Compliance Standard</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We exceed industry standards to ensure the highest level of accessibility for all users.
              </p>
            </div>
          </motion.div>

          {/* Right column - feature grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {accessibilityFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-background rounded-2xl p-5 border border-border card-hover hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 transition-all group-hover:bg-primary group-hover:text-primary-foreground text-primary">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold font-heading mb-1.5">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessibilitySection;
