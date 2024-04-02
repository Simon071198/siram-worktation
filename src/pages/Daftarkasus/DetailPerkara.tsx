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
    'Peninjauan Kembali',
  ];
  console.log(tapIndex);

  return (
    <div>
      <div className=" p-2 bg-slate-500 m-3">
        <div className="flex flex-row mt-3 ml-10 overflow-auto">
          {tabMenu.map((data, index) => {
            return (
              <button
                className={`${tapIndex === index ? 'bg-slate-700' : 'bg-slate-400'} bg-slate-400  text-white hover:bg-slate-300 text-black-700 font-semibold hover:text-white hover:border-transparent rounded-t p-2 ml-1`}
                onClick={() => setTapIndex(index)}
              >
                {data}
              </button>
            );
          })}
        </div>

        <div className="bg-slate-700">
          {tapIndex == 0 && (
            <div className="bg-slate-200">
              <DataUmum />
            </div>
          )}
          {tapIndex == 1 && <PenetapanPerkara />}
          {tapIndex == 2 && <JadwalSidang />}
          {tapIndex == 3 && <div>Saksi</div>}
          {tapIndex == 4 && <Penuntutan />}
          {tapIndex == 5 && (
            <div>
              <PutusanSela />
            </div>
          )}
          {tapIndex == 6 && <Putusan />}
          {tapIndex == 7 && <Banding />}
          {tapIndex == 8 && <div>Kasasi</div>}
          {tapIndex == 9 && <div>Peninjauan Kembali</div>}
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
