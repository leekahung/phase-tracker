import { Link } from 'react-router';
import { useSelectedMember } from '@/hooks/useSelectedMember';
import MemberTable from './components/MemberTable';
import CardLoading from '@/global/components/CardLoading';
import LineChart from '@/global/components/D3Objects/LineChart';
import RefreshIconSVG from '@/assets/RefreshIconSVG';
import Avatar from '@/global/components/Avatar';

export default function Member(): React.JSX.Element {
  const { selectedMemberObject, subscriberData, refetchData } = useSelectedMember();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl p-8 text-center text-slate-300 sm:w-[400px] sm:border sm:border-slate-300">
        {selectedMemberObject !== undefined ? (
          <>
            <Avatar src={selectedMemberObject?.channelImage} height={80} />
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
          <div className="relative flex items-center">
            <h2 className="text-2xl">Subscribers</h2>
            <button
              className="btn absolute -right-14 rounded-full border-0 bg-transparent"
              type="button"
              aria-label="refresh data"
              onClick={() => refetchData()}
            >
              <RefreshIconSVG />
            </button>
          </div>
          <LineChart data={subscriberData} dataLabel="subscribers" />
          <div className="relative flex items-center">
            <h2 className="text-2xl">Views</h2>
          </div>
          <LineChart data={subscriberData} dataLabel="viewCount" />
        </>
      ) : (
        <>
          <h2 className="text-2xl">Subscribers</h2>
          <div className="flex h-[500px] w-screen flex-col items-center justify-center gap-4">
            Loading plot...
            <div className="loading loading-ring h-10 w-10" />
          </div>
          <h2 className="text-2xl">Views</h2>
          <div className="flex h-[500px] w-screen flex-col items-center justify-center gap-4">
            Loading plot...
            <div className="loading loading-ring h-10 w-10" />
          </div>
        </>
      )}
    </div>
  );
}
