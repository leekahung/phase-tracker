import CircleSkeleton from '~/components/animation/CircleSkeleton';
import LineSkeleton from '~/components/animation/LineSkeleton';

const rows = [
  'Member Name (EN)',
  'Member Name (JP)',
  'Generation',
  'Subscribers',
  'Views',
  'Videos',
  'Link to Channel',
];

export default function MemberLoadingCard() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <CircleSkeleton />
        <LineSkeleton />
      </div>
      <table className="table">
        <tbody className="table-fixed text-center">
          {rows.map((row) => (
            <tr key={row}>
              <th>{row}</th>
              <td>
                <LineSkeleton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
