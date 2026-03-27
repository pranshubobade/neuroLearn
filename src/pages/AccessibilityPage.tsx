import { motion } from "framer-motion";
import AccessibilitySection from "@/components/AccessibilitySection";
import ExpandedAccessibilitySection from "@/components/ExpandedAccessibilitySection";
import PageHero from "@/components/PageHero";

const AccessibilityPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
    <PageHero
      badge="Accessibility"
      title="Designed for"
      highlight="Everyone"
      description="Accessibility isn't an afterthought — it's our foundation. Every feature is built to ensure no learner is left behind."
    />
    <AccessibilitySection />
    <ExpandedAccessibilitySection />
  </motion.div>
);

export default AccessibilityPage;
