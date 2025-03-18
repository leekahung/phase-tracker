import type { ButtonHTMLAttributes } from 'react';
import type { IMemberInfo } from '~/types/dataTypes';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  sortBy: keyof IMemberInfo;
  sortDirection: 'asc' | 'desc';
  columnName: keyof IMemberInfo;
}

export default function SubscriberTableHeaderButton({
  children,
  sortBy,
  sortDirection,
  columnName,
  ...props
}: Props) {
  return (
    <>
      <button className="cursor-pointer" type="button" {...props}>
        {children}
      </button>
      {sortBy === columnName && <span>{sortDirection === 'desc' ? '\u2193' : '\u2191'}</span>}
    </>
  );
}
