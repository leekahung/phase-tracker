import HamburgerMenuSVG from '@/assets/HamburgerMenuSVG';
import useChannels from '@/hooks/useChannels';
import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router';
import GenerationLinks from './GenerationLinks';
import { useSelectedMember } from '@/hooks/useSelectedMember';

export default function Sidebar(): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();
  const { members } = useChannels();
  const { setSelectedMember } = useSelectedMember();
  const groupedByGen = members?.reduce(
    (group: Record<string, typeof members>, member) => {
      (group[member.generation] ||= []).push(member);
      return group;
    },
    {} as Record<string, typeof members>
  );

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.checked = false;
    }
  }, [location]);

  return (
    <aside className="drawer z-10">
      <input
        aria-label="toggle sidebar"
        id="sidebar"
        type="checkbox"
        className="drawer-toggle"
        ref={inputRef}
      />
      <div className="drawer-content">
        <label
          htmlFor="sidebar"
          className="btn btn-circle drawer-button border-0 bg-transparent text-slate-300"
        >
          <HamburgerMenuSVG />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar" aria-label="close sidebar" className="drawer-overlay" />
        <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
          <div className="flex flex-col gap-4 px-2 text-base">
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  setSelectedMember('');
                }}
              >
                <strong className="text-slate-300">Home</strong>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={() => {
                  setSelectedMember('');
                }}
              >
                <strong className="text-slate-300">About</strong>
              </NavLink>
            </li>
          </div>
          <hr className="my-4" />
          {groupedByGen !== undefined &&
            Object.entries(groupedByGen).map(([generation, members]) => (
              <GenerationLinks generation={generation} members={members} key={generation} />
            ))}
        </ul>
      </div>
    </aside>
  );
}
