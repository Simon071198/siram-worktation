import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuItem from '../components/MenuItem';
import Logo from '../images/logo/logo.png';
import { PiIdentificationCardThin } from 'react-icons/pi';
import { VscLaw } from 'react-icons/vsc';
import { IoDocumentText } from 'react-icons/io5';

import {
  CameraIcon,
  DashboardIcon,
  PelacakanIcon,
  PengaturanIcon,
  LogIcon,
  ShiftIcon,
  BAPIcon,
  DaftarInventarisIcon,
  ChatIcon,
  eventIcons,
  Pengunjung,
} from '../components/Icons';
import BackgroundSecurityImage from '../images/security-background.jpg';
import { BsBriefcaseFill } from 'react-icons/bs';
import Loader from '../common/Loader';
import toast from 'react-hot-toast';
import { version } from '../utils/constants';
import { apiversion } from '../services/api';
import { FaCirclePlus } from 'react-icons/fa6';

const MainMenu = () => {
  const navigate = useNavigate();
  const dataUserItem = localStorage.getItem('dataUser');
  const dataUser = dataUserItem ? JSON.parse(dataUserItem) : null;

  useEffect(() => {
    if (!dataUser) {
      navigate('/auth/signin');
    }
  }, []);

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
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
          <span className="text-4xl text-white font-bold tracking-wider uppercase">
            {dataUser.nama_lokasi_otmil
              ? 'SIRAM Workstation OTMIL ' + dataUser.nama_lokasi_otmil
              : 'SIRAM Workstation LEMASMIL ' + dataUser.nama_lokasi_lemasmil}
          </span>
        </div>
        <div className="pb-20 pt-30 px-20 overflow-y-auto grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-20 xl:grid-cols-3 2xl:gap-20 relative">
          {routes.map((menu: any) => {
            return <MenuItem menu={menu} key={menu.id} />;
          })}
          <button
            onClick={async (e) => {
              e.preventDefault();
              try {
                // Call the apiversion function to get the response
                const response = await apiversion({
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                let versionName: string;
                const version = response.data.records.map((a) => {
                  versionName = a.version_name;
                  return versionName;
                });

                console.log('version', version);

                // const versionName = response.data.records.version_name;
                console.log('versionName', response.data);

                // Update toast content with fetched data
                // toast(
                //   `This app version is ${version}.`,
                //   {
                //     duration: 5000,
                //   }
                // );

                if (versionName == version) {
                  toast.success(
                    `This app version is up-to-date ( Version ${version} )`,
                    { duration: 5000 },
                  );
                } else {
                  toast((t) => (
                    <span
                      style={{
                        ...t.style,
                        animation: t.visible
                          ? 'custom-enter 1s ease'
                          : 'custom-exit 1s ease',
                      }}
                    >
                      There is an update from version {version} to version{' '}
                      {versionName}{' '}
                      <a
                        href={response.data.data.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 bold"
                      >
                        Download
                      </a>
                      <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                          border: 'none',
                          position: 'absolute',
                          right: '0.5rem',
                          top: '0.5rem',
                          cursor: 'pointer',
                        }}
                      >
                        <b>X</b>
                      </button>
                    </span>
                  ));
                }

                console.log('Data:', response.data.data);
              } catch (error) {
                console.error('Error fetching data:', error);
                toast('Error fetching data', { duration: 5000 });
              }
            }}
            className="rounded-sm border border-stroke py-6 px-7.5 shadow-default backdrop-blur-sm dark:border-slate-400"
            style={{ backgroundColor: 'rgba(32,33,35, 0.7)' }}
          >
            <div className="flex h-32 w-full items-center justify-center rounded-lg  bg-meta-4 text-white">
              {LogIcon}
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div className="w-full">
                <h4 className="text-title-md text-center font-bold text-white">
                  Version
                </h4>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const routes = [
  {
    id: 0,
    name: 'Entry Data',
    link: '/entry-data',
    icon: <FaCirclePlus size={90} />,
  },
  {
    id: 1,
    name: 'Penyidikan',
    link: '/penyidikan',
    icon: <PiIdentificationCardThin size={90} />,
  },
  {
    id: 2,
    name: 'Daftar BAP',
    link: '/pencatatan-bap',
    icon: BAPIcon,
  },
  {
    id: 3,
    name: 'Daftar Sidang',
    link: '/daftar-sidang',
    icon: <VscLaw size={80} />,
  },
  {
    id: 4,
    name: 'Daftar Kasus',
    link: '/daftar-kasus',
    icon: <BsBriefcaseFill size={80} />,
  },
  {
    id: 5,
    name: 'Aktivitas Pengunjung',
    link: '/pengunjung',
    icon: Pengunjung,
  },
  {
    id: 6,
    name: 'Shift',
    link: '/shift-jaga',
    icon: ShiftIcon,
  },
  {
    id: 7,
    name: 'Master Data',
    link: '/master-data',
    icon: DashboardIcon,
  },
  {
    id: 8,
    name: 'Kegiatan',
    link: '/kegiatan',
    icon: eventIcons,
  },
  {
    id: 9,
    name: 'Daftar Inventaris',
    link: '/daftar-inventaris',
    icon: DaftarInventarisIcon,
  },
  {
    id: 10,
    name: 'Kamera Live',
    link: '/kamera-live',
    icon: CameraIcon,
  },
  {
    id: 11,
    name: 'Kamera Playback',
    link: '/kamera-playback',
    icon: CameraIcon,
  },
  {
    id: 12,
    name: 'Pelacakan',
    link: '/pelacakan',
    icon: PelacakanIcon,
  },
  {
    id: 13,
    name: 'Live Chat',
    link: '/live-chat-list',
    icon: ChatIcon,
  },
  {
    id: 14,
    name: 'Pengaturan',
    link: '/pengaturan-list',
    icon: PengaturanIcon,
  },
  {
    id: 15,
    name: 'Log',
    link: '/log-riwayat',
    icon: LogIcon,
  },
  // {
  //   id: 16,
  //   name: 'Version',
  //   link: '/version',
  //   icon: LogIcon,
  // },
  // {
  //   id: 17,
  //   name: 'Tutorial',
  //   link: '/tutorial-data',
  //   icon: <IoDocumentText size={80} />,
  // },
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
