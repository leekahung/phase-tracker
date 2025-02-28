interface Props {
  topic: string;
  value: string;
}

export default function MemberTableRow({ topic, value }: Props): React.JSX.Element {
  return (
    <tr className="border-b border-slate-300">
      <th>{topic}</th>
      <td>{value}</td>
    </tr>
  );
}
