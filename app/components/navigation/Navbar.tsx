import { Link } from "react-router";
import HomeIconSVG from "../icons/HomeIconSVG";
import Sidebar from "./Sidebar";

export default function Navbar() {
  return (
    <>
      <Sidebar />
      <Link
        to="/"
        aria-label="home link"
        className="rounded-full cursor-pointer w-10 h-10 flex items-center justify-center hover:bg-slate-600"
      >
        <HomeIconSVG />
      </Link>
    </>
  );
}
