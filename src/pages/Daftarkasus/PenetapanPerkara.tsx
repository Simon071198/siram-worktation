import React from "react";

const PenetapanPerkara = () => {
     return <div className="px-4 pt-3">
          <div className=" bg-white px-3 pt-4 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
               <div className="flex justify-between items-center">
                    <h5 className="text-xs uppercase xsm:text-base">
                         Penetapan Hakim
                    </h5>
               </div>
               <div className="">
                    <div className="mb-4 flex gap-2 items-center px-3 py-1 rounded-md">
                         <div className="grid grid-cols-4 rounded-t-md bg-gray-2 dark:bg-slate-600">
                              <div className="flex flex-col items-center">
                                   <div className="p-4.5 xl:p-4 justify-center flex">
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                             Tanggal Penetapan
                                        </h5>
                                   </div>
                              </div>
                              <div className="flex flex-col items-center">
                                   <div className="p-4.5 xl:p-4 justify-center flex">
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                             Nama Hakim/ Majelis Hakim
                                        </h5>
                                   </div>
                              </div>
                              <div className="flex flex-col items-center">
                                   <div className="p-4.5 xl:p-4 justify-center flex">
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                             Posisi
                                        </h5>
                                   </div>
                              </div>
                              <div className="flex flex-col items-center">
                                   <div className="p-4.5 xl:p-4 justify-center flex">
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                             Aktif
                                        </h5>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white px-3 pt-4 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
               <div className="flex justify-between items-center">
                    <h5 className="text-xs uppercase xsm:text-base">
                         PENETAPAN PANITERA PENGGANTI
                    </h5>
               </div>
               <div className="flex justify-center w-full">
                    <div className="mb-4 flex gap-2 items-center px-3 py-1 rounded-md">
                         <div className="grid grid-cols-3 rounded-t-md bg-gray-2 dark:bg-slate-600">
                              <div className="flex flex-col items-center px-10 pe-16">
                                   <div className="p-4.5 xl:p-4 justify-center flex">
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                             Tanggal Penetapan
                                        </h5>
                                   </div>
                              </div>
                              <div className="flex flex-col items-center">
                                   <div className="p-4.5 xl:p-4 justify-center flex">
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                             Nama Panitera Pengganti
                                        </h5>
                                   </div>
                              </div>
                              <div className="flex flex-col items-center">
                                   <div className="p-4.5 xl:p-4 justify-center flex">
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                             Aktif
                                        </h5>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     </div>;
};

export default PenetapanPerkara;