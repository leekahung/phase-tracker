import { Link } from 'react-router';
import HomeIconSVG from '../icons/HomeIconSVG';
import Sidebar from './Sidebar';

export default function Navbar() {
  return (
    <>
      <Sidebar />
      <div>
        <Link
          to="/"
          aria-label="home link"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-slate-600"
        >
          <HomeIconSVG />
        </Link>
      </div>
    </>
  );
}
