import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router';
import { Fragment } from 'react/jsx-runtime';

interface Props {
  children: React.ReactNode;
}

export default function TransitionLayout({ children }: Props) {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Fragment key={location.pathname}>
        <motion.div
          initial={{ transform: 'translateY(0)', opacity: 1 }}
          animate={{ transform: 'translateY(100%)', opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-black"
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </Fragment>
    </AnimatePresence>
  );
}
