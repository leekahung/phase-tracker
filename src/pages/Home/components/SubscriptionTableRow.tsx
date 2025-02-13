import { Link } from 'react-router';
import type { IMemberInfo } from '@/types/dataTypes';
import { useSelectedMember } from '@/hooks/useSelectedMember';

interface Props {
  member: IMemberInfo;
}

export default function SubscriptionTableRow({ member }: Props): React.JSX.Element {
  const { setSelectedMember } = useSelectedMember();
  return (
    <tr
      className="border-b border-slate-300 transition-transform delay-[300] duration-500 ease-in-out last:border-b-0 hover:scale-[105%]"
      key={member.id}
    >
      <td className="hidden sm:table-cell sm:p-4">
        <div className="flex items-center justify-center">
          <img
            src={member.channel_image}
            alt="channel image"
            height="60px"
            width="60px"
            className="rounded-full"
          />
        </div>
      </td>
      <td className="p-2 sm:p-4">
        <div>
          <Link
            className="flex flex-col items-center justify-center underline"
            to={`https://www.youtube.com/${member.channel_handle}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              src={member.channel_image}
              alt="channel image"
              height="60px"
              width="60px"
              className="rounded-full sm:hidden"
            />
            {member.channel_name}
          </Link>
        </div>
      </td>
      <td className="hidden sm:table-cell sm:p-4">{member.generation}</td>
      <td className="p-2 sm:p-4">{member.subscribers.toLocaleString()}</td>
      <td className="p-2 sm:p-4">
        <Link
          className="hover:text-slate-10 underline"
          to={`/member/${member.channel_handle.slice(1)}`}
          onClick={() => setSelectedMember(member.channel_handle)}
        >
          Info
        </Link>
      </td>
      <td className="hidden w-[160px] sm:table-cell sm:p-4">
        <div className="flex flex-col">
          <span>{`${new Date(member.updated_at).toLocaleDateString()}`}</span>
          <span>{`${new Date(member.updated_at).toLocaleTimeString()}`}</span>
        </div>
      </td>
    </tr>
  );
}
