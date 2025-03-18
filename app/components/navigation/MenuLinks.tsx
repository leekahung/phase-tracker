import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import type { IMemberInfo } from '~/types/dataTypes';
import NavButton from '../global/NavButton';

interface Props {
  itemList: {
    generation: string;
    members: IMemberInfo[];
  };
}

export default function MenuLinks({ itemList }: Props) {
  const location = useLocation();
  const collapseRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (collapseRef.current !== null) {
      collapseRef.current.checked = false;
    }
  }, [location]);

  return (
    <div key={itemList.generation} className="collapse-arrow collapse hover:bg-slate-500">
      <input type="checkbox" aria-label="toggle menu" ref={collapseRef} />
      <span className="collapse-title">{itemList.generation}</span>
      <ul className="menu collapse-content w-[95%] py-0 text-sm before:invisible">
        {itemList.members.map((member) => {
          return (
            <li key={member.id} className="pt-4 first:pt-0">
              <NavButton to={`/member/${member.channelHandle}`}>{member.channelName}</NavButton>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
