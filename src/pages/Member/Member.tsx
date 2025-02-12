import { useSelectedMember } from '../../hooks/useSelectedMember';

export default function Member(): React.JSX.Element {
  const { selectedMemberObject } = useSelectedMember();

  return (
    <div className="mx-8 flex flex-col items-center gap-4 text-slate-300">
      <img className="rounded-full" src={selectedMemberObject?.channel_image} alt="channel image" />
      <h1 className="text-3xl">{selectedMemberObject?.channel_name}</h1>
      <table className="table max-w-sm text-center text-sm sm:text-base">
        <tbody>
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
          <tr>
            <th>Video Count</th>
            <td>{selectedMemberObject?.videoCount.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
