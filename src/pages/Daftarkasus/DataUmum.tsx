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
    <div className="grid grid-rows-3 grid-flow-col bg-slate-200">
      <div className="row-span-3 bg-gray-3 dark:bg-slate-400 rounded m-3">
        <div className="p-2 lg:p-3">
          <h5 className="text-sm font-medium uppercase md:text-base p-2 border-b text-black">
            Nomor Kasus
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 border-b text-black">
            Nama Kasus
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 border-b text-black">
            Jenis Kasus
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 border-b text-black">
            Nama Jenis Pidana
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 border-b text-black">
            Lokasi Kasus
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 border-b text-black">
            Tanggal Kejadian Kasus
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 border-b text-black">
            Tanggal Pelaporan Kasus
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 border-b text-black">
            Tanggal Pelimpahan Kasus
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 border-b text-black">
            Jumlah Penyidikan
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 mb-40 text-black">
            Oditur Penyidik
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 border-t text-black">
            Ketua Oditur Penyidik
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 mb-48 border-t text-black">
            Pihak Terlibat
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 mb-36 border-t text-black">
            Tersangka
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 border-t text-black">
            Saksi
          </h5>
        </div>
      </div>

      <div className="col-span-12 h-100 mt-2">
        <div className="p-2 lg:p-3">
          <p className="text-black truncate dark:text--blackcapitalize p-2">
            3/Pid.K/28-III/2024/Otmil
          </p>

          <p className="text-black truncate dark:text-black capitalize p-2">
            Pelecehan Terhadap Karyawan 1
          </p>

          <p className="text-black truncate dark:text-black capitalize p-2">
            Bohong
          </p>

          <p className="text-black truncate dark:text-black capitalize p-2">
            Pidana Kejahatan
          </p>

          <p className="text-black truncate dark:text-black capitalize p-2">
            Lokasi Kejadian Perkara
          </p>

          <p className="text-black truncate dark:text-black capitalize p-2">
            04/11/2023 16:02
          </p>

          <p className="text-black truncate dark:text-black capitalize p-2">
            07/11/2023 16:02
          </p>

          <p className="text-black truncate dark:text-black capitalize p-2 mt-1">
            07/11/2023 16:02
          </p>

          <p className="text-black truncate dark:text-black capitalize p-2 mt-1">
            17
          </p>

          <div className="text-black truncate dark:text-black capitalize p-3 border border-slate-500 mb-2 mt-3">
            <table className="border-collapse border border-slate-500 ">
              <thead>
                <tr>
                  <th className="bg-gray-3 dark:bg-slate-400 p-2 w-80 text-sm font-medium uppercase md:text-base">
                    Oditur Penyidik
                  </th>
                </tr>
              </thead>
              <tbody className="text-center items-center">
                <tr>
                  <td className="border-b bg-gray-3 dark:bg-slate-300 p-2">
                    Pajar Bayu
                  </td>
                </tr>
                <tr>
                  <td className="border-b bg-gray-3 dark:bg-slate-300 p-2">
                    Dany
                  </td>
                </tr>
                <tr>
                  <td className=" bg-gray-3 dark:bg-slate-300 p-2">Nano</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-black truncate dark:text-black capitalize p-2 mb-5">
            Pajar Bayu
          </p>

          <div className="text-black truncate dark:text-black capitalize p-3 border border-slate-500">
            <table className="border-collapse border border-slate-500 ">
              <thead>
                <tr>
                  <th className="bg-gray-3 dark:bg-slate-400 bordb p-2 w-80 text-sm font-medium uppercase md:text-base">
                    Pihak Terlibat
                  </th>
                </tr>
              </thead>
              <tbody className="text-center items-center">
                <tr>
                  <td className="bg-gray-3 dark:bg-slate-300 p-2 border-b">
                    Pajar Bayu (Saksi)
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-3 dark:bg-slate-300 p-2 border-b">
                    Dany (Saksi)
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-3 dark:bg-slate-300 p-2">
                    Nano(Tersangka)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-black truncate dark:text-balck capitalize p-3 border border-slate-500 mt-8">
            <table className="border-collapse border border-slate-500 ">
              <thead>
                <tr>
                  <th className="bg-gray-3 dark:bg-slate-400 p-2 text-sm font-medium uppercase md:text-base border-r w-15">
                    No
                  </th>
                  <th className="bg-gray-3 dark:bg-slate-400 p-2 text-sm font-medium uppercase md:text-base w-[50%] border-r">
                    Nama Tersangka
                  </th>
                  <th className="bg-gray-3 dark:bg-slate-400 bordb p-2 w-[50%] text-sm font-medium ubg-gray-3 uppercase md:text-base">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody className="text-center items-center">
                <tr className="group bg-slate-300 hover:bg-slate-500 hover:border-t">
                  <td className="p-2 group-hover:border-r">1</td>
                  <td className="p-2 group-hover:border-r">Dono</td>
                  <td className="p-2">Tersangka Utama</td>
                </tr>
                <tr className="group bg-slate-300 hover:bg-slate-500 hover:border-t">
                  <td className="p-2 group-hover:border-r">2</td>
                  <td className="p-2 group-hover:border-r">Hengko Binastomo</td>
                  <td className="p-2">Tersangka Kedua</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-black truncate dark:text-black capitalize p-3 border border-slate-500 mt-10">
            <table className="border-collapse border border-slate-500 ">
              <thead>
                <tr>
                  <th className="bg-gray-3 dark:bg-slate-400 p-2 text-sm font-medium uppercase md:text-base border-r w-15">
                    No
                  </th>
                  <th className="bg-gray-3 dark:bg-slate-400 p-2 text-sm font-medium uppercase md:text-base w-[50%] border-r">
                    Nama Saksi
                  </th>
                  <th className="bg-gray-3 dark:bg-slate-400 bordb p-2 w-[50%] text-sm font-medium ubg-gray-3 uppercase md:text-base">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody className="text-center items-center">
                <tr className="group bg-slate-300 hover:bg-slate-500 hover:border-t">
                  <td className="p-2 group-hover:border-r">1</td>
                  <td className="p-2 group-hover:border-r">Dono</td>
                  <td className="p-2">Melihat</td>
                </tr>
                <tr className="group bg-slate-300 hover:bg-slate-500 hover:border-t">
                  <td className="p-2 group-hover:border-r">2</td>
                  <td className="p-2 group-hover:border-r">Hengko Binastomo</td>
                  <td className="p-2">Melihat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <div className="row-span-2 col-span-2">03</div> */}
    </div>
  );
};

export default DataUmum;
