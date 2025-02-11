import { Outlet, useLocation } from "react-router";
import PageLayout from "./layout/PageLayout";
import { Home } from "./pages/Home/Home";
import { useEffect } from "react";
import { SelectedMemberContextProvider } from "./contexts/SelectedMemberContext";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <SelectedMemberContextProvider>
      <PageLayout>{pathname === "/" ? <Home /> : <Outlet />}</PageLayout>
    </SelectedMemberContextProvider>
  );
}

export default App;
