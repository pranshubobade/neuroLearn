import { motion } from "framer-motion";
import ExpandedHowItWorksSection from "@/components/ExpandedHowItWorksSection";
import PageHero from "@/components/PageHero";

const HowItWorksPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
    <PageHero
      badge="How It Works"
      title="Start Learning in"
      highlight="Five Simple Steps"
      description="Getting started with NeuroLearn is easy. Our streamlined process ensures you're learning in minutes."
    />
    <ExpandedHowItWorksSection />
  </motion.div>
);

export default HowItWorksPage;
