import React, { useState } from 'react';
import KameraSidebar from './SidebarPlayback';
import KontrolHideUnhide from './ControlHideUnhide';
import { Outlet } from 'react-router-dom';

const LayoutKamera = () => {
  const [bottomKamera, setBottomKamera] = useState(false);
  const [sidebarKamera, setSidebarKamera] = useState(false);

  const buttonSidebarKamera = () => {
    setSidebarKamera(!sidebarKamera)
  };
  
  return (
    <div className="dark:text-bodydark bg-slate-700">
      <div className="h-full flex">
        <KameraSidebar sidebarKamera={sidebarKamera}></KameraSidebar>

        <main className="w-full">
          <div className="flex pt-2">
            <KontrolHideUnhide
              sidebarKamera={sidebarKamera}
              setSidebarKamera={setSidebarKamera}
              buttonSidebarKamera={buttonSidebarKamera}
            />
          </div>
          <div>
          <Outlet context={[bottomKamera]}/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LayoutKamera;
