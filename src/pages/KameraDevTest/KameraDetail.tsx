
import { useParams, useOutletContext } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import {
  faceCompareChina,
  apiVisitorLogList,
  apiDeviceDetail,
  apiVisitorRealtimeLogList,
} from '../../services/api.js';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';

const stylesListComent = {
  inline: {
    display: 'inline',
  },
};
const KameraDetail = (props: any) => {
  const [bottomKamera,rightKamera]: any = useOutletContext();
  const { id } = useParams();
  const [state, setState] = useState({
    groupId: '',
    groupShow: [],
    ffmpegIP: 'localhost',
    baseUrl: 'http://localhost:4000/stream/',
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

  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const client = useRef(new W3CWebSocket('ws://localhost:4000'));
  const clientFR = useRef(new W3CWebSocket('ws://localhost:4001'));

  useEffect(() => {
    client.current.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    clientFR.current.onopen = () => {
      console.log('WebSocket FR Connected');
    };
    clientFR.current.onmessage = (message) => {
      const dataFromServer = message;
      console.log('got reply! ', dataFromServer);
      if (dataFromServer.data.id == state.deviceDetail.kamera_id) {
        fetchDataInmateRealtime();
      }
    };
    const fetchDataAndSendRequest = async () => {
      await fetchDeviceDetail(); // Wait for fetchDeviceDetail to complete before sending the request

      const date = getTodayDate();
      setState((prevState) => ({ ...prevState, endDate: date }));

      return () => {
        // clearInterval(fetchInterval);
        sendRequest('disconnectedLive', {
          status: 'disconnected',
        });
      };
    };
    // fetchDataInmateRealtime();
    setInterval(fetchDataInmateRealtime, 5000);


    
    fetchDataAndSendRequest(); // Call the function to initiate the process
  }, [id]);

  const fetchDataInmateRealtime = async () => {
    
    try {
      const res = await apiVisitorRealtimeLogList({ device_id: id });
      console.log(res, 'data dataVisitorLog');
      setState((prevState) => ({
        ...prevState,
        dataVisitorLog: res,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDeviceDetail = async () => {
    
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
        listViewCameraData: JSON.stringify([
          {
            IpAddress: res.ip_address,
            urlRTSP: res.url_rtsp,
            deviceName: res.nama_kamera,
            deviceId: res.kamera_id,
          },
        ]),
      });
      sendRequestFR('startFR', {
        listViewCameraData: JSON.stringify([
          {
            IpAddress: res.ip_address,
            urlRTSP: res.url_rtsp,
            deviceName: res.nama_kamera,
            deviceId: res.kamera_id,
          },
        ]),
      });
      // sendRequest('startLiveView', {
      //   listViewCameraData: JSON.stringify(state.listViewCamera),
      // });
    } catch (error) {
      console.error(error);
    }
  };

  const componentDidUpdate = (prevProps) => {
    if (id !== prevProps.id) {
      fetchDataInmateRealtime();
      fetchDeviceDetail();
    }
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
      dateObj
    );
    const year = dateObj.getFullYear();
    const time = dateObj.toLocaleTimeString('id-ID', { hour12: false });
    return `${day} ${month} ${year} ${time}`;
  };

  const sendRequest = (method, params) => {
    client.current.send(JSON.stringify({ method: method, params: params }));
  };
  const sendRequestFR = (method, params) => {
    clientFR.current.send(JSON.stringify({ method: method, params: params }));
  };

  const destroyCamera = (data) => {
    console.log('destroy streaming');
    playerRef.current.stop();
    setState((prevState) => ({
      ...prevState,
      cameraplayer: null,
    }));
  };

  const reset = () => {
    setState((prevState) => ({
      ...prevState,
      selectOptionGroup: null,
      viewListData: [],
      listViewCamera: [],
    }));
  };

  const pause = () => {
    playerRef.current.stop();
  };

  const renderStream1 = (obj, index) => {
    console.log('render stream 1', obj);
    var urlStream = state.baseUrl + obj.IpAddress + state.extenstion;
    console.log(urlStream);
    return (
      <div className="w-full  p-1" key={index}>
        <div className="bg-black p-1">
          <div className="relative">
          {state.listViewCamera.map((obj, index) => (
            <div key={index}>{renderStream1(obj, index)}</div>
          ))}
            {/* <div className="absolute left-4 right-4 top-2">
              <span className="text-white text-lg font-semibold">
                {obj.deviceName}
              </span>
            </div> */}
          </div>
        </div>
      </div>
    );
  };

  const { deviceDetail, dataVisitorLog } = state;
  const unrecognizedRows = dataVisitorLog.filter(
    (row) => row.nama_wbp === 'unrecognized'
  );
  const faceDetectionRows = dataVisitorLog.filter(
    (row) => row.nama_wbp !== 'unrecognized'
  );
  

  return (
    <div className="mx-6 my-1 ">
      <div className={`${rightKamera ? 'grid grid-cols-1':'grid grid-cols-2' } gap-2`}>
        <div className="grid grid-cols-1">
          <div>
            <div>
              <p className="text-white"> KameraDetail ID {id} </p>
            </div>
            <div className="w-full h-full">
              <div className={`player-wrapper  bg-slate-900 ${bottomKamera ? 'h-[570px]': 'h-[400px]'}`}>
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                  width="100%"
                  height="100%"
                  playing={true}
                  playsinline={true}
                  controls
                />
              </div>
            </div>
          </div>

          <div className={`mt-3 ${bottomKamera ? 'hidden' : ''}`}>
            <p>Kamera Terdeteksi : </p>
            <div className="mt-3">
              <div className="w-full flex gap-4 overflow-x-scroll ">
              {
                dataVisitorLog.map((data:any,index:any)=>(
                  <div className="flex gap-4">
                   <img
  src={"https://dev.transforme.co.id/siram_admin_api" + data.image}
  alt="picture"
  className="object-cover w-30 h-30"
/>
                    <div>
                      <p>{data.nama_wbp}</p>
                      <p>{data.waktu}</p>
                    </div>
                  </div>
                ))
             }
              </div>
            </div>
          </div>
        </div>
        <div className={`mt-3 ${rightKamera? 'hidden' :''}`}><p>Kamera Terdeteksi : </p>
            <div className="mt-3">
              <div className="w-1/5 gap-4 overflow-y-scroll max-h-96">
             {
                dataVisitorLog.map((data:any,index:any)=>(
                  <div className="flex gap-4">
                   <img
  src={"https://dev.transforme.co.id/siram_admin_api" + data.image}
  alt="picture"
  className="object-cover w-30 h-30"
/>
                    <div>
                      <p>{data.nama_wbp}</p>
                      <p>{data.waktu}</p>
                    </div>
                  </div>
                ))
             }
              </div>
            </div></div>
      </div>
    </div>
  );
};

export default KameraDetail;
