import { Link } from 'react-router-dom';

interface MenuItemProps {
  menu: any;
  key: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ menu, key }) => {
  return (
    <Link
      to={menu.link}
      key={key}
      className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-transparent-dark"
    >
      <div className="flex h-32 w-full items-center justify-center rounded-lg bg-meta-2 dark:bg-meta-4">
        {menu.icon}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div className="w-full">
          <h4 className="text-title-md text-center font-bold text-black dark:text-white">
            {menu.name}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default MenuItem;
