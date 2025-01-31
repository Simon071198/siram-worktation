import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import {
  faceCompareChina,
  apiVisitorLogList,
  apiDeviceDetail,
  apiVisitorRealtimeLogList,
} from '../../services/api.js';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Alerts } from './AlertCamera.js';
import { Error403Message } from '../../utils/constants.js';
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from 'react-icons/fa';
import { Breadcrumbs } from '../../components/Breadcrumbs.js';
const stylesListComent = {
  inline: {
    display: 'inline',
  },
};

const CameraSaveDetail = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isIconOpen, setIsIconOpen] = useState(true);
  const [cameraSize, setCameraSize] = useState(isIconOpen ? '80%' : '100%');
  const [loading, setLoading] = useState(false);
  const [errorCam, setErrorCam] = useState(false);
  const [state, setState] = useState({
    groupId: '',
    groupShow: [],
    ffmpegIP: 'localhost',
    baseUrl: 'http://192.168.18.111:5000/stream/',
    extenstion: '_.m3u8',
    girdView: 1,
    isFullscreenEnabled: false,
    selectOptionGroup: null,
    optionsDataGroup: [],
    viewListData: [],
    listViewCamera: [],
    getDataPlayer: [],
    deviceDetail: {},
    startDate: '',
    endDate: '',
    isWebSocketConnected: false,
    dataVisitorLog: [],
  });

  const toggleIcon = () => {
    setIsIconOpen((prevState) => !prevState);
    setCameraSize((prevState) => (prevState === '100%' ? '80%' : '100%'));
  };
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const errorTimeoutRef: any = useRef(null);

  const client = useRef(new W3CWebSocket('ws://192.168.18.111:5000'));
  useEffect(() => {
    // Initialize WebSocket connection
    client.current = new WebSocket('ws://192.168.18.111:5000');

    client.current.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.current.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === 'error') {
        // Tangkap pesan error dan tampilkan kepada pengguna
        clearTimeout(errorTimeoutRef.current); // Hapus timeout sebelumnya (jika ada)
        errorTimeoutRef.current = setTimeout(() => {
          setErrorCam(true);
          console.log(data, 'ini data error');
          console.log('Error from server camera:', data.message);
        }, 1500); // Setelah 2 detik, tampilkan pesan error
      }
      if (data.type === 'info') {
        clearTimeout(errorTimeoutRef.current); // Hapus timeout jika mendapatkan pesan info
        setErrorCam(false);
        console.log(data, 'ini data berhasil');
      }

      //! disini ditambah if data type == 'camera_error' (misalnya)
      //! misal data error dari server camera, seperti ini : {
      //!   type: 'camera_error',
      //!   message: [
      //!     {
      //!       camera_id: 1,
      //!       cameraID : abcde,
      //!       error: 'Camera is not connected',
      //!      },
      //!     {
      //!       camera_id: 2,
      //!       cameraID : defghi,
      //!       error: 'Camera is not connected'
      //!      },
      //!             ]
      //! }
      //! maka kita filter data camera di page ini yang selain data error dari server camera tersebut

      //! masalahnya bagaimana jika kamera error nya kembali bisa hidup ? agar supaya data nya dinamis ke FE juga ?
      //! sementara kasih tombol refresh page aja ya, atau refresh data camera nya aja
    };
    // client.current.onmessage = (message) => {
    //   const data = JSON.parse(message.data);
    //   if (data.type === 'info') {
    //     // Tangkap pesan error dan tampilkan kepada pengguna
    //     console.log(data, 'ini data info');

    //     console.log('Error from server camera:', data.message);
    //   }
    // };
    // Cleanup function
    return () => {
      console.log('WebSocket Client DISConnected');
      client.current.close(); // Close WebSocket connection when component unmounts
    };
  }, []); // Run once when component mounts

  useEffect(() => {
    const fetchDataAndSendRequest = async () => {
      await fetchDeviceDetail(); // Assuming fetchDeviceDetail is an async function that fetches device details
    };

    // fetchDataInmateRealtime(); // If fetchDataInmateRealtime is supposed to run independently, you can uncomment this line

    // const fetchInterval = setInterval(fetchDataInmateRealtime, 5000);

    fetchDataAndSendRequest(); // Call the function to initiate the process

    // return () => {
    //   clearInterval(fetchInterval); // Cleanup interval when component unmounts
    // };
  }, [props.id]);

  useEffect(() => {
    fetchDataInmateRealtime(); // If fetchDataInmateRealtime is supposed to run independently, you can uncomment this line

    const fetchInterval = setInterval(fetchDataInmateRealtime, 5000);

    return () => {
      clearInterval(fetchInterval); // Cleanup interval when component unmounts
    };
  }, []);

  const fetchDataInmateRealtime = async () => {
    const { id } = props;
    try {
      const res = await apiVisitorRealtimeLogList({ device_id: id });
      console.log(res, 'data dataVisitorLog');
      setState((prevState) => ({
        ...prevState,
        dataVisitorLog: res,
      }));
    } catch (e: any) {
      if (e.response.status === 403) {
        navigate('/auth/signin', {
          state: { forceLogout: true, lastPage: location.pathname },
        });
      }
      Alerts.fire({
        icon: e.response.status === 403 ? 'warning' : 'error',
        title: e.response.status === 403 ? Error403Message : e.message,
      });
    }
  };

  const fetchDeviceDetail = async () => {
    const { id } = props;
    console.log(props, 'props from data camera');

    try {
      const res = await apiDeviceDetail(id);
      // const res = await apiDeviceDetail(id);
      console.log(res, 'Perangkat detail');
      // console.log(state.listViewCamera, 'listViewCamera');

      setState((prevState: any) => ({
        ...prevState,
        deviceDetail: res,
        viewListData: [
          {
            IpAddress: res.ip_address,
            urlRTSP: res.url_rtsp,
            deviceName: res.nama_kamera,
            deviceId: res.kamera_id,
          },
        ],
        listViewCamera: [
          {
            IpAddress: res.ip_address,
            urlRTSP: res.url_rtsp,
            deviceName: res.nama_kamera,
            deviceId: res.kamera_id,
          },
        ],
      }));
      // sendRequest('startLiveView', {
      //   listViewCameraData: [
      //     {
      //       IpAddress: res.ip_address,
      //       urlRTSP: res.url_rtsp,
      //       deviceName: res.nama_kamera,
      //       deviceId: res.kamera_id,
      //     },
      //   ],
      // });
    } catch (e: any) {
      if (e.response.status === 403) {
        navigate('/auth/signin', {
          state: { forceLogout: true, lastPage: location.pathname },
        });
      }
      Alerts.fire({
        icon: e.response.status === 403 ? 'warning' : 'error',
        title: e.response.status === 403 ? Error403Message : e.message,
      });
    }
  };

  const componentDidUpdate = (prevProps) => {
    if (props.id !== prevProps.id) {
      fetchDataInmateRealtime();
      fetchDeviceDetail();
    }
  };
  const handleStop = () => {
    sendRequest('stopLiveCamera', {});
    // client.current.close();
  };
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTimestamp = (timestamp) => {
    const dateObj = new Date(timestamp);
    const day = dateObj.getDate();
    const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(
      dateObj,
    );
    const year = dateObj.getFullYear();
    const time = dateObj.toLocaleTimeString('id-ID', { hour12: false });
    return `${day} ${month} ${year} ${time}`;
  };

  const sendRequest = (method, params) => {
    client.current.send(JSON.stringify({ method: method, params: params }));
  };

  const renderStream1 = (obj, index) => {
    console.log('render stream 1', obj);
    var urlStream = state.baseUrl + obj.IpAddress + state.extenstion;
    console.log(urlStream, 'render stream 1');
    return (
      <div className="w-full  p-1" key={index}>
        <div className="bg-blackp-1">
          <div>
            <div className="player-wrapper">
              <ReactPlayer
                url={urlStream}
                width="100%"
                height="100%"
                playing={true}
                playsinline={true}
                controls={true}
                onBuffer={() => setLoading(true)}
                onBufferEnd={() => setLoading(false)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const { deviceDetail, dataVisitorLog } = state;
  const unrecognizedRows = dataVisitorLog.filter(
    (row) => row.visitor_name === 'unrecognized',
  );
  const faceDetectionRows = dataVisitorLog.filter(
    (row) => row.visitor_name !== 'unrecognized',
  );

  const urlBaru = window.location.href.replace(/%20/g, '-');
  console.log('path 1', location);
  console.log('path 2', urlBaru);

  return (
    <div>
      <div className="pl-6 py-4">
        <Breadcrumbs url={urlBaru} />
      </div>
      <div className="flex justify-between items-center px-6">
        <div
          className={`flex gap-4 items-center justify-between ${isIconOpen ? 'w-4/5' : 'w-full mr-1'}`}
        >
          <h1 className="font-semibold ml-1">
            {deviceDetail && deviceDetail.nama_kamera} -{' '}
            {deviceDetail.nama_ruangan_otmil && deviceDetail.nama_ruangan_otmil}
            {deviceDetail.nama_ruangan_lemasmil &&
              deviceDetail.nama_ruangan_lemasmil}
            - {deviceDetail.nama_lokasi_otmil && deviceDetail.nama_lokasi_otmil}
            {deviceDetail.nama_lokasi_lemasmil &&
              deviceDetail.nama_lokasi_lemasmil}
          </h1>
          {client.current.readyState !== WebSocket.OPEN && (
            <h1 className="font-semibold text-xl text-red-500 animate-pulse">
              Error connection
            </h1>
          )}
          {loading &&
            client.current.readyState == WebSocket.OPEN &&
            !errorCam && (
              <p className="animate-pulse text-lg">Sedang memuat ....</p>
            )}
          {errorCam && client.current.readyState == WebSocket.OPEN && (
            <p className="animate-pulse text-yellow-400 text-lg">
              Kamera sedang rusak
            </p>
          )}
        </div>
        <div
          onClick={toggleIcon}
          className="cursor-pointer flex justify-end p-2"
        >
          {isIconOpen ? (
            <FaRegArrowAltCircleRight
              className=" hover:text-orange-200"
              size={28}
            />
          ) : (
            <FaRegArrowAltCircleLeft
              className="hover:text-orange-200"
              size={28}
            />
          )}
        </div>
      </div>
      <div className="flex gap-5 h-[52vh] justify-between p-4">
        <div
          className={`w-[${cameraSize}] h-full transition-width duration-1000 ease-in-out`}
        >
          {state.listViewCamera.map((obj, index) => (
            <div key={index}>{renderStream1(obj, index)}</div>
          ))}
        </div>
        <div
          className={`w-[20%] h-[91vh] ml-auto ${cameraSize === '100%' ? 'hidden' : 'block'} mt-1`}
        >
          <div className="w-full h-full bg-gray-100 rounded-lg shadow-lg overflow-scroll backdrop-brightness-125 pl-1">
            <div className="container">
              <p className="font-semibold text-center py-4">
                Jumlah Terdeteksi: {faceDetectionRows.length}
              </p>
            </div>
            <div className="h-full overflow-y-auto">
              <table className="w-full">
                <tbody>
                  {faceDetectionRows?.map((row, index) => (
                    <tr
                      key={index}
                      className="flex items-center border-b mb-1 border-gray-200"
                    >
                      <td className="w-1/4 flex items-center">
                        <img
                          src={`https://dev.transforme.co.id/siram_admin_api${row.image}`}
                          alt="Person"
                          className="w-16 h-16 mr-2 object-cover mb-1"
                        />
                      </td>
                      <td className="w-3/4 flex flex-col items-start pl-4">
                        <p className="text-sm font-semibold">
                          {row.nama_wbp ? row.nama_wbp : row.keterangan}
                        </p>
                        <p className="text-xs">{row.nationality}</p>
                        <p className="text-xs">
                          {formatTimestamp(row?.datenow)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={handleStop} className="w-30 h-10 bg-red-400 mt-50">
        Stop
      </button> */}
    </div>
  );
};

export default CameraSaveDetail;
