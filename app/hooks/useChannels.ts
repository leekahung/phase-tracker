import { useQuery } from '@tanstack/react-query';
import type { IMemberInfo } from '~/types/dataTypes';
import snakeCaseToCamel from '~/utils/dbHelpers';

async function getMembers() {
  const response = await fetch('/.netlify/functions/getMembers');
  const results = await response.json();
  return results.map((item: Record<string, unknown>) => snakeCaseToCamel(item));
}

function useChannels() {
  const {
    data: memberList,
    isLoading,
    isError,
  } = useQuery<IMemberInfo[]>({
    queryKey: ['members-list'],
    queryFn: getMembers,
    refetchInterval: 1000 * 60 * 60 * 24,
  });

  return {
    members: memberList
      ?.sort((a, b) => {
        return b.subscribers - a.subscribers;
      })
      .map((member) => ({
        ...member,
        channelName: member.channelName
          .split('【Phase Connect】')[0]
          .trim()
          .split(' [Phase Connect]')[0]
          .trim(),
        generation: member.generation.split('Phase')[1].trim(),
      })) as IMemberInfo[] | undefined,
    isLoading,
    isError,
  };
}

export default useChannels;
