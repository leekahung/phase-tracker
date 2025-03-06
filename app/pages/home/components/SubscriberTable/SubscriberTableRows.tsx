import { Link } from "react-router";

interface Props {
  member: IMemberInfo;
}

export default function SubscriberTableRows({ member }: Props) {
  return (
    <tr key={member.channelId}>
      <td className="hidden sm:table-cell">
        <img
          className="avatar rounded-full h-15 w-15"
          alt="channel icon"
          src={member.channelImage}
        />
      </td>
      <td>
        <div className="flex flex-col items-center gap-2">
          <img
            className="avatar rounded-full h-15 w-15 visible sm:hidden"
            alt="channel icon"
            src={member.channelImage}
          />
          <Link
            to={`https://www.youtube.com/${member.channelHandle}`}
            className="underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            {member.channelName}
          </Link>
        </div>
      </td>
      <td className="hidden sm:table-cell">{member.generation}</td>
      <td>{member.subscribers.toLocaleString()}</td>
      <td>
        <Link to={`/member/${member.channelHandle}`} className="underline">
          Link
        </Link>
      </td>
    </tr>
  );
}
