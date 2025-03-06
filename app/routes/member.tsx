import Divider from "~/components/Divider";
import MemberCard from "~/pages/member/components/MemberCard/MemberCard";
import type { Route } from "./+types/member";
import { Link, useParams } from "react-router";
import DataCharts from "~/pages/member/components/DataCharts/DataCharts";
import useChannels from "~/hooks/useChannels";
import useMemberData from "~/hooks/useMemberData";

export function meta({}: Route.MetaArgs) {
  const { memberHandle } = useParams();

  return [
    { title: `Member Info - ${memberHandle}` },
    {
      name: "description",
      content: `Data and info related to ${memberHandle}`,
    },
  ];
}

export default function member() {
  const { memberHandle } = useParams();
  const { members, isLoading } = useChannels();
  const selectedMember = members?.find(
    (member) => member.channelHandle === memberHandle
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <MemberCard />
      <Link to="/" className="underline">
        Back
      </Link>
      <Divider />
      {isLoading ? (
        <div className="h-auto w-[95%] flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <DataCharts selectedMember={selectedMember} />
      )}
    </div>
  );
}
