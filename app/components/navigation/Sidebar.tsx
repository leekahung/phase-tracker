import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import HamburgerMenuSVG from '../icons/HamburgerMenuSVG';
import Divider from '../../layouts/Divider';
import useChannels from '~/hooks/useChannels';
import MenuLinks from './MenuLinks';
import NavButton from '../global/NavButton';

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
          <nav className="flex min-h-full w-80 flex-col items-center bg-slate-600">
            <ul className="menu text-base-content w-full gap-4 p-4 pb-0 text-base">
              <li>
                <NavButton to="/">Home</NavButton>
              </li>
              <li>
                <NavButton to="/about">About</NavButton>
              </li>
            </ul>
            <Divider />
            <div className="menu text-base-content w-full p-4 pt-0 text-base">
              {genLists.map((gen) => {
                return <MenuLinks key={gen.generation} itemList={gen} />;
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
