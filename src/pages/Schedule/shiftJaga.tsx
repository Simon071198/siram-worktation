import { NavLink } from 'react-router-dom';
import { HiOutlineUserGroup } from 'react-icons/hi';
import {MdOutlinePermContactCalendar} from 'react-icons/md'

const routeMasterData = [
  {
    id: 1,
    name: 'Calendar Shift',
    link: '/CalendarShift',
    icon: (
     <MdOutlinePermContactCalendar size={26}/>
    ),
  },
  {
    id: 2,
    name: 'Grup Petugas Shift',
    link: '/GroupShift',
    icon: (
      <HiOutlineUserGroup size={25}/>
    ),
  }
];

const MasterDataList = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {routeMasterData.map((data) => (
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
      </div>
    </>
  );
};

export default MasterDataList;
