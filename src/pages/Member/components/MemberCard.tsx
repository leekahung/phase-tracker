import { IMemberInfo } from '@/types/dataTypes';
import MemberTable from './MemberTable';
import Avatar from '@/global/components/Avatar';

interface Props {
  selectedMemberObject: IMemberInfo;
}

export default function MemberCard({ selectedMemberObject }: Props): React.JSX.Element {
  return (
    <>
      <Avatar htmlSrc={selectedMemberObject?.channelImage} height={80} />
      <h1
        className={`text-2xl ${selectedMemberObject !== undefined ? 'opacity-100' : 'opacity-0'}`}
      >
        {selectedMemberObject?.channelName}
      </h1>
      <MemberTable selectedMemberObject={selectedMemberObject} />
    </>
  );
}
