interface Props {
  variant?: "dynamic";
}

export default function CircleSkeleton({ variant }: Props) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${
          variant === "dynamic" ? "visible sm:hidden" : null
        } w-15 h-15 animate-pulse bg-slate-600 rounded-full`}
      />
    </div>
  );
}
