import { motion } from 'framer-motion';
import { memo } from 'react';

// Static component, memoized to skip re-renders
export const Quote = memo(function Quote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-4 right-4 max-w-xs lg:max-w-md bg-white/5 backdrop-blur-sm p-3 lg:p-4 rounded-lg border border-white/10 hidden lg:block"
    >
      <p className="text-white/60 text-sm italic mb-2">
        &ldquo;Some people never go crazy. What truly horrible lives they must lead.&rdquo;
      </p>
      <p className="text-white/40 text-xs text-right">— Charles Bukowski</p>
    </motion.div>
  );
});
