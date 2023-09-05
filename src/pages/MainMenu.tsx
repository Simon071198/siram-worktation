import {
  CameraIcon,
  DashboardIcon,
  DatabaseWajahIcon,
  LogWajahIcon,
  LokasiIcon,
  ManajemenPenggunaIcon,
  PelacakanIcon,
  PendaftaranWajahIcon,
  PerangkatIcon,
  PetaIcon,
} from '../components/Icons';
import MenuItem from '../components/MenuItem';
import BackgroundSecurityImage from '../images/security-background.jpg';
import Logo from '../images/logo/logo.png';

const MainMenu = () => {
  const backgroundStyle = {
    backgroundImage: `url(${BackgroundSecurityImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.5 in this example) to make it darker or lighter
  };

  return (
    <div className="min-h-screen dark:text-bodydark" style={backgroundStyle}>
      <div className="absolute inset-0" style={overlayStyle}></div>
      <div className="flex justify-center items-center gap-x-2 w-full pt-8 relative">
        <img src={Logo} alt="Logo" className="w-12" />
        <span className="text-4xl text-white">SIRAM Workstation</span>
      </div>
      <div className="py-20 px-20 grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-20 xl:grid-cols-2 2xl:gap-20 relative">
        {routes.map((menu: any) => {
          return <MenuItem menu={menu} key={menu.id} />;
        })}
      </div>
    </div>
  );
};

const routes = [
  {
    id: 1,
    name: 'Dashboard',
    link: '/dashboard',
    icon: DashboardIcon,
  },
  {
    id: 2,
    name: 'Kamera',
    link: '/kamera',
    icon: CameraIcon,
  },
  {
    id: 3,
    name: 'Pelacakan',
    link: '/pelacakan-wajah-prajurit',
    icon: PelacakanIcon,
  },
  {
    id: 4,
    name: 'Manajemen Pengguna',
    link: '/manajemen-pengguna',
    icon: ManajemenPenggunaIcon,
  },
  {
    id: 5,
    name: 'Perangkat',
    link: '/perangkat-kamera',
    icon: PerangkatIcon,
  },
  {
    id: 6,
    name: 'Lokasi',
    link: '/lokasi',
    icon: LokasiIcon,
  },
  {
    id: 7,
    name: 'Log Pengenalan Wajah',
    link: '/log-realtime',
    icon: LogWajahIcon,
  },
  {
    id: 8,
    name: 'Pendaftaran Wajah',
    link: '/pendaftaran-wajah-prajurit',
    icon: PendaftaranWajahIcon,
  },
  {
    id: 9,
    name: 'Database Wajah',
    link: '/database-wajah-prajurit',
    icon: DatabaseWajahIcon,
  },
  {
    id: 10,
    name: 'Peta',
    link: '/peta',
    icon: PetaIcon,
  },
];

export default MainMenu;
