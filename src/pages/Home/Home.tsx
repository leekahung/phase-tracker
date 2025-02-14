import SubscriptionTable from './components/SubscriptionTable';

export default function Home(): React.JSX.Element {
  return (
    <div className="mx-8 flex flex-col items-center gap-4 text-slate-300">
      <h1 className="text-3xl">Phase Connect</h1>
      <h2 className="text-xl">YouTube Subscription Count</h2>
      <SubscriptionTable />
    </div>
  );
}
