import React, { useEffect, useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import {
  apiLocationOnlineDeviceList,
  allKameraLemasmil,
  allKameraOtmil,
  allKameraOtmilByLocation,
} from '../../services/api';

const token = (() => {
  const tokenItem = localStorage.getItem('token');
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  return dataToken ? dataToken.token : null;
})();

const KameraSidebar = (props: any) => {
  const { sidebarKamera } = props;
  const [dense, setDense] = React.useState(false);
  const [accordionState, setAccordionState] = useState({
    accordion1: false,
    accordion2: false,
    accordion3: false,
  });
  let [locationDeviceList, setLocationDeviceList] = useState([]);
  let [locationDeviceListOtmil, setLocationDeviceListOtmil] = useState([
    {
      nama_ruangan_otmil: '',
      kamera: [{ kamera_id: '', nama_kamera: '' }],
      ruangan_otmil_id: '',
    },
  ]);
  let [locationDeviceListLemasmil, setLocationDeviceListLemasmil] = useState([
    {
      nama_ruangan_otmil: '',
      kamera: [{ kamera_id: '', nama_kamera: '' }],
      ruangan_otmil_id: '',
    },
  ]);

  useEffect(() => {
    const data = {};
    apiLocationOnlineDeviceList(data).then((res) => {
      setLocationDeviceList(res);
    });

    allKameraOtmilByLocation(token).then((res) => {
      setLocationDeviceListOtmil(res);
      console.log(res, 'res otmil');
    });

    allKameraLemasmil().then((res) => {
      setLocationDeviceListLemasmil(res);
      console.log(res, 'res lemasmil');
    });
  }, []);

  // const dataCamera = locationDevice.ruangan.map((ruanganDevice:any, index:any) => ())

  return (
    <div
      className={` h-full box-border bg-slate-600 translate-x-0 duration-300 ease-linear overflow-y-hidden 
                      ${
                        sidebarKamera
                          ? 'w-0 translate-x-0'
                          : 'w-72.5 -translate-x-full'
                      }`}
    >
      <div
        className={`grid grid-cols-1 box-border gap-4 px-3 py-1 mt-4 ${
          sidebarKamera ? 'hidden' : 'block'
        }`}
      >
        <div className="flex items-center bg-white px-2 py-1 rounded-lg">
          <input
            placeholder="Search"
            className="w-full focus:outline-none"
          ></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <div>
          {locationDeviceListOtmil?.map((locDevice, index) => (
            <div className="mb-4" key={index}>
              <details className="group">
                <summary className="flex gap-2 items-center font-medium cursor-pointer list-none text-white">
                  <span className="transition-transform group-open:rotate-90">
                    <AiOutlineRight />
                  </span>
                  <span className="capitalize">
                    {locDevice.nama_ruangan_otmil}
                  </span>
                </summary>

                <div className="py-1 ml-[30px]">
                  <details className="groupChild">
                    <summary className="grid grid-cols-1 gap-2 items-center font-medium cursor-pointer list-none text-sm">
                      {locDevice.kamera?.map((device, index) => (
                        <NavLink
                          to={`/kamera-live/${device.kamera_id}`}
                          key={index}
                        >
                          <div className="flex items-center gap-2">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                width="20"
                              >
                                <path
                                  strokeLinecap="round"
                                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                                />
                              </svg>
                            </div>
                            <p className="text-slate-300 group-open:animate-fadeIn truncate">
                              {device.nama_kamera}
                            </p>
                          </div>
                        </NavLink>
                      ))}
                    </summary>
                  </details>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KameraSidebar;
