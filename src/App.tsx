import { Outlet, useLocation } from 'react-router';
import PageLayout from './layout/PageLayout';
import { Home } from './pages/Home/Home';
import { useEffect } from 'react';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <PageLayout>{pathname === '/' ? <Home /> : <Outlet />}</PageLayout>;
}

export default App;
