import { NavLink } from 'react-router-dom';
import { AiOutlineCamera } from 'react-icons/ai';
import { AiOutlineUserSwitch } from 'react-icons/ai';

const routeSettingList = [
  {
    id: 1,
    name: 'User Management',
    link: '/manajemen-pengguna',
    icon: <AiOutlineUserSwitch size={25} />,
  },
  {
    id: 2,
    name: 'Perangkat',
    link: '/device-list',
    icon: <AiOutlineCamera size={25} />,
  },
];

const SettingList = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {routeSettingList.map((data) => (
          <NavLink to={data.link}>
            <div className="rounded-xl border border-stroke bg-slate-300  shadow-default dark:border-strokedark dark:bg-slate-300 ">
              <div className="bg-gradient-to-r from-red-500 to-yellow-500 m-[1px] rounded-xl overflow-hidden hover:from-yellow-500 hover:to-red-500 transition duration-700 ease-linear">
                <div className="bg-slate-300 m-[2px] rounded-xl hover:bg-slate-200 px-7 py-3">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-slate-400 text-slate-200">
                      {data.icon}
                    </div>

                    <div>
                      <h4 className="text-title-md font-bold text-black dark:text-meta-4">
                        {data.name}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        ))}

        {/* <NavLink to="/inmate-data">
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <svg
                fill="none"
                width="18"
                height="18"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  Data Prajurit Binaan{' '}
                </h4>
                <span className="text-sm font-medium">
                  {' '}
                  Data Prajurit Binaan
                </span>
              </div>
            </div>
          </div>{' '}
        </NavLink>

        <NavLink to="/staff-data">
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <svg
                fill="none"
                width="18"
                height="18"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  Data Petugas{' '}
                </h4>
                <span className="text-sm font-medium"> Data Petugas</span>
              </div>
            </div>
          </div>{' '}
        </NavLink>

        <NavLink to="/visitor-data">
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <svg
                fill="none"
                width="18"
                height="18"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  Data Pengunjung{' '}
                </h4>
                <span className="text-sm font-medium"> Data Pengunjung</span>
              </div>
            </div>
          </div>{' '}
        </NavLink>

        <NavLink to="/event-data">
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <svg
                fill="none"
                width="18"
                height="18"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  Data Event{' '}
                </h4>
                <span className="text-sm font-medium"> Data Event</span>
              </div>
            </div>
          </div>{' '}
        </NavLink>

        <NavLink to="/case-type-data">
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <svg
                fill="none"
                width="18"
                height="18"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  Data Perkara{' '}
                </h4>
                <span className="text-sm font-medium"> Data Jenis Kasus</span>
              </div>
            </div>
          </div>{' '}
        </NavLink>

        <NavLink to="/room-data">
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <svg
                fill="none"
                width="18"
                height="18"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  Data Ruangan{' '}
                </h4>
                <span className="text-sm font-medium"> Data Ruangan</span>
              </div>
            </div>
          </div>{' '}
        </NavLink> */}
      </div>
    </>
  );
};

export default SettingList;
