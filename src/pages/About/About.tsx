export default function About(): React.JSX.Element {
  return (
    <div className="m-4 flex flex-col items-center gap-4">
      <div className="flex w-[95%] flex-col gap-4">
        <h2 className="text-xl">
          <strong>Purpose</strong>
        </h2>
        <p>
          Phase Connect Tracker (aka "Phase Tracker") is an unofficial fan site developed to follow
          the latest YouTube subscription data from active members affiliated with the VTuber
          organization Phase Connect.
        </p>
      </div>
      <div className="my-4 w-[95%] border-t border-slate-300" />
      <div className="flex w-[95%] flex-col gap-4">
        <h2 className="text-xl">
          <strong>Affiliation</strong>
        </h2>
        <p>
          This fan site is not affiliated with Phase Connect or any of its members nor is it
          affiliated with any other projects/fan sites that tracks VTuber subscription numbers.
        </p>
      </div>
      <div className="my-4 w-[95%] border-t border-slate-300" />
      <div className="flex w-[95%] flex-col gap-4">
        <h2 className="text-xl">
          <strong>Collection</strong>
        </h2>
        <p>
          "Phase Tracker" currently collects data gather from YouTube's Data API for active Phase
          Connect VTubers at a daily basis (~12:00 AM UTC) or whenever changes are made for
          deployment. The tracked data include their subscription count, view count, video count,
          channel profile image, and channel name. Data from non-active member (e.g.
          "graduated"/"retired") are not being tracked.
        </p>
        <p>
          It currently stores historical data related to subscription or view count starting from
          Feb. 23, 2025 and are displayed as time series. Only the latest value pull from the
          database would be displayed.
        </p>
      </div>
    </div>
  );
}
