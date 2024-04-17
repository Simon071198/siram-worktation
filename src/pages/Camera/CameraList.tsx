import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { apiBuilding } from '../../services/api';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { Alerts } from './AlertCamera';
import { Error403Message } from '../../utils/constants';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CiCamera } from 'react-icons/ci';

const CameraList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filter, setFilter] = useState('');
  const [dense, setDense] = React.useState(false);
  const [accordionState, setAccordionState] = useState({
    accordion1: false,
    accordion2: false,
    accordion3: false,
  });
  let [locationDeviceList, setLocationDeviceList] = useState([]);
  // let [locationDeviceListOtmil, setLocationDeviceListOtmil] = useState([]);
  // let [locationDeviceListLemasmil, setLocationDeviceListLemasmil] = useState(
  //   [],
  // );
  const [building, setBuilding] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = columns * rows;
  // useEffect(() => {
  //   apiLocationOnlineDeviceList()
  //     .then((res) => {
  //       setLocationDeviceList(res);
  //     })
  //     .catch((e: any) => {
  //       if (e.response.status === 403) {
  //         navigate('/auth/signin', {
  //           state: { forceLogout: true, lastPage: location.pathname },
  //         });
  //       }
  //       Alerts.fire({
  //         icon: e.response.status === 403 ? 'warning' : 'error',
  //         title: e.response.status === 403 ? Error403Message : e.message,
  //       });
  //     });

  //   allKameraOtmil()
  //     .then((res) => {
  //       setLocationDeviceListOtmil(res);
  //       console.log(res, 'res otmil');
  //     })
  //     .catch((e: any) => {
  //       if (e.response.status === 403) {
  //         navigate('/auth/signin', {
  //           state: { forceLogout: true, lastPage: location.pathname },
  //         });
  //       }
  //       Alerts.fire({
  //         icon: e.response.status === 403 ? 'warning' : 'error',
  //         title: e.response.status === 403 ? Error403Message : e.message,
  //       });
  //     });

  //   allKameraLemasmil()
  //     .then((res) => {
  //       setLocationDeviceListLemasmil(res);
  //       console.log(res, 'res lemasmil');
  //     })
  //     .catch((e: any) => {
  //       if (e.response.status === 403) {
  //         navigate('/auth/signin', {
  //           state: { forceLogout: true, lastPage: location.pathname },
  //         });
  //       }
  //       Alerts.fire({
  //         icon: e.response.status === 403 ? 'warning' : 'error',
  //         title: e.response.status === 403 ? Error403Message : e.message,
  //       });
  //     });
  // }, []);

  //   useEffect(() => {
  //     apiLocationOnlineDeviceList().then((res) => {
  //       setLocationDeviceList(res);
  //     });
  //   }, []);
  useEffect(() => {
    fetchData();
  }, []);
  let fetchData = async () => {
    try {
      let dataLocal = localStorage.getItem('dataUser');
      let dataUser = JSON.parse(dataLocal!);
      dataUser = {
        lokasi_lemasmil_id: dataUser.lokasi_lemasmil_id,
        lokasi_otmil_id: dataUser.lokasi_otmil_id,
        nama_lokasi_lemasmil: dataUser.nama_lokasi_lemasmil,
        nama_lokasi_otmil: dataUser.nama_lokasi_otmil,
      };
      console.log('data user', dataUser);

      const response = await apiBuilding(dataUser);
      console.log('response from apiBuilding', response);

      if (response.data.status === 'OK') {
        setBuilding(response);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e: any) {
      console.log('error', e);
      // if (e.response.status === 403) {
      //   navigate('/auth/signin', {
      //     state: { forceLogout: true, lastPage: location.pathname },
      //   });
      // }
      // Alerts.fire({
      //   icon: e.response.status === 403 ? 'warning' : 'error',
      //   title: e.response.status === 403 ? Error403Message : e.message,
      // });
    }
    // setIsLoading(false);
  };
  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '#s-lemas',
          popover: {
            title: 'LEMASMIL',
            description: 'Pilih lemasmil yang diinginkan',
          },
        },
        {
          element: '#s-otmil',
          popover: {
            title: 'OTMIL',
            description: 'Pilih otmil yang diinginkan',
          },
        },
        {
          element: '#s-babin',
          popover: {
            title: 'BABINKUM TNI (Badan Pembinaan Hukun TNI)',
            description: 'Pilih babinkum tni yang diinginkan',
          },
        },
      ],
    });

    driverObj.drive();
  };
  console.log(building, 'set build');
  const handleClickRoom = (roomId) => {
    setSelectedRoom(roomId);
    setCurrentPage(1);
  };
  const handleLayoutChange = (columns, rows) => {
    setColumns(columns);
    setRows(rows);
    setCurrentPage(1);
  };

  const dummyCameras = [
    {
      kamera_id: '1',
      nama_kamera: 'Camera 1',
      url_rtsp: 'rtsp://dummy.url/camera1',
      ip_address: '192.168.1.1',
      ruangan_otmil_id: 'room1',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '2',
      nama_kamera: 'Camera 2',
      url_rtsp: 'rtsp://dummy.url/camera2',
      ip_address: '192.168.1.2',
      ruangan_otmil_id: 'room1',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'offline',
    },
    // Tambahkan data kamera lainnya di sini...
    {
      kamera_id: '3',
      nama_kamera: 'Camera 3',
      url_rtsp: 'rtsp://dummy.url/camera3',
      ip_address: '192.168.1.20',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '4',
      nama_kamera: 'Camera 4',
      url_rtsp: 'rtsp://dummy.url/camera4',
      ip_address: '192.168.1.20',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '5',
      nama_kamera: 'Camera 5',
      url_rtsp: 'rtsp://dummy.url/camera5',
      ip_address: '192.168.1.5',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '6',
      nama_kamera: 'Camera 6',
      url_rtsp: 'rtsp://dummy.url/camera6',
      ip_address: '192.168.1.6',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '7',
      nama_kamera: 'Camera 7',
      url_rtsp: 'rtsp://dummy.url/camera7',
      ip_address: '192.168.1.7',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '8',
      nama_kamera: 'Camera 8',
      url_rtsp: 'rtsp://dummy.url/camera8',
      ip_address: '192.168.1.8',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '9',
      nama_kamera: 'Camera 9',
      url_rtsp: 'rtsp://dummy.url/camera9',
      ip_address: '192.168.1.9',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '10',
      nama_kamera: 'Camera 10',
      url_rtsp: 'rtsp://dummy.url/camera10',
      ip_address: '192.168.1.10',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '11',
      nama_kamera: 'Camera 11',
      url_rtsp: 'rtsp://dummy.url/camera11',
      ip_address: '192.168.1.11',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '12',
      nama_kamera: 'Camera 12',
      url_rtsp: 'rtsp://dummy.url/camera12',
      ip_address: '192.168.1.12',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '13',
      nama_kamera: 'Camera 13',
      url_rtsp: 'rtsp://dummy.url/camera13',
      ip_address: '192.168.1.13',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '14',
      nama_kamera: 'Camera 14',
      url_rtsp: 'rtsp://dummy.url/camera14',
      ip_address: '192.168.1.14',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '15',
      nama_kamera: 'Camera 15',
      url_rtsp: 'rtsp://dummy.url/camera15',
      ip_address: '192.158.1.15',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '16',
      nama_kamera: 'Camera 16',
      url_rtsp: 'rtsp://dummy.url/camera16',
      ip_address: '192.168.1.14',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '17',
      nama_kamera: 'Camera 17',
      url_rtsp: 'rtsp://dummy.url/camera17',
      ip_address: '192.168.1.17',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '18',
      nama_kamera: 'Camera 18',
      url_rtsp: 'rtsp://dummy.url/camera18',
      ip_address: '182.168.1.18',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '19',
      nama_kamera: 'Camera 19',
      url_rtsp: 'rtsp://dummy.url/camera19',
      ip_address: '192.168.1.19',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '20',
      nama_kamera: 'Camera 20',
      url_rtsp: 'rtsp://dummy.url/camera20',
      ip_address: '192.168.1.20',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '21',
      nama_kamera: 'Camera 21',
      url_rtsp: 'rtsp://dummy.url/camera21',
      ip_address: '192.168.1.21',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '23',
      nama_kamera: 'Camera 23',
      url_rtsp: 'rtsp://dummy.url/camera23',
      ip_address: '192.168.1.22',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '24',
      nama_kamera: 'Camera 24',
      url_rtsp: 'rtsp://dummy.url/camera24',
      ip_address: '192.168.1.24',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '25',
      nama_kamera: 'Camera 25',
      url_rtsp: 'rtsp://dummy.url/camera25',
      ip_address: '192.168.1.25',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '26',
      nama_kamera: 'Camera 26',
      url_rtsp: 'rtsp://dummy.url/camera26',
      ip_address: '192.168.1.26',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '27',
      nama_kamera: 'Camera 27',
      url_rtsp: 'rtsp://dummy.url/camera27',
      ip_address: '192.168.1.27',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
    {
      kamera_id: '28',
      nama_kamera: 'Camera 28',
      url_rtsp: 'rtsp://dummy.url/camera28',
      ip_address: '192.168.1.28',
      ruangan_otmil_id: 'room2',
      merk: 'DummyBrand',
      model: 'DummyModel',
      is_deleted: '0',
      status_kamera: 'online',
    },
  ];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCameras = dummyCameras.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const totalPages = Math.ceil(
  //   dummyCameras.filter((camera) => camera.ruangan_otmil_id === selectedRoom)
  //     .length / itemsPerPage,
  // );
  const totalPages = Math.ceil(dummyCameras.length / itemsPerPage);

  console.log('pages', totalPages);
  const renderCameraList = () => {
    const selectedRoomData = building?.data?.records?.gedung.flatMap((gedung) =>
      gedung.lantai.flatMap((lantai) =>
        lantai.ruangan
          .filter((ruangan) => ruangan.ruangan_otmil_id === selectedRoom)
          .flatMap((ruangan) => ruangan.kamera),
      ),
    );

    if (!selectedRoomData || selectedRoomData.length === 0) {
      return (
        <div className="flex justify-center items-center bg-graydark w-11/12 h-5/6">
          <h1 className="font-semibold text-lg">Data Kamera kosong</h1>
        </div>
      );
    }

    return (
      <div className=" h-full bg-graydark">
        <div className="flex flex-wrap gap-4 p-5">
          {/* {selectedRoomData.slice(0, columns * rows).map((kamera) => (
            <div
              key={kamera.kamera_id}
              className="w-52 rounded-sm border bg-meta-4-dark py-6 px-7.5 shadow-default backdrop-blur-sm"
            >
              <Link
                to={kamera.kamera_id}
                style={{ backgroundColor: 'rgba(32,33,35, 0.7)' }}
              >
                <div className="flex h-32 w-full items-center justify-center rounded-lg bg-meta-4 text-white">
                  <CiCamera className="w-3/5 h-3/5" />
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div className="w-full">
                    <h4 className="text-title-md text-center font-bold text-white">
                      {kamera.nama_kamera}
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          ))} */}
          {selectedRoom && (
            <div className="flex flex-wrap gap-3">
              {currentCameras.map((camera) => (
                <div
                  key={camera.kamera_id}
                  className={`${rows && columns === 3 ? 'w-[17rem]' : 'w-52'} rounded-sm border bg-meta-4-dark py-6 px-7.5 shadow-default backdrop-blur-sm`}
                >
                  <Link
                    to="0fbd7311-a953-4c76-a6d2-e7e3f1b05d43"
                    style={{ backgroundColor: 'rgba(32,33,35, 0.7)' }}
                  >
                    <div className="flex h-32 w-full items-center justify-center rounded-lg bg-meta-4 text-white">
                      <CiCamera className="w-3/5 h-3/5" />
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <div className="w-full">
                        <h4 className="text-title-md text-center font-bold text-white">
                          {camera.nama_kamera}
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div
              className={`mt-6 w-full flex justify-end ${columns && rows === 3 ? 'mr-14' : 'mr-5'}`}
            >
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`px-3 py-1 mx-1 border rounded ${
                      currentPage === page
                        ? 'bg-gray-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => paginate(page)}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const getRoomLocation = () => {
    if (!selectedRoom) return null;

    let location = '';
    building?.data?.records?.gedung.forEach((gedung) => {
      gedung.lantai.forEach((lantai) => {
        const foundRoom = lantai.ruangan.find(
          (ruangan) => ruangan.ruangan_otmil_id === selectedRoom,
        );
        if (foundRoom) {
          location = `${gedung.nama_gedung_otmil} - ${lantai.nama_lantai} - ${foundRoom.nama_ruangan_otmil}`;
        }
      });
    });

    return location;
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-5 min-h-sceen flex gap-4">
        <div className="w-4/5">
          <div className="py-4 pl-6 w-[95%] flex justify-between items-center">
            <Breadcrumbs url={window.location.href} />
            {selectedRoom && (
              <>
                <div className="flex gap-2">
                  <p>{getRoomLocation()}</p>
                </div>
                <select
                  id="layoutSelect"
                  className="p-2 border rounded w-20 bg-meta-4 font-semibold"
                  value={`${columns}x${rows}`}
                  onChange={(e) => {
                    const [cols, rows] = e.target.value.split('x').map(Number);
                    handleLayoutChange(cols, rows);
                  }}
                >
                  <option value="3x3">3x3</option>
                  <option value="4x4">4x4</option>
                </select>
              </>
            )}
          </div>
          <>
            {selectedRoom ? (
              renderCameraList()
            ) : (
              <div className="flex justify-center items-center  bg-graydark w-11/12 h-5/6">
                <h1 className="font-semibold text-lg">
                  Silahkan pilih gedung, lantai dan ruangan
                </h1>
              </div>
            )}

            {/* Add this part if you want to display "Silahkan pilih gedung" initially */}
            {/* {!selectedRoom && (
        <div className="flex justify-center items-center bg-gray-400 w-11/12 h-5/6">
          <h1 className="font-semibold text-lg">Silahkan pilih gedung</h1>
        </div>
      )} */}
          </>
        </div>
        <div className="w-1/4 border border-gray-2 p-4 mt-14">
          <div className="w-full flex justify-center pt-2">
            <h2 className="font-bold text-xl tracking-tight mr-3">
              Daftar Gedung
            </h2>
            <button>
              <HiQuestionMarkCircle
                values={filter}
                aria-placeholder="Show tutorial"
                // onChange={}
                onClick={handleClickTutorial}
              />
            </button>
          </div>
          {building?.data?.records?.gedung.map((gedung, i) => {
            return (
              <>
                <div className="grid divide-y divide-neutral-200 max-w-xl border-b mx-auto">
                  <div className="py-5" id="s-lemas">
                    <details className="group">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span key={i}>{gedung.nama_gedung_otmil}</span>
                        <span className="transition-transform group-open:rotate-180">
                          <svg
                            fill="none"
                            height="24"
                            shapeRendering="geometricPrecision"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </summary>

                      <div className="pt-2 ml-[20px]">
                        {gedung?.lantai.map((a) => {
                          return (
                            <>
                              <details className="groupChild">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                  <span>
                                    {a?.nama_lantai
                                      ? a?.nama_lantai
                                      : 'Undifined'}
                                  </span>
                                  <span className="transition-transform groupChild-open:rotate-180">
                                    <svg
                                      fill="none"
                                      height="24"
                                      shapeRendering="geometricPrecision"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1.5"
                                      viewBox="0 0 24 24"
                                      width="24"
                                    >
                                      <path d="M6 9l6 6 6-6"></path>
                                    </svg>
                                  </span>
                                </summary>
                                <div className="mb-2 ml-[20px] cursor-pointer">
                                  {a?.ruangan.map((r) => {
                                    return (
                                      <p
                                        onClick={() =>
                                          handleClickRoom(r.ruangan_otmil_id)
                                        }
                                      >
                                        {r.nama_ruangan_otmil}
                                      </p>
                                    );
                                  })}
                                </div>
                              </details>
                            </>
                          );
                        })}
                      </div>
                    </details>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CameraList;
