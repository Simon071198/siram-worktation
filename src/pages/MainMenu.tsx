import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '../components/MenuItem';
import Logo from '../images/logo/logo.png';
import 'tailwindcss/tailwind.css';

import {
  CameraIcon,
  DashboardIcon,
  PelacakanIcon,
  PengaturanIcon,
  LogIcon,
  ShiftIcon,
  BAPIcon,
  DataPerkaraIcon,
  DaftarInventarisIcon,
  ChatIcon,
} from '../components/Icons';
import BackgroundSecurityImage from '../images/security-background.jpg';
import 'tailwindcss/tailwind.css';

const MainMenu = () => {
  const navigate = useNavigate();

  // useEffect(()=>{
  // const ls_username = localStorage.getItem('username')
  // if(!ls_username){
  //   navigate('/auth/signin')
  // }

  // },[])

  const backgroundStyle = {
    backgroundImage: `url(${BackgroundSecurityImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroudOpacity: '0.5',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.5 in this example) to make it darker or lighter
  };

  return (
    //   <div className="min-h-screen dark:text-bodydark bg-slate-700  " >
    //  {/* <div className="dark:text-bodydark" style={backgroundStyle}> */}
    //     {/* <div className="absolute inset-0" style={overlayStyle}></div> */}
    //     <div className="flex justify-center items-center gap-x-2 bg-slate-300 backdrop-blur w-full py-5 z-10">
    //       <img src={Logo} alt="Logo" className="w-12" />
    //       <span className="text-4xl text-black font-bold tracking-wider">
    //         SIRAM Workstation
    //       </span>
    //     </div>
    //     <div className='flex flex-row justify-center w-full my-[70px] overflow-y-scroll h-[580px] py-2 pb-4 px-4'>
    //     <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
    //       {routes.map((menu: any) => {
    //         return <MenuItem menu={menu} key={menu.id} />;
    //       })}
    //     </div>
    //     </div>
    //   </div>
    //  <div className="dark:text-bodydark" style={backgroundStyle}>
    <div className="min-h-screen dark:text-bodydark bg-slate-700">
      <div className="min-h-screen dark:text-bodydark bg-blue-950 bg-opacity-50 ">
        {/* <div className="absolute inset-0" style={overlayStyle}></div> */}
        <div className="flex justify-center items-center gap-x-2 bg-transparent-dark1 backdrop-blur w-full py-5 fixed z-10">
          <img src={Logo} alt="Logo" className="w-12" />
          <span className="text-4xl text-white font-bold tracking-wider">
            SIRAM Workstation
          </span>
        </div>
        <div className="pb-20 pt-30 px-20 overflow-y-auto grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-20 xl:grid-cols-3 2xl:gap-20 relative">
          {routes.map((menu: any) => {
            return <MenuItem menu={menu} key={menu.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

const routes = [
  {
    id: 2,
    name: 'Kamera',
    link: '/kamera',
    icon: CameraIcon,
  },
  {
    id: 3,
    name: 'Pelacakan',
    link: '/db-search-list',
    icon: PelacakanIcon,
  },
  {
    id: 4,
    name: 'Pengaturan',
    link: '/setting-list',
    icon: PengaturanIcon,
  },
  {
    id: 7,
    name: 'Log',
    link: '/log-riwayat',
    icon: LogIcon,
  },
  {
    id: 12,
    name: 'Master Data',
    link: '/master-data-list',
    icon: DashboardIcon,
  },
  {
    id: 13,
    name: 'Live Chat',
    link: '/live-chat-list',
    icon: ChatIcon,
  },
  {
    id: 14,
    name: 'Shift',
    link: '/ShiftJaga',
    icon: ShiftIcon,
  },
  {
    id: 15,
    name: 'Pencatatan BAP',
    link: '/pencatatan-bap',
    icon: BAPIcon,
  },
  {
    id: 16,
    name: 'Daftar Sidang',
    link: '/daftar-sidang',
    icon: DataPerkaraIcon,
  },
  {
    id: 17,
    name: 'Daftar Inventaris',
    link: '/daftar-inventaris',
    icon: DaftarInventarisIcon,
  },
];

// const MainMenu = () => {
//   const navigate = useNavigate();
//   const ls_dataUser = localStorage.getItem('dataUser');

//   useEffect(() => {
//     if (!ls_dataUser) {
//       navigate('/auth/signin');
//     }
//   }, []);

//   return (
//     <div className="text-bodydark relative bg-slate-700 min-h-screen">
//       <div className="flex justify-center fixed top-0 items-center gap-x-2 bg-transparent-light backdrop-blur w-full py-5 z-10">
//         <img src={Logo} alt="Logo" className="w-12" />
//         <span className="text-4xl text-black font-bold tracking-wider">
//           SIRAM Workstation OTMIL Cimahi
//         </span>
//       </div>
//       <div className="flex items-start justify-center w-full py-[60px] overflow-y-scroll px-4">
//         <div className="mt-20 grid grid-cols-1 gap-10 xl:gap-14 md:grid-cols-2 xl:grid-cols-3">
//           {routes.map((menu) => (
//             <MenuItem menu={menu} key={menu.id} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

export default MainMenu;
