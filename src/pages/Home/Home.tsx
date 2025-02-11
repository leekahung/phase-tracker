import { useMemo, useState } from "react";
import useChannels from "../../hooks/useChannels";
import { IMemberInfo } from "../../types/dataTypes";
import SortableTableHeader from "./components/SortableTableHeader";
import SubscriptionTableRow from "./components/SubscriptionTableRow";

export function Home() {
  const { items, isLoading, isError } = useChannels();
  const [sortBy, setSortBy] = useState<string>("subscribers");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (columnName: string) => {
    if (sortBy === columnName) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortBy(columnName);
      setSortDirection("desc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortBy) return items;
    const unsortedData = items !== undefined ? [...items] : [];

    return unsortedData.sort((a, b) => {
      const valueA = a[sortBy as keyof IMemberInfo];
      const valueB = b[sortBy as keyof IMemberInfo];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "desc"
          ? valueB.localeCompare(valueA)
          : valueA.localeCompare(valueB);
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "desc" ? valueB - valueA : valueA - valueB;
      } else {
        return 0;
      }
    });
  }, [items, sortBy, sortDirection]);

  if (isLoading) return <div />;
  if (isError) return <div />;

  return (
    <div className="flex flex-col items-center gap-4 mx-8">
      <h1 className="text-4xl">Phase Connect</h1>
      <h2 className="text-2xl">Subscription Count</h2>
      <table className="table text-base text-center max-w-screen-lg">
        <thead>
          <tr className="text-lg">
            {["channel_name", "generation", "subscribers"].map((header) => {
              return (
                <SortableTableHeader
                  column={header}
                  sortBy={sortBy || null}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
                  key={header}
                />
              );
            })}
            <th>Channel Link</th>
            <th>Data From</th>
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((member) => {
            return <SubscriptionTableRow member={member} key={member.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
