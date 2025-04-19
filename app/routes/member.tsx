import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import useChannels from '~/hooks/useChannels';
import Divider from '~/layouts/components/Divider';
import MemberCard from '~/pages/member/components/MemberCard/MemberCard';
import DataCharts from '~/pages/member/components/DataCharts/DataCharts';
import LoadingChart from '~/components/animation/LoadingChart';
import TransitionLayout from '~/layouts/TransitionLayout';

export function meta() {
  return [
    { title: 'Member Info' },
    {
      name: 'description',
      content: 'Page on stats related to the following Phase Connect member',
    },
  ];
}

export default function member() {
  const location = useLocation();
  const { memberHandle } = useParams();
  const { members, isLoading } = useChannels();
  const selectedMember = members?.find((member) => member.channelHandle === memberHandle);
  const [dailyChange, setDailyChange] = useState({ subs: 0, views: 0 });
  const cloudinaryName = import.meta.env.VITE_CLOUDINARY_NAME;
  const selectedMemberUrlString = selectedMember?.memberNameEn.replace(' ', '%20');

  const handleDailyChange = (subChange: number, viewChange: number): void => {
    setDailyChange({ subs: subChange, views: viewChange });
  };

  useEffect(() => {
    document.title = `Member Info - ${memberHandle}`;
  }, [location.pathname]);

  return (
    <TransitionLayout>
      <div className="relative flex flex-col items-center gap-4 overflow-hidden">
        <MemberCard dailyChange={dailyChange} />
        {!isLoading && (
          <img
            src={`https://res.cloudinary.com/${cloudinaryName}/image/upload/f_webp/${selectedMemberUrlString}.webp`}
            className="animate-fade fixed right-10 -bottom-50 z-0 h-[500px] opacity-0"
            key={selectedMemberUrlString}
          />
        )}
        <Link to="/" className="z-10 underline">
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
    </TransitionLayout>
  );
}
