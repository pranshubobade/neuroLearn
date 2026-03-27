import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Target, Users, Lightbulb } from "lucide-react";

const values = [
  { icon: Heart, title: "Inclusivity First", description: "Every decision we make prioritizes making education accessible to all people." },
  { icon: Target, title: "Innovation Driven", description: "We leverage cutting-edge AI to push the boundaries of accessible education." },
  { icon: Users, title: "Community Focused", description: "We build with and for our community, incorporating feedback at every step." },
  { icon: Lightbulb, title: "Continuous Improvement", description: "We're always learning, iterating, and improving our platform for our users." },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-16 lg:py-24 bg-section-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
              animate={inView ? { opacity: 1, y: 0 } : {}}
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
  );
};

export default AboutSection;
