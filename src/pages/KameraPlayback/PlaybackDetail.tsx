import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { set } from 'react-hook-form';
import { useOutletContext, useParams } from 'react-router-dom';

const PlaybackDetail = (props:any) => {
  const { id } = useParams();
  const [bottomKamera]: any = useOutletContext();
  // const [baseUrl] = useState('http://192.168.1.135:4002/record/');
  // const [extension] = useState('.mp4');

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [dataAllCamera, setDataAllCamera] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);

  const [date, setDate] = useState('2023-11-20');
  const [timeStart, setTimeStart] = useState('15:04:00');
  const [timeFinish, setTimeFinish] = useState('18:05:00');

  const [playlistPlayback, setPlaylistPlayback] = useState([]);

  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const client = useRef(new W3CWebSocket('ws://192.168.1.135:4002/record/'));

  const [state, setState] = useState({
    groupId: '',
    groupShow: [],
    ffmpegIP: 'localhost',
    baseUrl: 'http://192.168.1.135:4002/record/',
    extenstion: '.mp4',
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
    client.current.onmessage = async (message:any) => {
      const dataFromServer = JSON.parse(message.data);
      // await setDeviceName(dataFromServer.deviceName);
      
      if (dataFromServer.message === 'GET FILE FROM DIRECTORY PATH') {
        let formattedDate = date.split('-').join('.');
        let formattedDeviceName = dataFromServer.deviceName.split(' ').join('');
        let playlist = dataFromServer.files.map(
          (file:any) => {
            console.log(baseUrl+formattedDeviceName+'/'+formattedDate+'/'+file);
            
            return baseUrl+formattedDeviceName+'/'+formattedDate+'/'+file
          }
        
        )
        setPlaylistPlayback(playlist);
      } else if (dataFromServer.message === 'FILE FROM DIRECTORY EMPTY') {
        console.log('Got reply from the server:', dataFromServer);
        setPlaylistPlayback([]);
      }
    };

    // WebSocket close and error handling
    client.current.onclose = (event:any) => {
      console.log('WebSocket Client Closed:', event);
    };

    client.current.onerror = (error:any) => {
      console.error('WebSocket Error:', error);
    };
  }, [date,selectedCamera]);

  // Function to send a request to the WebSocket server
  const sendRequest = (method:any, params:any) => {
    client.current.send(JSON.stringify({ method, params }));
  };

  // Handle camera change
  const handleCameraChange = async (e:any) => {
    const selectedIndex = e.target.value;
    const selectedCam = dataAllCamera[selectedIndex];
    console.log(selectedCam);

  await  setSelectedCamera(selectedCam);
  // await setDeviceName(selectedCam.nama_kamera.split(' ').join('_'));
    // Send a request when a camera is selected
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: "Camera 1",
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

  const handleDateChange = async (e:any) => {
    await setDate(e.target.value);
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: "Camera 1",
          // deviceName: selectedCamera?.nama_kamera,
          urlRTSP: selectedCamera?.url_rtsp,
          IpAddress: selectedCamera?.ip_address,
          timeStart,
          timeFinish,
          date : e.target.value,
        },
      ],
    });
  }

  const handleTimeStartChange = async (e:any) => {
    let formattedTime = e.target.value+":00"
    console.log(formattedTime);
    await setTimeStart(formattedTime);
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: "Camera 1",
          // deviceName: selectedCamera?.nama_kamera,
          urlRTSP: selectedCamera?.url_rtsp,
          IpAddress: selectedCamera?.ip_address,
          timeStart : formattedTime,
          timeFinish,
          date,
        },
      ],
    });
  }

  const handleTimeFinishChange = async (e:any) => {
    let formattedTime = e.target.value+":00"
    console.log(formattedTime);
    await setTimeFinish(formattedTime);
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: "Camera 1",
          // deviceName: selectedCamera?.nama_kamera,
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
  // const handleVideoError = (error) => {
  //   console.error('Video playback error:', error);
  //   console.error('Error object:', error.target.error);

  //   setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlistPlayback.length);
  //   playerRef.current.seekTo(0);
  // };

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

  const videoUrl = 'http://192.168.1.135:4002/record/Camera1/2023.11.26/144151.mp4';
  const videoUrl1 = 'http://www.w3schools.com/html/mov_bbb.mp4';

  return (
    <div className={`p-1 ${
      bottomKamera ? 'h-full' : 'h-full'
    }`}>
      {/* <div className="flex flex-col items-center justify-center"> */}
      {/* {selectedCamera ? (
        <h1 className="text-2xl font-bold mb-4">
          {selectedCamera.nama_kamera} -{' '}
          {selectedCamera.nama_lokasi_lemasmil
            ? selectedCamera.nama_lokasi_lemasmil
            : selectedCamera.nama_lokasi_otmil}
        </h1>
      ) : (
        <h1 className="text-2xl font-bold mb-4">Playback Camera</h1>
      )} */}
      {/* <div className="flex justify-around gap-4 mb-4">
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
      </div> */}
      <div className='flex p-5 gap-x-5 h-full box-border'>
        <div className="player-wrapper w-full">
          <div className='mt-2'>
            <h1 className='text-base font-semibold py-2 capitalize pl-1'>playback kamera</h1>
          </div>
          <ReactPlayer
            className="react-player"
            width='100%'
            height='100%'
            url="https://playback.galangsakti.com/record/Camera1/2023.11.26/144151.mp4"
            playing={true}
            loop={true}
            volume={0.8} 
            controls={true}
            // ref={playerRef}
            onEnded={handleVideoEnded}
            onError={(e) => console.log('Error playing video', e)}
            key={currentVideoIndex}
          />

        </div>

        <div className='items-center gap-2 flex-col box-border rounded-sm'>
          <div className='flex flex-nowrap mb-2 box-border gap-x-2 rounded-lg'>
            <input type="date" className='py-2 rounded-md pl-2 box-border bg-slate-500' value={date} onChange={handleDateChange} />
            <input type="time" className='py-2 rounded-md box-border pl-1 bg-slate-500' value={timeStart} onChange={handleTimeStartChange} />
            <input type="time" className='py-2 rounded-md box-border pl-1 bg-slate-500' value={timeFinish} onChange={handleTimeFinishChange} />
          </div>
          <div className='bg-slate-500 box-border p-2 w-full h-full rounded-md'>

          </div>
        </div>

      </div>
      {/* </div> */}
    </div>

  );
};

export default PlaybackDetail;
