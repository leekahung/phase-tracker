import { useState } from 'react';
import BubbleChart from '~/components/d3/BubbleChart';
import RefreshIconSVG from '~/components/icons/RefreshIconSVG';
import useChannels from '~/hooks/useChannels';

export function meta() {
  return [{ title: 'Group View' }, { name: 'description', content: 'Phase Connect Visualization' }];
}

export default function groupView() {
  const { members, isError } = useChannels();
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="m-auto flex flex-col items-center justify-center gap-4 sm:h-full sm:max-w-[2200px]">
      <div className="relative flex items-center justify-center">
        <h2 className="text-lg sm:text-2xl">Subscriber Count</h2>
        <button
          className="absolute -right-12 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition hover:rotate-90 hover:bg-slate-600"
          type="button"
          aria-label="refresh chart"
          onClick={() => setRefresh((prev) => prev + 1)}
        >
          <RefreshIconSVG />
        </button>
      </div>
      {isError ? <em>Unable to fetch data...</em> : <BubbleChart data={members} key={refresh} />}
    </div>
  );
}
