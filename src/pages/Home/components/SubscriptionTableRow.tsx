import { Link } from "react-router";
import type { IMemberInfo } from "../../../types/dataTypes";

interface Props {
  member: IMemberInfo;
}

export default function SubscriptionTableRow({
  member,
}: Props): React.JSX.Element {
  return (
    <tr
      className="transition-transform delay-[300] duration-500 ease-in-out hover:scale-110"
      key={member.id}
    >
      <td className="">
        <div className="flex items-center gap-4 max-w-[400px]">
          <img
            src={member.channel_image}
            alt="channel image"
            height="70px"
            width="70px"
            className="rounded-full"
          />
          <span>{member.channel_name}</span>
        </div>
      </td>
      <td>{member.generation}</td>
      <td>{member.subscribers.toLocaleString()}</td>
      <td>
        <Link
          className="text-lg underline"
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
