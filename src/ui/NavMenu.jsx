import { createContext, useContext, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi2';

const NavMenuContext = createContext();
function NavMenu({ children }) {
  const [openId, setopenId] = useState('');
  const close = () => setopenId('');
  const open = setopenId;

  return (
    <NavMenuContext.Provider value={{ openId, close, open }}>
      <ul>{children}</ul>
    </NavMenuContext.Provider>
  );
}

function NavMainLink({ children, linkTo, icon, subMenu }) {
  const { openId, close, open } = useContext(NavMenuContext);
  const getUrl = useLocation().pathname;

  function handleSubMenu() {
    if (openId === '' || openId !== subMenu) open(subMenu);
    else close(subMenu);
  }

  return (
    <Link
      to={linkTo}
      onClick={handleSubMenu}
      className={`flex gap-4 text-foreground px-5 py-3 items-center text-lg hover:bg-content1 rounded ${getUrl === linkTo ? 'bg-content1' : ''}`}
    >
      <div className='text-3xl'>{icon}</div>
      <span>{children}</span>
      {subMenu ? (
        <span>
          {openId && openId === subMenu ? (
            <HiOutlineChevronUp />
          ) : (
            <HiOutlineChevronDown />
          )}
        </span>
      ) : (
        ''
      )}
    </Link>
  );
}

function NavSubMenu({ children, icon, linkTo, subMenu }) {
  const { openId } = useContext(NavMenuContext);
  const getUrl = useLocation().pathname;
  if (!openId || openId !== subMenu) return null;

  return (
    <Link to={`${subMenu}/${linkTo}`}>
      <div
        className={`flex gap-4 ml-4 text-foreground px-5 py-3 items-center text-lg hover:bg-content1 rounded ${getUrl.includes(linkTo) ? 'bg-content1' : ''}`}
      >
        <div className='text-3xl'>{icon}</div>
        {children}
      </div>
    </Link>
  );
}

NavMenu.NavMainLink = NavMainLink;
NavMenu.NavSubMenu = NavSubMenu;

export default NavMenu;
