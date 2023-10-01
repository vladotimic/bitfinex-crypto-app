import React from 'react';
import { NavLink as RouterNavLink, NavLinkProps } from 'react-router-dom';

const NavLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<NavLinkProps, 'to'> & { href: NavLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;

  return (
    <RouterNavLink
      ref={ref}
      to={href}
      className={({ isActive }) => (isActive ? 'ActiveLink' : 'InactiveLink')}
      {...other}
    />
  );
});

export default NavLink;
