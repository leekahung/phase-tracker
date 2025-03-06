import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import snakeCaseToCamel from "~/utils/dbHelpers";
import useChannels from "./useChannels";

async function getMemberData(channelId: string) {
  const response = await fetch("/.netlify/functions/getMemberData", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ channelId: channelId }),
  });
  const results = await response.json();
  return results.map((item: Record<string, unknown>) => snakeCaseToCamel(item));
}

function useMemberData(selectedMember: IMemberInfo | undefined) {
  const { data: memberData, refetch } = useQuery<IMemberData[]>({
    queryKey: ["member-data", selectedMember?.channelId],
    queryFn: async () => {
      if (selectedMember) {
        return await getMemberData(selectedMember.channelId);
      }
      return [];
    },
  });

  return {
    memberData,
    refetch,
  };
}

export default useMemberData;
