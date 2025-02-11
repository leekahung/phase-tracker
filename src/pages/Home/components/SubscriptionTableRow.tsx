import { Link } from "react-router";
import type { IMemberInfo } from "../../../types/dataTypes";
import { useSelectedMember } from "../../../hooks/useSelectedMember";

interface Props {
  member: IMemberInfo;
}

export default function SubscriptionTableRow({
  member,
}: Props): React.JSX.Element {
  const { setSelectedMember } = useSelectedMember();
  return (
    <tr
      className="transition-transform delay-[300] duration-500 ease-in-out hover:scale-[105%]"
      key={member.id}
    >
      <td>
        <div className="flex items-center justify-center">
          <img
            src={member.channel_image}
            alt="channel image"
            height="60px"
            width="60px"
            className="rounded-full"
          />
        </div>
      </td>
      <td>
        <Link
          to={`/member/${member.channel_handle.slice(1)}`}
          onClick={() => setSelectedMember(member.channel_handle)}
        >
          {member.channel_name}
        </Link>
      </td>
      <td>{member.generation}</td>
      <td>{member.subscribers.toLocaleString()}</td>
      <td>
        <Link
          className="text-base underline"
          to={`https://www.youtube.com/${member.channel_handle}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Link
        </Link>
      </td>
      <td className="w-[160px]">
        <div className="flex flex-col">
          <span>{`${new Date(member.updated_at).toLocaleDateString()}`}</span>
          <span>{`${new Date(member.updated_at).toLocaleTimeString()}`}</span>
        </div>
      </td>
    </tr>
  );
}
