import { Link } from 'react-router';
import Avatar from '~/components/global/Avatar';
import ExternalLink from '~/components/global/ExternalLink';
import type { IMemberInfo } from '~/types/dataTypes';

interface Props {
  member: IMemberInfo;
}

export default function SubscriberTableRows({ member }: Props) {
  return (
    <tr key={member.channelId}>
      <td className="hidden sm:table-cell">
        <Avatar className="h-15 w-15 rounded-full" src={member.channelImage} />
      </td>
      <td>
        <div className="flex flex-col items-center gap-2">
          <Avatar className="h-15 w-15 rounded-full sm:hidden" src={member.channelImage} />
          <ExternalLink to={`https://www.youtube.com/${member.channelHandle}`}>
            {member.channelName}
          </ExternalLink>
        </div>
      </td>
      <td className="hidden sm:table-cell">{member.generation}</td>
      <td>{member.subscribers.toLocaleString()}</td>
      <td>
        <Link to={`/member/${member.channelHandle}`} className="underline">
          Link
        </Link>
      </td>
    </tr>
  );
}
