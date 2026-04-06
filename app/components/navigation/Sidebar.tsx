import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import HamburgerMenuSVG from '../icons/HamburgerMenuSVG';
import Divider from '../../layouts/components/Divider';
import useChannels from '~/hooks/useChannels';
import MenuLinks from './MenuLinks';
import { groupByGeneration } from '~/utils/tableHelpers';
import NavButton from '../global/NavButton';

export default function Sidebar() {
  const { members } = useChannels();
  const groupByGen = members ? groupByGeneration(members) : undefined;
  const genLists = Object.entries(groupByGen ?? {}).map(([key, value]) => ({
    generation: key,
    members: value,
  }));
  const location = useLocation();
  const sidebarRef = useRef<HTMLInputElement>(null);

  const memberHandle = location.pathname.startsWith('/member/')
    ? location.pathname.split('/member/')[1]
    : null;
  const activeGeneration = members?.find((m) => m.channelHandle === memberHandle)?.generation;

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
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-600"
        >
          <HamburgerMenuSVG />
        </label>
        <div className="drawer-side">
          <label htmlFor="sidebar-drawer" aria-label="close sidebar" className="drawer-overlay" />
          <nav className="flex min-h-full w-64 flex-col items-center bg-slate-100 sm:w-80 dark:bg-slate-600">
            <ul className="menu text-base-content w-full gap-2 p-4 pb-0 text-base">
              <li>
                <NavButton to="/">Home</NavButton>
              </li>
              <li>
                <NavButton to="/about">About</NavButton>
              </li>
              <li>
                <NavButton to="/group-view">Group View</NavButton>
              </li>
            </ul>
            <Divider />
            <div className="menu text-base-content w-full gap-2 p-4 pt-0 text-base">
              <p className="px-2 pb-1 text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Members
              </p>
              {genLists.map((gen) => {
                return (
                  <MenuLinks
                    key={gen.generation}
                    itemList={gen}
                    isActiveGen={gen.generation === activeGeneration}
                  />
                );
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
