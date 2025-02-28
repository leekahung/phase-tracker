import { Link } from 'react-router';
import type { IMemberInfo } from '@/types/dataTypes';
import { useSelectedMember } from '@/hooks/useSelectedMember';
import Avatar from '@/global/components/Avatar';

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
          <Avatar htmlSrc={member.channelImage} height={60} />
        </div>
      </td>
      <td className="p-2 sm:p-4">
        <div>
          <Link
            className="flex flex-col items-center justify-center underline hover:text-slate-100"
            to={`https://www.youtube.com/${member.channelHandle}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Avatar htmlSrc={member.channelImage} height={60} additionalClassName="sm:hidden" />
            {member.channelName}
          </Link>
        </div>
      </td>
      <td className="hidden sm:table-cell sm:p-4">{member.generation}</td>
      <td className="p-2 sm:p-4">{member.subscribers.toLocaleString()}</td>
      <td className="p-2 sm:p-4">
        <Link
          className="underline hover:text-slate-100"
          to={`/member/${member.channelHandle.slice(1)}`}
          onClick={() => setSelectedMember(member.channelHandle)}
        >
          Info
        </Link>
      </td>
    </tr>
  );
}
