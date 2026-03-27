import { motion } from "framer-motion";
import ExpandedContactSection from "@/components/ExpandedContactSection";
import PageHero from "@/components/PageHero";

const ContactPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
    <PageHero
      badge="Contact Us"
      title="Get in"
      highlight="Touch"
      description="Have questions about NeuroLearn? We'd love to hear from you."
    />
    <ExpandedContactSection />
  </motion.div>
);

export default ContactPage;
