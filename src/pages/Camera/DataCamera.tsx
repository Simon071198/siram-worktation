
import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
// import JSMpeg from "@cycjimmy/jsmpeg-player";
// import { Mic, CameraAlt } from "@mui/icons-material";
import {
  faceCompareChina,
  apiVisitorLogList,
  apiDeviceDetail,
  apiVisitorRealtimeLogList,
} from "../../services/api.js";

import { useLocation } from "react-router-dom"; // Import the necessary hook

import { useParams } from "react-router-dom";

import axios from "axios";

import ReactPlayer from "react-player";


const stylesListComent = {
  inline: {
    display: "inline",
  },
};

var cameraplayer = null;
const client = new W3CWebSocket("ws://localhost:4000");


class DataCamera extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef(); // Define videoRef here

    this.state = {
      groupId: "",
      groupShow: [],
      ffmpegIP: "localhost",
      baseUrl: "http://localhost:4000/",
      extenstion: "_.m3u8",
      // arrayData: [{ data: "Camera 1" }, { data: "Camera 2" }, { data: "Camera 3" }],
      girdView: 1,
      isFullscreenEnabled: false,
      selectOptionGroup: null,
      optionsDataGroup: [],
      viewListData: [],
      listViewCamera: [],
      getDataPlayer: [],
      deviceDetail: {},
      startDate: "",
      endDate: "",
      isWebSocketConnected: false,
      dataVisitorLog: [],
    };
    this.player = React.createRef();
  }
  fetchDataInmateRealtime = async () => {
    const { id } = this.props; // Access the id prop
    await apiVisitorRealtimeLogList({
      device_id: id,
    }).then((res) => {
      console.log(res, "data dataVisitorLog");
      this.setState({
        dataVisitorLog: res,
      });
    });
  };
  fetchDeviceDetail = async () => {
    const { id } = this.props; // Access the id prop
    await apiDeviceDetail(id).then((res) => {
      console.log(res, "Perangkat detail");
      this.setState({
        deviceDetail: res,
        viewListData: [
          {
            IpAddress: res.IpAddress,
            urlRTSP: res.urlRTSP,
            deviceName: res.device_name,
            deviceId : res.device_id
          },
        ],
        listViewCamera: [
          {
            IpAddress: res.IpAddress,
            urlRTSP: res.urlRTSP,
            deviceName: res.device_name,
            deviceId : res.device_id
          },
        ],
      });
      this.sendRequest("startLiveView", {
        listViewCameraData: JSON.stringify(this.state.listViewCamera),
      });
    });
  };
  
  //=========================API Service=====================//

  //=========================Function & Method===============//
  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      // When the id prop changes, fetch new data and update the component's state
      this.fetchDataInmateRealtime();
      this.fetchDeviceDetail();
    }
  }

  componentDidMount = () => {
    // ... Your other code ...
    
    const date = this.getTodayDate();
    this.setState({ endDate: date });
    
    // console.log(this.deviceDetail, "device detail");
    
    this.fetchDataInmateRealtime();
    this.fetchDeviceDetail();
    
    // this.fetchInterval = setInterval(this.fetchDataInmateRealtime, 5000);


    client.onopen = async () => {
      console.log("WebSocket Client Connected");

      // Send the initial WebSocket request only when the connection is open
      await this.sendRequest("startDiscovery");

      // Handle WebSocket messages
      client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        var id = dataFromServer.id;

        if (id === "startDiscovery") {
          console.log("data from server", dataFromServer);

          // Send another WebSocket request only when the connection is open
          this.sendRequest("startLiveView", {
            listViewCameraData: JSON.stringify(this.state.listViewCamera),
          });
        } else if (id === "streamCameraList") {
          console.log("data from server camera list", dataFromServer);
          // this.streamCameraList(dataFromServer);
        } else if (id === "stopJsmpeg") {
          this.destroyCamera(dataFromServer);
        }
      };
    };
    
  };

  componentWillUnmount = () => {
    clearInterval(this.fetchInterval);

    // cameraplayer.destroy();
    this.sendRequest("disconnectedLive", {
      status: "disconnected",
    });
  };

  getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  formatTimestamp = (timestamp) => {
    const dateObj = new Date(timestamp);
    const day = dateObj.getDate();
    const month = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
      dateObj
    );
    const year = dateObj.getFullYear();
    const time = dateObj.toLocaleTimeString("id-ID", { hour12: false });

    return `${day} ${month} ${year} ${time}`;
  };

  sendRequest = (method, params) => {
    client.send(
      JSON.stringify({
        method: method,
        params: params,
      })
    );
  };
  // streamCameraList = (data) => {
  //   console.log("stream camera list", data);
  //   if (data.result.length > 0) {
  //     const newCameraData = data.result.map((cam, i) => {
  //       const videoUrl = `ws://${this.state.ffmpegIP}:700${i}/`;
  //       const idCanvas = `video-canvas${i}`;
  //       console.log("video URL", videoUrl);
  //       const canvasElement = document.getElementById(idCanvas); // Get the actual DOM element

  //       const cameraplayer = new JSMpeg.VideoElement(canvasElement, videoUrl, {
  //         autoplay: true,
  //         controls: true,
  //         needPlayButton: true,
  //       });

  //       return { player: cameraplayer };
  //     });
  //     console.log("new camera data", newCameraData);
  //     this.setState({
  //       getDataPlayer: newCameraData,
  //     });
  //   }
  // };

  destroyCamera = (data) => {
    console.log("destroy streaming");
    cameraplayer.stop();
    this.setState({
      cameraplayer: null,
    });
  };

  reset = () => {
    this.setState({
      selectOptionGroup: null,
      viewListData: [],
      listViewCamera: [],
    });
    this.getGroupList();
    this.getViewList();
  };

  pause = () => {
    cameraplayer.stop();
  };

  ref = (player) => {
    // console.log(player.player.isPlaying);
  };

  renderStream1 =(obj, index) => {
    console.log("render stream 1", obj);
    const ref = React.createRef();
    var urlStream = this.state.baseUrl + obj.IpAddress + this.state.extenstion;
    console.log(urlStream);
    return (
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
        <div className="bg-black p-4">
          <div className="relative">
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                url={urlStream}
                width="100%"
                height="100%"
                playing={true}
                playsinline={true}
                controls={true} // You can simplify the controls logic
              />
            </div>
            <div className="absolute left-4 right-4 top-2">
              <span className="text-white text-lg font-bold">{obj.deviceName}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { deviceDetail } = this.state;
    const unrecognizedRows = this.state.dataVisitorLog.filter(
      (row) => row.visitor_name == "unrecognized"
    );
    const faceDetectionRows = this.state.dataVisitorLog.filter(
      (row) => row.visitor_name != "unrecognized"
    );

    const strongStyle = {
      fontSize: "11px",
      fontWeight: "bold",
    };

    return (
     
            <div className="flex gap-10 pb-10 h-52vh justify-between mb-10">
              <div className="flex-2 h-full">
                {this.state.listViewCamera.map((obj, index) =>
                  this.renderStream1(obj, index)
                )}
              </div>
              <div className="flex-1 h-full ml-auto">
                <div className="w-full h-93.3%">
                  <div className="container">
                    <p className="font-bold text-center">
                      Kemiripan Terdeteksi: {faceDetectionRows.length}
                    </p>
                  </div>
                  <div className="h-full">
                    <table className="w-full">
                      <tbody>
                        {faceDetectionRows?.map((row, index) => (
                          <tr key={index} className="flex items-center">
                            <td className="w-1/4 flex items-center">
                              <img
                                src={`https://dev.transforme.co.id/gema_admin_api${row.image}`}
                                alt="Person"
                                className="w-16 h-16 rounded-5 mr-2"
                              />
                              <img
                                src={`https://dev.transforme.co.id/gema_admin_api${row.face_pics}`}
                                alt="Person"
                                className="w-16 h-16 rounded-5"
                              />
                            </td>
                            <td className="w-3/4 flex flex-col items-end">
                              <p className="text-xl">{row.visitor_name}</p>
                              <p className="text-sm">
                                {row.gender === true
                                  ? 'Pria'
                                  : row.gender === false
                                  ? 'Wanita'
                                  : row.gender === null || row.gender === ''
                                  ? 'Unknown'
                                  : null}{' '}
                                - {row.age} Years Old
                              </p>
                              <p className="text-sm">{row.nationality}</p>
                              <p className="text-sm">
                                {this.formatTimestamp(row.timestamp)}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex-1 h-full ml-auto">
                <div className="w-full h-93.3%">
                  <div className="container">
                    <p className="font-bold text-center">
                      Tidak Dikenal : {unrecognizedRows.length}
                    </p>
                  </div>
                  <div className="h-full">
                    <table className="w-full">
                      <tbody>
                        {unrecognizedRows?.map((row, index) => (
                          <tr key={index}>
                            <td className="w-1/4">
                              <img
                                src={`https://dev.transforme.co.id/gema_admin_api${row.image}`}
                                alt="Person"
                                className="w-20 h-20 rounded-5"
                              />
                            </td>
                            <td className="w-3/4">
                              <p className="font-semibold">
                                Camera {row.device_name} - {row.location_name}
                              </p>
                              <p>{this.formatTimestamp(row.timestamp)}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 justify-between">
                <div className="w-60vw h-20vh overflow-x-auto">
                  <table className="w-full">
                    <p className="font-semibold pl-5 pt-10">
                      Kemiripan Terdeteksi: {faceDetectionRows.length}
                    </p>
                    <tbody className="flex flex-row h-15vh">
                      {faceDetectionRows?.map((row, index) => (
                        <td key={index} className="w-1/4">
                          <img
                            src={`https://dev.transforme.co.id/gema_admin_api${row.image}`}
                            alt="Person"
                            className="w-20 h-20 rounded-5 flex-wrap"
                          />
                        </td>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="w-40vw h-20vh">
                  <p className="font-bold text-sm pl-5 pt-10">Informasi Kamera</p>
                  <table className="w-full">
                    <tbody>
                      <tr className="flex mb-5">
                        <td>
                          <span className="font-semibold">IP Kamera</span>
                        </td>
                        <td>
                          <span className="font-semibold">
                            {deviceDetail && deviceDetail.IpAddress}
                          </span>
                        </td>
                      </tr>
                      <tr className="flex mb-5">
                        <td>
                          <span className="font-semibold">Nama Kamera</span>
                        </td>
                        <td>
                          <span className="font-semibold">
                            {deviceDetail && deviceDetail.device_name} -{' '}
                            {deviceDetail && deviceDetail.location}
                          </span>
                        </td>
                      </tr>
                      <tr className="flex">
                        <td>
                          <span className="font-semibold">
                            Total Deteksi Hari Ini
                          </span>
                        </td>
                        <td>
                          <span className="font-semibold">20266</span>
                        </td>
                      </tr>
                      <tr className="flex">
                        <td>
                          <span className="font-semibold">Analitik</span>
                        </td>
                        <td>
                          <span className="font-semibold">Pengenalan Wajah</span>
                        </td>
                      </tr>
                      <tr className="flex">
                        <td>
                          <span className="font-semibold">Nomor Seri Analitik</span>
                        </td>
                        <td>
                          <span className="font-semibold">
                            {deviceDetail && deviceDetail.dm_name}
                          </span>
                        </td>
                      </tr>
                      <tr className="flex">
                        <td>
                          <span className="font-semibold">
                            AI SNAP Record SIMILAR TO
                          </span>
                        </td>
                        <td>
                          <span className="font-semibold">122</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        
  }
}
export default DataCamera;
