import CircleSkeleton from "~/components/animation/CircleSkeleton";
import LineSkeleton from "~/components/animation/LineSkeleton";

export default function SubscriberLoadingTable() {
  return Array.from({ length: 20 }).map((_, index) => {
    return (
      <tr key={index}>
        <td className="hidden sm:table-cell">
          <CircleSkeleton />
        </td>
        <td>
          <div className="flex flex-col gap-2">
            <CircleSkeleton variant="dynamic" />
            <LineSkeleton variant="dynamic" />
          </div>
        </td>
        <td className="hidden sm:table-cell">
          <LineSkeleton />
        </td>
        <td>
          <LineSkeleton />
        </td>
        <td>
          <LineSkeleton />
        </td>
      </tr>
    );
  });
}
