import { Link } from 'react-router';
import { useSelectedMember } from '@/hooks/useSelectedMember';
import DataChart from './components/DataChart';
import LoadingChart from './components/LoadingChart';
import MemberCard from './components/MemberCard';
import LoadingCard from './components/LoadingCard';
import Divider from '@/global/components/Divider';

export default function Member(): React.JSX.Element {
  const { selectedMemberObject, subscriberData, refetchData } = useSelectedMember();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl p-8 text-center text-slate-300 sm:w-[400px] sm:border sm:border-slate-300">
        {selectedMemberObject !== undefined ? (
          <MemberCard selectedMemberObject={selectedMemberObject} />
        ) : (
          <LoadingCard />
        )}
      </div>
      <Link className="text-slate-300 underline" to="/">
        Back
      </Link>
      <Divider />
      {subscriberData !== null && subscriberData !== undefined ? (
        <DataChart subscriberData={subscriberData} refetchData={refetchData} />
      ) : (
        <LoadingChart />
      )}
    </div>
  );
}
