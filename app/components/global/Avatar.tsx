import type { ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement>;

export default function Avatar({ ...props }: Props) {
  return <img loading="lazy" alt="channel icon" {...props} />;
}
