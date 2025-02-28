import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import RefreshIconSVG from '@/assets/RefreshIconSVG';
import LineChart from '@/global/components/D3Objects/LineChart';
import { IMemberData } from '@/types/dataTypes';

interface Props {
  subscriberData: IMemberData[];
  refetchData: (options?: RefetchOptions) => Promise<QueryObserverResult<unknown, Error>>;
}

export default function DataChart({ subscriberData, refetchData }: Props): React.JSX.Element {
  return (
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
  );
}
