import { Link } from 'react-router';
import TableLoading from '@/global/components/TableLoading';
import { useSelectedMember } from '@/hooks/useSelectedMember';
import MemberTable from './components/MemberTable';

export default function Member(): React.JSX.Element {
  const { selectedMemberObject } = useSelectedMember();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      {selectedMemberObject !== undefined ? (
        <>
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl p-8 text-center text-slate-300 sm:w-[400px] sm:border sm:border-slate-300">
            <img
              className="rounded-full"
              src={selectedMemberObject?.channelImage}
              alt="channel image"
              height="80px"
              width="80px"
            />
            <h1 className="text-2xl">{selectedMemberObject?.channelName}</h1>
            <MemberTable selectedMemberObject={selectedMemberObject} />
          </div>
          <Link className="text-slate-300 underline" to="/">
            Back
          </Link>
        </>
      ) : (
        <>
          <table className="table max-w-sm text-center text-sm sm:text-base">
            <tbody>
              <TableLoading />
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
