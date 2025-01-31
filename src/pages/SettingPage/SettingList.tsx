import { NavLink } from 'react-router-dom';
import { AiOutlineCamera } from 'react-icons/ai';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { Breadcrumbs } from '../../components/Breadcrumbs';

const routeSettingList = [
  {
    id: 1,
    name: 'Manajement Pengguna',
    link: '/pengaturan-list/manajemen-pengguna',
    icon: <AiOutlineUserSwitch size={25} />,
  },
  {
    id: 2,
    name: 'Perangkat',
    link: '/pengaturan-list/perangkat',
    icon: <AiOutlineCamera size={25} />,
  },
];

const SettingList = () => {
  return (
    <>
      <div className="container py-[16px]">
        <div className="pb-4">
          <Breadcrumbs url={window.location.href} />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          {routeSettingList.map((data) => (
            <NavLink to={data.link}>
              <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex items-center gap-4">
                  <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    {data.icon}
                  </div>

                  <div>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                      {data.name}
                    </h4>
                    <span className="text-sm font-medium"> {data.name}</span>
                  </div>
                </div>
              </div>{' '}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default SettingList;
