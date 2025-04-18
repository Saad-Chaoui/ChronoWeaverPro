import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  isLoading: boolean;
}

export default function PreloaderAnimation({ isLoading }: PreloaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-background z-50"
        >
          <div className="flex flex-col items-center">
            <motion.div 
              className="w-12 h-12 mb-4 rounded-full border-4 border-primary/30 border-t-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div className="text-primary font-display font-semibold">Initializing Chrono Weaver...</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
