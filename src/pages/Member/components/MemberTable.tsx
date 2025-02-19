import { Link } from 'react-router';
import type { IMemberInfo } from '@/types/dataTypes';

interface Props {
  selectedMemberObject: IMemberInfo;
}

export default function MemberTable({ selectedMemberObject }: Props): React.JSX.Element {
  return (
    <table className="table max-w-sm text-center text-sm sm:text-base">
      <tbody>
        <tr className="border-b border-slate-300">
          <th>Name (EN)</th>
          <td>{selectedMemberObject?.memberNameEN}</td>
        </tr>
        <tr className="border-b border-slate-300">
          <th>Name (JP)</th>
          <td>{selectedMemberObject?.memberNameJP}</td>
        </tr>
        <tr className="border-b border-slate-300">
          <th>Generation</th>
          <td>{selectedMemberObject?.generation}</td>
        </tr>
        <tr className="border-b border-slate-300">
          <th>Subscribers</th>
          <td>{selectedMemberObject?.subscribers.toLocaleString()}</td>
        </tr>
        <tr className="border-b border-slate-300">
          <th>View Count</th>
          <td>{selectedMemberObject?.viewCount.toLocaleString()}</td>
        </tr>
        <tr className="border-b border-slate-300">
          <th>Video Count</th>
          <td>{selectedMemberObject?.videoCount.toLocaleString()}</td>
        </tr>
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
