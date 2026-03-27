import { motion } from "framer-motion";
import ExpandedFeaturesSection from "@/components/ExpandedFeaturesSection";
import PageHero from "@/components/PageHero";

const FeaturesPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
    <PageHero
      badge="Features"
      title="Everything You Need to"
      highlight="Learn Effectively"
      description="Powerful features designed to make learning accessible, engaging, and effective for everyone."
    />
    <ExpandedFeaturesSection />
  </motion.div>
);

export default FeaturesPage;
