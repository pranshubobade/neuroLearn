import { motion } from "framer-motion";
import ExpandedAboutSection from "@/components/ExpandedAboutSection";
import PageHero from "@/components/PageHero";

const AboutPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
    <PageHero
      badge="About Us"
      title="Our Mission:"
      highlight="Education for All"
      description="NeuroLearn was founded on the belief that every person deserves access to quality education, regardless of their physical or cognitive abilities."
    />
    <ExpandedAboutSection />
  </motion.div>
);

export default AboutPage;
