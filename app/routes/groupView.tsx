import BubbleChart from '~/components/d3/BubbleChart';
import useChannels from '~/hooks/useChannels';

export function meta() {
  return [{ title: 'Group View' }, { name: 'description', content: 'Phase Connect Visualization' }];
}

export default function groupView() {
  const { members, isError } = useChannels();

  return isError ? (
    <div />
  ) : (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">Subscriber Count</h1>
      <BubbleChart data={members} />
    </div>
  );
}
