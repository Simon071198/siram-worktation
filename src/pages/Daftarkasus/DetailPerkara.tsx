import React, { useState } from 'react';
import PenetapanPerkara from './PenetapanPerkara';

const DetailPerkara = () => {
  const [tapIndex, setTapIndex] = useState(0);
  const tabMenu = [
    'Data Umum',
    'Penetapan',
    'Jadwal Sidang',
    'Saksi',
    'Barang Bukti',
    'Riwayat Perkara',
  ];
  return (
    <div>
      <div className="flex flex-row pt-5">
        {tabMenu.map((data, index) => {
          return (
            <button className="bg-white" onClick={() => setTapIndex(index)}>
              {data}
            </button>
          );
        })}
      </div>
      {tapIndex == 0 && <div>dataumum</div>}
      {tapIndex == 1 && <div><PenetapanPerkara/></div>}
      {tapIndex == 2 && <div>Jadwal Sidang</div>}
      {tapIndex == 3 && <div>Saksi</div>}
      {tapIndex == 4 && <div>Barang Bukti</div>}
      {tapIndex == 5 && <div>Riwayat Perkara</div>}
      {/* <h1>Hello World!</h1>
      <h2>Halaman Detail</h2> */}
    </div>
  );
};

export default DetailPerkara;
