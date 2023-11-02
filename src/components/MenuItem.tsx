import { Link } from 'react-router-dom';

interface MenuItemProps {
  menu: any;
  key: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ menu, index }: any) => {
  return (
    // <Link
    //   to={menu.link}
    //   key={index}
    //   className="rounded-xl border border-stroke  shadow-md backdrop-blur-sm dark:border-slate-500 bg-slate-300 w-50 hover:bg-white transition duration-300 ease-linear hover:shadow-slate-400 hover:scale-105"
    // >
    //   <div className="bg-gradient-to-r from-red-500 to-yellow-500 m-[2px] rounded-xl overflow-hidden hover:from-yellow-500 hover:to-red-500 transition duration-700 ease-linear">
    //     <div className="bg-slate-300 m-[4px] rounded-xl hover:bg-slate-200">

    //       <div className="flex py-2 w-full items-center justify-center rounded-lg  bg-transparent  text-meta-4" >
    //         {menu.icon}
    //       </div>

    //       <div className="flex items-end justify-between ">
    //         <div className="w-full">
    //           <h4 className="mb-4 text-title-md text-center font-bold text-meta-4">
    //             {menu.name}
    //           </h4>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Link>
    <Link
      to={menu.link}
      key={index}
      className="rounded-sm border border-stroke py-6 px-7.5 shadow-default backdrop-blur-sm dark:border-slate-400"
      style={{ backgroundColor: 'rgba(32,33,35, 0.7)' }}
    >
      <div className="flex h-32 w-full items-center justify-center rounded-lg  bg-meta-4 text-white">
        {menu.icon}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div className="w-full">
          <h4 className="text-title-md text-center font-bold text-white">
            {menu.name}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default MenuItem;
