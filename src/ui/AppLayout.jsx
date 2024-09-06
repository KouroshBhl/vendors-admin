import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <div className='flex flex-col'>
      <Header />
      <div className='grid grid-cols-[20rem,1fr] min-h-screen'>
        <Sidebar />
        <main className='px-6 py-10 overflow-scroll bg-background'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
