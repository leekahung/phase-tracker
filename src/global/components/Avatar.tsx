interface Props {
  src: string;
  height: number;
}

export default function Avatar({ src, height }: Props): React.JSX.Element {
  return (
    <img
      src={src}
      alt="channel image"
      height={`${height}px`}
      width={`${height}px`}
      className="rounded-full sm:hidden"
    />
  );
}
