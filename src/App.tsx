import { Outlet, useLocation } from "react-router";
import PageLayout from "./layout/PageLayout";
import { Home } from "./pages/Home/Home";

function App() {
  const location = useLocation();

  return (
    <PageLayout>{location.pathname === "/" ? <Home /> : <Outlet />}</PageLayout>
  );
}

export default App;
