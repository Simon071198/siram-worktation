import React, { useEffect, useRef, useState } from 'react';
import {
  apiReadAllRuanganOtmil,
  apiReadAllWBP,
  apiReadAlllokasiOtmil,
  apiReadZona,
} from '../../services/api';
import { webpack } from 'webpack';

// interface
interface AddGelangModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
}

interface ruangan {
  ruangan_otmil_id: string;
  lokasi_otmil_id: string;
  nama_ruangan_otmil: string;
  jenis_ruangan_otmil: string;
  nama_lokasi_otmil: string;
  zona_id: string;
  nama_zona: string;
}
interface lokasi {
  nama_lokasi_otmil: string;
}

interface namazona {
  zona_id: string;
  nama_zona: string;
}

export const AddGelang: React.FC<AddGelangModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      nama_gelang: '',
      dmac: '',
      tanggal_pasang: '',
      tanggal_aktivasi: '',
      baterai: '',
      lokasi_otmil_id: '',
      nama_lokasi_otmil: '',
      ruangan_otmil_id: '',
      jenis_ruangan_otmil: '',
      nama_ruangan_otmil: '',
      zona_id: '',
      nama_zona: defaultValue?.status_zona_ruangan_otmil ?? '',
      wbp: [],

      // nama_ruangan_lemasmil: '',
      // jenis_ruangan_lemasmil: '',
      // lokasi_lemasmil_id: '',
      // ruangan_lemasmil_id: '',
    },
  );

  //state
  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [NamaZona, setNamaZona] = useState<namazona[]>([]);
  const [ruanganotmil, setruanganotmil] = useState<ruangan[]>([]);
  const [lokasiotmil, setlokasiotmil] = useState<lokasi[]>([]);
  const [namaWBP, setnamaWBP] = useState([]);

  const tokenItem = localStorage.getItem('token');
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  const dataUserItem = localStorage.getItem('dataUser');
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  //useEffect untuk menambahkan event listener  ke elemen dokumen
  // useEffect(() => {
  //   const handleOutsideClick = (e: MouseEvent) => {
  //     if (
  //       modalContainerRef.current &&
  //       !modalContainerRef.current.contains(e.target as Node)
  //     ) {
  //       closeModal();
  //     }
  //   };
  //   document.addEventListener('mousedown', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, [closeModal]);

  // function
  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== 'lokasi_lemasmil_id' &&
        key !== 'nama_lokasi_lemasmil' &&
        key !== 'nama_ruangan_lemasmil' &&
        key !== 'jenis_ruangan_lemasmil' &&
        key !== 'zona_id_lemasmil' &&
        key !== 'status_zona_ruangan_lemasmil' &&
        key !== 'wbp' &&
        key !== 'ruangan_lemasmil_id'
      ) {
        if (!value) {
          errorFields.push(key);
        }
      }
    }
    if (errorFields.length > 0) {
      console.log(errorFields);
      setErrors(errorFields);
      return false;
    }
    setErrors([]);
    return true;
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState, 'formState');

    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState);
    // closeModal();
  };

  const handleRuanganChange = (e: any) => {
    const selectedRuangan = e.target.value;

    // Temukan data ruangan berdasarkan ID yang dipilih
    const selectedData = ruanganotmil.find(
      (item) => item.ruangan_otmil_id === selectedRuangan,
    );
    if (selectedData) {
      setFormState({
        ...formState,
        ruangan_otmil_id: selectedData.ruangan_otmil_id,
        nama_ruangan_otmil: selectedData.nama_ruangan_otmil,
        jenis_ruangan_otmil: selectedData.jenis_ruangan_otmil,
        lokasi_otmil_id: selectedData.lokasi_otmil_id,
        nama_lokasi_otmil: selectedData.nama_lokasi_otmil,
        zona_id: selectedData.zona_id,
        nama_zona: selectedData.nama_zona,
      });
    } else {
      setFormState({
        ...formState,
        ruangan_otmil_id: '',
        nama_ruangan_otmil: '',
        jenis_ruangan_otmil: '',
        lokasi_otmil_id: '',
        nama_lokasi_otmil: '',
        zona_id: '',
        nama_zona: '',
      });
    }
  };

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      let params = {
        pageSize: 1000,
        filter: {
          nama_lokasi_otmil: 'Cimahi',
        },
      };
      try {
        const ruangan = await apiReadAllRuanganOtmil(params, token);
        const ruanganlem = ruangan.data.records;
        setruanganotmil(ruanganlem);

        const lokasi = await apiReadAlllokasiOtmil(params, token);
        const lokasilem = lokasi.data.records;
        setlokasiotmil(lokasilem);

        const zone = await apiReadZona(token);
        const zona = zone.data.records;
        setNamaZona(zona);

        const wbp = await apiReadAllWBP(params, token);
        setnamaWBP(wbp.data.records);

        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } catch (err) {
        throw err;
      }
    };
    fetchData();
  }, []);

  const [inputValue, setInputValue] = useState(
    formState.wbp[0]?.nama_wbp || '',
  );

  const modalStyles: any = {
    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)', // Background color with transparency for the blur effect
      backdropFilter: 'blur(5px)', // Adjust the blur intensity as needed
      zIndex: 40, // Ensure the backdrop is behind the modal
    },
    modalContainer: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      // Add your other modal styles here
    },
  };

  //return
  return (
    <div>
      <div style={modalStyles.backdrop}></div>
      <div
        ref={modalContainerRef}
        style={modalStyles.modalContainer}
        className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
      >
        {/* <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-full w-[80vh]"> */}
        <div className="modal rounded-sm w-full">
          {isLoading ? (
            <div>
              <div className="flex flex-row-reverse pr-5 pt-3">
                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>
              <div className="h-[500px] justify-center flex items-center">
                <svg
                  className="animate-spin h-20 w-20 text-white "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          ) : (
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <div className="w-full flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {isDetail
                      ? 'Detail Data Gelang'
                      : isEdit
                        ? 'Edit Data Gelang'
                        : 'Tambah Data Gelang'}
                  </h3>
                </div>
                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-1 justify-normal">
                  <div className="form-group w-full h-22">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Gelang
                    </label>
                    <input
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="nama_gelang"
                      placeholder="Nama Gelang"
                      onChange={handleChange}
                      value={formState.nama_gelang}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'nama_gelang' ? 'Pilih gelang' : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full h-22">
                    <label
                      className="capitalize block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      dmac
                    </label>
                    <input
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="dmac"
                      placeholder="dmac"
                      onChange={handleChange}
                      value={formState.dmac}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'dmac' ? 'Pilih dmac' : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full h-22">
                    <label
                      className="capitalize block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      baterai
                    </label>
                    <input
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="baterai"
                      placeholder="baterai"
                      onChange={handleChange}
                      value={formState.baterai}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'baterai' ? 'Pilih baterai' : '',
                      )}
                    </p>
                  </div>

                  {/* Tanggal Pasang */}
                  <div className="form-group w-full h-22">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Tanggal Pasang
                    </label>
                    <input
                      type="date"
                      className="w-full rounded border border-stroke   py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="tanggal_pasang"
                      onChange={handleChange}
                      value={formState.tanggal_pasang}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'tanggal_pasang' ? 'Pilih Tanggal Pasang' : '',
                      )}
                    </p>
                  </div>

                  {/* Tanggal Aktivasi */}
                  <div className="form-group w-full h-22">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Tanggal Aktivasi
                    </label>
                    <input
                      type="date"
                      className="w-full rounded border border-stroke   py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="tanggal_aktivasi"
                      onChange={handleChange}
                      value={formState.tanggal_aktivasi}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'tanggal_aktivasi'
                          ? 'Pilih Tanggal Aktivasi'
                          : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full h-22">
                    <label htmlFor="ruangan_otmil_id">
                      Pilih Ruangan otmil:
                    </label>
                    <select
                      id="ruangan_otmil_id"
                      name="ruangan_otmil_id"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      value={formState.ruangan_otmil_id}
                      onChange={handleRuanganChange}
                      disabled={isDetail}
                    >
                      <option value="">Pilih Ruangan</option>
                      {ruanganotmil.map((item) => (
                        <option
                          key={item.ruangan_otmil_id}
                          value={item.ruangan_otmil_id}
                        >
                          {item.nama_ruangan_otmil}
                        </option>
                      ))}
                    </select>
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'ruangan_otmil_id'
                          ? 'Pilih Ruangan Otmil'
                          : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full h-22">
                    <label htmlFor="jenis_ruangan_otmil">Jenis Ruangan:</label>
                    <input
                      type="text"
                      id="jenis_ruangan_otmil"
                      className="w-full rounded border border-stroke py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="jenis_ruangan_otmil"
                      value={formState.jenis_ruangan_otmil}
                      disabled={isDetail || isEdit}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'jenis_ruangan_otmil'
                          ? 'Masukan Jenis Ruangan'
                          : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full h-22">
                    <label htmlFor="nama_lokasi_otmil">
                      Nama Lokasi otmil:
                    </label>
                    <input
                      type="text"
                      id="nama_lokasi_otmil"
                      className="w-full rounded border border-stroke py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="nama_lokasi_otmil"
                      value={formState.nama_lokasi_otmil}
                      disabled={isDetail || isEdit}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_lokasi_otmil'
                          ? 'Masukan Nama Lokasi'
                          : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full h-22">
                    <label htmlFor="nama_zona">Zona :</label>
                    <input
                      type="text"
                      id="nama_zona"
                      className="w-full rounded border border-stroke py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="nama_zona"
                      onChange={handleChange}
                      defaultValue={formState.status_zona_ruangan_otmil}
                      value={formState.nama_zona}
                      disabled={isDetail || isEdit}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_zona' ? 'Masukan Zona' : '',
                      )}
                    </p>
                  </div>

                  {isDetail && (
                    <div className="form-group w-full h-22">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        nama wbp
                      </label>
                      <input
                        className="w-full rounded border border-stroke py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                        name="wbp"
                        placeholder="Nama WBP"
                        onChange={handleChange}
                        value={inputValue}
                        defaultValue={formState.wbp.nama_wbp}
                        disabled={isDetail}
                      />
                    </div>
                  )}
                </div>

                <div className={` ${isDetail ? 'h-auto' : 'h-15'}  mt-3`}>
                  {/* <br></br> */}
                  {isDetail ? null : isEdit ? (
                    <button
                      className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                        buttonLoad ? 'bg-slate-400' : ''
                      }`}
                      type="submit"
                      disabled={buttonLoad}
                    >
                      {buttonLoad ? (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        ''
                      )}
                      Ubah Data Gelang
                    </button>
                  ) : (
                    <button
                      className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                        buttonLoad ? 'bg-slate-400' : ''
                      }`}
                      type="submit"
                      disabled={buttonLoad}
                    >
                      {buttonLoad ? (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        ''
                      )}
                      Tambah Data Gelang
                    </button>
                  )}
                  {errors.filter((item: string) =>
                    item.startsWith('INVALID_ID'),
                  ).length > 0 && (
                    <>
                      <br />
                      <div className="error">
                        {errors
                          .filter((item: string) =>
                            item.startsWith('INVALID_ID'),
                          )[0]
                          .replace('INVALID_ID_', '')}{' '}
                        is not a valid bond
                      </div>
                    </>
                  )}
                  {errors.length > 0 && (
                    <div className="error text-center">
                      <p className="text-red-400">
                        Ada data yang masih belum terisi !
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
