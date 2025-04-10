import { useEffect } from 'react';
import LineChart from '~/components/d3/LineChart';
import RefreshIconSVG from '~/components/icons/RefreshIconSVG';
import useMemberData from '~/hooks/useMemberData';
import type { IMemberInfo } from '~/types/dataTypes';
import ChartTitle from './ChartTitle';

interface Props {
  selectedMember: IMemberInfo | undefined;
  handleDailyChange: (subChange: number, viewChange: number) => void;
}

export default function DataCharts({ selectedMember, handleDailyChange }: Props) {
  const { memberData, refetch } = useMemberData(selectedMember);

  useEffect(() => {
    if (typeof memberData !== 'undefined') {
      const subChange = memberData[0].subscribers - memberData[1].subscribers;
      const viewChange = memberData[0].viewCount - memberData[1].viewCount;
      handleDailyChange(subChange, viewChange);
    }
  }, [memberData]);

  return (
    <>
      <ChartTitle title="Subscribers">
        <button
          className="absolute -right-12 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition hover:rotate-90 hover:bg-slate-600"
          type="button"
          aria-label="refresh data"
          onClick={() => refetch()}
        >
          <RefreshIconSVG />
        </button>
      </ChartTitle>
      <LineChart data={memberData} dataLabel="subscribers" />
      <ChartTitle title="Views" />
      <LineChart data={memberData} dataLabel="viewCount" />
    </>
  );
}
