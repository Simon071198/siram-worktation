import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { apiLocationOnlineDeviceList } from '../../services/api';
function Accordion({ title, content, isOpen, toggleAccordion }) {
  return (
    <details open={isOpen} className="group">
      <summary
        className="flex justify-between items-center font-medium cursor-pointer list-none"
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg
            fill="none"
            height="24"
            shape-rendering="geometricPrecision"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </span>
      </summary>
      <p className={`text-neutral-600 mt-3 ${isOpen ? 'animate-fadeIn' : ''}`}>
        {content}
      </p>
    </details>
  );
}

const CameraList = () => {
  const [dense, setDense] = React.useState(false);
  const [accordionState, setAccordionState] = useState({
    accordion1: false,
    accordion2: false,
    accordion3: false,
  });
  let [locationDeviceList, setLocationDeviceList] = useState([]);
  useEffect(() => {
    apiLocationOnlineDeviceList().then((res) => {
      setLocationDeviceList(res);
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
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              {/* <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                SAAS platform is a cloud-based software service that allows
                users to access and use a variety of tools and functionality.
              </p> */}
            {locationDeviceList.map((locationDevice) => (
                <div className="pt-2 ml-[20px]">
                    <details className="groupChild">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span>{locationDevice.location}</span>
                        <span className="transition-transform groupChild-open:rotate-180">
                        <svg
                            fill="none"
                            height="24"
                            shape-rendering="geometricPrecision"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            width="24"
                        >
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                        </span>
                    </summary>
                    {locationDevice.devices.map((device) => (
<NavLink to={`/camera/${device.deviceId}`}>
                    <p className="text-neutral-600 mt-3 group-open:animate-fadeIn ml-[20px]">
                        {device.deviceName}
                    </p>
</NavLink>
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
                        shape-rendering="geometricPrecision"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
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
                <span>OTMIL (Oditur Militer)</span>
                <span className="transition-transform group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              {/* <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                SAAS platform is a cloud-based software service that allows
                users to access and use a variety of tools and functionality.
              </p> */}

              <div className="py-5 ml-[20px]">
                <details className="groupChild">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span>Data belum tersedia</span>
                    <span className="transition-transform groupChild-open:rotate-180">
                      <svg
                        fill="none"
                        height="24"
                        shape-rendering="geometricPrecision"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  Data belum tersedia
                  </p>
                </details>
              </div>
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
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              {/* <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                SAAS platform is a cloud-based software service that allows
                users to access and use a variety of tools and functionality.
              </p> */}

              <div className="py-5 ml-[20px]">
                <details className="groupChild">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span>Data belum tersedia</span>
                    <span className="transition-transform groupChild-open:rotate-180">
                      <svg
                        fill="none"
                        height="24"
                        shape-rendering="geometricPrecision"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
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
