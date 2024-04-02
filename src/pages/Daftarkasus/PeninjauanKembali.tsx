import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import { Error403Message } from '../../utils/constants';
import { Alerts } from './AlertDaftarKasus';

import {
     apiReadAllWBP
} from "../../services/api";




const PeninjauanKembali = (
     { token } : any
) => {

     const [loading, setLoading] = useState(true);


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
     const dummyData1 = [
          {
              tanggal_permohonan: "Sabtu, 02 Januari 2023",
              pemohon_pk: "Eko Rudianto",
              keterangan: "Pemohon (Terdakwa) "
          }
          
      ];
     const dummyData2 = [
          {
               no: "1",
               status2 : "Termohon (Oditur)",
               nama2: "Wandi",
               tanggal2: "Senin, 04 Januari 2023) "
          }
          
      ];
     const dummyData3 = [
          {
               no: "1",
               status3 : "Pemohon (Terdakwa)",
               nama3: "Eko Rudianto",
               tanggal3: "Senin, 04 Januari 2023) "
          }
          
      ];
     const dummyData4 = [
          {
               no: "1",
               status3 : "Pemohon (Terdakwa)",
               nama3: "Eko Rudianto",
               tanggal3: "Senin, 04 Januari 2023) "
          }
          
      ];

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
                    <div className="grid grid-cols-7 gap-3 p-1">
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1 mr-25">
                              No
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-2">
                              Status
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-4">
                              Nama
                         </div>
                    </div>
               </div>
                    <div className="grid grid-cols-1 divide-y object-cover rounded-full">
                    {dummyData.map((data, index) => {
                         return (
                              <div key={index} className={`dark:bg-meta-4${index !== dummyData.length - 1 ? '' : ''} `}>
                                   <div className="grid grid-cols-7 gap-3 hover:bg-sky-950">
                                        <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-1 mr-25">
                                             {data.no}
                                        </div>
                                        <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-2">
                                             {data.nama_status}
                                        </div>
                                        <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-4">
                                             {data.nama}
                                        </div>
                                   </div>
                              </div>
                          );
                         })}
                    </div>
               </div>
               <div className="pt-3">
               <div className="pb-1 text-sm font-medium md:text-base dark:text-white">
                    Data Permohonan PK  
               </div>
               <div className="rounded-sm border border-stroke bg-white px-1 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-slate-600">
                    <div className="grid grid-cols-3 gap-3 p-1">
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                              Tanggal Permohonan
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                              Pemohon PK
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                              Keterangan
                         </div>
                    </div>
               </div>
               <div className="">
                    <div className="grid grid-cols-1">
                    {dummyData1.map((data, index) => {
                         return (
                              <div key={index} className={`dark:bg-meta-4${index !== dummyData1.length - 1 ? ' border-b bg-gray-1 ' : ''}`}>
                                  <div className="grid grid-cols-3 hover:bg-sky-950">
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                                      {data.tanggal_permohonan}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                                      {data.pemohon_pk}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                                      {data.keterangan}
                                  </div>
                                  </div>
                              </div>
                          );
                         })}
                    </div>
               </div>
               </div>
               <div className="pt-3 pb-3">
               <div className="pb-2 text-sm font-medium md:text-base dark:text-white">
                    Tanggal Pemberitahuan Permohonan PK
               </div>
               <div className="rounded-sm border border-stroke bg-white px-1 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-slate-600">
                    <div className="grid grid-cols-7 gap-10 p-1">
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1 mr-20">
                              No
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1">
                              Status
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-3">
                              Nama
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1 ml-5">
                              Tanggal
                         </div>
                         
                    </div>
               </div>
               <div className="">
                    <div className="grid grid-cols-1">
                    {dummyData2.map((data, index) => {
                             return (
                              <div key={index} className={`dark:bg-meta-4${index !== dummyData2.length - 1 ? ' border-b bg-gray-1' : ''}`}>
                                  <div className="grid grid-cols-7 gap-9 hover:bg-sky-950">

                                  <div className="text-sm flex items-center justify-center xl:p-3 cursor-pointer col-span-1 mr-20">
                                      {data.no}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-1">
                                      {data.status2}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-3">
                                      {data.nama2}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-2 mr-40">
                                      {data.tanggal2}
                                  </div>
                                  </div>
                              </div>
                          );
                         })}
                    </div>
               </div>
          </div>
               <div className="pt-3 pb-3">
               <div className="pb-2 text-sm font-medium md:text-base dark:text-white">
                    Tanggal Penerimaan Memori PK
               </div>
               <div className="rounded-sm border border-stroke bg-white px-1 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-slate-600">
                    <div className="grid grid-cols-7 gap-10 p-1">
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1 mr-20">
                              No
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1">
                              Status
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-3">
                              Nama
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1 ml-5">
                              Tanggal
                         </div>
                         
                    </div>
               </div>
               <div className="">
                    <div className="grid grid-cols-1">
                    {dummyData3.map((data, index) => {
                             return (
                              <div key={index} className={`dark:bg-meta-4${index !== dummyData3.length - 1 ? ' border-b bg-gray-1' : ''}`}>
                                  <div className="grid grid-cols-7 gap-9 hover:bg-sky-950">

                                  <div className="text-sm flex items-center justify-center xl:p-3 cursor-pointer mr-20">
                                      {data.no}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-2 mr-45">
                                      {data.status3}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-2 mr-45">
                                      {data.nama3}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-2 mr-40">
                                      {data.tanggal3}
                                  </div>
                                  </div>
                              </div>
                          );
                         })}
                    </div>
               </div>
          </div>
               <div className="pt-3 pb-3">
               <div className="pb-2 text-sm font-medium md:text-base dark:text-white">
                    Tanggal Penyerahan Memori PK
               </div>
               <div className="rounded-sm border border-stroke bg-white px-1 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-slate-600">
                    <div className="grid grid-cols-7 gap-10 p-1">
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1 mr-20">
                              No
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1">
                              Status
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-3">
                              Nama
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1 ml-5">
                              Tanggal
                         </div>
                         
                    </div>
               </div>
               <div className="">
                    <div className="grid grid-cols-1">
                    {dummyData2.map((data, index) => {
                             return (
                              <div key={index} className={`dark:bg-meta-4${index !== dummyData2.length - 1 ? ' border-b bg-gray-1' : ''}`}>
                                  <div className="grid grid-cols-7 gap-9 hover:bg-sky-950">

                                  <div className="text-sm flex items-center justify-center xl:p-3 cursor-pointer col-span-1 mr-20">
                                      {data.no}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-1">
                                      {data.status2}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-3">
                                      {data.nama2}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-2 mr-40">
                                      {data.tanggal2}
                                  </div>
                                  </div>
                              </div>
                          );
                         })}
                    </div>
               </div>
          </div>
               <div className="pt-3 pb-3">
               <div className="pb-2 text-sm font-medium md:text-base dark:text-white">
                    Tanggal Penerimaan Kontra Memori PK
               </div>
               <div className="rounded-sm border border-stroke bg-white px-1 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-slate-600">
                    <div className="grid grid-cols-7 gap-10 p-1">
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1 mr-20">
                              No
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1">
                              Status
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-3">
                              Nama
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1 ml-5">
                              Tanggal
                         </div>
                         
                    </div>
               </div>
               <div className="">
                    <div className="grid grid-cols-1">
                    {dummyData2.map((data, index) => {
                             return (
                              <div key={index} className={`dark:bg-meta-4${index !== dummyData2.length - 1 ? ' border-b bg-gray-1' : ''}`}>
                                  <div className="grid grid-cols-7 gap-9 hover:bg-sky-950">

                                  <div className="text-sm flex items-center justify-center xl:p-3 cursor-pointer col-span-1 mr-20">
                                      {data.no}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-1">
                                      {data.status2}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-3">
                                      {data.nama2}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-2 mr-40">
                                      -
                                  </div>
                                  </div>
                              </div>
                          );
                         })}
                    </div>
               </div>
          </div>
          <div className="pt-3 pb-3">
               <div className="pb-2 text-sm font-medium md:text-base dark:text-white">
               Tanggal Penyerahan Kontra Memori PK
               </div>
               <div className="rounded-sm border border-stroke bg-white px-1 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-slate-600">
                    <div className="grid grid-cols-7 gap-10 p-1">
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1 mr-20">
                              No
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1">
                              Status
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-3">
                              Nama
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1 ml-5">
                              Tanggal
                         </div>
                         
                    </div>
               </div>
               <div className="">
                    <div className="grid grid-cols-1">
                    {dummyData2.map((data, index) => {
                             return (
                              <div key={index} className={`dark:bg-meta-4${index !== dummyData2.length - 1 ? ' border-b bg-gray-1' : ''}`}>
                                  <div className="grid grid-cols-7 gap-9 hover:bg-sky-950">

                                  <div className="text-sm flex items-center justify-center xl:p-3 cursor-pointer col-span-1 mr-20">
                                      {data.no}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-1">
                                      {data.status2}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-3">
                                      {data.nama2}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-2 mr-40">
                                      -
                                  </div>
                                  </div>
                              </div>
                          );
                         })}
                    </div>
               </div>
          </div>
          <div className="pt-3 pb-3">
               <div className="pb-2 text-sm font-medium md:text-base dark:text-white">
                    Tanggal Pengiriman Berkas PK
               </div>
               <div className="grid grid-cols-2 shadow-default rounded-sm border border-slate-600">
               <div className="dark:bg-slate-600 px-1 justify-center text-sx font-medium md:text-base divide-y">
                    <div className="items-center p-2.5 xl:p-3 cursor-pointer">
                         Tanggal Pengiriman Berkas PK
                    </div>
                    <div className="items-center p-2.5 xl:p-3 cursor-pointer">
                         Nomor Surat Pengiriman Berkas PK
                    </div>
               </div>
               <div className="px-1 justify-center text-sx font-medium md:text-base divide-y">
                    <div className="items-center p-2.5 xl:p-3 cursor-pointer">
                         06 Januari 2023
                    </div>
                    <div className="items-center p-2.5 xl:p-3 cursor-pointer">
                         001/SPB-PK/01/2023
                    </div>
               </div>
               </div>
          </div>
          <div className="pt-3 pb-3">
               <div className="pb-2 text-sm font-medium md:text-base dark:text-white">
                    Putusan PK
               </div>
               <div className="grid grid-cols-2 shadow-default rounded-sm border border-slate-600">
               <div className="dark:bg-slate-600 px-1 justify-center text-sx font-medium md:text-base divide-y">
                    <div className="items-center p-2.5 xl:p-3 cursor-pointer">
                         Tanggal Putusan PK
                    </div>
                    <div className="items-center p-2.5 xl:p-3 cursor-pointer">
                         Nomor Putusan PK
                    </div>
                    <div className="items-center p-2.5 xl:p-3 cursor-pointer">
                         Amar Putusan PK
                    </div>
                    <div className="items-center p-2.5 xl:p-3 cursor-pointer">
                         Majelis Hakim PK
                    </div>
                    <div className="items-center p-2.5 xl:p-3 cursor-pointer">
                        Panitera Pengganti PK
                    </div>
                    <div className="items-center p-2.5 xl:p-3 cursor-pointer">
                        Tanggal Pengarsipan PK
                    </div>
               </div>
               <div className="px-1 justify-center text-sx font-medium md:text-base divide-y">
                    <div className="items-center p-2.5 xl:p-3 cursor-pointer">
                         06 Januari 2023
                    </div>
                    <div className="items-center p-2.5 xl:p-3 cursor-pointer">
                         001/SPB-PK/01/2023
                    </div>
               </div>
               </div>
          </div>
          <div className="pt-3 pb-3">
               <div className="pb-2 text-sm font-medium md:text-base dark:text-white">
                    Tanggal Pemberitahuan Putusan PK
               </div>
               <div className="rounded-sm border border-stroke bg-white px-1 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-slate-600">
                    <div className="grid grid-cols-7 gap-10 p-1">
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1 mr-20">
                              No
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1">
                              Status
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-3">
                              Nama
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base col-span-1 ml-5">
                              Tanggal
                         </div>
                         
                    </div>
               </div>
               <div className="">
                    <div className="grid grid-cols-1">
                    {dummyData2.map((data, index) => {
                             return (
                              <div key={index} className={`dark:bg-meta-4${index !== dummyData2.length - 1 ? ' border-b bg-gray-1' : ''}`}>
                                  <div className="grid grid-cols-7 gap-9 hover:bg-sky-950">

                                  <div className="text-sm flex items-center justify-center xl:p-3 cursor-pointer col-span-1 mr-20">
                                      {data.no}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-1">
                                      {data.status2}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-3">
                                      {data.nama2}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer col-span-2 mr-40">
                                      -
                                  </div>
                                  </div>
                              </div>
                          );
                         })}
                    </div>
               </div>
          </div>
          </div>
          </div>
          </div>
     
     );
};

export default PeninjauanKembali;