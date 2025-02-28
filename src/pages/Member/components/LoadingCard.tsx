import LoadingCardTable from '@/global/components/LoadingCardTable';

export default function LoadingCard(): React.JSX.Element {
  return (
    <>
      <div className="h-20 w-20 animate-pulse rounded-full bg-slate-700" />
      <div className="h-6 w-[200px] animate-pulse rounded-full bg-slate-700" />
      <table className="table max-w-sm text-center text-sm sm:text-base">
        <tbody>
          <LoadingCardTable />
        </tbody>
      </table>
    </>
  );
}
