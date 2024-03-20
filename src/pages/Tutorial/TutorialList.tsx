import React, { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const TutorialList = () => {
  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '.page-header',
          popover: {
            title: 'Header',
            description: 'Menampilkan halaman utama',
          },
        },
        {
          element: '.top-nav',
          popover: { title: 'Nav', description: 'Menampilan halaman nav' },
        },
        {
          element: '.sidebar',
          popover: {
            title: 'Sidebar',
            description: 'Menampilkan halaman sidebar',
          },
        },
        {
          element: '.footer',
          popover: {
            title: 'Footer',
            description: 'Menampilkan halaman footer',
          },
        },
      ],
    });

    driverObj.drive();

    // Cleanup the driver instance when the component unmounts
    return () => driverObj.destroy();
  }, []); // Ensure this effect runs only once after initial render

  return (
    <div>
      <div className="page-header">Page Header</div>
      <div className="top-nav">Top Navigation</div>
      <div className="sidebar">Sidebar</div>
      <div className="footer">Footer</div>
    </div>
  );
};

export default TutorialList;
