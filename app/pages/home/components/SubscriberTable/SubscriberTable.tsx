import { useState } from "react";
import SubscriberLoadingTable from "./SubscriberLoadingTable";
import SubscriberTableHeaders from "./SubscriberTableHeaders";
import SubscriberTableRows from "./SubscriberTableRows";

interface Props {
  members: IMemberInfo[] | undefined;
  isLoading: boolean;
}

export default function SubscriberTable({ members, isLoading }: Props) {
  const [sortBy, setSortBy] = useState<keyof IMemberInfo>("subscribers");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSortBy = (key: keyof IMemberInfo): void => {
    if (sortBy === key) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  const sortedMembers = members?.sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

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

  return (
    <table className="table text-center w-[95%] max-w-3xl">
      <SubscriberTableHeaders
        handleSortBy={handleSortBy}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
      <tbody>
        {isLoading ? (
          <SubscriberLoadingTable />
        ) : (
          <>
            {sortedMembers?.map((member) => (
              <SubscriberTableRows key={member.channelId} member={member} />
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}
