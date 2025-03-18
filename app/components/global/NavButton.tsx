import { NavLink, type NavLinkProps } from 'react-router';

interface Props extends NavLinkProps {
  children: React.ReactNode;
}

export default function NavButton({ children, ...props }: Props) {
  return (
    <NavLink
      className={({ isActive }) =>
        `${isActive ? 'bg-slate-700' : 'bg-transparent hover:bg-slate-400/50'} active:!bg-slate-600/50`
      }
      {...props}
    >
      {children}
    </NavLink>
  );
}
