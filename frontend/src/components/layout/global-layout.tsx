
import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { TopNavbar } from './top-navbar';

export const GlobalLayout = () => {
  return (
    <div className="flex min-h-screen bg-odoo-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />
        <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
