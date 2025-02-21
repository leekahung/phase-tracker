import { Link } from 'react-router';
import { useSelectedMember } from '@/hooks/useSelectedMember';
import MemberTable from './components/MemberTable';
import CardLoading from '@/global/components/CardLoading';
import LineChart from '@/global/components/D3Objects/LineChart';

export default function Member(): React.JSX.Element {
  const { selectedMemberObject, subscriberData } = useSelectedMember();

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
                <CardLoading />
              </tbody>
            </table>
          </>
        )}
      </div>
      <Link className="text-slate-300 underline" to="/">
        Back
      </Link>
      <hr className="my-4 h-[1px] w-[95%]" />
      {subscriberData !== null && subscriberData !== undefined ? (
        <>
          <h2 className="text-2xl">Subscriber Count</h2>
          <LineChart data={subscriberData} />
        </>
      ) : (
        <>
          <h2 className="text-2xl">Subscriber Count</h2>
          <div className="flex h-[500px] w-screen flex-col items-center justify-center gap-4">
            Loading plot...
            <div className="loading loading-ring h-10 w-10" />
          </div>
        </>
      )}
    </div>
  );
}
