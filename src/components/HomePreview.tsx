import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Accessibility, BookOpen, UserPlus, Settings, Award } from "lucide-react";

const previewFeatures = [
  { icon: Brain, title: "AI-Powered Personalization", description: "Intelligent algorithms adapt content to match each learner's unique needs." },
  { icon: Accessibility, title: "Universal Accessibility", description: "Built with WCAG 2.1 AAA compliance from the ground up." },
  { icon: BookOpen, title: "Multi-Format Content", description: "Learn through text, audio, video, sign language, and interactive exercises." },
];

const previewSteps = [
  { icon: UserPlus, step: "01", title: "Create Your Profile" },
  { icon: Settings, step: "02", title: "AI Personalizes Your Path" },
  { icon: BookOpen, step: "03", title: "Learn at Your Pace" },
  { icon: Award, step: "04", title: "Track & Celebrate" },
];

const HomePreview = () => {
  const featRef = useRef(null);
  const stepsRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: "-60px" });
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* Features preview */}
      <section className="py-20 lg:py-28 bg-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-12 left-16 w-32 h-32 border border-primary rounded-full" />
          <div className="absolute bottom-24 right-24 w-20 h-20 border border-primary rounded-full" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={featRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
              Everything You Need to{" "}
              <span className="text-primary">Learn Effectively</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Powerful features designed to make learning accessible, engaging, and effective for everyone.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {previewFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={featInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-background rounded-2xl p-6 border border-border card-hover group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold font-heading mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/features">
              <Button variant="hero" size="lg">
                View All Features <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works preview */}
      <section className="py-20 lg:py-28 bg-background" ref={stepsRef}>
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
              Start Learning in{" "}
              <span className="text-primary">Four Simple Steps</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {previewSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 card-hover hover:border-primary/30 transition-colors relative group"
              >
                <span className="text-5xl font-bold font-heading text-primary/10 group-hover:text-primary/20 transition-colors">{s.step}</span>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mt-3 mb-2">
                  <s.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-base font-semibold font-heading">{s.title}</h3>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/how-it-works">
              <Button variant="hero-outline" size="lg">
                Learn More <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-5">
              Ready to Start Your{" "}
              <span className="text-primary">Learning Journey?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              Join thousands of learners who are already experiencing accessible, AI-powered education.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="hero-outline" size="xl">
                  Learn About Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePreview;
