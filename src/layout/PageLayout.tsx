import { useEffect, useRef, useState } from 'react';
import ChevronUpSVG from '../assets/ChevronUpSVG';
import Navbar from '../global/Navbar/Navbar';

interface Props {
  children: React.JSX.Element;
}

export default function PageLayout({ children }: Props): React.JSX.Element {
  const [showButton, setShowButton] = useState(false);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current !== null) {
        const elementPositionTop = mainRef.current.getBoundingClientRect().top + window.scrollY;
        const windowHeight = window.innerHeight;
        setShowButton(
          window.scrollY > elementPositionTop + mainRef.current.offsetHeight * 0.8 - windowHeight
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div>
        <header>
          <Navbar />
          {/* navbar section */}
        </header>
        <main ref={mainRef}>{children}</main>
        <footer className="relative">
          <div className="flex h-10 items-center justify-center">{/* copyright section */}</div>
        </footer>
      </div>
      <button
        className={`fixed bottom-0 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition sm:h-12 sm:w-12 ${showButton ? '-translate-y-4 opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
        type="button"
      >
        <ChevronUpSVG />
      </button>
    </>
  );
}
