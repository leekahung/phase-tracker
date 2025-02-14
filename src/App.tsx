import { Outlet, useLocation } from 'react-router';
import PageLayout from './layout/PageLayout';
import { useEffect } from 'react';
import { SelectedMemberContextProvider } from './contexts/SelectedMemberContext';
import Home from './pages/Home/Home';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <SelectedMemberContextProvider>
      <PageLayout>{pathname === '/' ? <Home /> : <Outlet />}</PageLayout>
    </SelectedMemberContextProvider>
  );
}

export default App;
