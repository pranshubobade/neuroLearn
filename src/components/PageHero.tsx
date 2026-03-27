import { motion } from "framer-motion";

interface PageHeroProps {
  badge: string;
  title: string;
  highlight: string;
  description: string;
}

const PageHero = ({ badge, title, highlight, description }: PageHeroProps) => (
  <section className="relative bg-background pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
    {/* Gradient orbs */}
    <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
    <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-purple/5 rounded-full blur-[120px]" />

    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
          {badge}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-heading mb-6 leading-[0.95] tracking-tight">
          {title} <span className="text-primary">{highlight}</span>
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">{description}</p>
      </motion.div>
    </div>
  </section>
);

export default PageHero;
