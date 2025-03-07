import Divider from '~/components/Divider';
import MemberCard from '~/pages/member/components/MemberCard/MemberCard';
import { Link, useParams } from 'react-router';
import DataCharts from '~/pages/member/components/DataCharts/DataCharts';
import useChannels from '~/hooks/useChannels';
import { useState } from 'react';
import LoadingChart from '~/components/animation/LoadingChart';

export function meta() {
  const { memberHandle } = useParams();

  return [
    { title: `Member Info - ${memberHandle}` },
    {
      name: 'description',
      content: `Data and info related to ${memberHandle}`,
    },
  ];
}

export default function member() {
  const { memberHandle } = useParams();
  const { members, isLoading } = useChannels();
  const selectedMember = members?.find((member) => member.channelHandle === memberHandle);
  const [dailyChange, setDailyChange] = useState({ subs: 0, views: 0 });

  const handleDailyChange = (subChange: number, viewChange: number): void => {
    setDailyChange({ subs: subChange, views: viewChange });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <MemberCard dailyChange={dailyChange} />
      <Link to="/" className="underline">
        Back
      </Link>
      <Divider />
      {isLoading ? (
        <div className="flex h-auto w-[95%] items-center justify-center">
          <LoadingChart />
        </div>
      ) : (
        <DataCharts selectedMember={selectedMember} handleDailyChange={handleDailyChange} />
      )}
    </div>
  );
}
