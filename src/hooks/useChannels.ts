import { useQuery } from '@tanstack/react-query';
import { IUseChannels } from '@/types/hookTypes';
import { IMemberInfo } from '@/types/dataTypes';

function snakeToCamelCase(object: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      return [key.replace(/_([a-z])/g, (_, letter) => `${letter.toUpperCase()}`), value];
    })
  );
}

async function fetchMembers(): Promise<IMemberInfo[]> {
  const response = await fetch('/.netlify/functions/getMembers');
  const results = await response.json();
  return results.map((item: Record<string, unknown>) => snakeToCamelCase(item));
}

export default function useChannels(): IUseChannels {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['members-list'],
    queryFn: fetchMembers,
    refetchInterval: 1000 * 60 * 60 * 24,
  });

  return {
    members: data
      ?.sort((a, b) => b.subscribers - a.subscribers)
      .map((member) => {
        return {
          ...member,
          channelName: member.channelName.replace('【Phase Connect】', '').trim(),
          generation: member.generation.replace('Phase', '').trim(),
        };
      }),
    isLoading,
    isError,
  };
}
