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

//Scedule
const ShiftJaga = lazy(() => import('../pages/Schedule/shiftJaga'));
const CalendarShift = lazy(
  () => import('../pages/Schedule/CalenderShift/calenderShift'),
);
const GroupShift = lazy(() => import('../pages/Schedule/GrupShift/grupShift'));
const DataSceduleShift = lazy(
  () => import('../pages/Schedule/SceduleShift/dataSceduleShift'),
);

const Penugasan = lazy(
  () => import('../pages/Schedule/Penugasan/dataPenugasan'),
);

const Statistic = lazy(() => import('../pages/Statistic/Statistic'));
import CameraDetail from '../pages/Camera/CameraDetail';
import GedungList from '../pages/MasterData/GedungData/GedungList';
const CameraList = lazy(() => import('../pages/Camera/CameraList'));
// const CameraDetail = lazy(() => import('../pages/Camera/CameraDetail'));
const Map = lazy(() => import('../pages/Map/Map'));
const MapSetting = lazy(() => import('../pages/SettingPage/MapSetting'));
const DatabaseSearch = lazy(
  () => import('../pages/DatabaseSearch/DatabaseSearch'),
);
const DeviceList = lazy(() => import('../pages/Device/DeviceList'));
const DeviceBraceletList = lazy(
  () => import('../pages/Device/Gelang/GelangList'),
);
// const DeviceCameraList = lazy(() => import('../pages/Device/Kamera/CameraList'));
const DeviceKameraList = lazy(
  () => import('../pages/Device/Kamera/KameraList'),
);
const DeviceGatewayList = lazy(
  () => import('../pages/Device/Gateway/GatewayList'),
);
const UserList = lazy(() => import('../pages/User/UserList'));
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
const InmateLog = lazy(
  () => import('../pages/LogPage/LogFaceRecognition/InmateLog'),
);
const RealtimeLog = lazy(
  () => import('../pages/LogPage/LogFaceRecognition/RealtimeLog'),
);
const LogAccessControlList = lazy(
  () => import('../pages/LogPage/LogAccessControl/LogAccessControlList'),
);
const LogFaceRecognitionList = lazy(
  () => import('../pages/LogPage/LogFaceRecognition/LogFaceRecognitionList'),
);
const DoorLog = lazy(() => import('../pages/LogPage/LogAccessControl/DoorLog'));
const GatewayLog = lazy(
  () => import('../pages/LogPage/LogAccessControl/GatewayLog'),
);

const MainSetting = lazy(() => import('../pages/SettingPage/MainSetting'));
const LocationSetting = lazy(
  () => import('../pages/SettingPage/LocationSetting'),
);
const RoomSetting = lazy(() => import('../pages/SettingPage/RoomSetting'));
const DeviceSetting = lazy(() => import('../pages/SettingPage/DeviceSetting'));
const SettingList = lazy(() => import('../pages/SettingPage/SettingList'));
const LiveChatList = lazy(() => import('../pages/LiveChat/LiveChatList'));
const AktifitasPengunjung = lazy(
  () => import('../pages/AktifitasPengunjung/AktifitasPengunjungList'),
);

const FaceDBList = lazy(() => import('../pages/FaceDBPage/FaceDBList'));
// const InmateFaceDB = lazy(() => import('../pages/FaceDBPage/InmateFaceDB'));
// const StaffFaceDB = lazy(() => import('../pages/FaceDBPage/StaffFaceDB'));

const RegisterFaceList = lazy(
  () => import('../pages/RegisterFace/RegisterFaceList'),
);
const AddInmateFace = lazy(() => import('../pages/RegisterFace/AddInmateFace'));
const AddStaffFace = lazy(() => import('../pages/RegisterFace/AddStaffFace'));

const MasterDataList = lazy(() => import('../pages/MasterData/MasterDataList'));
const MasterDataVisitor = lazy(
  () => import('../pages/MasterData/VisitorData/VisitorList'),
);
const MasterDataInmate = lazy(
  () => import('../pages/MasterData/InmateData/InmateList'),
);
const MasterDataStaff = lazy(
  () => import('../pages/MasterData/StaffData/StaffList'),
);
const MasterDataEvent = lazy(
  () => import('../pages/MasterData/EventData/EventList'),
);
const MasterDataRoom = lazy(
  () => import('../pages/MasterData/RoomData/RoomList'),
);
const MasterDataCaseType = lazy(
  () => import('../pages/MasterData/CaseTypeData/CaseTypeList'),
);
const MasterDataKategoriPerkara = lazy(
  () => import('../pages/MasterData/KategoriPerkara/KategoriPerkaraList'),
);

const PencatatanBAP = lazy(() => import('../pages/PencatatanBAP/BAPList'));
const DaftarInventaris = lazy(
  () => import('../pages/DaftarInventaris/InventarisList'),
);
const DaftarSidang = lazy(
  () => import('../pages/DaftarSidangPerkara/SidangList'),
);

const DaftarTipeAsset = lazy(
  () => import('../pages/MasterData/TipeAssetData/TipeList'),
);

const DaftarHakim = lazy(
  () => import('../pages/MasterData/HakimData/HakimList'),
);

const DaftarJaksaPenyidik = lazy(
  () =>
    import('../pages/MasterData/JaksaData/OditurPenyidik/OditurPenyidikList'),
);

const DaftarJaksaPenuntut = lazy(
  () => import('../pages/MasterData/JaksaData/JaksaPenuntut/JaksaPenuntutList'),
);

const DaftarJaksa = lazy(
  () => import('../pages/MasterData/JaksaData/JaksaList'),
);

const DaftarSaksi = lazy(
  () => import('../pages/MasterData/SaksiData/SaksiList'),
);
const DaftarAhli = lazy(() => import('../pages/MasterData/AhliData/AhliList'));

const DaftarGedung = lazy(
  () => import('../pages/MasterData/GedungData/GedungList'),
);

const DaftarLantai = lazy(
  () => import('../pages/MasterData/Lantai/LantaiList'),
);

const DaftarJenisPersidangan = lazy(
  () => import('../pages/MasterData/JenisPersidanganData/JenisPersidanganList'),
);
const BarangBukti = lazy(
  () => import('../pages/MasterData/BarangBukti/BarangBuktiList'),
);
const DaftarKasus = lazy(() => import('../pages/Daftarkasus/DaftarKasusList'));
const Oditor = lazy(() => import('../pages/MasterData/Oditur/OditurList'));
const PengadilanMiliter = lazy(
  () => import('../pages/MasterData/PengadilanMiliter/PengadilanMiliterList'),
);
const Penyidikan = lazy(
  () => import('../pages/Penyidikan/DataPenyidikan/PenyidikanList'),
);
const HistoryPenyidikan = lazy(
  () => import('../pages/Penyidikan/HistoryPenyidikan/HistoryPenyidikanList'),
);
const ListPenyidikan = lazy(
  () => import('../pages/Penyidikan/penyelidikanList'),
);
// const KameraTest = lazy(()=> import('../pages/KameraDevTest/KameraMainPage'))
// const KameraDetail = lazy(()=> import('../pages/KameraDevTest/KameraDetail'))

const CameraPlayback = lazy(() => import('../pages/Camera/CameraPlayback'));

const MenuTutorial = lazy(() => import('../pages/Tutorial/TutorialList'));

const coreRoutes = [
  // {
  //   path: '/kemera-dev-test/:id',
  //   title: 'kamera dev test',
  //   component: KameraDetail,
  // },

  // {
  //   path: '/kemera-dev-test',
  //   title: 'kamera dev test',
  //   component: KameraTest,
  // },
  {
    path: '/penyidikan',
    title: 'penyidikan',
    component: Penyidikan,
  },
  {
    path: '/historyPenyidikan',
    title: 'history penyidikan',
    component: HistoryPenyidikan,
  },
  {
    path: '/listPenyidikan',
    title: 'list penyidikan',
    component: ListPenyidikan,
  },
  {
    path: '/pengadilan-militer',
    title: 'pengadilan militer',
    component: PengadilanMiliter,
  },
  {
    path: '/oditur',
    title: 'oditur',
    component: Oditor,
  },
  {
    path: '/daftar-kasus',
    title: 'daftar kasus',
    component: DaftarKasus,
  },
  {
    path: '/barang-bukti',
    title: 'barang bukti',
    component: BarangBukti,
  },
  {
    path: '/jenis-persidangan-data',
    title: 'jenis persidangan data',
    component: DaftarJenisPersidangan,
  },
  {
    path: '/ahli-data',
    title: 'ahli data',
    component: DaftarAhli,
  },
  {
    path: '/data-gedung',
    title: 'Data Gedung',
    component: DaftarGedung,
  },
  {
    path: '/data-lantai',
    title: 'Data Lantai',
    component: DaftarLantai,
  },
  {
    path: '/saksi-data',
    title: 'saksi data',
    component: DaftarSaksi,
  },
  {
    path: '/jaksa-list',
    title: 'jaksa list',
    component: DaftarJaksa,
  },
  {
    path: '/oditur-penyidik-data',
    title: 'oditur penyidik data',
    component: DaftarJaksaPenyidik,
  },
  {
    path: '/oditur-penuntut-data',
    title: 'oditur penuntut data',
    component: DaftarJaksaPenuntut,
  },
  {
    path: '/hakim-data',
    title: 'hakim data',
    component: DaftarHakim,
  },
  {
    path: '/tipeasset-data',
    title: 'tipeasset data',
    component: DaftarTipeAsset,
  },
  {
    path: '/setting-list',
    title: 'setting',
    component: SettingList,
  },
  {
    path: '/pengunjung',
    title: 'aktifitas pengunjung',
    component: AktifitasPengunjung,
  },
  {
    path: '/daftar-sidang',
    title: 'daftar sidang',
    component: DaftarSidang,
  },
  {
    path: '/daftar-inventaris',
    title: 'daftar inventaris',
    component: DaftarInventaris,
  },
  {
    path: '/pencatatan-bap',
    title: 'pencatatan bap',
    component: PencatatanBAP,
  },
  {
    path: '/kategoriperkara',
    title: 'kategori perkara',
    component: MasterDataKategoriPerkara,
  },
  {
    path: '/kamera-playback',
    title: 'kamera playback',
    component: CameraPlayback,
  },
  {
    path: '/ShiftJaga',
    title: 'Shift Jaga',
    component: ShiftJaga,
  },
  {
    path: '/CalendarShift',
    title: 'Calendar Shift',
    component: CalendarShift,
  },
  {
    path: '/GroupShift',
    title: 'GroupShift',
    component: GroupShift,
  },
  {
    path: '/Penugasan',
    title: 'Penugasan',
    component: Penugasan,
  },
  {
    path: '/DataSceduleShift',
    title: 'DataSceduleShift',
    component: DataSceduleShift,
  },
  {
    path: '/statistic',
    title: 'Statistic',
    component: Statistic,
  },
  // {
  //   path: '/calendar',
  //   title: 'Calender',
  //   component: Calendar,
  // },
  {
    path: '/log-riwayat',
    title: 'LogList',
    component: LogList,
  },
  {
    path: '/log-face-recognition',
    title: 'LogFaceRecognitionList',
    component: LogFaceRecognitionList,
  },
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
    path: '/log-access-control',
    title: 'LogAccessControlList',
    component: LogAccessControlList,
  },
  {
    path: '/door-log',
    title: 'DoorLog',
    component: DoorLog,
  },
  {
    path: '/gateway-log',
    title: 'GatewayLog',
    component: GatewayLog,
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
    component: DeviceKameraList,
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
    path: '/peta-setting',
    title: 'peta',
    component: MapSetting,
  },
  {
    path: '/kamera/:id',
    title: 'CameraDetail',
    component: CameraDetail,
  },
  {
    path: '/kamera-dev-test',
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
  {
    path: '/database-wajah-petugas',
    title: 'CameraList',
    component: CameraList,
  },
  {
    path: '/database-wajah-prajurit',
    title: 'CameraList',
    component: CameraList,
  },
  {
    path: '/pendaftaran-wajah-petugas',
    title: 'CameraList',
    component: CameraList,
  },
  {
    path: '/pendaftaran-wajah-prajurit',
    title: 'CameraList',
    component: CameraList,
  },
  {
    path: '/pengaturan',
    title: 'MainSetting',
    component: MainSetting,
  },
  {
    path: '/pengaturan-lokasi/:id',
    title: 'LocationSetting',
    component: LocationSetting,
  },
  {
    path: '/pengaturan-ruangan/:id',
    title: 'RoomSetting',
    component: RoomSetting,
  },
  {
    path: '/pengaturan-perangkat/:id',
    title: 'DeviceSetting',
    component: DeviceSetting,
  },
  {
    path: '/faceDBList',
    title: 'FaceDBList',
    component: FaceDBList,
  },
  // {
  //   path: '/inmate-faceDB',
  //   title: 'InmateFaceDB',
  //   component: InmateFaceDB,
  // },
  // {
  //   path: '/staff-faceDB',
  //   title: 'StaffFaceDB',
  //   component: StaffFaceDB,
  // },
  {
    path: '/register-face-list',
    title: 'RegisterFaceList',
    component: RegisterFaceList,
  },
  {
    path: '/add-inmate-face',
    title: 'AddInmateFace',
    component: AddInmateFace,
  },
  {
    path: '/add-staff-face',
    title: 'AddStaffFace',
    component: AddStaffFace,
  },
  {
    path: '/master-data-list',
    title: 'MasterDataList',
    component: MasterDataList,
  },
  {
    path: '/visitor-data',
    title: 'MasterDataVisitor',
    component: MasterDataVisitor,
  },
  {
    path: '/live-chat-list',
    title: 'LiveChatList',
    component: LiveChatList,
  },
  {
    path: '/inmate-data',
    title: 'MasterDataInmate',
    component: MasterDataInmate,
  },
  {
    path: '/staff-data',
    title: 'MasterDataStaff',
    component: MasterDataStaff,
  },
  {
    path: '/event-data',
    title: 'MasterDataEvent',
    component: MasterDataEvent,
  },
  {
    path: '/room-data',
    title: 'MasterDataRoom',
    component: MasterDataRoom,
  },
  {
    path: '/case-type-data',
    title: 'MasterDataCaseType',
    component: MasterDataCaseType,
  },
  {
    path: '/tutorial-data',
    title: 'MenuTutorial',
    component: MenuTutorial,
  },
];

const routes = [...coreRoutes];
export default routes;
