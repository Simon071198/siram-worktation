import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';

import BackgroundSecurityImage from '../images/security-background.jpg';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const ls_dataUser = localStorage.getItem('dataUser');
  useEffect(() => {
    if (!ls_dataUser) {
      navigate('/auth/signin');
    }
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${BackgroundSecurityImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.71)', // Adjust the alpha value (0.5 in this example) to make it darker or lighter
  };

  return (
    <div className="dark:text-bodydark bg-slate-700">
      {/* <div className="dark:text-bodydark" style={backgroundStyle}> */}
      {/* <div className="absolute inset-0" style={overlayStyle}></div> */}

      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
