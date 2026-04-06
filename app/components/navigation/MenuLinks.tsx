import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import type { IMemberInfo } from '~/types/dataTypes';
import NavButton from '../global/NavButton';
import { generationColors } from '~/utils/tableHelpers';

interface Props {
  itemList: {
    generation: string;
    members: IMemberInfo[];
  };
  isActiveGen?: boolean;
}

export default function MenuLinks({ itemList, isActiveGen }: Props) {
  const location = useLocation();
  const collapseRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (collapseRef.current !== null) {
      collapseRef.current.checked = false;
    }
  }, [location]);

  return (
    <div
      key={itemList.generation}
      className={`collapse-arrow collapse hover:bg-slate-200 dark:hover:bg-slate-500 ${isActiveGen ? 'bg-slate-200/70 dark:bg-slate-500/50' : ''}`}
    >
      <input type="checkbox" aria-label="toggle menu" ref={collapseRef} />
      <span className="collapse-title flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: generationColors[itemList.generation] }}
        />
        {itemList.generation}
      </span>
      <ul className="menu collapse-content w-[95%] py-0 text-sm before:invisible">
        {itemList.members.map((member) => {
          return (
            <li key={member.id} className="pt-3 first:pt-0 last:pb-4">
              <NavButton to={`/member/${member.channelHandle}`}>{member.channelName}</NavButton>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
