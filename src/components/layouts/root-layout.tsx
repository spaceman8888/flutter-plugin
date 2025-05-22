import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="bg-gray-400 h-screen">
      <h1>Root Layout</h1>
      <Outlet />
    </div>
  );
};

export default RootLayout;
