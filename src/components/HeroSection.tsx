import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Marquee } from "@/components/ui/marquee";

const teamAvatars = [
  { initials: "JD", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" },
  { initials: "HJ", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
  { initials: "PI", src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
  { initials: "KD", src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
  { initials: "LD", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face" },
];

const stats = [
  { emoji: "🚀", label: "ACTIVE LEARNERS WORLDWIDE", value: "50K+" },
  { emoji: "📈", label: "SATISFACTION RATE", value: "98%" },
  { emoji: "💰", label: "COURSES AVAILABLE", value: "200+" },
  { emoji: "🎯", label: "ACCESSIBILITY SCORE", value: "AAA" },
];

function AvatarStack() {
  return (
    <div className="flex items-center -space-x-3">
      {teamAvatars.map((member, i) => (
        <Avatar key={i} className="size-10 border-2 border-background">
          <AvatarImage src={member.src} />
          <AvatarFallback>{member.initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

function StatsMarquee() {
  return (
    <Marquee className="[--duration:25s]" pauseOnHover>
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-3 px-6">
          <span className="text-3xl sm:text-4xl font-bold font-heading text-primary">
            {stat.value}
          </span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider max-w-[120px]">
            {stat.label}
          </span>
          <span className="text-2xl">{stat.emoji}</span>
        </div>
      ))}
    </Marquee>
  );
}

const HeroSection = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-purple/5 blur-[120px]" />

      {/* Stats marquee bar */}
      <div className="border-b border-border py-4 overflow-hidden">
        <StatsMarquee />
      </div>

      {/* Main hero */}
      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge + Avatars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <AvatarStack />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-sm font-medium text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              AI-Powered Accessible Learning
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold font-heading leading-[0.95] tracking-tight"
          >
            Learn Without{" "}
            <span className="text-primary">Barriers,</span>
            <br />
            <span className="text-muted-foreground">Powered by AI</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            NeuroLearn makes education accessible to everyone through AI-driven personalization, 
            adaptive interfaces, and inclusive design that meets every learner where they are.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/features">
              <Button variant="hero" size="xl">
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="hero-outline" size="xl">
                Watch Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Trusted by bar */}
      <div className="border-t border-border py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 text-center">Trusted by leading institutions</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14 opacity-30">
            {["MIT OpenCourseWare", "Stanford Online", "Coursera", "edX", "Khan Academy", "Udacity"].map((name) => (
              <span key={name} className="text-sm font-bold font-heading text-foreground whitespace-nowrap">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
