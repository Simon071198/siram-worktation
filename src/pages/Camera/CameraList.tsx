import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  apiLocationOnlineDeviceList,
  allKameraLemasmil,
  allKameraOtmil,
} from '../../services/api';

const CameraList = () => {
  const [dense, setDense] = React.useState(false);
  const [accordionState, setAccordionState] = useState({
    accordion1: false,
    accordion2: false,
    accordion3: false,
  });
  let [locationDeviceList, setLocationDeviceList] = useState([]);
  let [locationDeviceListOtmil, setLocationDeviceListOtmil] = useState([]);
  let [locationDeviceListLemasmil, setLocationDeviceListLemasmil] = useState(
    []
  );
  useEffect(() => {
    apiLocationOnlineDeviceList().then((res) => {
      setLocationDeviceList(res);
    });

    allKameraOtmil().then((res) => {
      setLocationDeviceListOtmil(res);
      console.log(res, 'res otmil');
    });

    allKameraLemasmil().then((res) => {
      setLocationDeviceListLemasmil(res);
      console.log(res, 'res lemasmil');
    });
  }, []);
  //   useEffect(() => {
  //     apiLocationOnlineDeviceList().then((res) => {
  //       setLocationDeviceList(res);
  //     });
  //   }, []);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-5 min-h-sceen">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-xl mt-5 tracking-tight">
            Daftar Kamera
          </h2>
          {/* <p className="text-neutral-500 text-xl mt-3">Frequenty asked questions</p> */}
        </div>
        <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>LEMASMIL</span>
                <span className="transition-transform group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>

              {locationDeviceListLemasmil.map((locationDevice, index) => (
                <div className="pt-2 ml-[20px]" key={index}>
                  <details className="groupChild">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                      <span>{locationDevice.nama_lokasi}</span>
                      <span className="transition-transform groupChild-open:rotate-180">
                        <svg
                          fill="none"
                          height="24"
                          shapeRendering="geometricPrecision"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </summary>
                    {/* {locationDevice.ruangan.map((device,index) => (
                      <NavLink to={`/kamera/${device.kamera_id}`} key={index}>
                        <p className="text-slate-300 mt-3 group-open:animate-fadeIn ml-[20px]">
                          {device.nama_kamera}
                        </p>
                      </NavLink>
                    ))} */}
                    {locationDevice.ruangan.map((ruanganDevice, index) => (
                      <div className="pt-2 ml-[20px]" key={index}>
                        <details className="groupChild">
                          <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                            <span>{ruanganDevice.nama_ruangan}</span>
                            <span className="transition-transform groupChild-open:rotate-180">
                              <svg
                                fill="none"
                                height="24"
                                shapeRendering="geometricPrecision"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <path d="M6 9l6 6 6-6"></path>
                              </svg>
                            </span>
                          </summary>
                          {ruanganDevice.kamera.map((device, index) => (
                            <NavLink
                              to={`/kamera/${device.kamera_id}`}
                              key={index}
                            >
                              <p className="text-slate-300 mt-3 group-open:animate-fadeIn ml-[20px]">
                                {device.nama_kamera}
                              </p>
                            </NavLink>
                          ))}
                        </details>
                      </div>
                    ))}
                  </details>
                </div>
              ))}
              {/* <div className="pt-2 ml-[20px]">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span>Surabaya</span>
                    <span className="transition-transform group-open:rotate-180">
                      <svg
                        fill="none"
                        height="24"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                   Kamera 1
                  </p>
                  <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                   Kamera 1
                  </p>
                </details>
              </div> */}
            </details>
          </div>
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>OTMIL</span>
                <span className="transition-transform group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>

              {locationDeviceListOtmil.map((locationDevice, index) => (
                <div className="pt-2 ml-[20px]" key={index}>
                  <details className="groupChild">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                      <span>{locationDevice.nama_lokasi}</span>
                      <span className="transition-transform groupChild-open:rotate-180">
                        <svg
                          fill="none"
                          height="24"
                          shapeRendering="geometricPrecision"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </summary>
                    {/* {locationDevice.ruangan.map((device,index) => (
                      <NavLink to={`/kamera/${device.kamera_id}`} key={index}>
                        <p className="text-slate-300 mt-3 group-open:animate-fadeIn ml-[20px]">
                          {device.nama_kamera}
                        </p>
                      </NavLink>
                    ))} */}
                    {locationDevice.ruangan.map((ruanganDevice, index) => (
                      <div className="pt-2 ml-[20px]" key={index}>
                        <details className="groupChild">
                          <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                            <span>{ruanganDevice.nama_ruangan}</span>
                            <span className="transition-transform groupChild-open:rotate-180">
                              <svg
                                fill="none"
                                height="24"
                                shapeRendering="geometricPrecision"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <path d="M6 9l6 6 6-6"></path>
                              </svg>
                            </span>
                          </summary>
                          {ruanganDevice.kamera.map((device, index) => (
                            <NavLink
                              to={`/kamera/${device.kamera_id}`}
                              key={index}
                            >
                              <p className="text-slate-300 mt-3 group-open:animate-fadeIn ml-[20px]">
                                {device.nama_kamera}
                              </p>
                            </NavLink>
                          ))}
                        </details>
                      </div>
                    ))}
                  </details>
                </div>
              ))}
              {/* <div className="pt-2 ml-[20px]">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span>Surabaya</span>
                    <span className="transition-transform group-open:rotate-180">
                      <svg
                        fill="none"
                        height="24"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                   Kamera 1
                  </p>
                  <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                   Kamera 1
                  </p>
                </details>
              </div> */}
            </details>
          </div>



          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>BABINKUM TNI (Badan Pembinaan Hukum TNI)</span>
                <span className="transition-transform group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>


              <div className="py-5 ml-[20px]">
                <details className="groupChild">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span>Data belum tersedia</span>
                    <span className="transition-transform groupChild-open:rotate-180">
                      <svg
                        fill="none"
                        height="24"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="ml-3 text-neutral-600 mt-3 group-open:animate-fadeIn">
                    Data belum tersedia
                  </p>
                </details>
              </div>
            </details>
          </div>
        </div>
      </div>
    </>
  );
};

export default CameraList;
