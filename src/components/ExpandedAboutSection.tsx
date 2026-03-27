import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Target, Users, Lightbulb, Rocket, GraduationCap } from "lucide-react";

const values = [
  { icon: Heart, title: "Inclusivity First", description: "Every decision we make prioritizes making education accessible to all people." },
  { icon: Target, title: "Innovation Driven", description: "We leverage cutting-edge AI to push the boundaries of accessible education." },
  { icon: Users, title: "Community Focused", description: "We build with and for our community, incorporating feedback at every step." },
  { icon: Lightbulb, title: "Continuous Improvement", description: "We're always learning, iterating, and improving our platform for our users." },
];

const ExpandedAboutSection = () => {
  const valuesRef = useRef(null);
  const storyRef = useRef(null);
  const visionRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-60px" });
  const storyInView = useInView(storyRef, { once: true, margin: "-60px" });
  const visionInView = useInView(visionRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* Values */}
      <section className="py-16 lg:py-24 bg-section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={valuesRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              NeuroLearn was founded on the belief that every person deserves access to quality education, 
              regardless of their physical or cognitive abilities. We combine artificial intelligence with 
              inclusive design to break down learning barriers.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center card-hover hover:border-primary/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold font-heading mb-2 text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl" ref={storyRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
                Why We <span className="text-primary">Built NeuroLearn</span>
              </h2>
            </div>

            <div className="bg-background rounded-2xl p-8 border border-border space-y-5">
              <p className="text-muted-foreground leading-relaxed">
                NeuroLearn started when our founder witnessed firsthand how traditional e-learning platforms excluded students with disabilities. Course videos lacked captions, reading materials were inaccessible to screen readers, and adaptive tools were an afterthought at best.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We realized that accessibility shouldn't be a premium add-on — it should be the foundation. So we set out to build a learning platform where every feature, from the ground up, is designed with accessibility at its core.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, NeuroLearn uses AI to automatically convert educational content into multiple accessible formats, provides an intelligent study assistant trained in accessibility pedagogy, and offers a comprehensive dashboard that helps both students and educators track accessible learning progress.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8" ref={visionRef}>
          <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={visionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl p-8 border border-border card-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Rocket className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where every learner, regardless of disability, has equal access to high-quality education powered by intelligent, adaptive technology that understands and responds to their unique needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={visionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border card-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To eliminate barriers in education by building the most comprehensive AI-powered accessible learning platform — making every course, lesson, and interaction fully inclusive from day one.
              </p>
            </motion.div>
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
            Join Our <span className="text-primary">Mission</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Whether you're a student, educator, or institution — let's build a more accessible future together.
          </p>
          <Link to="/contact">
            <Button variant="hero" size="xl">
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default ExpandedAboutSection;
