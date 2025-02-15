import { useEffect, useRef, useState } from 'react';
import ChevronUpSVG from '@/assets/ChevronUpSVG';
import Navbar from '@/global/navigation/Navbar/Navbar';

interface Props {
  children: React.JSX.Element;
}

export default function PageLayout({ children }: Props): React.JSX.Element {
  const [showButton, setShowButton] = useState(false);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current !== null) {
        const elementPositionTop = mainRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setShowButton(
          window.scrollY > elementPositionTop + mainRef.current.offsetHeight - windowHeight
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="grid min-h-screen grid-rows-[80px_1fr_80px]">
        <header>
          <Navbar />
        </header>
        <main ref={mainRef}>{children}</main>
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
