import { useState, useEffect } from "react";
import Loader from "../../common/Loader";




const PenetapanPerkara = () => {

     const [loading, setLoading] = useState(true);

     const dummyData = [
          {
              tanggal_penetapan: "Sabtu, 01 Januari 2021",
              nama_hakim: "Hakim 1",
              posisi: "Hakim Ketua",
              aktif: "Ya"
          },
          {
              tanggal_penetapan: "Sabtu, 01 Januari 2021",
              nama_hakim: "Hakim 2",
              posisi: "Hakim Anggota",
              aktif: "Ya"
          },
          
      ];

      useEffect(() => {
          const delay = setTimeout(() => {
              setLoading(false);
          }, 900);
  
          return () => clearTimeout(delay);
      }, []);
     
     return (
          <div>
               {loading && <Loader />}
          <div className="px-5 pt-3">
               <div className="">
               <div className="pb-2 text-sm font-medium md:text-base dark:text-white">
                    Penetapan Hakim
               </div>
               <div className="">
               <div className="rounded-sm border border-stroke bg-white px-1 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-slate-600">
                    <div className="grid grid-cols-4 gap-4 p-1">
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                              Tanggal Penetapan
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                              Nama Hakim
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                              Posisi
                         </div>
                         <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                              Aktif
                         </div>
                    </div>
               </div>
                    <div className="grid grid-cols-1 divide-y object-cover rounded-full">
                    {dummyData.map((data, index) => {
                         return (
                              <div key={index} className={`dark:bg-meta-4${index !== dummyData.length - 1 ? '' : ''} `}>
                                   <div className="grid grid-cols-4 hover:bg-sky-950">
                                        <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                                             {data.tanggal_penetapan}
                                        </div>
                                        <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                                             {data.nama_hakim}
                                        </div>
                                        <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                                             {data.posisi}
                                        </div>
                                        <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer p-1.5">
                                             {data.aktif}
                                        </div>
                                   </div>
                              </div>
                          );
                         })}
                    </div>
               </div>
               <div className="pt-3">
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
                    {dummyData.map((data, index) => {
                         return (
                              <div key={index} className={`dark:bg-meta-4${index !== dummyData.length - 1 ? ' border-b bg-gray-1 ' : ''}`}>
                                  <div className="grid grid-cols-3 hover:bg-sky-950">
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                                      {data.tanggal_penetapan}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                                      {data.nama_hakim}
                                  </div>
                                  <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                                      {data.posisi}
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
                    {dummyData.map((data, index) => {
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
          </div>
          </div>
          </div>
          </div>
     
     );
};

export default PenetapanPerkara;