import React, { useEffect, useRef, useState } from 'react';
import {
  apiReadAllLokasi,
  apiReadAllRuanganSummary,
  apiReadAllWBP,
  apiReadAlllokasiOtmil,
  apiReadZona,
} from '../../../services/api';

// interface
interface AddRoomModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
}

interface LokasiRuangan {
  lokasi_otmil_id: string;
  nama_lokasi_otmil: string;
}

interface Zona {
  zona_id: string;
  nama_zona: string;
}

export const AddRoomModal: React.FC<AddRoomModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
}) => {
  //get Token
  // const tokenItem = localStorage.getItem('token');
  // let tokens = tokenItem ? JSON.parse(tokenItem) : null;
  // let token = tokens.token

  const [formState, setFormState] = useState(
    defaultValue || {
      // ruangan_otmil_id: '',
      nama_ruangan_otmil: '',
      jenis_ruangan_otmil: '',
      // nama_zona: '',
      lokasi_otmil_id: '',
      zona_id: '',
      // nama_lokasi_otmil:''
    }
  );
  //state
  const [errors, setErrors] = useState({
    nama: '',
    jenis: '',
    zona: '',
    lokasi: '',
  });
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [lokasi, setLokasi] = useState<LokasiRuangan[]>([]);
  const [zona, setZona] = useState<Zona[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalWbp, setTotalWbp] = useState({
    total_gateway: '',
    total_kamera: '',
    total_wbp: '',
  });
  const tokenItem = localStorage.getItem('token')
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token

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

  const fetchData = () => {
    let parameter = {
      filter: {
        ruangan_otmil_id: formState.ruangan_otmil_id,
      },
    };
    let params = {}

    apiReadAlllokasiOtmil(params, token).then((res: any) => {
      setLokasi(res.data.records);
    });
    apiReadZona(token).then((res: any) => {
      setZona(res.data.records);
    });
    apiReadAllRuanganSummary(parameter).then((res: any) => {
      setTotalWbp(res.data.records);
    });
  };

  // useEffect untuk mengambil data dari api
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    fetchData();
  }, []);

  // function

  const validateForm = () => {
    const newErrors = {
      nama: '',
      jenis: '',
      zona: '',
      lokasi: '',
    };

    if (formState.nama_ruangan_otmil && formState.jenis_ruangan_otmil && formState.zona_id && formState.lokasi_otmil_id) {
      // Menghapus semua kesalahan jika kondisi ini terpenuhi
      setErrors({ ...errors, nama: '', jenis: '', zona: '', lokasi: '' });
      return true;
    } else {
      if (!formState.nama_ruangan_otmil) {
        newErrors.nama = 'Nama Ruangan harus diisi';
      }
      if (!formState.jenis_ruangan_otmil) {
        newErrors.jenis = 'Jenis Ruangan harus diisi';
      }
      if (!formState.zona_id) {
        newErrors.zona = 'Zona Ruangan harus diisi';
      }
      if (!formState.lokasi_otmil_id) {
        newErrors.lokasi = 'Lokasi harus diisi';
      }
      setErrors(newErrors); // Mengatur kesalahan sesuai dengan validasi
      if (Object.keys(newErrors).length > 0) {
        return false;
      }
      return true;
    }
  };


  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formState);
    };

  };

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


  return (
    <div>
      <div style={modalStyles.backdrop}></div>
      <div
        ref={modalContainerRef}
        style={modalStyles.modalContainer}
        className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
      >
        <div
          className={`modal rounded-sm border border-slate-600 bg-slate-600 shadow-default w-full ${isDetail ? 'h-full' : 'h-full'
            }`}
        >
          {isLoading ? (
            <div
              className={`justify-center flex items-center ${isDetail ? 'py-50' : 'py-40'
                }`}
            >
              <svg
                className="animate-spin h-20 w-20 text-white"
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
          ) : (
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <div className="w-full flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {isDetail
                      ? 'Detail Data Ruangan'
                      : isEdit
                        ? 'Edit Data Ruangan'
                        : 'Tambah Data Ruangan'}
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
                <div className="flex flex-col gap-2 mt-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Nama Ruangan
                      </label>
                      <input
                        className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                        name="nama_ruangan_otmil"
                        placeholder="Nama Ruangan"
                        onChange={handleChange}
                        value={formState.nama_ruangan_otmil}
                        disabled={isDetail}
                      />
                      {errors.nama ? (
                        <h1 className="pl-2 text-xs text-red-400">
                          {errors.nama}
                        </h1>
                      ) : (
                        <h1 className="h-4"></h1>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Jenis Ruangan
                      </label>
                      {!isDetail ? (
                        <>
                          <select
                            className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                            name="jenis_ruangan_otmil"
                            onChange={handleChange}
                            value={formState.jenis_ruangan_otmil}
                            disabled={isDetail}
                          >
                            <option disabled value="">
                              Pilih Jenis Ruangan
                            </option>
                            <option value="Fasilitas Kegiatan">
                              Fasilitas Kegiatan
                            </option>
                            <option value="Ruang Ibadah">Ruang Ibadah</option>
                            <option value="Kantor">Kantor</option>
                            <option value="Kamar">Kamar</option>
                          </select>
                          {errors.jenis ? (
                            <h1 className="pl-2 text-xs text-red-400">
                              {errors.jenis}
                            </h1>
                          ) : (
                            <h1 className="h-4"></h1>
                          )}
                        </>
                      ) : (
                        <input
                          className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                          name="jenis_ruangan_otmil"
                          placeholder="Jenis Ruangan"
                          onChange={handleChange}
                          value={formState.jenis_ruangan_otmil}
                          disabled={isDetail}
                        />
                      )}
                    </div>
                    <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Zona Ruangan
                      </label>
                      {isDetail ? (
                        <div className="w-full flex items-center">
                          <h1
                            className={`py-3 capitalize w-full border rounded-md flex justify-center items-center text-sm ${formState.nama_zona === 'Merah'
                              ? 'bg-red-500 text-white' // jika zona adalah 'Mera', latar belakang merah dan teks putih
                              : formState.nama_zona === 'Hijau'
                                ? 'bg-green-500 text-white' // jika zona adalah 'Hijau', latar belakang hijau dan teks putih
                                : formState.nama_zona === 'Kuning'
                                  ? 'bg-yellow-500 text-black' // jika zona adalah 'Kuning', latar belakang kuning dan teks hitam
                                  : 'bg-gray-2 text-black '
                              }`}
                          >
                            {formState.nama_zona}
                          </h1>
                        </div>
                      ) : (
                        <>
                          <select
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                            name="zona_id"
                            onChange={handleChange}
                            value={formState.zona_id}
                            disabled={isDetail}
                          >
                            <option disabled value="">
                              Pilih Zona Ruangan
                            </option>
                            {zona.map((item) => (
                              <option value={item.zona_id}>{item.nama_zona}</option>
                            ))}
                          </select>
                          {errors.zona ? (
                            <h1 className="pl-2 text-xs text-red-400">
                              {errors.zona}
                            </h1>
                          ) : (
                            <h1 className="h-4"></h1>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {!isDetail ? (
                    <div className="grid grid-cols-1 gap-4">
                      <div className="form-group w-full ">
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Kode Lokasi
                        </label>
                        <select
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                          name="lokasi_otmil_id"
                          onChange={handleChange}
                          value={formState.lokasi_otmil_id}
                          disabled={isDetail}
                        >
                          <option disabled value="">
                            Pilih Lokasi
                          </option>
                          {lokasi.map((item) => (
                            <option value={item.lokasi_otmil_id}>
                              {item.nama_lokasi_otmil}
                            </option>
                          ))}
                        </select>
                        {errors.lokasi ? (
                          <h1 className="pl-2 text-xs text-red-400">
                            {errors.lokasi}
                          </h1>
                        ) : (
                          <h1 className="h-4"></h1>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-group w-full ">
                          <label
                            className="block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Kode Lokasi
                          </label>
                          <input
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                            name="nama_lokasi_otmil"
                            placeholder="Nama Lokasi"
                            onChange={handleChange}
                            value={formState.nama_lokasi_otmil}
                            disabled={isDetail}
                          />
                        </div>
                        <div className="form-group w-full ">
                          <label
                            className="block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Jumlah Tahanan
                          </label>
                          <input
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                            name="nama_ruangan_otmil"
                            placeholder="Nama Ruangan"
                            onChange={handleChange}
                            value={totalWbp.total_gateway}
                            disabled={isDetail}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {!isDetail ? (
                    <></>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group w-full ">
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Jumlah Gateway
                        </label>
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                          name="nama_ruangan_otmil"
                          placeholder="Nama Ruangan"
                          onChange={handleChange}
                          value={totalWbp.total_gateway}
                          disabled={isDetail}
                        />
                      </div>
                      <div className="form-group w-full ">
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Jumlah Kamera
                        </label>
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                          name="nama_ruangan_otmil"
                          placeholder="Nama Ruangan"
                          onChange={handleChange}
                          value={totalWbp.total_kamera}
                          disabled={isDetail}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <br></br>
                {isDetail ? null : (
                  <button
                    className="btn w-full flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    type="submit"
                  >
                    Submit
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
