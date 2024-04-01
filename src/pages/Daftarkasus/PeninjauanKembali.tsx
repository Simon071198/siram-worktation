import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import { useLocation, useNavigate } from 'react-router-dom';
import { Error403Message } from '../../utils/constants';
import { Alerts } from './AlertDaftarKasus';

import {
     apiReadAllWBP
} from "../../services/api";




const PeninjauanKembali = (
     { token } : any
) => {

     const [loading, setLoading] = useState(true);
     const navigate = useNavigate();
     const location = useLocation();


     const [data, setData] = useState([]);

     const dummyData = [
          {
              no: "1",
              nama_status: "Termohon (Oditur)",
              nama: "Eko",
          },
          {
              no: "2",
              nama_status: "Termohon (Oditur)",
              nama: "Angga",
          },
          
      ];
     // const dummyData1 = [
     //      {
     //          tanggal_penetapan: "Sabtu, 02 Januari 2023",
     //          nama_panitera_pengganti: "Rahmat",
     //          aktif: "Ya"
     //      },
     //      {
     //           tanggal_penetapan: "Rabu, 04 Januari 2023",
     //           nama_panitera_pengganti: "Karyono",
     //           aktif: "Ya"
     //      },
          
     //  ];
     // const dummyData2 = [
     //      {
     //          tanggal_penetapan: "Kamis, 05 Januari 2021",
     //          nama_hakim: "Purwanto, SH, MH",
     //      },
     //      {
     //           tanggal_penetapan: "Jumat, 06 Januari 2021",
     //           nama_hakim: "Sri Wahyuni, SH, MH",
     //      },
          
     //  ];

      useEffect(() => {
          const delay = setTimeout(() => {
              setLoading(false);
          }, 900);
  
          return () => clearTimeout(delay);
      }, []);
     
     return (
          <div className="">
               {loading && <Loader />}
          <div className="m-3 px-5 pt-2">
               <div className="">
               <div className="pb-2 text-sm font-medium md:text-base dark:text-white">
                    Data Para Pihak
               </div>
               <div className="">
               <div className="rounded-sm border border-stroke bg-white px-1 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-slate-600">
                    <div className="grid grid-cols-6  gap-4 p-1">
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1">
                              No
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-3">
                              Status
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-2">
                              Nama
                         </div>
                    </div>
               </div>
                    <div className="grid grid-cols-1 divide-y object-cover rounded-full">
                    {dummyData.map((data, index) => {
                         return (
                              <div key={index} className={`dark:bg-meta-4${index !== dummyData.length - 1 ? '' : ''} `}>
                                   <div className="grid grid-cols-6  gap-4 p-1 hover:bg-sky-950">
                                        <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-1">
                                             {data.no}
                                        </div>
                                        <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-3">
                                             {data.nama_status}
                                        </div>
                                        <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-2">
                                             {data.nama}
                                        </div>
                                   </div>
                              </div>
                          );
                         })}
                    </div>
               </div>
               {/* <div className="pt-3">
               <div className="pb-1 text-sm font-medium md:text-base dark:text-white">
                    Penetapan Panitera Pengganti
               </div>
               <div className="rounded-sm border border-stroke bg-white px-1 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-slate-600">
                    <div className="grid grid-cols-3 gap-3 p-1">
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                              Tanggal Penetapan
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                              Nama Panitera Pengganti
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                              Aktif
                         </div>
                    </div>
               </div>
               <div className="">
                    <div className="grid grid-cols-1">
                    {dummyData1.map((data, index) => {
                         return (
                              <div key={index} className={`dark:bg-meta-4${index !== dummyData.length - 1 ? ' border-b bg-gray-1 ' : ''}`}>
                                  <div className="grid grid-cols-3 hover:bg-sky-950">
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                                      {data.tanggal_penetapan}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                                      {data.nama_panitera_pengganti}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                                      {data.aktif}
                                  </div>
                                  </div>
                              </div>
                          );
                         })}
                    </div>
               </div>
               </div> */}
               {/* <div className="pt-3 pb-3">
               <div className="pb-2 text-sm font-medium md:text-base dark:text-white">
                    Penetapan Sidang Pertama
               </div>
               <div className="rounded-sm border border-stroke bg-white px-1 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-slate-600">
                    <div className="grid grid-cols-2 gap-2 p-1">
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                              Tanggal Penetapan
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                              Tanggal Sidang Pertama
                         </div>
                         
                    </div>
               </div>
               <div className="">
                    <div className="grid grid-cols-1">
                    {dummyData2.map((data, index) => {
                             return (
                              <div key={index} className={`dark:bg-meta-4${index !== dummyData.length - 1 ? ' border-b bg-gray-1' : ''}`}>
                                  <div className="grid grid-cols-2 hover:bg-sky-950">

                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                                      {data.tanggal_penetapan}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                                      {data.nama_hakim}
                                  </div>
                                  </div>
                              </div>
                          );
                         })}
                    </div>
               </div>
          </div> */}
          </div>
          </div>
          </div>
     
     );
};

export default PeninjauanKembali;