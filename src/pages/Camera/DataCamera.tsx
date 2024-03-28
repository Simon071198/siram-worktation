import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import {
  faceCompareChina,
  apiVisitorLogList,
  apiDeviceDetail,
  apiVisitorRealtimeLogList,
} from '../../services/api.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Alerts } from './AlertCamera.js';
import { Error403Message } from '../../utils/constants.js';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { IoLockClosedOutline, IoLockOpenOutline } from 'react-icons/io5';
import { PiLockKeyOpenDuotone, PiLockKeyLight } from 'react-icons/pi';
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from 'react-icons/fa';
const stylesListComent = {
  inline: {
    display: 'inline',
  },
};

const DataCamera = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isIconOpen, setIsIconOpen] = useState(true);
  const [cameraSize, setCameraSize] = useState(isIconOpen ? '80%' : '100%');
  const [state, setState] = useState({
    groupId: '',
    groupShow: [],
    ffmpegIP: 'localhost',
    baseUrl: 'http://192.168.1.111:5000/stream/',
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
  const client = useRef(new W3CWebSocket('ws://192.168.1.111:5000'));

  useEffect(() => {
    // Initialize WebSocket connection
    client.current = new WebSocket('ws://192.168.1.111:5000');

    client.current.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    
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

      setState((prevState) => ({
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
      sendRequest('startLiveView', {
        listViewCameraData: [
          {
            IpAddress: res.ip_address,
            urlRTSP: res.url_rtsp,
            deviceName: res.nama_kamera,
            deviceId: res.kamera_id,
          },
        ]
      });
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
    // sendRequest('stopLiveCamera', {});
    client.current.close();
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
        {/* {client.current.readyState !== 1 && client.current.readyState !== 3 ? (
          <h1 className="font-semibold text-xl text-red-500 mb-2 animate-pulse">
            Error connection
          </h1>
        ) : client.current.readyState === 3 ? (
          <h1 className="font-semibold text-xl  mb-2">Loading...</h1>
        ) : (
          ''
        )} */}

        <div className="bg-blackp-1">
          <div className="relative">
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                url={urlStream}
                width="100%"
                height="100%"
                playing={true}
                playsinline={true}
                controls={true}
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

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <h1 className="font-semibold ml-1">
            {deviceDetail && deviceDetail.nama_kamera} -{' '}
            {deviceDetail.nama_ruangan_otmil && deviceDetail.nama_ruangan_otmil}
            {deviceDetail.nama_ruangan_lemasmil &&
              deviceDetail.nama_ruangan_lemasmil}
            - {deviceDetail.nama_lokasi_otmil && deviceDetail.nama_lokasi_otmil}
            {deviceDetail.nama_lokasi_lemasmil &&
              deviceDetail.nama_lokasi_lemasmil}
          </h1>
          {client.current.readyState !== 1 ? (
            <h1 className="font-semibold text-xl text-red-500  animate-pulse">
              Error connection
            </h1>
          ) : (
            ''
          )}
        </div>
        <div
          onClick={toggleIcon}
          className="cursor-pointer flex justify-end p-2"
        >
          {/* Icon to toggle */}
          {isIconOpen ? (
            <FaRegArrowAltCircleLeft
              className=" hover:text-orange-200"
              size={28}
            />
          ) : (
            <FaRegArrowAltCircleRight
              className="hover:text-orange-200"
              size={28}
            />
          )}
        </div>
      </div>
      <div className="flex gap-4 h-[52vh] justify-between">
        {/* kamera */}
        <div className={`w-[${cameraSize}] h-full`}>
          {state.listViewCamera.map((obj, index) => (
            <div key={index}>{renderStream1(obj, index)}</div>
          ))}
        </div>
        {/* log kamera */}
        <div
          className={`w-[20%] h-[87vh] ml-auto ${cameraSize === '100%' ? 'hidden' : 'block'}`}
        >
          <div className="w-full h-[93.3%] ">
            <div className="container">
              <p className="font-semibold text-center">
                Kemiripan Terdeteksi: {faceDetectionRows.length}
              </p>
            </div>
            <div className="h-full overflow-y-auto">
              <table className="w-full">
                <tbody>
                  {faceDetectionRows?.map((row, index) => (
                    <tr key={index} className="flex items-center">
                      <td className="w-1/4 flex items-center">
                        <img
                          src={`https://dev.transforme.co.id/siram_admin_api${row.image}`}
                          alt="Person"
                          className="w-16 h-16 rounded-5 mr-2"
                        />
                      </td>
                      <td className="w-3/4 flex flex-col items-end">
                        <p className="text-xs font-semibold">
                          {row.nama_wbp ? row.nama_wbp : row.keterangan}
                        </p>
                        <p className="text-xs">{row.nationality}</p>
                        <p className="text-xs">
                          {formatTimestamp(row.timestamp)}
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
      <button onClick={handleStop} className="w-30 h-10 bg-red-400">
        Stop
      </button>
    </div>
  );
};

export default DataCamera;
