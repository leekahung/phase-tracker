import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

export default function TransitionLayout({ children }: Props) {
  return (
    <>
      <motion.div
        initial={{ transform: 'translateY(0)', opacity: 1 }}
        animate={{ transform: 'translateY(100%)', opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 bg-black"
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </>
  );
}
