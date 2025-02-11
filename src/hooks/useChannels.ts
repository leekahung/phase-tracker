import { useQuery } from "@tanstack/react-query";
import { IUseChannels } from "../types/hookTypes";
import { IMemberInfo } from "../types/dataTypes";

async function fetchMembers(): Promise<IMemberInfo[]> {
  const response = await fetch("/.netlify/functions/getMembers");
  const results = await response.json();
  return results;
}

export default function useChannels(): IUseChannels {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["members-list"],
    queryFn: fetchMembers,
    refetchInterval: 1000 * 60 * 60 * 24,
  });

  return {
    items: data
      ?.sort((a, b) => b.subscribers - a.subscribers)
      .map((member) => {
        return {
          ...member,
          channel_name: member.channel_name
            .replace("【Phase Connect】", "")
            .trim(),
          generation: member.generation.replace("Phase", "").trim(),
        };
      }),
    isLoading,
    isError,
  };
}
