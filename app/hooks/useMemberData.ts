import { useQuery } from '@tanstack/react-query';
import type { IMemberData, IMemberInfo } from '~/types/dataTypes';
import { fetchAndTransform } from '~/utils/dbHelpers';

async function getMemberData(channelId: string) {
  return fetchAndTransform<IMemberData>('/.netlify/functions/getMemberData', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ channelId }),
  });
}

function useMemberData(selectedMember: IMemberInfo | undefined) {
  const { data: memberData, refetch } = useQuery<IMemberData[]>({
    queryKey: ['member-data', selectedMember?.channelId],
    queryFn: () => getMemberData(selectedMember?.channelId ?? ''),
    enabled: !!selectedMember,
  });

  return {
    memberData,
    refetch,
  };
}

export default useMemberData;
