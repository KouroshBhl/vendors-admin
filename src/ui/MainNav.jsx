import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineUserCircle,
  HiOutlineCurrencyDollar,
  HiOutlineSquaresPlus,
  HiOutlineFolder,
  HiOutlineCheckBadge,
  HiOutlineCube,
  HiOutlinePlus,
} from 'react-icons/hi2';

import NavMenu from './NavMenu';

function MainNav() {
  return (
    <nav>
      <NavMenu>
        <NavMenu.NavMainLink linkTo='/dashboard' icon={<HiOutlineHome />}>
          Home
        </NavMenu.NavMainLink>

        <NavMenu.NavMainLink
          linkTo='/products'
          icon={<HiOutlineSquaresPlus />}
          subMenu='products'
        >
          Products
        </NavMenu.NavMainLink>

        <NavMenu.NavSubMenu
          subMenu='products'
          icon={<HiOutlineCube />}
          linkTo='.'
        >
          All Products
        </NavMenu.NavSubMenu>

        <NavMenu.NavSubMenu
          subMenu='products'
          icon={<HiOutlinePlus />}
          linkTo='new'
        >
          New product
        </NavMenu.NavSubMenu>

        <NavMenu.NavSubMenu
          subMenu='products'
          icon={<HiOutlineFolder />}
          linkTo='categories'
        >
          Categories
        </NavMenu.NavSubMenu>

        <NavMenu.NavSubMenu
          subMenu='products'
          icon={<HiOutlineCheckBadge />}
          linkTo='brands'
        >
          Brands
        </NavMenu.NavSubMenu>

        <NavMenu.NavMainLink linkTo='orders' icon={<HiOutlineCurrencyDollar />}>
          Orders
        </NavMenu.NavMainLink>

        <NavMenu.NavMainLink linkTo='users' icon={<HiOutlineUsers />}>
          Users
        </NavMenu.NavMainLink>

        <NavMenu.NavMainLink linkTo='admins' icon={<HiOutlineUserCircle />}>
          Admins
        </NavMenu.NavMainLink>

        <NavMenu.NavMainLink
          linkTo='uisettings'
          icon={<HiOutlineCurrencyDollar />}
        >
          UI Settings
        </NavMenu.NavMainLink>
      </NavMenu>
    </nav>
  );
}

export default MainNav;
