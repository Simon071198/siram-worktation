import { useState } from 'react';
import PenetapanPerkara from './PenetapanPerkara';

// import DataUmum from '../../components/DataUmum';
import JadwalSidang from './JadwalSidang';
// import Putusan from './Putusan';
import Banding from './Banding';
import PutusanSela from './PutusanSela';
import DataUmum from './DataUmum';
import RiwayatBukti from './RiwayatBukti';
import Penuntutan from './Penuntutan';
import { RiwayatPerkara } from './RiwayatPerkara';
import { Putusan } from './Putusan';
import Kasasi from './Kasasi';
import PeninjauanKembali from './PeninjauanKembali';
import Saksi from './Saksi';

const DetailPerkara = () => {
  const [tapIndex, setTapIndex] = useState(0);
  const tabMenu = [
    'Data Umum',
    'Penetapan',
    'Jadwal Sidang',
    'Saksi',
    'Penuntut',
    'Putusan Sela',
    'Putusan',
    'Banding',
    'Kasasi',
    'Peninjauan Kembali',
    'Barang Bukti',
    'Riwayat Perkara',
  ];
  console.log(tapIndex);

  return (
    <div>
      <div className=" p-2 bg-slate-500 m-3">
        <div className="flex flex-row mt-3 ml-10 overflow-auto">
          {tabMenu.map((data, index) => {
            return (
              <button
                className={`${tapIndex === index ? 'bg-slate-200 text-slate-800' : 'bg-slate-400 text-white hover:text-slate-500 hover:bg-slate-300 '}  text-black-700 font-semibold hover:border-transparent rounded-t p-2 ml-1 duration-200`}
                onClick={() => setTapIndex(index)}
              >
                {data}
              </button>
            );
          })}
        </div>

        <div className="bg-slate-700">
          {tapIndex == 0 && <DataUmum />}
          {tapIndex == 1 && <PenetapanPerkara />}
          {tapIndex == 2 && <JadwalSidang />}
          {tapIndex == 3 && <Saksi />}
          {tapIndex == 4 && <Penuntutan />}
          {tapIndex == 5 && <PutusanSela />}
          {tapIndex == 6 && <Putusan />}
          {tapIndex == 7 && <Banding />}
          {tapIndex == 8 && <Kasasi />}
          {tapIndex == 9 && <PeninjauanKembali />}
          {tapIndex == 10 && <RiwayatBukti />}
          {tapIndex == 11 && <RiwayatPerkara />}
        </div>
      </div>

      {/* <h1>Hello World!</h1>
      <h2>Halaman Detail</h2> */}
    </div>
  );
};

export default DetailPerkara;
