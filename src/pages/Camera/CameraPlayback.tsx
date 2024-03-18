import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { set } from 'react-hook-form';
import { allKameraOtmilByLocation } from '../../services/api';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { HiQuestionMarkCircle } from 'react-icons/hi2';

const tokenItem = localStorage.getItem('token');
const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
const token = dataToken.token;

const CameraPlayback = () => {
  const [baseUrl] = useState('http://192.168.1.135:4002/record/');
  const [extension] = useState('.mp4');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const [dataAllCamera, setDataAllCamera] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null); // Initially, no camera is selected.

  const [filter, setFilter] = useState('');
  const [date, setDate] = useState('2023-11-20');
  const [timeStart, setTimeStart] = useState('15:04:00');
  const [timeFinish, setTimeFinish] = useState('18:05:00');
  const [deviceName, setDeviceName] = useState('');
  let [locationDeviceListOtmil, setLocationDeviceListOtmil] = useState([
    {
      nama_ruangan_otmil: '',
      kamera: [{ kamera_id: '', nama_kamera: '' }],
      ruangan_otmil_id: '',
    },
  ]);

  const [playlistPlayback, setPlaylistPlayback] = useState([]);

  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const client = useRef(new W3CWebSocket('ws://192.168.1.135:4002'));

  useEffect(() => {
    // Fetch camera data when the component mounts.
    allKameraOtmilByLocation(token).then((res) => {
      setLocationDeviceListOtmil(res);
      console.log(res, 'res otmil');
    });

    // WebSocket logic
    client.current.onopen = () => {
      console.log('WebSocket Client Connected');
      // No need to send a request here; it will be sent when the camera is selected.
    };

    // Handle WebSocket messages (response from the server)
    client.current.onmessage = async (message) => {
      const dataFromServer = JSON.parse(message.data);
      // await setDeviceName(dataFromServer.deviceName);

      if (dataFromServer.message === 'GET FILE FROM DIRECTORY PATH') {
        let formattedDate = date.split('-').join('.');
        let formattedDeviceName = dataFromServer.deviceName.split(' ').join('');
        let playlist = dataFromServer.files.map((file) => {
          console.log(
            baseUrl + formattedDeviceName + '/' + formattedDate + '/' + file,
          );

          return (
            baseUrl + formattedDeviceName + '/' + formattedDate + '/' + file
          );
        });
        setPlaylistPlayback(playlist);
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
    console.error('Video playback error:', error);
    console.error('Error object:', error.target.error);

    setCurrentVideoIndex(
      (prevIndex) => (prevIndex + 1) % playlistPlayback.length,
    );
    playerRef.current.seekTo(0);
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
  const handleVideoEnded = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex + 1) % playlistPlayback.length,
    );
    playerRef.current.seekTo(0);
  };

  // Load the video URL when the current video index changes
  useEffect(() => {
    if (playlistPlayback[currentVideoIndex]) {
      playerRef.current.url = playlistPlayback[currentVideoIndex];
    }
  }, [currentVideoIndex]);

  const handleRecordingClick = (recording: any) => {
    console.log('Recording clicked:', recording);
    // Di sini Anda dapat menambahkan logika untuk memutar rekaman yang dipilih di React Player
  };
  const recordings = [
    { id: 1, name: 'Recording 1', url: 'http://example.com/recording1.m3u8' },
    { id: 2, name: 'Recording 2', url: 'http://example.com/recording2.m3u8' },
    { id: 3, name: 'Recording 3', url: 'http://example.com/recording3.m3u8' },
    { id: 3, name: 'Recording 4', url: 'http://example.com/recording3.m3u8' },
    { id: 3, name: 'Recording 5', url: 'http://example.com/recording3.m3u8' },
    { id: 3, name: 'Recording 6', url: 'http://example.com/recording3.m3u8' },
    { id: 7, name: 'Recording 7', url: 'http://example.com/recording7.m3u8' },
    { id: 8, name: 'Recording 8', url: 'http://example.com/recording8.m3u8' },
    { id: 9, name: 'Recording 9', url: 'http://example.com/recording9.m3u8' },
    { id: 3, name: 'Recording 3', url: 'http://example.com/recording3.m3u8' },
    { id: 3, name: 'Recording 3', url: 'http://example.com/recording3.m3u8' },
    { id: 3, name: 'Recording 3', url: 'http://example.com/recording3.m3u8' },
    { id: 3, name: 'Recording 3', url: 'http://example.com/recording3.m3u8' },
    { id: 3, name: 'Recording 3', url: 'http://example.com/recording3.m3u8' },
    { id: 3, name: 'Recording 3', url: 'http://example.com/recording3.m3u8' },
    { id: 3, name: 'Recording 3', url: 'http://example.com/recording3.m3u8' },
    { id: 3, name: 'Recording 3', url: 'http://example.com/recording3.m3u8' },
    { id: 3, name: 'Recording 3', url: 'http://example.com/recording3.m3u8' },
    { id: 3, name: 'Recording 3', url: 'http://example.com/recording3.m3u8' },
    // Tambahkan data rekaman lainnya jika diperlukan
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center">
        {selectedCamera ? (
          <h1 className="text-2xl font-bold mb-4">
            {selectedCamera.nama_kamera} -{' '}
            {selectedCamera.nama_lokasi_lemasmil
              ? selectedCamera.nama_lokasi_lemasmil
              : selectedCamera.nama_lokasi_otmil}
          </h1>
        ) : (
          <h1 className="text-2xl font-bold mb-4">Playback Camera</h1>
        )}
        <div className="flex justify-around gap-4 mb-4">
          <select onChange={handleCameraChange} className="p-kamera">
            <option value="">Select a Camera</option>
            {dataAllCamera.map((data, index) => (
              <option key={data.kamera_id} value={index}>
                {data.nama_kamera}
              </option>
            ))}
          </select>

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
        <div className="player-wrapper r-player">
          <ReactPlayer
            className="react-player"
            url="http://192.168.1.135:4002/stream/192.168.1.63_.m3u8"
            // url={playlistPlayback[currentVideoIndex]}
            playing={true}
            playsinline={true}
            controls={true}
            ref={playerRef}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            // key={currentVideoIndex}
          />
        </div>
      </div>
      {/* ) : ( */}
      {/* <h1>No video available for the selected camera and time range.</h1> */}
      {/* )} */}
      {/* </div> */}
      <div className="box flex flex-col h-80 w-1/4 overflow-auto">
        <h2 className="text-xl font-bold mb-2">Recordings</h2>
        <ul>
          {recordings.map((recording, index) => (
            <li
              className="cursor-pointer"
              key={index}
              onClick={() => handleRecordingClick(recording)}
            >
              {recording.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CameraPlayback;
