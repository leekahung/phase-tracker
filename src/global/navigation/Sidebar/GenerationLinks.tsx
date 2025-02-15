import { NavLink, useLocation } from 'react-router';
import { useSelectedMember } from '@/hooks/useSelectedMember';
import { IMemberInfo } from '@/types/dataTypes';
import { useEffect, useRef } from 'react';

interface Props {
  generation: string;
  members: IMemberInfo[];
}

export default function GenerationLinks({ generation, members }: Props): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();
  const { setSelectedMember } = useSelectedMember();

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.checked = false;
    }
  }, [location]);

  return (
    <div className="collapse collapse-arrow px-2">
      <input aria-label="collapse links" type="checkbox" ref={inputRef} />
      <div className="collapse-title flex items-center text-base">
        <strong>{generation}</strong>
      </div>
      <div className="collapse-content">
        <ul className="flex flex-col gap-2">
          {members.map((member) => (
            <li key={member.id}>
              <NavLink
                to={`/member/${member.channel_handle.slice(1)}`}
                onClick={() => {
                  setSelectedMember(member.channel_handle);
                }}
              >
                {member.channel_name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
