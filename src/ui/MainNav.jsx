import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineUserCircle,
  HiOutlineCurrencyDollar,
  HiOutlineSquaresPlus,
  HiOutlineFolder,
  HiOutlineCurrencyBangladeshi,
  HiOutlineCube,
  HiOutlinePlus,
  HiOutlineInbox,
  HiOutlineWrenchScrewdriver,
  HiOutlineSwatch,
  HiOutlineDocument,
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
          linkTo='/rates'
          icon={<HiOutlineCurrencyBangladeshi />}
        >
          Manage Rates
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
          icon={<HiOutlineInbox />}
          linkTo='platforms'
        >
          Platforms
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
          icon={<HiOutlineWrenchScrewdriver />}
          subMenu='uisettings'
          linkTo='/uisettings'
        >
          UI Settings
        </NavMenu.NavMainLink>

        <NavMenu.NavSubMenu
          subMenu='uisettings'
          icon={<HiOutlineSwatch />}
          linkTo='.'
        >
          General
        </NavMenu.NavSubMenu>
        <NavMenu.NavSubMenu
          subMenu='uisettings'
          icon={<HiOutlineDocument />}
          linkTo='homepage'
        >
          Home Page
        </NavMenu.NavSubMenu>
      </NavMenu>
    </nav>
  );
}

export default MainNav;
