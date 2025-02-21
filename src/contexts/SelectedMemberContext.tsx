import { createContext, useEffect, useMemo, useState } from 'react';
import useChannels from '@/hooks/useChannels';
import { IMemberData, IMemberInfo } from '@/types/dataTypes';
import { useQuery } from '@tanstack/react-query';

async function fetchMemberData(channelId: string) {
  const response = await fetch('/.netlify/functions/getMemberData', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ channelId: channelId }),
  });
  const results = await response.json();
  return results;
}

export interface ISelectedMemberProps {
  selectedMember: string;
  setSelectedMember: React.Dispatch<React.SetStateAction<string>>;
  selectedMemberObject: IMemberInfo | undefined;
  subscriberData: IMemberData[] | undefined;
}

const SelectedMemberContext = createContext<ISelectedMemberProps | null>(null);

interface Props {
  children: React.ReactNode;
}

function SelectedMemberContextProvider({ children }: Props) {
  const [selectedMember, setSelectedMember] = useState(() => {
    const memberSelected = localStorage.getItem('selectedMember');
    if (memberSelected === null || memberSelected === null) return '';
    return memberSelected;
  });

  useEffect(() => {
    localStorage.setItem('selectedMember', selectedMember);
  }, [selectedMember]);

  const { members } = useChannels();
  const selectedMemberObject = members?.find(
    (member) => member.channelHandle === `${selectedMember}`
  );

  useEffect(() => {
    localStorage.setItem('channelId', selectedMemberObject?.channelId as string);
  }, [selectedMemberObject?.channelId]);

  const { data: subscriberData } = useQuery({
    queryKey: ['member-data', selectedMember],
    queryFn: async () => {
      const channelId = localStorage.getItem('channelId');
      if (channelId !== undefined) {
        return await fetchMemberData(channelId as string);
      }
    },
  });

  console.log(subscriberData);

  const selectedMemberContextObject = useMemo(
    () => ({ selectedMember, setSelectedMember, selectedMemberObject, subscriberData }),
    [selectedMember, selectedMemberObject, subscriberData]
  );

  return (
    <SelectedMemberContext.Provider value={selectedMemberContextObject}>
      {children}
    </SelectedMemberContext.Provider>
  );
}

export { SelectedMemberContext, SelectedMemberContextProvider };
