import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { set } from 'react-hook-form';

const CameraPlayback = () => {
  const [baseUrl] = useState('http://localhost:4000/record/');
  const [extension] = useState('.mp4');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const [dataAllCamera, setDataAllCamera] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null); // Initially, no camera is selected.

  const [date, setDate] = useState('2023-10-06');
  const [timeStart, setTimeStart] = useState('15:04:00');
  const [timeFinish, setTimeFinish] = useState('15:05:00');
  const [deviceName, setDeviceName] = useState('');

  const [playlistPlayback, setPlaylistPlayback] = useState([]);

  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const client = useRef(new W3CWebSocket('ws://localhost:4000'));

  useEffect(() => {
    // Fetch camera data when the component mounts.
    axios
      .get('https://dev.transforme.co.id/siram_admin_api/siram_api/dashboard_kamera_read.php')
      .then((response) => {
        setDataAllCamera(response.data.records);
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
        let formattedDate = date.split('-').join('');
        let formattedDeviceName = dataFromServer.deviceName.split(' ').join('');
        let playlist = dataFromServer.files.map(
          (file) => {
            console.log(baseUrl+formattedDeviceName+'/'+formattedDate+'/video/'+file);
            
            return baseUrl+formattedDeviceName+'/'+formattedDate+'/video/'+file
          }
        
        )
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
  }, [date,selectedCamera]);

  // Function to send a request to the WebSocket server
  const sendRequest = (method, params) => {
    client.current.send(JSON.stringify({ method, params }));
  };

  // Handle camera change
  const handleCameraChange = async (e) => {
    const selectedIndex = e.target.value;
    const selectedCam = dataAllCamera[selectedIndex];
console.log(selectedCam);

  await  setSelectedCamera(selectedCam);
  // await setDeviceName(selectedCam.nama_kamera.split(' ').join('_'));


    // Send a request when a camera is selected
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: selectedCam.nama_kamera,
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
          deviceName: selectedCamera?.nama_kamera,
          urlRTSP: selectedCamera?.url_rtsp,
          IpAddress: selectedCamera?.ip_address,
          timeStart,
          timeFinish,
          date : e.target.value,
        },
      ],
    });
  }

  const handleTimeStartChange = async (e) => {
    let formattedTime = e.target.value+":00"
    console.log(formattedTime);
    await setTimeStart(formattedTime);
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: selectedCamera?.nama_kamera,
          urlRTSP: selectedCamera?.url_rtsp,
          IpAddress: selectedCamera?.ip_address,
          timeStart : formattedTime,
          timeFinish,
          date,
        },
      ],
    });
  }

  const handleTimeFinishChange = async (e) => {
    let formattedTime = e.target.value+":00"
    console.log(formattedTime);
    await setTimeFinish(formattedTime);
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: selectedCamera?.nama_kamera,
          urlRTSP: selectedCamera?.url_rtsp,
          IpAddress: selectedCamera?.ip_address,
          timeStart,
          timeFinish : formattedTime,
          date,
        },
      ],
    });
  }

  // Handle video playback errors
  const handleVideoError = (error) => {
    console.error('Video playback error:', error);
    console.error('Error object:', error.target.error);

    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlistPlayback.length);
    playerRef.current.seekTo(0);
  };

  // Handle video playback ended
  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlistPlayback.length);
    playerRef.current.seekTo(0);
  };

  // Load the video URL when the current video index changes
  useEffect(() => {
    if (playlistPlayback[currentVideoIndex]) {
      playerRef.current.url = playlistPlayback[currentVideoIndex];
    }
  }, [currentVideoIndex]);

  return (
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
        <select onChange={handleCameraChange}>
          <option value="">Select a Camera</option>
          {dataAllCamera.map((data, index) => (
            <option key={data.kamera_id} value={index}>
              {data.nama_kamera}
            </option>
          ))}
        </select>

        <input type="date" value={date} onChange={handleDateChange} />
        <input type="time" value={timeStart} onChange={handleTimeStartChange} />
        <input type="time" value={timeFinish} onChange={handleTimeFinishChange} />
      </div>
      <div className="w-full h-full">{playlistPlayback.length > 0 ? (
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url={playlistPlayback[currentVideoIndex]}
            playing={true}
            playsinline={true}
            controls={true}
            ref={playerRef}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            key={currentVideoIndex}
          />
        </div>
      ) : (
        <h1>No video available for the selected camera and time range.</h1>
      )}
      </div>
    </div>
  );
};

export default CameraPlayback;
