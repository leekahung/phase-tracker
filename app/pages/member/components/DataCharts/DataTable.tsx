import type { IMemberInfo } from '~/types/dataTypes';

interface Props {
  genList: string[];
  groupObject: Record<string, IMemberInfo[]>;
}

export default function DataTable({ genList, groupObject }: Props) {
  return (
    <table className="table max-w-2xl">
      <thead className="text-center">
        <tr>
          <th>Generation</th>
          <th>Subscribers</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {genList.map((generation) => {
          const totalSubscribers = groupObject[generation].reduce(
            (total, member) => total + member.subscribers,
            0
          );
          return (
            <tr key={generation}>
              <td>{generation}</td>
              <td>{totalSubscribers.toLocaleString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
