import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router';
import HamburgerMenuSVG from '../icons/HamburgerMenuSVG';
import Divider from '../../layouts/Divider';
import useChannels from '~/hooks/useChannels';
import GenerationLinks from './GenerationLinks';

export default function Sidebar() {
  const { members } = useChannels();
  const groupByGen = members?.reduce(
    (group, member) => {
      (group[member.generation] ||= []).push(member);
      return group;
    },
    {} as Record<string, typeof members>
  );
  const genLists = Object.entries(groupByGen ?? {}).map(([key, value]) => ({
    generation: key,
    members: value,
  }));
  const location = useLocation();
  const sidebarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sidebarRef.current !== null) {
      sidebarRef.current.checked = false;
    }
  }, [location]);

  return (
    <>
      <aside className="drawer z-50">
        <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" ref={sidebarRef} />
        <label
          htmlFor="sidebar-drawer"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-slate-600"
        >
          <HamburgerMenuSVG />
        </label>
        <div className="drawer-side">
          <label htmlFor="sidebar-drawer" aria-label="close sidebar" className="drawer-overlay" />
          <div className="min-h-full w-80 bg-slate-800">
            <ul className="menu text-base-content w-full gap-4 p-4 pb-0 text-base">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${isActive ? 'bg-slate-700' : 'bg-transparent'} active:!bg-slate-600/50`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${isActive ? 'bg-slate-700' : 'bg-transparent'} active:!bg-slate-600/50`
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
            <div className="flex justify-center">
              <Divider />
            </div>
            <div className="menu text-base-content w-full p-4 pt-0 text-base">
              {genLists.map((gen) => {
                return <GenerationLinks key={gen.generation} genList={gen} />;
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
