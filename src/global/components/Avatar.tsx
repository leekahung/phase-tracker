import { ImgHTMLAttributes } from 'react';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  height: number;
}

export default function Avatar({ height, ...props }: Props): React.JSX.Element {
  return (
    <img
      alt="channel image"
      height={`${height}px`}
      width={`${height}px`}
      className="rounded-full"
      {...props}
    />
  );
}
