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
const DatabaseSearch = lazy(() => import('../pages/DatabaseSearch/DatabaseSearch'));
const DeviceList = lazy(() => import('../pages/Device/DeviceList'));
const DeviceBraceletList = lazy(() => import('../pages/Device/BraceletList'));
const DeviceCameraList = lazy(() => import('../pages/Device/CameraList'));
const DeviceGatewayList = lazy(() => import('../pages/Device/GatewayList'));
const UserList = lazy(() => import('../pages/User/UserList'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/user-list',
    title: 'UserList',
    component: UserList,
  },
  {
    path: '/device-gateway-list',
    title: 'DeviceGatewayList',
    component: DeviceGatewayList,
  },
  {
    path: '/device-camera-list',
    title: 'DeviceCameraList',
    component: DeviceCameraList,
  },
  {
    path: '/device-bracelet-list',
    title: 'DeviceBraceletList',
    component: DeviceBraceletList,
  },
  {
    path: '/device-list',
    title: 'DeviceList',
    component: DeviceList,
  },
  {
    path: '/database-search',
    title: 'DatabaseSearch',
    component: DatabaseSearch,
  },
  {
    path: '/map',
    title: 'Map',
    component: Map,
  },
  {
    path: '/camera/:id',
    title: 'CameraDetail',
    component: CameraDetail,
  },
  {
    path: '/camera-list',
    title: 'CameraList',
    component: CameraList,
  },
  {
    path: '/dashboard',
    title: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
