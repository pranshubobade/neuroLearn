import { motion } from "framer-motion";
import CloudWatchForm from "@/components/ui/cloud-watch-form";

const LoginPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-purple/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4 py-12"
      >
        <CloudWatchForm />
      </motion.div>
    </div>
  );
};

export default LoginPage;
