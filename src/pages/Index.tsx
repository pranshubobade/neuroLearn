import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Languages, Hand, Brain, Mic, GraduationCap,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    icon: Languages,
    title: "AI Content Converter",
    description: "Convert text to speech, speech to text, translate, simplify, and generate alt text — all in one workspace.",
    to: "/tools/content-converter",
    color: "primary",
  },
  {
    icon: Hand,
    title: "Sign Language Avatar",
    description: "AI-powered avatar translates text and audio into sign language in real time.",
    to: "/tools/sign-language",
    color: "teal",
  },
  {
    icon: Brain,
    title: "AI Doubt Solver",
    description: "Ask questions via text or voice and receive answers in text, audio, or sign language.",
    to: "/tools/doubt-solver",
    color: "purple",
  },
  {
    icon: Mic,
    title: "Voice Navigation",
    description: "Navigate the entire platform using voice commands — hands-free, eyes-free learning.",
    to: "/tools/voice-navigation",
    color: "blue",
  },
  {
    icon: GraduationCap,
    title: "Adaptive Learning",
    description: "AI tracks progress, recommends lessons, and personalizes the learning experience.",
    to: "/tools/adaptive-learning",
    color: "orange",
  },
];

const colorMap: Record<string, string> = {
  primary: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
  teal: "bg-teal/10 text-teal group-hover:bg-teal group-hover:text-primary-foreground",
  purple: "bg-purple/10 text-purple group-hover:bg-purple group-hover:text-primary-foreground",
  blue: "bg-blue/10 text-blue group-hover:bg-blue group-hover:text-primary-foreground",
  orange: "bg-orange/10 text-orange group-hover:bg-orange group-hover:text-primary-foreground",
};

const Index = () => {
  return (
    <>
      <HeroSection />

      {/* Feature Preview Cards */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">Platform Tools</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading">
              Inclusive Education Features
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Every tool is designed for learners with disabilities — powered by AI, built for accessibility.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to={tool.to}
                  className="group block bg-card border border-border rounded-2xl p-6 card-hover hover:border-primary/30 transition-all h-full"
                  aria-label={`Open ${tool.title}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${colorMap[tool.color]}`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-foreground mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tool.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Tool <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
