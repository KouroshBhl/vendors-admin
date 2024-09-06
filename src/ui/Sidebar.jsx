import Logo from './Logo';
import MainNav from './MainNav';

function Sidebar() {
  return (
    <aside className='flex gap-14 grid-rows-1 flex-col px-4 py-10 border border-r-1 border-content1 bg-background'>
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
