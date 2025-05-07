import { useEffect } from 'react';
import LineChart from '~/components/d3/LineChart';
import useMemberData from '~/hooks/useMemberData';
import type { IMemberInfo } from '~/types/dataTypes';
import ChartTitle from './ChartTitle';

interface Props {
  selectedMember: IMemberInfo | undefined;
  handleDailyChange: (subChange: number, viewChange: number) => void;
}

export default function DataCharts({ selectedMember, handleDailyChange }: Props) {
  const { memberData } = useMemberData(selectedMember);

  useEffect(() => {
    if (typeof memberData !== 'undefined') {
      let subChange = 0;
      let viewChange = 0;
      if (memberData.length == 1) {
        subChange = memberData[0].subscribers;
        viewChange = memberData[0].viewCount;
      } else {
        subChange = memberData[0].subscribers - memberData[1].subscribers;
        viewChange = memberData[0].viewCount - memberData[1].viewCount;
      }
      handleDailyChange(subChange, viewChange);
    }
  }, [memberData]);

  return (
    <>
      <ChartTitle title="Subscribers" />
      <LineChart data={memberData} dataLabel="subscribers" />
      <ChartTitle title="Views" />
      <LineChart data={memberData} dataLabel="viewCount" />
    </>
  );
}
