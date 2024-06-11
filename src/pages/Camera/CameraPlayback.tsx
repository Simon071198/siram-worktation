import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { apiBuilding } from '../../services/api';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { Alerts } from './AlertCamera';
import { Error403Message } from '../../utils/constants';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CiCamera } from 'react-icons/ci';
import { IoMdDownload } from 'react-icons/io';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Toast } from 'react-toastify/dist/components';
import Swal from 'sweetalert2';

const CameraPlayback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentDate = new Date(Date.now()).toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [mulaiDate, setMulaiDate] = useState(new Date());
  const [pilihKamera, setPilihKamera] = useState('');
  const [selesaiDate, setSelesaiDate] = useState(new Date());
  const [playlistPlayback, setPlaylistPlayback] = useState([]);
  const [webSocketStatus, setWebSocket] = useState('Menyambungkan...');
  const [date, setDate] = useState(getCurrentDate());
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentRecordingIndex, setCurrentRecordingIndex] = useState(-1);
  const [forUrl, setForurl] = useState('');
  const [baseUrl] = useState('http://100.81.142.71:4007/record/');
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
  const [selectedCamera, setSelectedCamera] = useState('');
  const [selectedData, setSelectedData] = useState(false);
  const [selectedTrue, setSelectedTrue] = useState(false);
  const [columns, setColumns] = useState(2);
  const [rows, setRows] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [cannotConnect, setCannotConnect] = useState(false);
  const [currentPageCamOnline, setCurrentPageCamOnline] = useState(1);
  const client = useRef(new W3CWebSocket('ws://192.168.18.111:4007'));
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null);
  const camerasPerPage = columns * rows;
  function extractTimeFromURL(url) {
    const regex = /\/(\d{2})(\d{2})(\d{2})\.mp4$/;
    const match = url.match(regex);
    if (match) {
      const hours = match[1];
      const minutes = match[2];
      const seconds = match[3];
      return `${hours} : ${minutes} : ${seconds}`;
    } else {
      return null; // Return null if no match found
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  let playerRef = useRef(null);

  useEffect(() => {
    setStartDate(formatDate(new Date()));
    setEndDate(formatDate(new Date()));
  }, []);

  useEffect(() => {
    if (playlistPlayback[currentVideoIndex]) {
      playerRef = playlistPlayback[currentVideoIndex];
    }
  }, [currentVideoIndex]);

  useEffect(() => {
    if (forUrl) {
      // Set the video URL when `forUrl` changes
      playerRef = forUrl;
      console.log(playerRef, 'ini url');
    }
  }, [forUrl]);

  const handleRecordingClick = (recording: any, index: any) => {
    let newUrl = recording.replace('100.81.142.71', '192.168.18.111');
    // console.log('Recording clicked:', newUrl);
    console.log('clicked', recording);
    setForurl(newUrl);
    // setForurl(recording);
    setCurrentRecordingIndex(index);
  };

  useEffect(() => {
    let reconnectInterval: any;
    console.log('messageStatus', webSocketStatus);
    const connectToWebsocket = () => {
      console.log('MasukBOyy');
      const connectWebsocket = new W3CWebSocket('ws://192.168.18.111:4007');
      connectWebsocket.onopen = () => {
        setWs(connectWebsocket);
        // clearInterval(reconnectInterval);
        console.log('WebSocket Client Connected');
        setWebSocket('Terhubung');
        console.log('messageStatus', webSocketStatus);
      };
      connectWebsocket.onclose = () => {
        setWebSocket('Terputus');
        reconnectInterval = setInterval(connectToWebsocket, 2000);
        console.log('messageStatus', webSocketStatus);
        console.log('Terputus dari server WebSocket');
      };
    };

    connectToWebsocket();

    console.log('masukSini');
    console.log('clientSini', client.current);

    client.current.onopen = () => {
      console.log('clientSiniBoy', client.current);
      setCannotConnect(false);
      console.log('WebSocket Client Connected');
    };

    // Handle WebSocket messages (response from the server)
    client.current.onmessage = async (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('data_server', message.data);
      // await setDeviceName(dataFromServer.deviceName);

      if (dataFromServer.message === 'GET FILE FROM DIRECTORY PATH') {
        let formattedDate = date.split('-').join('.');
        let formattedDeviceName = dataFromServer.deviceName.split(' ').join('');
        let playlist = dataFromServer.files.map((file) => {
          console.log(
            baseUrl +
              formattedDeviceName +
              '/' +
              formattedDate +
              '/video/' +
              file,
          );

          return (
            baseUrl +
            formattedDeviceName +
            '/' +
            formattedDate +
            '/video/' +
            file
          );
        });
        setPlaylistPlayback(playlist);
        console.log('ini_playback', playlist);
        setSelectedData(false);
        setCurrentRecordingIndex(0);
        setForurl(playlist[0]);
      } else if (dataFromServer.message === 'FILE FROM DIRECTORY EMPTY') {
        console.log('kuyhaaa');
        console.log('Got reply from the server:', dataFromServer);
        setPlaylistPlayback([]);
        setSelectedData(true);
      }
    };

    // WebSocket close and error handling
    client.current.onclose = (event) => {
      console.log('WebSocket Client Closed:', event);
    };

    client.current.onerror = (error) => {
      // setCannotConnect(true);
      console.error('WebSocket_Error:', error);
    };

    // if (client.current.readyState === 0) {
    //   setWebSocket('Menyambungkan...');
    // } else if (
    //   client.current.readyState === 2 ||
    //   client.current.readyState === 3
    // ) {
    //   setWebSocket('Terputus');
    // } else {
    //   setWebSocket('Terhubung');
    // }

    return () => {
      if (ws) {
        ws.close();
      } else {
        clearInterval(reconnectInterval);
      }
      // client.current.close();
    };
  }, []);

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const sendRequest = (method, params) => {
    console.log('dataKameraSendWebsocket', params);
    console.log('dataKameraSendWebsocketMethod', method);
    client.current.send(JSON.stringify({ method, params }));
  };

  const handleChangeStartDate = async (date) => {
    setMulaiDate(date);
    const formattedDate = formatDate(date);
    console.log('Tanggal_dipilih:', formattedDate);
    await setStartDate(formattedDate);
    console.log('startDateSatu:', formattedDate);
  };

  const handleChangeEndDate = async (date) => {
    setSelesaiDate(date);
    const formattedDate = formatDate(date);
    console.log('Tanggal_dipilih:', formattedDate);
    await setEndDate(formattedDate);
  };

  const handleSubmitCamera = async () => {
    //cek dahulu apakah data kamera sudah dipilih atau belum
    if (!selectedCamera) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Pilih Kamera Terlebih Dahulu!',
      });
      return;
    } else if (cannotConnect) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Koneksi ke server gagal!',
      });
      return;
    }

    setSelectedTrue(true);
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: selectedCamera?.nama_kamera,
          // deviceName: selectedCamera?.nama_kamera,
          urlRTSP: selectedCamera?.url_rtsp,
          IpAddress: selectedCamera?.ip_address,
          timeStart: `${startDate}:00`,
          timeFinish: `${endDate}:59`,
        },
      ],
    });
    console.table({
      deviceName: selectedCamera?.nama_kamera,
      urlRTSP: selectedCamera?.url_rtsp,
      IpAddress: selectedCamera?.ip_address,
      timeStart: startDate + ':00',
      timeFinish: endDate + ':59',
    });
  };

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
      console.log('response_building', response);

      if (response.data.status === 'OK') {
        setBuilding(response);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e: any) {
      console.log('error', e);
    }
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
    setSelectedFloor('');
    setSelectedRoom('');
  };

  const handleSelectFloor = (e) => {
    const selectedFloorId = e.target.value;
    setSelectedFloor(selectedFloorId);
    setSelectedRoom('');
  };
  const handleClickRoom = (roomId) => {
    console.log('idroom', roomId);
    setSelectedRoom(roomId);
    setCurrentPage(1);
  };

  const handleClickKamera = (cam) => {
    console.log('ini_camera', cam);
    let dataKamera = JSON.parse(cam);
    setSelectedCamera(dataKamera);
    // setPilihKamera(dataKamera.kamera_id);
    console.log('data_kamera1', pilihKamera);
    console.log('data_kamera', dataKamera);
    console.log('data_kamera2', dataKamera.nama_kamera);
  };

  console.log('cammmm', selectedCamera);
  const handleLayoutChange = (columns, rows) => {
    setColumns(columns);
    setRows(rows);
    setCurrentPage(1);
  };

  const indexOfLastCamera = currentPage * camerasPerPage;
  const indexOfFirstCamera = indexOfLastCamera - camerasPerPage;
  const totalCameras = playlistPlayback;
  const totalCamerasOnline = buildings?.data?.records?.gedung.flatMap(
    (gedung: any) =>
      gedung.lantai.flatMap((lantai: any) =>
        lantai.ruangan
          .flatMap((ruangan: any) => ruangan.kamera)
          .filter((kamera) => kamera.status_kamera === 'online'),
      ),
  );
  console.log('total', totalCameras);
  console.log('online', totalCamerasOnline);
  if (!totalCameras || !totalCamerasOnline) {
    return null;
  }
  const currentCameras = totalCameras.slice(
    indexOfFirstCamera,
    indexOfLastCamera,
  );
  const currentCamerasOnline = totalCamerasOnline.slice(
    indexOfFirstCamera,
    indexOfLastCamera,
  );
  console.log('d', currentCamerasOnline);
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
  const handlePageClick = (pageNumber) => {
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
  const renderCameraList = () => {
    const selectedRoomData = playlistPlayback;
    console.log('selectedRoomData', selectedRoomData);

    return (
      <div
        className="flex"
        style={{
          backgroundColor: '#333a48',
          height: '90%',
          maxHeight: '90vh',
        }}
      >
        <div className="flex flex-col justify-center p-5 w-3/4">
          <div className="h-full bg-slate-600 flex justify-center items-center">
            {selectedData ? (
              <>
                <h1 className="text-white text-2xl">
                  Data Hasil Rekaman Tidak Ditemukan
                </h1>
              </>
            ) : (
              <>
                <ReactPlayer
                  className="react-player"
                  url={forUrl}
                  playing={true}
                  controls={true}
                  width="95%"
                  height="95%"
                  muted={true}
                  ref={playerRef}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center p-5  w-1/4 ">
          <div className="h-[100%] w-full bg-slate-600 items-center justify-center pt-8">
            <p className="text-3xl text-white text-center h-[10%]">Playlist</p>
            <div className=" h-[82%] overflow-y-scroll w-full mt-6 pl-6">
              <ul className="flex flex-col overflow-auto h-96 divide-y divide-dashed divide-zinc-500">
                {playlistPlayback.map((recording, index) => {
                  const urlParts = recording.split('/');
                  const fileName = urlParts[urlParts.length - 1];
                  const isActive = index === currentRecordingIndex;
                  console.log('recording', recording);

                  let dataTanggal;
                  dataTanggal = recording.split('/');
                  dataTanggal = dataTanggal[dataTanggal.length - 3];

                  return (
                    <div className="flex items-center justify-center gap-8">
                      <li
                        className={`flex p-4 gap-3 items-center cursor-pointer text-white text-center ${isActive ? 'bg-green-700' : 'bg-transparent'} font-light tracking-widest py-2`}
                        key={index}
                        onClick={() => handleRecordingClick(recording, index)}
                      >
                        {extractTimeFromURL(recording)}
                        <a href={forUrl}>
                          <IoMdDownload className="hover:text-2xl hover:text-orange-200" />
                        </a>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
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
              <div className=" w-[300%] flex justify-center items-center text-2xl flex-col gap-2 mt-40">
                <p>Silahkan Pilih Ruangan dan Tanggal</p>
                <p>Terlebih dahulu</p>
              </div>
            </div>
          )}
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
  const getRoomLocationCamOnline = (id: any) => {
    let location = '';
    buildings?.data?.records?.gedung.forEach((gedung) => {
      gedung.lantai.forEach((lantai) => {
        const foundRoom = lantai.ruangan.find(
          (ruangan) => ruangan.ruangan_otmil_id === id,
        );
        console.log('found', foundRoom);
        if (foundRoom) {
          location = `${gedung.nama_gedung_otmil} - ${lantai.nama_lantai} - ${foundRoom.nama_ruangan_otmil}`;
        }
      });
    });

    return location;
  };
  console.log('buid', buildings);
  return (
    <>
      <div className="w-full ml-1 flex gap-5  px-7 mt-4 items-center justify-between ">
        <div className="flex items-center justify-between gap-2 ">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border border-white rounded-md px-4 py-2 text-white hover:bg-meta-4 hover:text-white transition duration-300 ease-in-out"
          >
            <IoMdArrowRoundBack /> Kembali
          </button>
        </div>
        <div className="text-xl">
          Status Koneksi:{' '}
          <span
            className={
              webSocketStatus === 'Terhubung'
                ? 'text-green-500'
                : webSocketStatus === 'Terputus'
                  ? 'text-red-500'
                  : 'text-white'
            }
          >
            {webSocketStatus}
          </span>
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
            <>
              {buildings?.data?.records?.gedung?.find(
                (building) => building.gedung_otmil_id === selectedBuilding,
              )?.lantai.length > 0 && (
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
                      (building) =>
                        building.gedung_otmil_id === selectedBuilding,
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
            </>
          )}

          {selectedFloor && (
            <>
              {buildings?.data?.records?.gedung
                ?.find(
                  (building) => building.gedung_otmil_id === selectedBuilding,
                )
                ?.lantai.find(
                  (floor) => floor.lantai_otmil_id === selectedFloor,
                )?.ruangan.length > 0 && (
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
                      (building) =>
                        building.gedung_otmil_id === selectedBuilding,
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
            </>
          )}

          {selectedRoom && (
            <>
              {buildings?.data?.records?.gedung
                ?.find(
                  (building) => building.gedung_otmil_id === selectedBuilding,
                )
                ?.lantai.find(
                  (floor) => floor.lantai_otmil_id === selectedFloor,
                )
                ?.ruangan.find((room) => room.ruangan_otmil_id === selectedRoom)
                ?.kamera.length > 0 && (
                <select
                  value={pilihKamera}
                  onChange={(e) => {
                    handleClickKamera(e.target.value);
                    setPilihKamera(e.target.value);
                    // console.log('eTargetValue', e.target.value);
                  }}
                  className="p-2 border rounded w-36 bg-meta-4 font-semibold"
                >
                  <option disabled value="">
                    Pilih Kamera
                  </option>
                  {buildings?.data?.records?.gedung
                    ?.find(
                      (building) =>
                        building.gedung_otmil_id === selectedBuilding,
                    )
                    ?.lantai.find(
                      (floor) => floor.lantai_otmil_id === selectedFloor,
                    )
                    ?.ruangan.find(
                      (room) => room.ruangan_otmil_id === selectedRoom,
                    )
                    ?.kamera.map((cam) => (
                      <option
                        key={cam.kamera_id}
                        value={JSON.stringify(cam)}
                        onClick={() => handleClickKamera(cam)}
                      >
                        {cam.nama_kamera}
                      </option>
                    ))}
                </select>
              )}
            </>
          )}
        </div>
      </div>

      <div className=" flex pt-8 justify-center items-center  gap-6">
        <label className="text-md font-semibold tracking-wider">
          {' '}
          Pilih Waktu Mulai
        </label>
        <DatePicker
          selected={mulaiDate}
          onChange={handleChangeStartDate}
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="dd/MM/yyyy HH:mm"
          className="w-[100%] text-slate-950 text-center"
          timeIntervals={1}
        />
        <label className="text-lg font-semibold tracking-wider">
          {' '}
          Pilih Waktu Selesai
        </label>
        <DatePicker
          selected={selesaiDate}
          onChange={handleChangeEndDate}
          showTimeSelect
          timeIntervals={1}
          timeFormat="HH:mm"
          dateFormat="dd/MM/yyyy HH:mm"
          className="w-[100%] text-center text-slate-950"
        />
        <div
          className={
            webSocketStatus !== 'Terhubung'
              ? 'bg-slate-400 py-2 px-5 text-white rounded-lg cursor-not-allowed'
              : 'bg-green-400 py-2 px-5 text-white rounded-lg hover:cursor-pointer'
          }
          onClick={
            webSocketStatus !== 'Terhubung' ? () => {} : handleSubmitCamera
          }
        >
          Submit
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-5 min-h-sceen flex gap-4">
        <div className="w-full h-screen">
          <div className="py-4 pl-6 w-[95%] flex justify-between items-center"></div>
          <>{selectedTrue ? renderCameraList() : renderCameraOnlineList()}</>
        </div>
      </div>
    </>
  );
};

export default CameraPlayback;
