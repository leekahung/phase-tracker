import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

interface Props {
  setShowButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ScrollProgressBar({ setShowButton }: Props) {
  const { pathname } = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const viewportHeight = window.visualViewport?.height || window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const progress = (window.scrollY / (documentHeight - viewportHeight)) * 100;
        if (Number.isNaN(progress)) {
          setScrollProgress(0);
          setShowButton(false);
        } else {
          setScrollProgress(progress);
          setShowButton(progress > 50);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <div
      className={`fixed top-0 z-50 h-1 bg-blue-400`}
      style={{ width: `${scrollProgress.toFixed(0)}vw` }}
    />
  );
}
