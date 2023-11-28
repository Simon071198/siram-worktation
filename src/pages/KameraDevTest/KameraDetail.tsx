import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams, useOutletContext, useRoutes, useLocation } from 'react-router-dom';
import {
  apiDeviceDetail,
  apiVisitorRealtimeLogList,
} from '../../services/api';

const KameraDetail = (props: any) => {
  const { sidebarKamera } = props;
  const [bottomKamera, rightKamera]: any = useOutletContext();
  const { id } = useParams();

  const [state, setState] = useState({
    groupId: '',
    groupShow: [],
    ffmpegIP: 'localhost',
    baseUrl: 'http://192.168.1.135:4001/stream/',
    extenstion: '_.m3u8',
    girdView: 1,
    isFullscreenEnabled: false,
    selectOptionGroup: null,
    optionsDataGroup: [],
    viewListData: [],
    listViewCamera: [],
    getDataPlayer: [],
    deviceDetail: { kamera_id: '', nama_kamera: '' },
    startDate: '',
    endDate: '',
    isWebSocketConnected: false,
    dataVisitorLog: [],
  });

  const videoRef = useRef(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const fetchDataAndSendRequest = async () => {
      await fetchDeviceDetail();
      const date = getTodayDate();
      setState((prevState) => ({ ...prevState, endDate: date }));
  
      return () => {
        // Membersihkan interval atau langganan WebSocket
        clearInterval(fetchInterval);
        sendRequest('disconnectedLive', {
          status: 'disconnected',
        });
      };
    };
  
    const fetchInterval = setInterval(fetchDataInmateRealtime, 5000);
    fetchDataAndSendRequest();
  }, [id]);
  

  const fetchDataInmateRealtime = async () => {
    const data = {
      device_id: id,
      country_id: '',
      age: '',
      analytics: '',
      name: '',
      gender: '',
    };
    try {
      const res = await apiVisitorRealtimeLogList(data);
      setState((prevState: any) => ({
        ...prevState,
        dataVisitorLog: res,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      // Menggunakan setTimeout untuk panggilan berulang
      setTimeout(fetchDataInmateRealtime, 5000);
    }
  };
  

  const fetchDeviceDetail = async () => {
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
      //   listViewCameraData: JSON.stringify([
      //     {
      //       IpAddress: res.ip_address,
      //       urlRTSP: res.url_rtsp,
      //       deviceName: res.nama_kamera,
      //       deviceId: res.kamera_id,
      //     },
      //   ]),
      // });
      // sendRequestFR('startFR', {
      //   listViewCameraData: JSON.stringify([
      //     {
      //       IpAddress: res.ip_address,
      //       urlRTSP: res.url_rtsp,
      //       deviceName: res.nama_kamera,
      //       deviceId: res.kamera_id,
      //     },
      //   ]),
      // });
      // sendRequest('startLiveView', {
      //   listViewCameraData: JSON.stringify(state.listViewCamera),
      // });
    } catch (error) {
      console.error(error);
    }
  };

  const componentDidUpdate = (prevProps: any) => {
    if (props.id !== prevProps.id) {
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

  const formatTimestamp = (timestamp: any) => {
    const dateObj = new Date(timestamp);
    const day = dateObj.getDate();
    const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(
      dateObj
    );
    const year = dateObj.getFullYear();
    const time = dateObj.toLocaleTimeString('id-ID', { hour12: false });
    return `${day} ${month} ${year} ${time}`;
  };

  // const sendRequest = (method: any, params: any) => {
  //   client.current.send(JSON.stringify({ method: method, params: params }));
  // };
  // const sendRequestFR = (method: any, params: any) => {
  //   clientFR.current.send(JSON.stringify({ method: method, params: params }));
  // };

  const destroyCamera = (data: any) => {
    console.log('destroy streaming');
    if (playerRef.current) {
      playerRef.current.stop();
    }
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
  
  const renderStream1 = (obj: any, index: any) => {
    console.log('render stream 1', obj);
    var urlStream = state.baseUrl + obj.IpAddress + state.extenstion;
    console.log(urlStream);
    return (
      <div className="w-full" key={index}>
        <div className="">
          <div className="">
            <div className="">

              <ReactPlayer
                className="react-player"
                url={urlStream}
                width="100%"
                height="100%"
                playing={true}
                playsinline={true}
                controls={true}
                ref={playerRef}
              />
            </div>
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
    (row:any) => row.visitor_name === 'unrecognized'
  );
  const faceDetectionRows = dataVisitorLog.filter(
    (row:any) => row.visitor_name !== 'unrecognized'
  );

  const tidakDikenal = faceDetectionRows.filter(
    (item: any) => item.keterangan === 'Tidak Dikenal'
  );
  const terdeteksi = faceDetectionRows.filter(
    (item: any) => item.keterangan !== 'Tidak Dikenal'
  );
  // console.log('datatata:', faceDetectionRows);
    
  return (
    <div className="mx-6 h-auto box-border my-1">
      <div
        className={`${
          rightKamera ? 'grid grid-cols-1' : 'grid grid-cols-3'
        } gap-4`}
      >
        <div className={`flex-col py-1 col-span-2 relative rounded-md shadow-sm `}>
          <div>
            <div>
              <p className="text-white ml-1">
                {' '}
                Nama Kamera {deviceDetail.nama_kamera}{' '}
              </p>
            </div>
            <div className="w-full mt-2 h-full">
              <div
                className={`p-1 ${
                  bottomKamera ? 'h-full' : 'h-full'
                }`}
              >
                <div className="w-full h-full">
                  {state.listViewCamera.map((obj, index) => (
                    <div className='p-1 bg-slate-900 rounded-sm' key={index}>{renderStream1(obj, index)}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={` mx-1 mt-2 box-border ${bottomKamera ? 'hidden' : ''}`}>
            <p>Kamera Terdeteksi : {faceDetectionRows.length}</p>
            <div className="">
              <div className="w-full flex box-border gap-x-3 overflow-x-scroll ">
              {faceDetectionRows?.map((row:any, index) => (
                    <div key={index} className="bg-slate-900 w-40 rounded mt-1">
                      <div className="w-30 h-20 flex items-center">
                        <img
                          src={`https://dev.transforme.co.id/siram_admin_api${row.image}`}
                          alt="Person"
                          className="w-full h-full p-1 pb-2"
                        />
                        {/* <img
                          src={`https://dev.transforme.co.id/siram_admin_api${row.face_pics}`}
                          alt="Person"
                          className="w-16 h-16 rounded-5"
                        /> */}
                      </div>
                      <div className="w-full pl-2 pb-2">
                        <p className="text-xs font-semibold">{row.nama_wbp}</p>
                        {/* <p className="text-xs">
                          {row.gender === true
                            ? 'Pria'
                            : row.gender === false
                            ? 'Wanita'
                            : row.gender === null || row.gender === ''
                            ? 'Unknown'
                            : null}{' '}
                          - {row.age} Years Old
                        </p> */}
                        <p className="text-xs">{row.nationality}</p>
                        <p className="text-xs">
                          {formatTimestamp(row.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className={` ${rightKamera ? 'hidden' : ''}`}>
          <div className="grid grid-cols-1">
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="grid grid-cols-1 ">
                  <p>Terdeteksi : {terdeteksi.length}</p>
                <div className={`flex-col h-[87vh] content-start justify-items-start align-top overflow-y-scroll px-1`}>
                  {terdeteksi?.map((row:any, index) => (
                    <div key={index} className="bg-slate-900 rounded mt-2">
                      <div className="w-full">
                        <img
                          src={`https://dev.transforme.co.id/siram_admin_api${row.image}`}
                          alt="Person"
                          className="w-full h-full p-1 pb-2"
                        />
                        {/* <img
                          src={`https://dev.transforme.co.id/siram_admin_api${row.face_pics}`}
                          alt="Person"
                          className="w-16 h-16 rounded-5"
                        /> */}
                      </div>
                      <div className="w-full pl-2 pb-2">
                        <p className="text-xs font-semibold">{row.nama_wbp}</p>
                        {/* <p className="text-xs">
                          {row.gender === true
                            ? 'Pria'
                            : row.gender === false
                            ? 'Wanita'
                            : row.gender === null || row.gender === ''
                            ? 'Unknown'
                            : null}{' '}
                          - {row.age} Years Old
                        </p> */}
                        <p className="text-xs">{row.nationality}</p>
                        <p className="text-xs">
                          {formatTimestamp(row.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 h-[90vh] relative  ">
                  <p>Tidak Terdeteksi : {tidakDikenal.length}</p>
                <div className=" h-[87vh] align-top overflow-y-scroll px-1">
                  {tidakDikenal?.map((row:any, index) => (
                    <div key={index} className="bg-slate-900 rounded mt-2">
                      <div className="w-full flex align-top">
                        <img
                          src={`https://dev.transforme.co.id/siram_admin_api${row.image}`}
                          alt="Person"
                          className="w-full h-full p-1 pb-2"
                        />
                        {/* <img
                          src={`https://dev.transforme.co.id/siram_admin_api${row.face_pics}`}
                          alt="Person"
                          className="w-16 h-16 rounded-5"
                        /> */}
                      </div>
                      <div className="w-full pl-2 pb-2">
                        <p className="text-xs font-semibold">
                          {row.keterangan}
                        </p>
                        {/* <p className="text-xs">
                          {row.gender === true
                            ? 'Pria'
                            : row.gender === false
                            ? 'Wanita'
                            : row.gender === null || row.gender === ''
                            ? 'Unknown'
                            : null}{' '}
                          - {row.age} Years Old
                        </p> */}
                        <p className="text-xs">{row.nationality}</p>
                        <p className="text-xs">
                          {formatTimestamp(row.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* <div className="mt-3">Informasi Kamera :</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KameraDetail;
function sendRequest(arg0: string, arg1: { status: string; }) {
  throw new Error('Function not implemented.');
}

