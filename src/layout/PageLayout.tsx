import { useEffect, useRef, useState } from 'react';
import ChevronUpSVG from '@/assets/ChevronUpSVG';
import Navbar from '@/global/navigation/Navbar/Navbar';
import { useLocation } from 'react-router';

interface Props {
  children: React.JSX.Element;
}

export default function PageLayout({ children }: Props): React.JSX.Element {
  const { pathname } = useLocation();
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
      <div className="fixed z-50 h-2 bg-blue-500" />
      <div>
        <header>
          <Navbar />
        </header>
        <main ref={mainRef}>{children}</main>
        {pathname === '/' && (
          <footer className="relative p-4 pb-10">
            <div className="flex h-10 flex-col items-center justify-center gap-2 text-sm">
              {/* copyright section */}
              <span>Created by leekahung</span>
              <em className="text-center">
                Creator is not affiliated with Phase Connect or any of their affiliated members
              </em>
            </div>
          </footer>
        )}
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
