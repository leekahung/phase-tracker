import useChannels from '~/hooks/useChannels';
import SubscriberTable from '~/pages/home/components/SubscriberTable/SubscriberTable';
import LineSkeleton from '~/components/animation/LineSkeleton';

export function meta() {
  return [
    { title: 'Phase Connect Tracker' },
    { name: 'description', content: 'Welcome to Phase Connect Tracker!' },
  ];
}

export default function home() {
  const { members, isLoading, isError } = useChannels();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl">Phase Connect</h1>
      <h2 className="text-xl">YouTube Subscription Count</h2>
      {isError ? (
        <>
          <em>Unable to fetch</em>
          <span>No data loaded...</span>
        </>
      ) : (
        <>
          <div className="flex gap-2">
            <em>
              Last updated:{' '}
              {members !== undefined && new Date(members[0].updatedAt).toLocaleDateString()}
            </em>
            {isLoading && <LineSkeleton />}
          </div>
          <SubscriberTable members={members} isLoading={isLoading} />
        </>
      )}
    </div>
  );
}
