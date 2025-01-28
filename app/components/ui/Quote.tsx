import { motion } from 'framer-motion';

export function Quote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-4 right-4 max-w-md bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10"
    >
      <p className="text-white/60 text-sm italic mb-2">
        &ldquo;Some people never go crazy. What truly horrible lives they must lead.&rdquo;
      </p>
      <p className="text-white/40 text-xs text-right">— Charles Bukowski</p>
    </motion.div>
  );
}
