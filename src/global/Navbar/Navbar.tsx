import { Link } from "react-router";
import { useSelectedMember } from "../../hooks/useSelectedMember";

export default function Navbar(): React.JSX.Element {
  const { setSelectedMember } = useSelectedMember();
  return (
    <nav className="flex items-end justify-end p-4">
      <Link
        className="text-l text-slate-200"
        to="/"
        onClick={() => setSelectedMember("")}
      >
        <strong>Home</strong>
      </Link>
    </nav>
  );
}
