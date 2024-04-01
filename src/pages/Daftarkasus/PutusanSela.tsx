import React, { useState } from 'react';

const PutusanSela = () => {
  const [data, setData] = useState();

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4 m-3">
      <div className="row-span-3 bg-gray-3 dark:bg-slate-600 rounded m-3">
        <div className="p-2 lg:p-3">
          <h5 className="text-sm font-medium uppercase md:text-base p-2 border-b">
            Tanggal Putusan Sela
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2">
            Amar Putusan Sela
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 border-t mt-16">
            Pemberitahuan Putusan Sela Kepada Oditur
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 border-t">
            Pemberitahuan Putusan Sela Kepada Oditur
          </h5>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 border-t">
            Pemberitahuan Putusan Sela Kepada Pihak Oditur
          </h5>
        </div>
      </div>

      <div className="col-span-12 h-30 mt-2">
        <div className="p-2 lg:p-3">
          <p className="text-black truncate dark:text-white capitalize p-2">
            Selasa, 10 Okt. 2023
          </p>

          <p className="text-black truncate dark:text-white capitalize p-2 text-wrap">
            MEMUTUSKAN 1. Menetapkan menyatakan menerima keberatan yang diajukan
            oleh Penasihat Hukum Terdakwa Riki Ariansyah, S.H. dkk, Mayor CHK
            NRP. 11070085160186. 2. Menyatakan pemeriksaan perkara tersebut
            tidak dapat dilanjutkan. 3. Memerintahkan kepada Panitera Pengganti
            untuk mengembalikan berkas perkara kepada Penyidik semula melalui
            Oditur Militer Tinggi pada Oditurat Militer Tinggi II Jakarta, untuk
            diperbaiki sesuai dengan prosedur yang berlaku. 4. Membebankan biaya
            perkara kepada negara.
          </p>

          <p className="text-black truncate dark:text-white capitalize p-2">
            Selasa, 10 Okt. 2023
          </p>

          <p className="text-black truncate dark:text-white capitalize p-2 mt-6">
            Selasa, 10 Okt. 2023
          </p>

          <p className="text-black truncate dark:text-white capitalize p-2 mt-6"></p>
        </div>
      </div>
    </div>
  );
};

export default PutusanSela;
