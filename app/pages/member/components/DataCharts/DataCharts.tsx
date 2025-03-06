import LineChart from "~/components/d3/LineChart";
import RefreshIconSVG from "~/components/icons/RefreshIconSVG";
import useMemberData from "~/hooks/useMemberData";

interface Props {
  selectedMember: IMemberInfo | undefined;
}

export default function DataCharts({ selectedMember }: Props) {
  const { memberData, refetch } = useMemberData(selectedMember);

  return (
    <>
      <div className="relative flex items-center">
        <h2 className="text-2xl">Subscribers</h2>
        <button
          className="absolute -right-12 rounded-full cursor-pointer w-10 h-10 flex items-center justify-center hover:bg-slate-600 hover:rotate-90 transition"
          type="button"
          aria-label="refresh data"
          onClick={() => refetch}
        >
          <RefreshIconSVG />
        </button>
      </div>
      {memberData == undefined ? (
        <div className="h-[500px] w-[95%] flex flex-col items-center justify-center gap-4">
          <div className="loading loading-spinner loading-lg" />
          Loading...
        </div>
      ) : (
        <LineChart data={memberData} dataLabel="subscribers" />
      )}
      <div className="relative flex items-center">
        <h2 className="text-2xl">Views</h2>
      </div>
      {memberData == undefined ? (
        <div className="h-[500px] w-[95%] flex flex-col items-center justify-center gap-4">
          <div className="loading loading-spinner loading-lg" />
          Loading...
        </div>
      ) : (
        <LineChart data={memberData} dataLabel="viewCount" />
      )}
    </>
  );
}
