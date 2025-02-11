import { createContext, useMemo, useState } from "react";
import useChannels from "../hooks/useChannels";
import { IMemberInfo } from "../types/dataTypes";

export interface ISelectedMemberProps {
  selectedMember: string;
  setSelectedMember: React.Dispatch<React.SetStateAction<string>>;
  selectedMemberObject: IMemberInfo | undefined;
}

const SelectedMemberContext = createContext<ISelectedMemberProps | null>(null);

interface Props {
  children: React.ReactNode;
}

function SelectedMemberContextProvider({ children }: Props) {
  const [selectedMember, setSelectedMember] = useState("");
  const { members } = useChannels();
  const selectedMemberObject = members?.find(
    (member) => member.channel_handle === `${selectedMember}`,
  );

  const selectedMemberContextObject = useMemo(
    () => ({ selectedMember, setSelectedMember, selectedMemberObject }),
    [selectedMember, selectedMemberObject],
  );

  return (
    <SelectedMemberContext.Provider value={selectedMemberContextObject}>
      {children}
    </SelectedMemberContext.Provider>
  );
}

export { SelectedMemberContext, SelectedMemberContextProvider };
