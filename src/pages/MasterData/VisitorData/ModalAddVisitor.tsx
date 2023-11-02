import React, { useState, useRef, useEffect } from 'react';
import { apiReadAllWBP, apiReadKota, apiReadProvinsi } from '../../../services/api';

interface AddVisitorModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
}

interface Kota {
  kota_id: string;
  nama_kota: string;
}

interface Pronvisi {
  provinsi_id: string;
  nama_provinsi: string;
}

interface namawbp {
  nama: string;
  wbp_profile_id: string;
}


export const AddVisitorModal: React.FC<AddVisitorModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      nama: '',
      foto_wajah: '',
      tempat_lahir: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
      provinsi_id: '',
      kota_id: '',
      alamat: '',
      hubungan_wbp: '',
      wbp_profile_id: '',
      nik: '',
    }
  );
  const [kota, setkota] = useState<Kota[]>([]);
  const [provinsi, setprovinsi] = useState<Pronvisi[]>([]);
  const [nameWBP, setnameWBP] = useState<namawbp[]> ([]);
  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef(null);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

//useEffect untuk menambahkan event listener  ke elemen dokumen
useEffect(() => {
  const handleOutsideClick = (e: MouseEvent) => {
    if (
      modalContainerRef.current &&
      !modalContainerRef.current.contains(e.target as Node)
    ) {
      closeModal();
    }
  };
  document.addEventListener('mousedown', handleOutsideClick);
  return () => {
    document.removeEventListener('mousedown', handleOutsideClick);
  };
}, [closeModal]);

const validateForm = () => {
  let errorFields = [];

  for (const [key, value] of Object.entries(formState)) {
    if (
      key !== '' // Tidak melakukan pemeriksaan pada lokasi_lemasmil_id
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

  const handleChange = (e:any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState, 'formState');

    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState);
    console.log(onSubmit)
    // closeModal();
  };
  

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log(reader.result, 'reader reader');

      reader.onloadend = async () => {
        console.log(reader.result, 'reader.result reader.result');

        const base64String = reader.result as string;
        await setFormState({ ...formState, foto_wajah: reader.result });

        // setImagePreview(reader.result);
        console.log(formState.foto_wajah, 'imagePreview imagePreview');
      };
      reader.readAsDataURL(file);
    }
  };

  const token = localStorage.getItem('token')
  
  // fetch data
  useEffect(() => {
      const fetchData = async () => {
        let params = {
          token:token,
          data : {
            pagination : {
              pageSize: 10,
            },
          }
        };
        try {
          const kotanama = await apiReadKota()
          const namakota = kotanama.records
          setkota(namakota)

          const dataProvici = await apiReadProvinsi()
          const prov = dataProvici.records
          setprovinsi(prov)
          
          const wbp = await apiReadAllWBP(params)
          const nameWBP = wbp.data.records
          setnameWBP(nameWBP)

          setTimeout(() => {
            setIsLoading(false)
            
          }, 500);
        } catch(err) {throw err}
  };
    fetchData();
  }, []);

  const [query, setQuery] = useState(''); // State untuk input pencarian
  const [results, setResults] = useState([]); // State untuk hasil pencarian

// Fungsi untuk menampilkan hasil pencarian
function showResults(query:any) {
  if (query === '') {
    setResults([]); // Jika input kosong, atur hasil pencarian menjadi array kosong
  } else {
  const filteredResults = nameWBP.filter((item:any) =>
    item.nama.toLowerCase().includes(query.toLowerCase())
  );
  setResults(filteredResults);
  }
}

const handleRemoveFoto = () => {
  setFormState({ ...formState, foto_wajah: '' });
  const inputElement = document.getElementById(
    'image-upload'
  ) as HTMLInputElement;
  if (inputElement) {
    inputElement.value = '';
  }
};
  
  return (
    <div
      ref={modalContainerRef}
      className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] overflow-y-scroll"
    >
      <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-slate-600 h-full w-[80vh]">
      {isLoading ? (
          <div className="h-[500px] justify-center flex items-center">
            <svg
              className="animate-spin h-30 w-30 text-white"
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
              <h3 className="mb-5 text-xl font-semibold text-black dark:text-white">
                {isDetail
                  ? 'Detail data Pengunjung'
                  : isEdit
                  ? 'Edit data Pengunjung'
                  : 'Tambah data Pengunjung'}
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

          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>

            <div className=" grid grid-cols-2 gap-2 items-start">
              {/* Gambar */}
              {isDetail && (
                <div className="form-group w-full h-[330px]">
                  <div className=" mt-6 flex flex-col items-center">
                    <img
                      className="object-cover w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                      src={
                        'https://dev.transforme.co.id/siram_admin_api/' + formState.foto_wajah
                      }
                      alt="Image Preview"
                    />
                  </div>
                </div>
              )}

              {isEdit && (
                <div className="form-group w-full h-[330px] ">
                  <div className="mt-6 flex flex-col items-center">
                    {formState.foto_wajah ? (
                      formState.foto_wajah.startsWith('data:image') ? (
                        <img
                        className="object-cover w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                          src={formState.foto_wajah}
                          alt="Image Preview"
                        />
                      ) : (
                        <img
                        className="object-cover w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                          src={
                            'https://dev.transforme.co.id/siram_admin_api/' + formState.foto_wajah
                          }
                          alt="Image Preview"
                        />
                      ) // Don't render anything if the image format is not as expected
                    ) : (
                      <img
                        className="w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                        src="https://via.placeholder.com/200x300"
                        alt="Placeholder"
                      />
                    )}

                    <input
                      accept="image/*"
                      type="file"
                      id="image-upload"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                    <div className="flex gap-2">
                      <label htmlFor="image-upload">
                        <div className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded">
                          Edit Gambar
                        </div>
                      </label>
                      <p
                        onClick={handleRemoveFoto}
                        className="cursor-pointer cursor-pointer bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </p>
                    </div>
                  </div>
                  <p className="error-text">
                    {errors.map((item) =>
                      item === 'foto_wajah'
                        ? 'Masukan foto wbp'
                        : ''
                    )}
                  </p>
                </div>
              )}

              {!isEdit && !isDetail && (
                <div className="form-group w-full h-[330px]  ">
                  <div className="mt-6 flex flex-col items-center">
                    {formState.foto_wajah ? (
                      <img
                        className="object-cover w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                        src={formState.foto_wajah}
                        alt="Image Preview"
                      />
                    ) : (
                      <img
                        className="w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                        src="https://via.placeholder.com/200x300"
                        alt="Placeholder"
                      />
                    )}
                    <input
                      accept="image/*"
                      type="file"
                      id="image-upload"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                    <div className="flex gap-2">
                      <label htmlFor="image-upload">
                        <div className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded">
                          Unggah Gambar
                        </div>
                      </label>

                      <p
                        onClick={handleRemoveFoto}
                        className="cursor-pointer cursor-pointer bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </p>
                    </div>
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'foto_wajah'
                          ? 'Masukan foto wbp'
                          : ''
                      )}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 ">
              <div className="form-group w-full flex flex-col">
                <label
                  className="  block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Nama
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="nama"
                  onChange={handleChange}
                  value={formState.nama}
                  placeholder='Nama Pengunjung'
                  disabled={isDetail}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'nama'
                      ? 'Masukan nama'
                      : ''
                  )}
                </p>
              </div>

                {/* jenis kelamin */}
                <div className="form-group w-full flex flex-col">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Jenis Kelamin
                  </label>
                  <select
                    className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[13.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="jenis_kelamin"
                    onChange={handleChange}
                    value={formState.jenis_kelamin}
                    disabled={isDetail}
                  >
                    <option disabled value="">
                      Pilih Jenis Kelamin
                    </option>
                    <option value="0">Laki-laki</option>
                    <option value="1">Perempuan</option>
                  </select>
                  <p className="error-text">
                  {errors.map((item) =>
                    item === 'jenis_kelamin'
                      ? 'Pilih Jenis Kelamin'
                      : ''
                  )}
                </p>
                </div>

                {/* nik */}
              <div className="form-group w-full">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  NIK
                </label>
                <input
                  type="text"
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="nik"
                  placeholder='NIK'
                  onChange={handleChange}
                  value={formState.nik}
                  disabled={isDetail}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'nik'
                      ? 'Masukan NIK'
                      : ''
                  )}
                </p>
              </div>
                

                {/* Alamat */}
                <div className="form-group w-full flex flex-col">
                  <label
                    className=" block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Alamat
                  </label>
                  <textarea
                    className="w-full max-h-[94px] min-h-[100px] rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                    name="alamat"
                    onChange={handleChange}
                    placeholder='Alamat'
                    value={formState.alamat}
                    disabled={isDetail}
                  />
                  <p className="error-text">
                  {errors.map((item) =>
                    item === 'alamat'
                      ? 'Masukan Alamat'
                      : ''
                  )}
                </p>
                </div>

                
              </div>
            </div>
          </div>

            <div className='grid grid-cols-2 gap-4 items-start'>


                {/* provinsi */}
            <div className="form-group w-full flex-col">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Provinsi
                </label>
                <select
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="provinsi_id"
                  onChange={handleChange}
                  value={formState.provinsi_id}
                  disabled={isDetail}
                >
                  <option disabled value="">
                    Pilih Provinsi
                  </option>
                  {provinsi.map((item:any) => (
                    <option value={item.provinsi_id}>
                      {item.nama_provinsi}
                    </option>
                  ))}
                </select>
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'provinsi_id'
                      ? 'Pilih Provinsi'
                      : ''
                  )}
                </p>
            </div>

                {/* kota */}
                <div className="form-group w-full flex flex-col">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Kota
                </label>
                <select
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="kota_id"
                  onChange={handleChange}
                  value={formState.kota_id}
                  disabled={isDetail}
                >
                  <option disabled value="">
                    Pilih Kota
                  </option>
                  {kota.filter((item: any) => {
                              return (
                                item.provinsi_id === formState.provinsi_id
                              ); // Change 'someCondition' to your actual condition
                            }).map((item) => (
                        <option value={item.kota_id}>{item.nama_kota}</option>
                      ))}
                </select>
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'kota_id'
                      ? 'Pilih Kota'
                      : ''
                  )}
                </p>
            </div>

              {/* Tempat Lahir */}
              <div className="form-group w-full">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Tempat Lahir
                </label>
                <input
                  type="text"
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="tempat_lahir"
                  placeholder='Tempat Lahir'
                  onChange={handleChange}
                  value={formState.tempat_lahir}
                  disabled={isDetail}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'tempat_lahir'
                      ? 'Masukan Tempat Lahir'
                      : ''
                  )}
                </p>
              </div>

              {/* Tanggal Lahir */}
              <div className="form-group w-full ">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="tanggal_lahir"
                  onChange={handleChange}
                  value={formState.tanggal_lahir}
                  disabled={isDetail}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'tanggal_lahir'
                      ? 'Pilih Tanggal Lahir'
                      : ''
                  )}
                </p>
              </div>

              {/* wbp yg di kunjungi */}
              {isDetail && (
              <div className="form-group w-full">
                <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                  WBP Yang DiKunjungi
                </label>
                <div className="mb-4 relative">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    placeholder="Cari Nama WBP"
                    name="nama_wbp"
                    disabled={true}
                    value={formState.nama_wbp}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      setQuery(inputValue);
                      showResults(inputValue);
                    }}
                  />
                  <p className="error-text">
                  {errors.map((item) =>
                    item === 'nama_wbp'
                      ? 'Pilih WBP'
                      : ''
                  )}
                </p>
                  {results.length > 0 && (
                    <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                      {results.map((result:any, index:any) => (
                        <li
                          key={index}
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          onClick={() => {
                            setQuery(result.nama); // Isi input dengan nama WBP yang dipilih
                            setFormState({ ...formState, wbp_profile_id: result.wbp_profile_id }); // Set nilai wbp_profile_id
                            setResults([]); // Bersihkan hasil pencarian setelah memilih
                          }}
                        >
                          {result.nama}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              )}

              {isEdit && (
              <div className="form-group w-full">
                <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                  WBP Yang DiKunjungi
                </label>
                <div className="mb-4 relative">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    placeholder="Cari Nama WBP"
                    name="nama_wbp"
                    value={formState.nama_wbp}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setFormState({
                        ...formState,
                        nama_wbp: newValue, // Update nama_wbp dengan input pengguna
                      });
                      setQuery(newValue); // Update query untuk pencarian
                      showResults(newValue); // Tampilkan hasil pencarian yang sesuai
                    }}
                  />
                  <p className="error-text">
                  {errors.map((item) =>
                    item === 'nama_wbp'
                      ? 'Pilih WBP'
                      : ''
                  )}
                </p>
                  {results.length > 0 && (
                    <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                      {results.map((result:any, index:any) => (
                        <li
                          key={index}
                          className="w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          onClick={() => {
                            setFormState({
                              ...formState,
                              nama_wbp: result.nama, // Isi input dengan nama WBP yang dipilih
                              wbp_profile_id: result.wbp_profile_id, // Set nilai wbp_profile_id
                            });
                            setQuery(result.nama); // Setel query untuk menunjukkan hasil yang dipilih
                            setResults([]); // Bersihkan hasil pencarian setelah memilih
                          }}
                        >
                          {result.nama}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              )}

              {!isEdit && !isDetail && (
              <div className="form-group w-full">
                <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                  WBP Yang DiKunjungi
                </label>
                <div className="mb-4 relative">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    placeholder="Cari Nama WBP"
                    name="nama"
                    value={query}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      setQuery(inputValue);
                      showResults(inputValue);
                    }}
                  />
                  <p className="error-text">
                  {errors.map((item) =>
                    item === 'nama'
                      ? 'Pilih WBP'
                      : ''
                  )}
                </p>
                  {results.length > 0 && (
                    <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                      {results.map((result:any, index:any) => (
                        <li
                          key={index}
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          onClick={() => {
                            setQuery(result.nama); // Isi input dengan nama WBP yang dipilih
                            setFormState({ ...formState, wbp_profile_id: result.wbp_profile_id }); // Set nilai wbp_profile_id
                            setResults([]); // Bersihkan hasil pencarian setelah memilih
                          }}
                        >
                          {result.nama}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              )}
              

              {/* Hubungan WBP */}
              <div className="form-group w-full">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Hubungan WBP
                </label>
                <input
                  type="text"
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="hubungan_wbp"
                  placeholder='Hubungan'
                  onChange={handleChange}
                  value={formState.hubungan_wbp}
                  disabled={isDetail}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'hubungan_wbp'
                      ? 'Masukan Hubungan'
                      : ''
                  )}
                </p>
              </div>
            </div>
            </div>

            {errors.filter((item: string) => item.startsWith('INVALID_ID'))
              .length > 0 && (
              <>
                <br />
                <div className="error">
                  {errors
                    .filter((item: string) => item.startsWith('INVALID_ID'))[0]
                    .replace('INVALID_ID_', '')}{' '}
                  is not a valid bond
                </div>
              </>
            )}
            {/* {errors.filter((item: string) => !item.startsWith('INVALID_ID'))
              .length > 0 && (
                <div className="error mt-3">
                <span>Please input :</span>
                <p className="text-red-400">
                  {errors
                    .filter((item: string) => !item.startsWith('INVALID_ID'))
                    .join(', ')}
                </p>
              </div>
            )} */}

            <br></br>
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
              Ubah Data Pengunjung
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
                  Tambah Data Pengunjung
                </button>
                )}
          </form>
        </div>
        )}
      </div>
    </div>
  );
};
