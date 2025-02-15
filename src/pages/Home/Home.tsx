import useChannels from '@/hooks/useChannels';
import SubscriptionTable from './components/SubscriptionTable';

export default function Home(): React.JSX.Element {
  const { members } = useChannels();

  return (
    <div className="mx-4 flex flex-col items-center gap-4 text-slate-300">
      <h1 className="text-3xl">Phase Connect</h1>
      <h2 className="text-xl">YouTube Subscription Count</h2>
      {members !== undefined && (
        <em>
          Last Updated: {new Date(members[0].updated_at).toLocaleDateString()} -{' '}
          {new Date(members[0].updated_at).toLocaleTimeString()}
        </em>
      )}
      <SubscriptionTable />
    </div>
  );
}
