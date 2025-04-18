import { useState } from 'react';
import Navbar from '~/components/navigation/Navbar';
import PageFooter from './PageFooter';
import ScrollToTopButton from './components/ScrollToTop';
import ScrollProgressBar from './components/ScrollProgressBar';

interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  const [showButton, setShowButton] = useState(false);

  return (
    <>
      <ScrollProgressBar setShowButton={setShowButton} />
      <div className="grid min-h-screen grid-rows-[80px_1fr_80px]">
        <header className="flex items-center justify-between p-4">
          <Navbar />
        </header>
        <main>{children}</main>
        <footer className="footer items-center justify-center">
          <PageFooter />{' '}
        </footer>
      </div>
      <ScrollToTopButton showButton={showButton} setShowButton={setShowButton} />
    </>
  );
}
