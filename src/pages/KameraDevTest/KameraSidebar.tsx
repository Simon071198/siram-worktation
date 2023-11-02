import React from 'react';
import { NavLink } from 'react-router-dom';

const KameraSidebar = (props:any) => {
  const { sidebarKamera}=props

  const DataKamera = [
    {
      id: 1,
      nama_ruangan: 'Ruang 1',
      kamera: [
        { kamera_id:'112345678-1234-1234-12345672',kamera_name: 'CAM_R1-D1' },
        { kamera_id:'12345678-1234-1234-12345672',kamera_name: 'CAM_R1-D2' },
        { kamera_id:'12345678-1234-1234-12345672',kamera_name: 'CAM_R1-D3' },
      ],
    },
    {
      id: 2,
      nama_ruangan: 'Ruang 2',
      kamera: [
        { kamera_id:'4',kamera_name: 'CAM_R2-D1' },
        { kamera_id:'5',kamera_name: 'CAM_R2-D2' },
        { kamera_id:'6',kamera_name: 'CAM_R2-D3' },
      ],
    },
    {
      id: 3,
      nama_ruangan: 'Ruang 3',
      kamera: [
        { kamera_id:'7',kamera_name: 'CAM_R3-D1' },
        { kamera_id:'8',kamera_name: 'CAM_R3-D2' },
        { kamera_id:'9',kamera_name: 'CAM_R3-D3' },
      ],
    },
  ];
  return (
    <div className={` h-screen bg-slate-600 translate-x-0 duration-300 ease-linear overflow-y-hidden ${
        sidebarKamera ? 'w-0 translate-x-0' : 'w-72.5 -translate-x-full'
      }`}>


      <div className={`grid grid-cols-1 gap-4 px-3 py-1 mt-4 ${sidebarKamera ? 'hidden':'block'}`}>
        <div className="flex items-center bg-white px-2 py-1 rounded-lg">
          <input
            placeholder="Search"
            className="w-full focus:outline-none"
          ></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <div>
        {DataKamera.map((locDevice,index)=>(
               <div className="mb-4" key={index}>
               <details className="group">
                 <summary className="flex gap-2 items-center font-medium cursor-pointer list-none text-white">
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
                   <span>{locDevice.nama_ruangan}</span>
                 </summary>
   
                 <div className="py-1 ml-[30px]">
                   <details className="groupChild">
                     <summary className="grid grid-cols-1 gap-2 items-center font-medium cursor-pointer list-none text-sm">
   
                      
   
                       {locDevice.kamera.map((device,index) => (
                      
                      <NavLink to={`/kamera-dev-test/${device.kamera_id}`} key={index}>
                        <div className='flex items-center gap-2'>
                          <div>
                           <svg
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke-width="1.5"
                         stroke="currentColor"
                         width="20"
                       >
                         <path
                           stroke-linecap="round"
                           d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                         />
                       </svg>
                       </div>
                        <p className="text-slate-300 group-open:animate-fadeIn truncate">
                          {device.kamera_name}
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
