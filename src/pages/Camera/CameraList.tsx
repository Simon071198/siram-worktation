import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { apiBuilding } from '../../services/api';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { Alerts } from './AlertCamera';
import { Error403Message } from '../../utils/constants';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { RiCameraOffLine } from 'react-icons/ri';
import { IoMdArrowRoundBack } from 'react-icons/io';
import ReactPlayer from 'react-player';

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
  const [columns, setColumns] = useState(2);
  const [rows, setRows] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCamOnline, setCurrentPageCamOnline] = useState(1);
  const [liveViewCalled, setLiveViewCalled] = useState({});
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

  const client = useRef(new W3CWebSocket('ws://192.168.1.111:5000'));
  const sendRequest = (method, params) => {
    client.current.send(JSON.stringify({ method: method, params: params }));
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

  const indexOfLastCamera = currentPage * camerasPerPage;
  const indexOfFirstCamera = indexOfLastCamera - camerasPerPage;

  const indexOfLastCameraOnline = currentPageCamOnline * camerasPerPage;
  const indexOfFirstCameraOnline = indexOfLastCameraOnline - camerasPerPage;

  const totalCameras = buildings?.data?.records?.gedung.flatMap((gedung: any) =>
    gedung.lantai.flatMap((lantai: any) =>
      lantai.ruangan
        .filter((ruangan: any) => ruangan.ruangan_otmil_id === selectedRoom)
        .flatMap((ruangan: any) => ruangan.kamera),
    ),
  );
  const totalCamerasOnline = buildings?.data?.records?.gedung.flatMap(
    (gedung: any) =>
      gedung.lantai.flatMap((lantai: any) =>
        lantai.ruangan
          .flatMap((ruangan: any) => ruangan.kamera)
          .filter((kamera) => kamera.status_kamera === 'online'),
      ),
  );
  if (!totalCameras || !totalCamerasOnline) {
    return null;
  }
  const currentCameras = totalCameras.slice(
    indexOfFirstCamera,
    indexOfLastCamera,
  );
  const currentCamerasOnline = totalCamerasOnline.slice(
    indexOfFirstCameraOnline,
    indexOfLastCameraOnline,
  );
  console.log('online', currentCamerasOnline);
  const totalPages = Math.ceil(totalCameras.length / camerasPerPage);
  const totalPagesCameraOnline = Math.ceil(
    totalCamerasOnline.length / camerasPerPage,
  );

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      // pageNumbers.push(i);
      console.log('push', pageNumbers.push(i));
    }
    return pageNumbers;
  };
  const renderPaginationCameraOnline = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPagesCameraOnline; i++) {
      // pageNumbers.push(i);
      console.log('push', pageNumbers.push(i));
    }
    return pageNumbers;
  };
  const handlePageClick = (pageNumber: any) => {
    if (selectedRoom) {
      setCurrentPage(pageNumber);
    } else {
      setCurrentPageCamOnline(pageNumber);
    }
  };
  const handleNextPage = () => {
    if (selectedRoom) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      setCurrentPageCamOnline((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (selectedRoom) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else {
      setCurrentPageCamOnline((prevPage) => prevPage - 1);
    }
  };
  const getPageNumbers = () => {
    const maxPageNumbersToShow = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxPageNumbersToShow / 2),
    );
    let endPage = startPage + maxPageNumbersToShow - 1;
    if (selectedRoom) {
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
      }
    } else {
      if (endPage > totalPagesCameraOnline) {
        endPage = totalPagesCameraOnline;
        startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
      }
    }

    return { startPage, endPage };
  };
  console.log('cccrrr', currentCamerasOnline);
  const { startPage, endPage } = getPageNumbers();

  const renderThumb = (cam) => {
    console.log('camren', cam);
    var urlStream =
      'http://192.168.1.111:5000/stream/' + cam.ip_address + '_.m3u8';
    console.log('stream', urlStream);
    return (
      <ReactPlayer
        url={urlStream}
        playing={true}
        height="100%"
        width="100%"
        muted
      />
    );
  };

  // const renderThumb = (cam) => {
  //   const urlStream = `http://192.168.1.111:5000/stream/${cam.ip_address}_.m3u8`;

  //   // Send startLiveView request here
  //   sendRequest('startLiveView', {
  //     listViewCameraData: [
  //       {
  //         IpAddress: cam.ip_address,
  //         urlRTSP: cam.url_rtsp,
  //         deviceName: cam.nama_kamera,
  //         deviceId: cam.kamera_id,
  //       },
  //     ],
  //   });

  //   return (
  //     <ReactPlayer
  //       url={urlStream}
  //       playing={true}
  //       height="100%"
  //       width="100%"
  //       muted
  //     />
  //   );
  // };

  // const renderThumb = (cam) => {
  //   const urlStream = `http://192.168.1.111:5000/stream/${cam.ip_address}_.m3u8`;

  //   // Check if startLiveView has already been called for this camera
  //   if (!liveViewCalled[cam.kamera_id]) {
  //     // Call startLiveView
  //     sendRequest('startLiveView', {
  //       listViewCameraData: [
  //         {
  //           IpAddress: cam.ip_address,
  //           urlRTSP: cam.url_rtsp,
  //           deviceName: cam.nama_kamera,
  //           deviceId: cam.kamera_id,
  //         },
  //       ],
  //     });

  //     // Mark this camera as having startLiveView called
  //     setLiveViewCalled((prev) => ({
  //       ...prev,
  //       [cam.kamera_id]: true,
  //     }));
  //   }

  //   return (
  //     <ReactPlayer
  //       url={urlStream}
  //       playing={true}
  //       height="100%"
  //       width="100%"
  //       muted
  //     />
  //   );
  // };

  console.log(currentCamerasOnline, 'current page');
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
          height: '90%',
          maxHeight: '90vh',
          overflowY: 'scroll',
        }}
      >
        <div className="flex flex-col justify-between p-5">
          {selectedRoom && (
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
                    to={camera.kamera_id}
                    className="block w-full h-full rounded-lg overflow-hidden relative"
                  >
                    {/* header */}
                    <div className=" flex h-full w-full items-center justify-center rounded-t-lg bg-meta-4 text-white relative">
                      {camera.status_kamera === 'online' ? (
                        renderThumb(camera)
                      ) : (
                        <RiCameraOffLine
                          className={`${rows === 4 ? 'w-2/5 h-2/5' : 'w-3/5 h-3/5'} text-white`}
                        />
                      )}
                    </div>
                    {/* footer kamera */}

                    <div className="absolute top-1 right-2 flex items-center">
                      {camera.status_kamera === 'online' ? (
                        <>
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2 mt-1 animate-pulse"></div>
                          <h5 className="text-green-500 text-center mt-1">
                            Online
                          </h5>
                        </>
                      ) : (
                        <>
                          <h5 className="text-red-500 text-center mt-1">
                            Offline
                          </h5>
                        </>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 text-white">
                      <h4
                        className={`${(rows === 3 && 'text-xs') || (rows === 4 && 'text-xs')} text-center font-bold text-red-50`}
                      >
                        {camera.nama_kamera} (
                        {getRoomLocationCamOnline(camera.ruangan_otmil_id)})
                      </h4>
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

  const renderCameraOnlineList = () => {
    const onlineCamera = buildings?.data?.records?.gedung.flatMap((gedung) =>
      gedung.lantai.flatMap((lantai) =>
        lantai.ruangan
          .flatMap((ruangan) => ruangan.kamera)
          .filter((kamera) => kamera.kamera_id),
      ),
    );

    if (onlineCamera.length === 0) {
      return (
        <div className="flex justify-center items-center bg-graydark w-11/12 h-5/6">
          <h1 className="font-semibold text-lg">Tidak ada kamera yang aktif</h1>
        </div>
      );
    }

    return (
      <div
        style={{
          backgroundColor: '#333a48',
          height: '90%',
          maxHeight: '90vh',
          overflowY: 'scroll',
        }}
      >
        <div className="flex flex-col justify-between p-5">
          {onlineCamera && (
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
              {currentCamerasOnline.map((camera: any) => (
                <div
                  key={camera.kamera_id}
                  className={`rounded-sm border bg-meta-4-dark py-2 px-2 shadow-default backdrop-blur-sm relative ${columns && rows === 1 && ' h-[28rem]'} hover:bg-slate-700`}
                >
                  <Link
                    to={camera.kamera_id}
                    className="block w-full h-full rounded-lg overflow-hidden relative"
                  >
                    {/* header */}
                    <div className=" flex h-full w-full items-center justify-center rounded-t-lg bg-meta-4 text-white relative">
                      {/* <CiCamera className={`w-3/5 h-3/5 text-white`} /> */}
                      {renderThumb(camera)}
                    </div>
                    {/* footer kamera */}

                    <div className="absolute top-1 right-2 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2 mt-1 animate-pulse"></div>
                      <h5 className="text-green-500 text-center mt-1">
                        Online
                      </h5>
                    </div>
                    <div className="absolute bottom-2 left-2 text-white">
                      <h4
                        className={`${(rows === 3 && 'text-xs') || (rows === 4 && 'text-xs')} text-center font-bold text-red-50`}
                      >
                        {camera.nama_kamera} (
                        {getRoomLocationCamOnline(camera.ruangan_otmil_id)})
                      </h4>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 flex justify-end">
            {currentPageCamOnline > 1 && (
              <button
                onClick={handlePrevPage}
                className="mx-1 px-3 py-1 rounded bg-blue-500 text-white"
              >
                Previous
              </button>
            )}
            {renderPaginationCameraOnline()
              .filter((page) => page >= startPage && page <= endPage)
              .map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`mx-1 px-3 py-1 rounded ${currentPageCamOnline === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {page}
                </button>
              ))}
            {currentPageCamOnline < totalPagesCameraOnline && (
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
  const getRoomLocationCamOnline = (id: any) => {
    let location = '';
    buildings?.data?.records?.gedung.forEach((gedung) => {
      gedung.lantai.forEach((lantai) => {
        const foundRoom = lantai.ruangan.find(
          (ruangan) => ruangan.ruangan_otmil_id === id,
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
        </div>
        <div className="flex gap-2">
          <>
            <select
              id="layoutSelect"
              className="p-2  border rounded w-22  bg-meta-4 font-semibold"
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
          <>{selectedRoom ? renderCameraList() : renderCameraOnlineList()}</>
        </div>
      </div>
    </>
  );
};

export default CameraList;
