import React, { Component, useState } from 'react';

interface Item {
  nama_kasus: string;
  nomor_kasus: string;
  nama_jenis_perkara: string;
  nama_jenis_pidana: string;
}

const DataUmum = () => {
  const [data, setData] = useState<Item[]>([]);

  return (
    // <div>
    //   <div className="">
    //     <div
    //       className="grid grid-rows-25
    //       rounded-t-md bg-gray-2 dark:bg-slate-600 mt-3 w-[15%] ml-3 mb-3"
    //     >
    //       <div className="flex flex-row items-center">
    //         <div className="p-1.5 xl:p-5 justify-center flex">
    //           <h5 className="text-sm font-medium uppercase xsm:text-base">
    //             Nomor Kasus
    //           </h5>
    //           <div className="col-span-2">
    //             <p>3/Pid.K/28-III/2024/Otmil</p>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="flex flex-row items-center">
    //         <div className="p-2.5 xl:p-5 justify-center flex">
    //           <h5 className="text-sm font-medium uppercase xsm:text-base">
    //             Nama Kasus
    //           </h5>
    //         </div>
    //       </div>

    //       <div className="flex flex-row items-center">
    //         <div className="p-2.5 xl:p-5 justify-center flex">
    //           <h5 className="text-sm font-medium uppercase xsm:text-base">
    //             Jenis Perkara
    //           </h5>
    //         </div>
    //       </div>

    //       <div className="flex flex-row items-center">
    //         <div className="p-2.5 xl:p-5 justify-center flex">
    //           <h5 className="text-sm font-medium uppercase xsm:text-base">
    //             Nama Jenis Pidana
    //           </h5>
    //         </div>
    //       </div>

    //       <div className="flex flex-row items-center">
    //         <div className="p-2.5 xl:p-5 justify-center flex">
    //           <h5 className="text-sm font-medium uppercase xsm:text-base">
    //             Lokasi Kasus
    //           </h5>
    //         </div>
    //       </div>

    //       <div className="flex flex-row items-center">
    //         <div className="p-2.5 xl:p-5 justify-center flex">
    //           <h5 className="text-sm font-medium uppercase xsm:text-base">
    //             Tanggal Kejadian Kasus
    //           </h5>
    //         </div>
    //       </div>

    //       <div className="flex flex-row items-center">
    //         <div className="p-2.5 xl:p-5 justify-center flex">
    //           <h5 className="text-sm font-medium uppercase xsm:text-base">
    //             Tanggal Pelaporan Kasus
    //           </h5>
    //         </div>
    //       </div>

    //       <div className="flex flex-row items-center">
    //         <div className="p-2.5 xl:p-5 justify-center flex">
    //           <h5 className="text-sm font-medium uppercase xsm:text-base">
    //             Jumlah Penyidikan
    //           </h5>
    //         </div>
    //       </div>

    //       <div className="flex flex-row items-center">
    //         <div className="p-2.5 xl:p-5 justify-center flex">
    //           <h5 className="text-sm font-medium uppercase xsm:text-base">
    //             Oditur Penyidik
    //           </h5>
    //         </div>
    //       </div>

    //       <div className="flex flex-row items-center">
    //         <div className="p-2.5 xl:p-5 justify-center flex">
    //           <h5 className="text-sm font-medium uppercase xsm:text-base">
    //             Ketua Oditur Penyidik
    //           </h5>
    //         </div>
    //       </div>

    //       <div className="flex flex-row items-center">
    //         <div className="p-2.5 xl:p-5 justify-center flex">
    //           <h5 className="text-sm font-medium uppercase xsm:text-base">
    //             Pihak Terlibat
    //           </h5>
    //         </div>
    //       </div>

    //       <div className="flex flex-row items-center">
    //         <div className="p-2.5 xl:p-5 justify-center flex">
    //           <h5 className="text-sm font-medium uppercase xsm:text-base">
    //             Tersangka
    //           </h5>
    //         </div>
    //       </div>

    //       <div className="flex flex-row items-center">
    //         <div className="p-2.5 xl:p-5 justify-center flex">
    //           <h5 className="text-sm font-medium uppercase xsm:text-base">
    //             Nama Tersangka
    //           </h5>
    //         </div>
    //       </div>

    //       <div className="flex flex-row items-center">
    //         <div className="p-2.5 xl:p-5 justify-center flex">
    //           <h5 className="text-sm font-medium uppercase xsm:text-base">
    //             Keterangan
    //           </h5>
    //         </div>
    //       </div>

    //       <div className="flex flex-row items-center">
    //         <div className="p-2.5 xl:p-5 justify-center flex">
    //           <h5 className="text-sm font-medium uppercase xsm:text-base">
    //             Saksi
    //           </h5>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="grid grid-rows-3 grid-flow-col mt-3 ml-3">
      <div className="row-span-3 bg-gray-2 dark:bg-slate-600 w-[50%]">
        <div className="p-2 lg:p-3 justify-between flex">
          <h5 className="text-sm font-medium uppercase md:text-base">
            Nomor Kasus
          </h5>
        </div>
        <div className="p-2 lg:p-3 justify-between flex">
          <h5 className="text-sm font-medium uppercase md:text-base">
            Nama Kasus
          </h5>
        </div>
        <div className="p-2 lg:p-3 justify-between flex">
          <h5 className="text-sm font-medium uppercase md:text-base">
            Jenis Perkara
          </h5>
        </div>
        <div className="p-2 lg:p-3 justify-between flex">
          <h5 className="text-sm font-medium uppercase md:text-base">
            Nama Jenis Pidana
          </h5>
        </div>
      </div>
      <div className="col-span-2 w-[180%]">
        <div className="p-2 lg:p-3 justify-between flex">
          <h5 className="text-sm font-medium md:text-base">
            3/Pid.K/28-III/2024/Otmil
          </h5>
        </div>
        <div className="p-2 lg:p-3 justify-between flex">
          <h5 className="text-sm font-medium md:text-base">
            Pelecehan Terhadap Karyawan 1
          </h5>
        </div>
        <div className="p-2 lg:p-3 justify-between flex">
          <h5 className="text-sm font-medium md:text-base">Bohong</h5>
        </div>
        <div className="p-2 lg:p-3 justify-between flex">
          <h5 className="text-sm font-medium md:text-base">Pidana Kejahatan</h5>
        </div>
      </div>
      {/* <div className="row-span-2 col-span-2">03</div> */}
    </div>
  );
};

export default DataUmum;
