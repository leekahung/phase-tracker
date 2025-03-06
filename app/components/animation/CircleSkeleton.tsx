interface Props {
  variant?: 'dynamic';
}

export default function CircleSkeleton({ variant }: Props) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${
          variant === 'dynamic' ? 'visible sm:hidden' : null
        } h-15 w-15 animate-pulse rounded-full bg-slate-600`}
      />
    </div>
  );
}
