import { useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import { useNavigate } from 'react-router-dom';
import BarangBukti from './BarangBukti';

import { WbpInsert } from './WbpInsert';
const EntryData = () => {
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState(0);

  const formList = [
    {
      nama: 'Detail Tersangka',
      component: (
        <div>
          <WbpInsert />
        </div>
      ),
    },
    {
      nama: 'Detail Kasus',
      component: (
        <div>
          <input type="text" placeholder="form 2" className="p-2 rounded-md" />
        </div>
      ),
    },
    {
      nama: 'Barang Bukti',
      component: <BarangBukti />,
    },
    {
      nama: 'Detail Penyidikan',
      component: (
        <div>
          <input type="text" placeholder="form 4" className="p-2 rounded-md" />
        </div>
      ),
    },
    {
      nama: 'BAP',
      component: (
        <div>
          <input type="text" placeholder="form 5" className="p-2 rounded-md" />
        </div>
      ),
    },
    {
      nama: 'Detail Sidang',
      component: (
        <div>
          <input type="text" placeholder="form 6" className="p-2 rounded-md" />
        </div>
      ),
    },
  ];
  function handlePrev() {
    setCurrentForm(currentForm - 1);
  }

  function handleNext() {
    if (currentForm + 1 == formList.length) {
      return navigate('/daftar-kasus');
    }
    setCurrentForm(currentForm + 1);
  }
  return (
    <div>
      <ProgressBar list={formList} currentForm={currentForm} />
      <div className="h-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-15 xl:pb-1 flex flex-col gap-12">
        <h1 className="font-bold text-2xl tracking-wide">
          {formList[currentForm].nama}
        </h1>
        <div className="">{formList[currentForm].component}</div>
        <div className="flex justify-end gap-x-3 mb-4">
          {currentForm !== 0 && (
            <button
              className="bg-slate-600 hover:bg-slate-500 text-slate-300 hover:text-slate-50 w-36 py-1 text-lg font-bold rounded-md duration-200"
              onClick={handlePrev}
            >
              Kembali
            </button>
          )}
          <button
            className={`${currentForm + 1 !== formList.length ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-400'} duration-200 w-36 py-1 text-lg text-white font-bold rounded-md`}
            onClick={handleNext}
          >
            {currentForm + 1 !== formList.length ? 'Lanjut' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryData;
