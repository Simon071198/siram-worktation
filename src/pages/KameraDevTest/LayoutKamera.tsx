import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import KameraSidebar from './KameraSidebar';
import KontrolHideUnhide from './KontrolHideUnhide';

const LayoutKamera = () => {
  const [sidebarKamera, setSidebarKamera] = useState(false);
  const [bottomKamera, setBottomKamera] = useState(false);
  const [rightKamera, setRightKamera] = useState(false);

  const buttonSidebarKamera = () => {
    setSidebarKamera(!sidebarKamera)
  };

  const buttonBottomKamera = () => {
    setBottomKamera(!bottomKamera)
  };

  const buttonRightKamera = () => {
    setRightKamera(!rightKamera)
  };

  return (
    <div className="dark:text-bodydark bg-slate-700">
      <div className="flex h-screen">
        <KameraSidebar sidebarKamera={sidebarKamera}></KameraSidebar>

        <main className="w-full">
          <div className="flex justify-end pt-2 " >
            <KontrolHideUnhide
              sidebarKamera={sidebarKamera}
              setSidebarKamera={setSidebarKamera}
              buttonSidebarKamera={buttonSidebarKamera}

              bottomKamera={bottomKamera}
              setBottomKamera={setBottomKamera}
              buttonBottomKamera={buttonBottomKamera}

              rightKamera={rightKamera}
              setRightKamera={setRightKamera}
              buttonRightKamera={buttonRightKamera}


            />
          </div>
          <div className="mx-auto max-w-screen-2xl">
            <Outlet context={[bottomKamera, rightKamera]}/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LayoutKamera;
