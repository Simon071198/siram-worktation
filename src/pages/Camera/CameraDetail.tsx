import DataCamera from "./DataCamera";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  faceCompareChina,
  apiVisitorLogList,
  apiDeviceDetail,
  apiVisitorRealtimeLogList,
} from "../../services/api.js";
export default function CameraDetail() {
  const [dataUnrecognized, setDataUnrecognized] = useState([]);
  const [dataVisitorLog, setDataVisitorLog] = useState([]);
  let [startDate, setStartDate] = useState("2023-07-03");
  let [endDate, setEndDate] = useState("2023-07-24");
  let [deviceDetail, setDeviceDetail] = useState([]);

  const { id } = useParams();


  let params = {
    // from: `${startDate} 00:00`,
    // to: `${endDate} 23:59`,
    device_id: id,
  };
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  // useEffect(() => {
  //   console.log(id, "id");
  //   apiDeviceDetail(id).then((res) => {
  //     console.log(res, 'data device detail');
  //     setDeviceDetail(res);
  //   });
  //   apiVisitorRealtimeLogList(params).then((res) => {
  //     console.log(res, "data dataVisitorLog");
  //     setDataVisitorLog(res);
  //   });
  // }, [id]);
  return (
    <>
      <DataCamera id={id}  />
    </>
  );
}
