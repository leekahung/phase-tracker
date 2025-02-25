import { useEffect, useState } from 'react';
import ChevronUpSVG from '@/assets/ChevronUpSVG';
import Navbar from '@/global/navigation/Navbar/Navbar';
import { useLocation } from 'react-router';

interface Props {
  children: React.JSX.Element;
}

export default function PageLayout({ children }: Props): React.JSX.Element {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);
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
    <>
      <div
        className={`fixed top-0 z-50 h-1 bg-blue-400`}
        style={{ width: `${scrollProgress.toFixed(0)}vw` }}
      />
      <div className="grid min-h-screen grid-rows-[80px_1fr_80px]">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer className="flex flex-col items-center justify-center gap-2 text-sm">
          <span>Created by leekahung</span>
        </footer>
      </div>
      <button
        className={`fixed bottom-0 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition sm:h-12 sm:w-12 ${showButton ? '-translate-y-4 opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          setShowButton(false);
        }}
        type="button"
      >
        <ChevronUpSVG />
        <span className="sr-only">scroll to top</span>
      </button>
    </>
  );
}
