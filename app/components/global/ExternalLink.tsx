import { Link, type LinkProps } from 'react-router';

interface Props extends LinkProps {
  children: React.ReactNode;
}

export default function ExternalLink({ children, ...props }: Props) {
  return (
    <Link className="underline" rel="noopener noreferrer" target="_blank" {...props}>
      {children}
    </Link>
  );
}
