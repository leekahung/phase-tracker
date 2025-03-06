import CircleSkeleton from '~/components/animation/CircleSkeleton';
import LineSkeleton from '~/components/animation/LineSkeleton';

export default function MemberLoadingCard() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <CircleSkeleton />
        <LineSkeleton />
      </div>
      <table className="table">
        <tbody>
          <tr>
            <th>Member Name (EN)</th>
            <td>
              <LineSkeleton />
            </td>
          </tr>
          <tr>
            <th>Member Name (JP)</th>
            <td>
              <LineSkeleton />
            </td>
          </tr>
          <tr>
            <th>Generation</th>
            <td>
              <LineSkeleton />
            </td>
          </tr>
          <tr>
            <th>Subscribers</th>
            <td>
              <LineSkeleton />
            </td>
          </tr>
          <tr>
            <th>Views</th>
            <td>
              <LineSkeleton />
            </td>
          </tr>
          <tr>
            <th>Videos</th>
            <td>
              <LineSkeleton />
            </td>
          </tr>
          <tr>
            <th>Link to Channel</th>
            <td>
              <LineSkeleton />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
