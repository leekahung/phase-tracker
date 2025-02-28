interface Props {
  htmlSrc: string;
  height: number;
  additionalClassName?: string;
}

export default function Avatar({ htmlSrc, height, additionalClassName }: Props): React.JSX.Element {
  return (
    <img
      src={htmlSrc}
      alt="channel image"
      height={`${height}px`}
      width={`${height}px`}
      className={`rounded-full ${additionalClassName}`}
    />
  );
}
