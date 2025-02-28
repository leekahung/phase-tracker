import { Link } from 'react-router';
import type { IMemberInfo } from '@/types/dataTypes';
import MemberTableRow from './MemberTableRow';

interface Props {
  selectedMemberObject: IMemberInfo;
}

export default function MemberTable({ selectedMemberObject }: Props): React.JSX.Element {
  return (
    <table className="table max-w-sm text-center text-sm sm:text-base">
      <tbody>
        <MemberTableRow topic="Name (EN)" value={selectedMemberObject?.memberNameEn} />
        <MemberTableRow topic="Name (JP)" value={selectedMemberObject?.memberNameJp} />
        <MemberTableRow topic="Generation" value={selectedMemberObject?.generation} />
        <MemberTableRow
          topic="Subscribers"
          value={selectedMemberObject?.subscribers.toLocaleString()}
        />
        <MemberTableRow
          topic="View Count"
          value={selectedMemberObject?.viewCount.toLocaleString()}
        />
        <MemberTableRow
          topic="Video Count"
          value={selectedMemberObject?.videoCount.toLocaleString()}
        />
        <tr>
          <th>Link to Channel</th>
          <td>
            <Link
              className="underline"
              to={`https://www.youtube.com/${selectedMemberObject?.channelHandle}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Link
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
