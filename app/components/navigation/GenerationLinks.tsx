import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router';

interface Props {
  genList: {
    generation: string;
    members: IMemberInfo[];
  };
}

export default function GenerationLinks({ genList }: Props) {
  const location = useLocation();
  const collapseRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (collapseRef.current !== null) {
      collapseRef.current.checked = false;
    }
  }, [location]);

  return (
    <div key={genList.generation} className="collapse-arrow collapse">
      <input type="checkbox" ref={collapseRef} />
      <span className="collapse-title">{genList.generation}</span>
      <ul className="menu collapse-content w-[95%] py-0 text-sm before:invisible">
        {genList.members.map((member) => {
          return (
            <li key={member.id} className="pt-4 first:pt-0">
              <NavLink
                to={`/member/${member.channelHandle}`}
                className={({ isActive }) =>
                  `${isActive ? 'bg-slate-700' : 'bg-transparent'} active:!bg-slate-600/50`
                }
              >
                {member.channelName}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
