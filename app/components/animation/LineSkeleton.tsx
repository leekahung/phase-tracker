interface Props {
  variant?: 'dynamic';
}

export default function LineSkeleton({ variant }: Props) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${
          variant === 'dynamic' ? 'w-[60px] sm:w-[150px]' : 'w-[100px]'
        } h-4 animate-pulse rounded-full bg-slate-400`}
      />
    </div>
  );
}
