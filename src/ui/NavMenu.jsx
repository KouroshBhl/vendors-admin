import { createContext, useContext, useState } from 'react';
import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi2';

const NavMenuContext = createContext();
function NavMenu({ children }) {
  const [openId, setopenId] = useState('');
  const close = () => setopenId('');
  const open = setopenId;

  return (
    <NavMenuContext.Provider value={{ openId, close, open }}>
      <NavList>{children}</NavList>
    </NavMenuContext.Provider>
  );
}

function NavMainLink({ children, linkTo, icon, subMenu }) {
  const { openId, close, open } = useContext(NavMenuContext);

  function handleSubMenu() {
    if (openId === '' || openId !== subMenu) open(subMenu);
    else close(subMenu);
  }

  return (
    <StyledNavLink to={linkTo} onClick={handleSubMenu}>
      {icon}
      <span>{children}</span>
      {subMenu ? (
        <StyledSubMenuSvg>
          {openId && openId === subMenu ? (
            <HiOutlineChevronUp />
          ) : (
            <HiOutlineChevronDown />
          )}
        </StyledSubMenuSvg>
      ) : (
        ''
      )}
    </StyledNavLink>
  );
}

function NavSubMenu({ children, icon, linkTo, subMenu }) {
  const { openId } = useContext(NavMenuContext);
  if (!openId || openId !== subMenu) return null;

  return (
    <StyledNavLink to={`${subMenu}/${linkTo}`}>
      <StyledSubMenu>
        {icon}
        {children}
      </StyledSubMenu>
    </StyledNavLink>
  );
}

NavMenu.NavMainLink = NavMainLink;
NavMenu.NavSubMenu = NavSubMenu;

export default NavMenu;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;
const StyledSubMenu = styled.span`
  display: flex;
  gap: 1rem;
  margin-left: 2.4rem;
`;

const StyledSubMenuSvg = styled.span`
  width: 2rem;
  height: 2rem;
  margin-left: auto;
  display: flex;
`;
