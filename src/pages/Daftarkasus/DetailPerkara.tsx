import React, { useState } from 'react';
import PenetapanPerkara from './PenetapanPerkara';
import DataUmum from './DataUmum';
import Penuntutan from './Penuntutan';
import PeninjauanKembali from './PeninjauanKembali';


const DetailPerkara = () => {
  const [tapIndex, setTapIndex] = useState(0);
  const tabMenu = [
    'Data Umum',
    'Penetapan',
    'Jadwal Sidang',
    'Saksi',
    'Penuntut',
    'Putusan',
    'Banding',
    'Barang Bukti',
    'Riwayat Perkara',
    'Peninjauan Kembali'
  ];
  return (
    <div>
      <div className=" p-2 bg-slate-500 m-3">
        <div className="flex flex-row mt-3">
          {tabMenu.map((data, index) => {
            return (
              <button
                className="bg-slate-400 text-white hover:bg-green-500 text-black-700 font-semibold hover:text-white border-black-500 hover:border-transparent rounded p-2 ml-3"
                onClick={() => setTapIndex(index)}
              >
                {data}
              </button>
            );
          })}
        </div>

        <div className="bg-slate-700">
          {tapIndex == 0 && (
            <div className="">
              <DataUmum />
            </div>
          )}
          {tapIndex == 1 && <div><PenetapanPerkara /></div>}
          {tapIndex == 2 && <div>Jadwal Sidang</div>}
          {tapIndex == 3 && <div>Saksi</div>}
          {tapIndex == 4 && <div><Penuntutan /></div>}
          {tapIndex == 5 && <div>Putusan</div>}
          {tapIndex == 6 && <div>Banding</div>}
          {tapIndex == 7 && <div>Barang Bukti</div>}
          {tapIndex == 8 && <div>Riwayat Perkara</div>}
          {tapIndex == 9 && <div><PeninjauanKembali /></div>}
        </div>
      </div>

      {/* <h1>Hello World!</h1>
      <h2>Halaman Detail</h2> */}
    </div>
  );
};

export default DetailPerkara;
