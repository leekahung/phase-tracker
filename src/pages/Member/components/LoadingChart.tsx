export default function LoadingChart(): React.JSX.Element {
  return (
    <>
      <h2 className="text-2xl">Subscribers</h2>
      <div className="flex h-[500px] w-screen flex-col items-center justify-center gap-4">
        Loading plot...
        <div className="loading loading-ring h-10 w-10" />
      </div>
      <h2 className="text-2xl">Views</h2>
      <div className="flex h-[500px] w-screen flex-col items-center justify-center gap-4">
        Loading plot...
        <div className="loading loading-ring h-10 w-10" />
      </div>
    </>
  );
}
