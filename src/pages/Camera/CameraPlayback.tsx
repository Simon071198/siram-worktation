import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { set } from 'react-hook-form';
import { allKameraOtmilByLocation, apiDeviceDetail } from '../../services/api';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alerts } from './AlertCamera';
import { Error403Message } from '../../utils/constants';

const tokenItem = localStorage.getItem('token');
const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
const token = dataToken.token;

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

function getTime(offset = 0) {
  const now = new Date();
  now.setHours(now.getHours() + offset);
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const CameraPlayback = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [baseUrl] = useState('http://100.81.142.71:4007/record/');
  const [extension] = useState('.mp4');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [forUrl, setForurl] = useState(
    'http://192.168.1.111:4007/record/Camera1/2024.03.28/video/181043.mp4',
  );
  const [dataAllCamera, setDataAllCamera] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null); // Initially, no camera is selected.

  const [filter, setFilter] = useState('');
  const [date, setDate] = useState(getCurrentDate());
  const [timeStart, setTimeStart] = useState(getTime(-1));
  const [timeFinish, setTimeFinish] = useState(getTime());
  const [deviceName, setDeviceName] = useState('');
  let [locationDeviceListOtmil, setLocationDeviceListOtmil] = useState([
    {
      nama_ruangan_otmil: '',
      kamera: [{ kamera_id: '', nama_kamera: '' }],
      ruangan_otmil_id: '',
    },
  ]);

  let cameraName = location.state;

  const [playlistPlayback, setPlaylistPlayback] = useState([]);

  const videoRef = useRef(null);
  let playerRef = useRef(null);
  const client = useRef(new W3CWebSocket('ws://192.168.1.111:4007'));
  // const client = useRef(new W3CWebSocket('ws://100.81.142.71:4007'));

  // useEffect(() => {
  //   // Fetch camera data when the component mounts.
  //   allKameraOtmilByLocation(token)
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

  //   // WebSocket logic
  //   client.current.onopen = () => {
  //     console.log('WebSocket Client Connected');
  //     // No need to send a request here; it will be sent when the camera is selected.
  //   };

  //   // Handle WebSocket messages (response from the server)
  //   client.current.onmessage = async (message) => {
  //     const dataFromServer = JSON.parse(message.data);
  //     console.log('data server', message.data);
  //     // await setDeviceName(dataFromServer.deviceName);

  //     if (dataFromServer.message === 'GET FILE FROM DIRECTORY PATH') {
  //       let formattedDate = date.split('-').join('.');
  //       let formattedDeviceName = dataFromServer.deviceName.split(' ').join('');
  //       let playlist = dataFromServer.files.map((file) => {
  //         console.log(
  //           baseUrl + formattedDeviceName + '/' + formattedDate + '/' + file,
  //         );

  //         return (
  //           baseUrl + formattedDeviceName + '/' + formattedDate + '/' + file
  //         );
  //       });
  //       setPlaylistPlayback(playlist);
  //       console.log('ini playback', playlist);
  //     } else if (dataFromServer.message === 'FILE FROM DIRECTORY EMPTY') {
  //       console.log('Got reply from the server:', dataFromServer);
  //       setPlaylistPlayback([]);
  //     }
  //   };

  //   // WebSocket close and error handling
  //   client.current.onclose = (event) => {
  //     console.log('WebSocket Client Closed:', event);
  //   };

  //   client.current.onerror = (error) => {
  //     console.error('WebSocket Error:', error);
  //   };
  // }, [date, selectedCamera]);
  useEffect(() => {
    client.current.onopen = () => {
      console.log('WebSocket Client Connected');
      // No need to send a request here; it will be sent when the camera is selected.
    };

    // Handle WebSocket messages (response from the server)
    client.current.onmessage = async (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('data server', message.data);
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
        console.log('ini playback', playlist);
      } else if (dataFromServer.message === 'FILE FROM DIRECTORY EMPTY') {
        console.log('Got reply from the server:', dataFromServer);
        setPlaylistPlayback([]);
      }
    };

    // WebSocket close and error handling
    client.current.onclose = (event) => {
      console.log('WebSocket Client Closed:', event);
    };

    client.current.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  }, [date, selectedCamera]);
  useEffect(() => {
    fetchDeviceDetail();
  }, []);
  const fetchDeviceDetail = async () => {
    const { id } = props;
    console.log(props, 'props from data camera playback');

    try {
      const res = await apiDeviceDetail(id);
      // const res = await apiDeviceDetail(id);
      console.log(res, 'Perangkat detail playback');
      // console.log(state.listViewCamera, 'listViewCamera');
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

  useEffect(() => {
    if (forUrl) {
      // Set the video URL when `forUrl` changes
      playerRef = forUrl;
      console.log(playerRef, 'ini url');
    }
  }, [forUrl]);
  console.log('for', forUrl);
  // Function to send a request to the WebSocket server
  const sendRequest = (method, params) => {
    client.current.send(JSON.stringify({ method, params }));
  };

  // Handle camera change
  const handleCameraChange = async (e) => {
    const selectedIndex = e.target.value;
    const selectedCam = dataAllCamera[selectedIndex];
    console.log(selectedCam);

    await setSelectedCamera(selectedCam);
    // await setDeviceName(selectedCam.nama_kamera.split(' ').join('_'));

    // Send a request when a camera is selected
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: 'Camera 1',
          // deviceName: selectedCam.nama_kamera,
          urlRTSP: selectedCam.url_rtsp,
          IpAddress: selectedCam.ip_address,
          timeStart,
          timeFinish,
          date,
        },
      ],
    });
  };

  const handleDateChange = async (e) => {
    await setDate(e.target.value);
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: 'Camera 1',
          // deviceName: selectedCamera?.nama_kamera,
          urlRTSP: selectedCamera?.url_rtsp,
          IpAddress: selectedCamera?.ip_address,
          timeStart,
          timeFinish,
          date: e.target.value,
        },
      ],
    });
  };

  const handleTimeStartChange = async (e) => {
    let formattedTime = e.target.value + ':00';
    console.log(formattedTime);
    await setTimeStart(formattedTime);
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: 'Camera 1',
          // deviceName: selectedCamera?.nama_kamera,
          urlRTSP: selectedCamera?.url_rtsp,
          IpAddress: selectedCamera?.ip_address,
          timeStart: formattedTime,
          timeFinish,
          date,
        },
      ],
    });
  };

  const handleTimeFinishChange = async (e) => {
    let formattedTime = e.target.value + ':00';
    console.log(formattedTime);
    await setTimeFinish(formattedTime);
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: 'Camera 1',
          // deviceName: selectedCamera?.nama_kamera,
          urlRTSP: selectedCamera?.url_rtsp,
          IpAddress: selectedCamera?.ip_address,
          timeStart,
          timeFinish: formattedTime,
          date,
        },
      ],
    });
  };

  // Handle video playback errors
  const handleVideoError = (error) => {
    console.log(error);
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '.p-kamera',
          popover: {
            title: 'Select Camera',
            description: 'Pilih camera yang diinginkan',
          },
        },
        {
          element: '.i-date',
          popover: {
            title: 'Date',
            description: 'Menentukan tanggal playback camera',
          },
        },
        {
          element: '.i-time',
          popover: {
            title: 'Time',
            description: 'Menentukan waktu playback camera',
          },
        },
        {
          element: '.i-times',
          popover: {
            title: 'Time',
            description: 'Menentukan waktu playback camera',
          },
        },
        {
          element: '.r-player',
          popover: {
            title: 'React Player',
            description: 'Menampilkan hasil playback camera',
          },
        },
      ],
    });

    driverObj.drive();
  };

  // Handle video playback ended
  // const handleVideoEnded = () => {
  //   setCurrentVideoIndex(
  //     (prevIndex) => (prevIndex + 1) % playlistPlayback.length,
  //   );
  //   playerRef.current.seekTo(0);
  // };

  // Load the video URL when the current video index changes
  useEffect(() => {
    if (playlistPlayback[currentVideoIndex]) {
      playerRef = playlistPlayback[currentVideoIndex];
    }
  }, [currentVideoIndex]);

  const handleRecordingClick = (recording: any) => {
    let newUrl = recording.replace('100.81.142.71', '192.168.1.111');
    console.log('Recording clicked:', newUrl);
    setForurl(newUrl);
  };

  return (
    <div className="flex items-center justify-center gap-4 pt-10">
      <div className="flex flex-col items-center justify-center">
        {selectedCamera ? (
          <h1 className="text-2xl font-bold mb-4">
            {selectedCamera.nama_kamera} -{' '}
            {selectedCamera.nama_lokasi_lemasmil
              ? selectedCamera.nama_lokasi_lemasmil
              : selectedCamera.nama_lokasi_otmil}
          </h1>
        ) : (
          <h1 className="text-2xl font-bold mb-4">Playback {cameraName}</h1>
        )}
        <div className="flex justify-around gap-4 mb-4">
          {/* <select onChange={handleCameraChange} className="p-kamera">
            <option value="">Select a Camera</option>
            {dataAllCamera.map((data, index) => (
              <option key={data.kamera_id} value={index}>
                {data.nama_kamera}
              </option>
            ))}
          </select> */}

          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="i-date"
          />
          <input
            type="time"
            value={timeStart}
            onChange={handleTimeStartChange}
            className="i-time"
          />
          <input
            type="time"
            value={timeFinish}
            onChange={handleTimeFinishChange}
            className="i-times"
          />
          <div className="w-5">
            <button>
              <HiQuestionMarkCircle
                values={filter}
                aria-placeholder="Show tutorial"
                // onChange={}
                onClick={handleClickTutorial}
              />
            </button>
          </div>
        </div>
        {/* <div className="w-full h-full">{playlistPlayback.length > 0 ? ( */}
        <div className="player-wrapper r-player flex justify-center space-x-8">
          <ReactPlayer
            // loop={true}
            className="react-player"
            url={forUrl}
            // url="http://192.168.1.111:4007/record/Camera1/2024.03.28/video/134620.mp4"
            // http://192.168.1.111/var/www/siram_admin_api/siram_websocket/record/videos/record/Camera1/2024.03.28/cam1/Mar-28-2024/video/3-28-12-29-57.mp4
            // url={playlistPlayback[currentVideoIndex]}
            playing={true}
            // playsinline={true}
            controls={true}
            muted={true}
            ref={playerRef}
            // onEnded={handleVideoEnded}
            onError={handleVideoError}
            // key={currentVideoIndex}
          />
          <div className="box w-1/6 ">
            <h2 className="text-xl font-bold mb-2">Recordings</h2>
            <ul className="flex flex-col overflow-auto h-80">
              {playlistPlayback.map((recording, index) => (
                <li
                  className="cursor-pointer tracking-widest"
                  key={index}
                  onClick={() => handleRecordingClick(recording)}
                >
                  {extractTimeFromURL(recording)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <Player>
          <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
        </Player> */}
      </div>
      {/* ) : ( */}
      {/* <h1>No video available for the selected camera and time range.</h1> */}
      {/* )} */}
      {/* </div> */}
    </div>
  );
};

export default CameraPlayback;
