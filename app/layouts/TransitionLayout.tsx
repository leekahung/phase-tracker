import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router';

interface Props {
  children: React.ReactNode;
}

export default function TransitionLayout({ children }: Props) {
  const location = useLocation();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ transform: 'translateY(0)', opacity: 1 }}
        animate={{ transform: 'translateY(100%)', opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 bg-black"
        key={location.pathname}
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
