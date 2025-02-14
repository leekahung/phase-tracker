import TableLoading from '@/global/components/TableLoading';
import { useSelectedMember } from '@/hooks/useSelectedMember';
import MemberTable from './components/MemberTable';

export default function Member(): React.JSX.Element {
  const { selectedMemberObject } = useSelectedMember();

  return selectedMemberObject !== undefined ? (
    <div className="flex h-[calc(100vh-80px-50px)] items-center justify-center sm:h-[calc(100vh-80px-250px)]">
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl p-8 text-center text-slate-300 sm:w-[400px] sm:border sm:border-slate-300">
        <img
          className="rounded-full"
          src={selectedMemberObject?.channel_image}
          alt="channel image"
        />
        <h1 className="text-3xl">{selectedMemberObject?.channel_name}</h1>
        <MemberTable selectedMemberObject={selectedMemberObject} />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <table className="table max-w-sm text-center text-sm sm:text-base">
        <thead>
          <TableLoading />
        </thead>
      </table>
    </div>
  );
}
