import { Link } from 'react-router';
import TableLoading from '@/global/components/TableLoading';
import { useSelectedMember } from '@/hooks/useSelectedMember';
import MemberTable from './components/MemberTable';

export default function Member(): React.JSX.Element {
  const { selectedMemberObject } = useSelectedMember();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl p-8 text-center text-slate-300 sm:w-[400px] sm:border sm:border-slate-300">
        {selectedMemberObject !== undefined ? (
          <>
            <img
              className="rounded-full"
              src={selectedMemberObject?.channelImage}
              alt="channel image"
              height="80px"
              width="80px"
            />
            <h1
              className={`text-2xl ${selectedMemberObject !== undefined ? 'opacity-100' : 'opacity-0'}`}
            >
              {selectedMemberObject?.channelName}
            </h1>
            <MemberTable selectedMemberObject={selectedMemberObject} />
          </>
        ) : (
          <>
            <div className="h-20 w-20 animate-pulse rounded-full bg-slate-700" />
            <div className="h-6 w-[200px] animate-pulse rounded-full bg-slate-700" />
            <table className="table max-w-sm text-center text-sm sm:text-base">
              <tbody>
                <TableLoading small />
              </tbody>
            </table>
          </>
        )}
      </div>
      <Link className="text-slate-300 underline" to="/">
        Back
      </Link>
    </div>
  );
}
