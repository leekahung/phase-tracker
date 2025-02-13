import { Link } from 'react-router';
import { useSelectedMember } from '@/hooks/useSelectedMember';
import HomeIconSVG from '@/assets/HomeIconSVG';
import Sidebar from '../Sidebar/Sidebar';

export default function Navbar(): React.JSX.Element {
  const { setSelectedMember } = useSelectedMember();
  return (
    <nav className="flex items-center justify-between p-4">
      <Sidebar />
      <Link
        className="btn btn-circle border-0 bg-transparent text-slate-300"
        to="/"
        onClick={() => setSelectedMember('')}
      >
        <HomeIconSVG />
      </Link>
    </nav>
  );
}
