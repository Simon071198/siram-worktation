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
import { IoMdArrowRoundBack } from 'react-icons/io';

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
  const [buildings, setBuilding] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [columns, setColumns] = useState(1);
  const [rows, setRows] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = columns * rows;
  const camerasPerPage = columns * rows;
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
          element: '#s-gedung',
          popover: {
            title: 'GEDUNG',
            description: 'Pilih gedung yang diinginkan',
          },
        },
        {
          element: '#s-lantai',
          popover: {
            title: 'LANTAI',
            description: 'Pilih lantai yang diinginkan',
          },
        },
        {
          element: '#s-ruangan',
          popover: {
            title: 'RUANGAN',
            description: 'Pilih ruangan yang diinginkan',
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleSelectBuilding = (e) => {
    const selectedBuildingId = e.target.value;
    setSelectedBuilding(selectedBuildingId);
    setSelectedFloor(''); // Reset selected floor when building changes
    setSelectedRoom(''); // Reset selected room when building changes
  };

  const handleSelectFloor = (e) => {
    const selectedFloorId = e.target.value;
    setSelectedFloor(selectedFloorId);
    setSelectedRoom(''); // Reset selected room when floor changes
  };
  const handleClickRoom = (roomId) => {
    console.log('id', roomId);
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
      status_kamera: 'offline',
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
      status_kamera: 'offline',
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
      status_kamera: 'offline',
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
      status_kamera: 'offline',
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
      status_kamera: 'offline',
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
      status_kamera: 'offline',
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
      status_kamera: 'offline',
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
      status_kamera: 'offline',
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
  // const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfLastCamera = currentPage * camerasPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const indexOfFirstCamera = indexOfLastCamera - camerasPerPage;
  const currentCameras = dummyCameras.slice(
    indexOfFirstCamera,
    indexOfLastCamera,
  );

  // const totalPages = Math.ceil(
  //   dummyCameras.filter((camera) => camera.ruangan_otmil_id === selectedRoom)
  //     .length / itemsPerPage,
  // );

  // const totalPages = Math.ceil(dummyCameras.length / itemsPerPage);
  const totalPages = Math.ceil(dummyCameras.length / camerasPerPage);
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      // pageNumbers.push(i);
      console.log('push', pageNumbers.push(i));
    }
    return pageNumbers;
  };
  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const getPageNumbers = () => {
    const maxPageNumbersToShow = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxPageNumbersToShow / 2),
    );
    let endPage = startPage + maxPageNumbersToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = getPageNumbers();

  const renderCameraList = () => {
    const selectedRoomData = buildings?.data?.records?.gedung.flatMap(
      (gedung) =>
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
      <div
        style={{
          backgroundColor: '#333a48',
          height: '100%',
          maxHeight: '90vh',
          overflowY: 'scroll',
        }}
      >
        <div className="flex flex-col justify-between p-5">
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
            // <div className="flex flex-wrap gap-3 h-full justify-center">
            //   {currentCameras.map((camera) => (
            //     <div
            //       key={camera.kamera_id}
            //       className={`${columns === 1 && rows === 1 ? 'w-11/12' : 'w-1/3'} rounded-sm border bg-meta-4-dark py-6 px-7.5 shadow-default backdrop-blur-sm`}
            //     >
            //       <Link
            //         to="0fbd7311-a953-4c76-a6d2-e7e3f1b05d43"
            //         style={{ backgroundColor: 'rgba(32,33,35, 0.7)' }}
            //       >
            //         {/* header */}
            //         <div className="flex h-64 w-full items-center justify-center rounded-lg bg-meta-4 text-white">
            //           <CiCamera
            //             className={`w-4/5 h-4/5 ${camera.status_kamera === 'online' ? 'text-green-500' : 'text-red-500'}`}
            //           />
            //         </div>
            //         {/* footer kamera */}
            //         <div className="mt-8 flex items-end bg-r justify-between">
            //           <div
            //             className={`w-full flex flex-col gap-3 items-center justify-centergap-4`}
            //           >
            //             <h4 className="text-title-sm text-center font-bold text-white">
            //               {camera.nama_kamera}
            //             </h4>
            //             <h5
            //               className={`${
            //                 camera.status_kamera === 'online'
            //                   ? 'text-green-500'
            //                   : 'text-red-500'
            //               } flex justify-center
            //               `}
            //             >
            //               (
            //               {camera.status_kamera === 'online'
            //                 ? ' Online '
            //                 : ' Offline '}
            //               )
            //             </h5>
            //           </div>
            //         </div>
            //       </Link>
            //     </div>
            //   ))}
            // </div>
            <div
              className={`grid ${
                columns === 1 && rows === 1
                  ? 'grid-cols-1 grid-rows-1'
                  : columns === 2 && rows === 2
                    ? 'grid-cols-2 grid-rows-2'
                    : columns === 2 && rows === 3
                      ? 'grid-cols-3 grid-rows-2'
                      : columns === 2 && rows === 4
                        ? 'grid-cols-4 grid-rows-2'
                        : 'grid-cols-1 grid-rows-1'
              } gap-4 justify-center w-full`}
            >
              {currentCameras.map((camera) => (
                <div
                  key={camera.kamera_id}
                  className={`rounded-sm border bg-meta-4-dark py-2 px-2 shadow-default backdrop-blur-sm relative ${columns && rows === 1 && ' h-[28rem]'} hover:bg-slate-700`}
                >
                  <Link
                    to="0fbd7311-a953-4c76-a6d2-e7e3f1b05d43"
                    style={{ backgroundColor: 'rgba(32,33,35, 0.7)' }}
                    className="block w-full h-full rounded-lg overflow-hidden relative"
                  >
                    {/* header */}
                    <div className="flex h-full w-full items-center justify-center rounded-t-lg bg-meta-4 text-white relative">
                      <CiCamera className={`w-3/5 h-3/5 text-white`} />
                    </div>
                    {/* footer kamera */}
                    <div className="absolute bottom-0 right-0 p-4 bg-r text-white flex justify-between w-full">
                      <h4
                        className={`${rows === 4 ? 'text-md mt-2' : 'text-title-sm'} text-center font-bold`}
                      >
                        {camera.nama_kamera}
                      </h4>
                      <div className="flex justify-center items-center">
                        {camera.status_kamera === 'online' && (
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2 mt-1 animate-pulse"></div>
                        )}
                        <h5
                          className={`${camera.status_kamera === 'online' ? 'text-green-500' : 'text-red-500'} text-center mt-1`}
                        >
                          {camera.status_kamera === 'online'
                            ? 'Online'
                            : 'Offline'}
                        </h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 flex justify-end">
            {currentPage > 1 && (
              <button
                onClick={handlePrevPage}
                className="mx-1 px-3 py-1 rounded bg-blue-500 text-white"
              >
                Previous
              </button>
            )}
            {renderPagination()
              .filter((page) => page >= startPage && page <= endPage)
              .map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {page}
                </button>
              ))}
            {currentPage < totalPages && (
              <button
                onClick={handleNextPage}
                className="mx-1 px-3 py-1 rounded bg-blue-500 text-white"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getRoomLocation = () => {
    if (!selectedRoom) return null;

    let location = '';
    buildings?.data?.records?.gedung.forEach((gedung) => {
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
      <div className="w-full ml-1 flex gap-5  px-7 mt-4 items-center justify-between">
        <div className="flex items-center justify-between w-1/2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border border-white rounded-md px-4 py-2 text-white hover:bg-meta-4 hover:text-white transition duration-300 ease-in-out"
          >
            <IoMdArrowRoundBack /> Kembali
          </button>
          {selectedRoom && (
            <>
              <div className="flex">
                <p>{getRoomLocation()}</p>
              </div>
              <select
                id="layoutSelect"
                className="p-2 border rounded w-22 bg-meta-4 font-semibold"
                value={`${columns}x${rows}`}
                onChange={(e) => {
                  const [cols, rows] = e.target.value.split('x').map(Number);
                  handleLayoutChange(cols, rows);
                }}
              >
                <option value="1x1">1x1</option>
                <option value="2x2">2x2</option>
                <option value="2x3">2x3</option>
                <option value="2x4">2x4</option>
              </select>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <select
            value={selectedBuilding}
            onChange={handleSelectBuilding}
            className="p-2 border rounded w-36 bg-meta-4 font-semibold"
          >
            <option disabled value="">
              Pilih Gedung
            </option>
            {buildings?.data?.records?.gedung?.map((building) => (
              <option
                key={building.gedung_otmil_id}
                value={building.gedung_otmil_id}
              >
                {building.nama_gedung_otmil}
              </option>
            ))}
          </select>

          {selectedBuilding && (
            <select
              value={selectedFloor}
              onChange={handleSelectFloor}
              className="p-2 border rounded w-36 bg-meta-4 font-semibold"
            >
              <option disabled value="">
                Pilih Lantai
              </option>
              {buildings?.data?.records?.gedung
                ?.find(
                  (building) => building.gedung_otmil_id === selectedBuilding,
                )
                ?.lantai.map((floor) => (
                  <option
                    key={floor.lantai_otmil_id}
                    value={floor.lantai_otmil_id}
                  >
                    {floor.nama_lantai}
                  </option>
                ))}
            </select>
          )}

          {selectedFloor && (
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="p-2 border rounded w-36 bg-meta-4 font-semibold"
            >
              <option disabled value="">
                Pilih Ruangan
              </option>
              {buildings?.data?.records?.gedung
                ?.find(
                  (building) => building.gedung_otmil_id === selectedBuilding,
                )
                ?.lantai.find(
                  (floor) => floor.lantai_otmil_id === selectedFloor,
                )
                ?.ruangan.map((room) => (
                  <option
                    key={room.ruangan_otmil_id}
                    value={room.ruangan_otmil_id}
                    onClick={() => handleClickRoom(room.ruangan_otmil_id)}
                  >
                    {room.nama_ruangan_otmil}
                  </option>
                ))}
            </select>
          )}
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-5 min-h-sceen flex gap-4">
        <div className="w-full h-screen">
          <div className="py-4 pl-6 w-[95%] flex justify-between items-center"></div>
          <>
            {selectedRoom ? (
              renderCameraList()
            ) : (
              <div className="flex justify-center items-center  bg-graydark w-full h-5/6 animate-pulse">
                <h1 className="font-semibold text-lg">
                  Silahkan pilih gedung, lantai dan ruangan
                </h1>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default CameraList;
