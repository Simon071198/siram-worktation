import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
import CameraDetail from '../pages/Camera/CameraDetail';
const CameraList = lazy(() => import('../pages/Camera/CameraList'));
// const CameraDetail = lazy(() => import('../pages/Camera/CameraDetail'));
const Map = lazy(() => import('../pages/Map/Map'));
const DatabaseSearch = lazy(
  () => import('../pages/DatabaseSearch/DatabaseSearch'),
);
const DeviceList = lazy(() => import('../pages/Device/DeviceList'));
const DeviceBraceletList = lazy(() => import('../pages/Device/BraceletList'));
const DeviceCameraList = lazy(() => import('../pages/Device/CameraList'));
const DeviceGatewayList = lazy(() => import('../pages/Device/GatewayList'));
const UserList = lazy(() => import('../pages/User/UserList'));
// const DialogAddUser = lazy(() => import('../pages/User/components/DialogAddUser'))
const LocationList = lazy(() => import('../pages/Location/LocationList'));
const DatabaseSearchList = lazy(
  () => import('../pages/DatabaseSearch/DatabaseSearchList'),
);
const InmateDatabaseSearchByName = lazy(
  () => import('../pages/DatabaseSearch/InmateDatabaseSearchByName'),
);
const EmployeeDatabaseSearchByName = lazy(
  () => import('../pages/DatabaseSearch/EmployeeDatabaseSearchByName'),
);
const LogList = lazy(() => import('../pages/LogPage/LogList'));
const InmateLog = lazy(() => import('../pages/LogPage/InmateLog'));
const RealtimeLog = lazy(() => import('../pages/LogPage/RealtimeLog'));

const coreRoutes = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    component: Dashboard,
  },
  // {
  //   path: '/calendar',
  //   title: 'Calender',
  //   component: Calendar,
  // },
  {
    path: '/log-realtime',
    title: 'RealtimeLog',
    component: RealtimeLog,
  },
  {
    path: '/inmate-log',
    title: 'InmateLog',
    component: InmateLog,
  },
  {
    path: '/log-riwayat',
    title: 'LogList',
    component: LogList,
  },
  {
    path: '/pelacakan-wajah-petugas',
    // path: '/db-employee-search-by-name',
    title: 'EmployeeDatabaseSearchByName',
    component: EmployeeDatabaseSearchByName,
  },
  {
    path: '/pelacakan-wajah-prajurit',
    // path: '/db-inmate-search-by-name',
    title: 'InmateDatabaseSearchByName',
    component: InmateDatabaseSearchByName,
  },
  {
    path: '/db-search-list',
    title: 'DatabaseSearchList',
    component: DatabaseSearchList,
  },
  {
    path: '/lokasi',
    title: 'LocationList',
    component: LocationList,
  },
  {
    path: '/manajemen-pengguna',
    title: 'UserList',
    component: UserList,
  },
  // {
  //   path: '/manajemen-pengguna',
  //   title: 'UserList',
  //   component: DialogAddUser,
  // },
  {
    path: '/perangkat-gateway',
    // path: '/device-gateway-list',
    title: 'DeviceGatewayList',
    component: DeviceGatewayList,
  },
  {
    path: '/perangkat-kamera',
    // path: '/device-camera-list',
    title: 'DeviceCameraList',
    component: DeviceCameraList,
  },
  {
    path: '/perangkat-gelang',
    // path: '/device-bracelet-list',
    title: 'DeviceBraceletList',
    component: DeviceBraceletList,
  },
  {
    path: '/device-list',
    title: 'DeviceList',
    component: DeviceList,
  },
  {
    path: '/pelacakan-dengan-gambar',
    title: 'DatabaseSearch',
    component: DatabaseSearch,
  },
  {
    path: '/peta',
    title: 'Map',
    component: Map,
  },
  {
    path: '/kamera/:id',
    title: 'CameraDetail',
    component: CameraDetail,
  },
  {
    path: '/kamera',
    title: 'CameraList',
    component: CameraList,
  },

  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  // {
  //   path: '/forms/form-elements',
  //   title: 'Forms Elements',
  //   component: FormElements,
  // },
  // {
  //   path: '/forms/form-layout',
  //   title: 'Form Layouts',
  //   component: FormLayout,
  // },
  // {
  //   path: '/tables',
  //   title: 'Tables',
  //   component: Tables,
  // },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  // {
  //   path: '/chart',
  //   title: 'Chart',
  //   component: Chart,
  // },
  // {
  //   path: '/ui/alerts',
  //   title: 'Alerts',
  //   component: Alerts,
  // },
  // {
  //   path: '/ui/buttons',
  //   title: 'Buttons',
  //   component: Buttons,
  // },
];

const routes = [...coreRoutes];
export default routes;
