interface Props {
  handleSortBy: (key: keyof IMemberInfo) => void;
  sortBy: keyof IMemberInfo;
  sortDirection: "asc" | "desc";
}

export default function SubscriberTableHeaders({
  handleSortBy,
  sortBy,
  sortDirection,
}: Props) {
  return (
    <thead>
      <tr>
        <th className="hidden sm:table-cell">Icon</th>
        <th>
          <div>
            <button
              className="cursor-pointer"
              type="button"
              onClick={() => {
                handleSortBy("channelName");
              }}
            >
              Channel
            </button>
            {sortBy === "channelName" && (
              <span>{sortDirection === "desc" ? "\u2193" : "\u2191"}</span>
            )}
          </div>
        </th>
        <th className="hidden sm:table-cell">
          <div>
            <button
              className="cursor-pointer"
              type="button"
              onClick={() => {
                handleSortBy("generation");
              }}
            >
              Generation
            </button>
            {sortBy === "generation" && (
              <span>{sortDirection === "desc" ? "\u2193" : "\u2191"}</span>
            )}
          </div>
        </th>
        <th>
          <div>
            <button
              className="cursor-pointer"
              type="button"
              onClick={() => {
                handleSortBy("subscribers");
              }}
            >
              Subscribers
            </button>
            {sortBy === "subscribers" && (
              <span>{sortDirection === "desc" ? "\u2193" : "\u2191"}</span>
            )}
          </div>
        </th>
        <th>Channel Info</th>
      </tr>
    </thead>
  );
}
