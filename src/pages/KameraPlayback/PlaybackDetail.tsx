import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ReactPlayer from 'react-player';
import { useOutletContext, useParams } from 'react-router-dom';
import { apiDeviceDetail } from '../../services/api';
import dayjs from 'dayjs';

const PlaybackDetail = (props: any) => {
  const { id } = useParams();
  const [bottomKamera]: any = useOutletContext();

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [dataAllCamera, setDataAllCamera] = useState([]);
  const [filePayback, setFilePlayback] = useState('');

  const [state, setState] = useState({
    groupId: '',
    groupShow: [],
    ffmpegIP: 'localhost',
    baseUrl: 'http://192.168.1.135:4002/record/',
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

  const [cameraData, setCameraData] = useState({
    deviceName: '',
    fullPath: '',
    files: [],
  });

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const time = dayjs(now).format('HH:mm');
    const waktu = time.includes(':') ? `${time}:00` : `${time}:00`;
    return waktu;
  };

  const getStartTime = () => {
    const now = dayjs();
    const startTime = now.subtract(30, 'minute').format('HH:mm');
    const waktu = startTime.includes(':')
      ? `${startTime}:00`
      : `${startTime}:00`;
    return waktu;
  };

  const [defaultDate, setDefaultDate] = useState(getTodayDate());
  const [defaultFinishTime, setDefaultFinishTime] = useState(getCurrentTime());
  const [defaultStartTime, setDefaultStartTime] = useState(getStartTime());

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setDefaultDate(newDate);
  };

  const handleTimeStartChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newTimeStart = event.target.value;
    const formattedTimeStart = newTimeStart.includes(':')
      ? `${newTimeStart}:00`
      : `${newTimeStart}:00`;
    setDefaultStartTime(formattedTimeStart);
  };

  const handleTimeFinishChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newTimeFinish = event.target.value;
    const formattedTimeFinish = newTimeFinish.includes(':')
      ? `${newTimeFinish}:00`
      : `${newTimeFinish}:00`;
    setDefaultFinishTime(formattedTimeFinish);
  };

  const handleFilePlayback = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.value;
    setFilePlayback(newFile);
  };

  useEffect(() => {
    const fetchDataAndSendRequest = async () => {
      await fetchDeviceDetail();
      const date = getTodayDate();
      setState((prevState) => ({ ...prevState, endDate: date }));

      return () => {
        sendRequest('disconnectedPlayback', {
          status: 'disconnected',
        });
      };
    };

    fetchDataAndSendRequest();
  }, [id, defaultDate, defaultFinishTime, defaultStartTime]);

  const fetchDeviceDetail = async () => {
    try {
      const res = await apiDeviceDetail(id);

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

      const client = new W3CWebSocket('ws://192.168.1.135:4002');
      client.onopen = () => {
        const playbackRequest = {
          method: 'getPlayback',
          params: {
            dataCamera: [
              {
                deviceName: res.nama_kamera,
                timeStart: defaultStartTime,
                timeFinish: defaultFinishTime,
                date: defaultDate,
              },
            ],
          },
        };

        // Mengirim permintaan getPlayback
        console.log('playback', playbackRequest);
        client?.send(JSON.stringify(playbackRequest)); // Use optional chaining here
      };

      // Event listener ketika pesan diterima dari server
      client.onmessage = (message: any) => {
        const response = JSON.parse(message.data);
        console.log('Received response:', response);

        // Proses respons dan simpan ke dalam state
        const { deviceName, fullPath, files } = response;
        setCameraData({
          deviceName,
          fullPath,
          files,
        });
      };

      // Event listener ketika koneksi ditutup
      client.onclose = () => {
        console.log('WebSocket Client Closed');
      };

      return () => {
        // Pindahkan client.close() ke sini agar koneksi ditutup setelah selesai menggunakan WebSocket
        client?.close();
      };
    } catch (error) {
      console.error(error);
    }
  };

  const componentDidUpdate = (prevProps: any) => {
    if (props.id !== prevProps.id) {
      fetchDeviceDetail();
    }
  };

  const { deviceDetail } = state;

  const selectedCamera: any = state.listViewCamera[0];
  const cameraName = selectedCamera?.deviceName || 'DefaultCameraName';

  // Build the URL for the stream
  const urlStream = `${state.baseUrl}${cameraName}/${dayjs(defaultDate).format(
    'YYYY.MM.DD',
  )}/${filePayback}`;
  console.log('urlplayback', urlStream);

  return (
    <div className={` ${bottomKamera ? 'h-full' : 'h-full'}`}>
      <div className="flex p-5  gap-x-5 ">
        <div className="player-wrapper w-full ">
          <div className="mt-2">
            <h1 className="text-base font-semibold py-2 capitalize pl-1">
              playback kamera {deviceDetail.nama_kamera}
            </h1>
          </div>
          <div className="p-1 bg-slate-800">
            <ReactPlayer
              className="react-player"
              width="100%"
              height="100%"
              url={urlStream}
              playing={true}
              loop={true}
              volume={0.8}
              controls={true}
              // ref={playerRef}
              // onEnded={handleVideoEnded}
              onError={(e) => console.log('Error playing video', e)}
              key={currentVideoIndex}
            />
          </div>
        </div>

        <div className="relative">
          <div className="flex flex-nowrap pb-1 box-border gap-x-2 rounded-lg">
            <input
              type="date"
              className="py-2 rounded-md pl-2 box-border bg-slate-500"
              onChange={handleDateChange}
              value={defaultDate}
            />
            <input
              type="time"
              className="py-2 rounded-md box-border pl-1 bg-slate-500"
              onChange={handleTimeStartChange}
              value={defaultStartTime}
            />
            <input
              type="time"
              className="py-2 rounded-md box-border pl-1 bg-slate-500"
              onChange={handleTimeFinishChange}
              value={defaultFinishTime}
            />
          </div>
          <h2 className="font-semibold flex bg-slate-800 p-1 rounded-t-md ">
            {cameraData.deviceName}
          </h2>
          <div className="overflow-y-scroll bg-slate-800 p-1 rounded-b-md h-[80vh] ">
            <ul className="grid grid-cols-2 gap-2 justify-between truncate">
              {cameraData.files.map((file, index) => (
                <button onClick={() => setFilePlayback(file)}>
                  <li
                    className="bg-slate-500 rounded-md pl-1 py-1 truncate"
                    value={filePayback}
                    key={index}
                  >
                    {file}
                  </li>
                </button>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default PlaybackDetail;
function sendRequest(arg0: string, arg1: { status: string }) {
  throw new Error('Function not implemented.');
}
