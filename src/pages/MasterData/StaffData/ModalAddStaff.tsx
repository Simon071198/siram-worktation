import React, { useEffect, useRef, useState } from 'react';
import Loader from '../../../common/Loader';
import Select from 'react-select';
import {
  apiAgama,
  apiKeahlian,
  apiKesatuan,
  apiKota,
  apiMatraRead,
  apiPendidikan,
  apiProvinsi,
  apiReadAllLokasi,
  apiReadAllPangkat,
  apiStatusKawin,
} from '../../../services/api';
import { Alerts } from './AlertStaff';

// interface
// interface AddStaffModalProps {
//   closeModal: () => void;
//   onSubmit: (params: any) => void;
//   defaultValue?: any;
//   isDetail?: boolean;
//   isEdit?: boolean;
// }

interface Pangkat {
  pangkat_id: any;
  nama_pangkat: string;
}

interface Lokasi {
  lokasi_kesatuan_id: string;
  nama_lokasi_kesatuan: string;
}

interface Kota {
  kota_id: string;
  nama_kota: string;
}

interface Pronvisi {
  provinsi_id: string;
  nama_provinsi: string;
}

interface Agama {
  agama_id: string;
  nama_agama: string;
}

interface StatusKawin {
  status_kawin_id: string;
  nama_status_kawin: string;
}

interface Pendidikan {
  pendidikan_id: string;
  nama_pendidikan: string;
}

interface Keahlian {
  bidang_keahlian_id: string;
  nama_bidang_keahlian: string;
}

interface Kesatuan {
  kesatuan_id: string;
  nama_kesatuan: string;
}

const dataUserItem = localStorage.getItem('dataUser');
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;
console.log(dataAdmin, 'DATA ADMIN');

export const AddStaffModal = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  token
}: any) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      foto_wajah: '',
      nama: '',
      alamat: '',
      kota_id: '',
      provinsi_id: '',
      tempat_lahir: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
      agama_id: '',
      status_kawin_id: '',
      pendidikan_id: '',
      bidang_keahlian_id: '',
      is_deleted: '0',
      pangkat_id: '',
      matra_id: '',
      kesatuan_id: '',
      kode_lokasi: '',
      jabatan: '',
      divisi: '',
      nrp: '',
      lokasi_otmil_id: dataAdmin.lokasi_otmil_id,
      nama_lokasi_otmil: dataAdmin.nama_lokasi_otmil,
    }
  );
  // const lokasi_lemasmil_id = localStorage.getItem('lokasi_lemasmil_id')

  //state
  const [pangkat, setPangkat] = useState<Pangkat[]>([]);
  const [lokasi, setLokasi] = useState<Lokasi[]>([]);
  const [kota, setKota] = useState<Kota[]>([]);
  const [provinsi, setProvinsi] = useState<Pronvisi[]>([]);
  const [agama, setAgama] = useState<Agama[]>([]);
  const [statusKawin, setStatusKawin] = useState<StatusKawin[]>([]);
  const [pendidikan, setPendidikan] = useState<Pendidikan[]>([]);
  const [keahlian, setKeahlian] = useState<Keahlian[]>([]);
  const [kesatuan, setKesatuan] = useState<Kesatuan[]>([]);
  const [matra, setMatra] = useState([]);

  const [filteredKesatuan, setFilteredKesatuan] = useState(kesatuan);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);

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

  // console.log(dataAdmin.lokasi_otmil_id, 'SSS');
  // useEffect untuk mengambil data dari api
  useEffect(() => {
    Promise.all([
      matraData(),
      pangkatData(),
      lokasiKesatuanData(),
      kotaData(),
      provinsiData(),
      agamaData(),
      statusKawinData(),
      pendidikanData(),
      keahlianData(),
      kesatuanData()
    ]).then(() => setIsLoading(false))
  }, []);

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== 'lokasi_lemasmil_id' && key !== 'foto_wajah_fr' && key !== 'nomor_petugas' && key !== 'grup_petugas_id' && key !== 'nama_grup_petugas'// Tidak melakukan pemeriksaan pada lokasi_lemasmil_id
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

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSelectProvinsi = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, provinsi_id: e?.value });
  };

  const handleSelectKota = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, kota_id: e?.value });
  };

  // const handleChangeKesatuan = async (e: any) => {
  //   setFormState({ ...formState, [e.target.name]: e.target.value });
  //   let filteredKesatuan = kesatuan.filter(
  //     (item: any) => item.lokasi_kesatuan_id === e.target.value
  //   );

  //   setFilteredKesatuan(filteredKesatuan);
  // };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log(reader.result, 'reader reader');

      reader.onloadend = async () => {
        console.log(reader.result, 'reader.result reader.result');
        setFormState({ ...formState, foto_wajah: reader.result });

        // setImagePreview(reader.result);
        console.log(formState.foto_wajah, 'imagePreview imagePreview');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState, 'From State');

    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState).then(() => setButtonLoad(false));
    console.log('berhasil');
  };

  const pangkatData = async () => {
    await apiReadAllPangkat()
      .then((res) => {
        setPangkat(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        })
      );
  };

  const lokasiKesatuanData = async () => {
    await apiReadAllLokasi()
      .then((res) => {
        setLokasi(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        })
      );
  };

  const kotaData = async () => {
    await apiKota()
      .then((res) => {
        setKota(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        })
      );
  };

  const matraData = async () => {
    await apiMatraRead({
      params: {
        pageSize: 1000,
        page: 1,
        filter: {},
      },
    })
      .then((res) => {
        setMatra(res.data.records);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        })
      );
  };

  const provinsiData = async () => {
    await apiProvinsi()
      .then((res) => {
        setProvinsi(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        })
      );
  };

  const agamaData = async () => {
    await apiAgama(token)
      .then((res) => {
        setAgama(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        })
      );
  };

  const statusKawinData = async () => {
    await apiStatusKawin()
      .then((res) => {
        setStatusKawin(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        })
      );
  };

  const pendidikanData = async () => {
    await apiPendidikan()
      .then((res) => {
        setPendidikan(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        })
      );
  };

  const keahlianData = async () => {
    await apiKeahlian(token)
      .then((res) => {
        setKeahlian(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        })
      );
  };

  const kesatuanData = async () => {
    await apiKesatuan()
      .then((res) => {
        setKesatuan(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        })
      );
  };

  //return

  const handleRemoveFoto = () => {
    setFormState({ ...formState, foto_wajah: '' });
    const inputElement = document.getElementById(
      'image-upload'
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
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

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: '100%',
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'rgb(30 41 59)',
      borderColor: 'rgb(30 41 59)',
      color: 'white',
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 3,
      paddingRight: 4.5,
      borderRadius: 5,

      '&:hover': {
        borderColor: 'rgb(30 41 59)',
      },
      '&:active': {
        borderColor: 'rgb(30 41 59)',
      },
      '&:focus': {
        borderColor: 'rgb(30 41 59)',
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    menu: (provided: any) => ({
      ...provided,
      color: 'white',
      paddingLeft: '5px',
      paddingRight: '5px',
      backgroundColor: 'rgb(30 41 59)',
    }),
    option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        borderRadius: '6px',

        backgroundColor: isDisabled
          ? undefined
          : isSelected
            ? ''
            : isFocused
              ? 'rgb(51, 133, 255)'
              : undefined,

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled,
        },
      };
    },
    placeholder: (provided: any) => ({
      ...provided,
      color: 'white',
    }),

    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: 'rgb(51, 133, 255)',
      };
    },
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: 'white',
    }),
  };

  return (
    // <div
    //   ref={modalContainerRef}
    //   className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] overflow-y-scroll "
    // >
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
                      ? 'Detail Data Petugas'
                      : isEdit
                        ? 'Edit Data Petugas'
                        : 'Tambah Data Petugas'}
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
                <div className="flex flex-col mt-4">
                  <div className="grid grid-cols-2 gap-2 items-start">
                    {isDetail && (
                      <div className="form-group w-full h-fit">
                        <div className="mt-1 flex flex-col items-center">
                          <img
                            className="object-cover w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                            src={
                              'https://dev.transforme.co.id/siram_admin_api' +
                              formState.foto_wajah
                            }
                            alt="Image Preview"
                          />
                        </div>
                      </div>
                    )}
                    {isEdit && (
                      <div className="form-group w-full h-fit ">
                        <div className="mt-1 flex flex-col items-center">
                          {formState.foto_wajah ? (
                            formState.foto_wajah.startsWith('data:image/') ? (
                              <img
                                className="object-cover w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                src={formState.foto_wajah}
                                alt="Image Preview"
                              />
                            ) : (
                              <img
                                className="object-cover w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                src={
                                  'http://dev.transforme.co.id/siram_admin_api' +
                                  formState.foto_wajah
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
                            <button
                              onClick={handleRemoveFoto}
                              className="cursor-pointer bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
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
                            </button>
                          </div>
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'foto_wajah'
                                ? 'Masukan foto petugas'
                                : ''
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                    {!isEdit && !isDetail && (
                      <div className="form-group w-full h-fit ">
                        <div className=" mt-1 flex flex-col items-center">
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

                            <button
                              onClick={handleRemoveFoto}
                              className="cursor-pointer bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
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
                            </button>
                          </div>
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'foto_wajah'
                                ? 'Masukan foto petugas'
                                : ''
                            )}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-4">
                      {/* Nama */}
                      <div className="form-group w-full">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Nama
                        </label>
                        <input
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="nama"
                          placeholder="Nama"
                          onChange={handleChange}
                          value={formState.nama}
                          disabled={isDetail}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'nama' ? 'Masukan nama' : ''
                          )}
                        </p>
                      </div>
                      {/* Pangkat */}
                      <div className="form-group w-full ">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Pangkat
                        </label>
                        <select
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="pangkat_id"
                          onChange={handleChange}
                          value={formState.pangkat_id}
                          disabled={isDetail}
                        >
                          <option disabled value="">
                            Pilih pangkat
                          </option>
                          {pangkat.map((item) => (
                            <option value={item.pangkat_id}>
                              {item.nama_pangkat}
                            </option>
                          ))}
                        </select>
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'pangkat_id' ? 'Pilih pangkat' : ''
                          )}
                        </p>
                      </div>

                      {/* Matra */}
                      <div className="form-group w-full ">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Matra
                        </label>

                        <select
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="matra_id"
                          onChange={handleChange}
                          value={formState.matra_id}
                          disabled={isDetail}
                        >
                          <option disabled value="">
                            Pilih matra
                          </option>
                          {matra.map((item: any) => (
                            <option value={item.matra_id}>
                              {item.nama_matra}
                            </option>
                          ))}
                        </select>
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'matra_id' ? 'Pilih matra' : ''
                          )}
                        </p>
                      </div>

                      {/* Nomor Petugas */}
                      <div className="form-group w-full">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          NRP
                        </label>
                        <input
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="nrp"
                          placeholder="NRP"
                          onChange={handleChange}
                          value={formState.nrp}
                          disabled={isDetail}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'nrp' ? 'Masukan nrp' : ''
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="mt-5 grid grid-cols-2 gap-4 ">
                      {/* Kode Lokasi */}
                      <div className="form-group w-full ">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Lokasi Kesatuan
                        </label>
                        <select
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="kode_lokasi"
                          onChange={handleChange}
                          value={formState.kode_lokasi}
                          disabled={isDetail}
                        >
                          <option disabled value="">
                            Pilih lokasi
                          </option>
                          {lokasi.map((item) => (
                            <option value={item.lokasi_kesatuan_id}>
                              {item.nama_lokasi_kesatuan}
                            </option>
                          ))}
                        </select>
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'kode_lokasi'
                              ? 'Pilih lokasi kesatuan'
                              : ''
                          )}
                        </p>
                      </div>

                      {/* Kesatuan */}
                      <div className="form-group w-full ">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Kesatuan
                        </label>

                        <select
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="kesatuan_id"
                          onChange={handleChange}
                          value={formState.kesatuan_id}
                          disabled={isDetail}
                        >
                          <option disabled value="">
                            Pilih kesatuan
                          </option>
                          {kesatuan.map((item) => (
                            <option value={item.kesatuan_id}>
                              {item.nama_kesatuan}
                            </option>
                          ))}
                        </select>
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'kesatuan_id' ? 'Pilih matra' : ''
                          )}
                        </p>
                      </div>

                      {/* Jabatan */}
                      <div className="form-group w-full">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Jabatan
                        </label>
                        <input
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="jabatan"
                          placeholder="Jabatan"
                          onChange={handleChange}
                          value={formState.jabatan}
                          disabled={isDetail}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'jabatan' ? 'Masukan jabatan' : ''
                          )}
                        </p>
                      </div>
                      {/* Divisi */}
                      <div className="form-group w-full">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Divisi
                        </label>
                        <input
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="divisi"
                          placeholder="Divisi"
                          onChange={handleChange}
                          value={formState.divisi}
                          disabled={isDetail}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'divisi' ? 'Masukan divisi' : ''
                          )}
                        </p>
                      </div>

                      {/* Pendidikan*/}
                      <div className="form-group w-full ">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Pendidikan Militer
                        </label>
                        <select
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="pendidikan_id"
                          onChange={handleChange}
                          value={formState.pendidikan_id}
                          disabled={isDetail}
                        >
                          <option value="" disabled>
                            Pilih pendidikan
                          </option>
                          {pendidikan.map((item) => (
                            <option value={item.pendidikan_id}>
                              {item.nama_pendidikan}
                            </option>
                          ))}
                        </select>
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'pendidikan_id' ? 'Pilih pendidikan' : ''
                          )}
                        </p>
                      </div>

                      {/* Keahlian */}
                      <div className="form-group w-full ">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Keahlian
                        </label>

                        <select
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="bidang_keahlian_id"
                          onChange={handleChange}
                          value={formState.bidang_keahlian_id}
                          disabled={isDetail}
                        >
                          <option disabled value="">
                            Pilih keahlian
                          </option>
                          {keahlian.map((item) => (
                            <option value={item.bidang_keahlian_id}>
                              {item.nama_bidang_keahlian}
                            </option>
                          ))}
                        </select>
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'bidang_keahlian_id'
                              ? 'Pilih keahlian'
                              : ''
                          )}
                        </p>
                      </div>

                      {/* Jenis Kelamin */}
                      <div className="form-group w-full ">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Jenis Kelamin
                        </label>
                        <select
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="jenis_kelamin"
                          onChange={handleChange}
                          value={formState.jenis_kelamin}
                          disabled={isDetail}
                        >
                          <option disabled value="">
                            Pilih jenis kelamin
                          </option>
                          <option value="1">Laki-laki</option>
                          <option value="0">Perempuan</option>
                        </select>
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'jenis_kelamin'
                              ? 'Pilih jenis kelamin'
                              : ''
                          )}
                        </p>
                      </div>

                      {/*  Agama */}
                      <div className="form-group w-full ">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Agama
                        </label>
                        <select
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="agama_id"
                          onChange={handleChange}
                          value={formState.agama_id}
                          disabled={isDetail}
                        >
                          <option value="" disabled>
                            Pilih agama
                          </option>
                          {agama.map((item) => (
                            <option value={item.agama_id}>
                              {item.nama_agama}
                            </option>
                          ))}
                        </select>
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'agama_id' ? 'Pilih agama' : ''
                          )}
                        </p>
                      </div>

                      {/* Tempat Lahir */}
                      <div className="form-group w-full">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Tempat Lahir
                        </label>
                        <input
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="tempat_lahir"
                          placeholder="Tempat Lahir"
                          onChange={handleChange}
                          value={formState.tempat_lahir}
                          disabled={isDetail}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'tempat_lahir'
                              ? 'Masukan tempat lahir'
                              : ''
                          )}
                        </p>
                      </div>
                      {/* Tanggal Lahir */}
                      <div className="form-group w-full ">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Tanggal Lahir
                        </label>
                        <input
                          type="date"
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="tanggal_lahir"
                          onChange={handleChange}
                          value={formState.tanggal_lahir}
                          disabled={isDetail}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'tanggal_lahir'
                              ? 'Masukan tanggal lahir'
                              : ''
                          )}
                        </p>
                      </div>

                    </div>

                    <div className=" grid grid-cols-2 gap-4">
                      {/* Status Kawin */}
                      <div className="form-group w-full ">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Status Kawin
                        </label>
                        <select
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="status_kawin_id"
                          onChange={handleChange}
                          value={formState.status_kawin_id}
                          disabled={isDetail}
                        >
                          <option value="" disabled>
                            Pilih status kawin
                          </option>
                          {statusKawin.map((item) => (
                            <option value={item.status_kawin_id}>
                              {item.nama_status_kawin}
                            </option>
                          ))}
                        </select>
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'status_kawin_id'
                              ? 'Pilih status kawin'
                              : ''
                          )}
                        </p>
                      </div>
                    </div>

                    <div className=" grid grid-cols-2 gap-4">
                      {/* Provinsi */}
                      <div className="form-group w-full ">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Provinsi
                        </label>

                        {/* <select
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="provinsi_id"
                          onChange={handleChange}
                          value={formState.provinsi_id}
                          disabled={isDetail}
                        >
                          <option disabled value="">
                            Pilih provinsi
                          </option>
                          {provinsi.map((item) => (
                            <option value={item.provinsi_id}>
                              {item.nama_provinsi}
                            </option>
                          ))}
                        </select> */}
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          defaultValue={isEdit || isDetail ? (
                            {
                              value: formState.provinsi_id,
                              label: formState.nama_provinsi
                            })
                            :
                            formState.provinsi_id
                          }
                          placeholder={'Pilih provinsi'}
                          isClearable={true}
                          isSearchable={true}
                          isDisabled={isDetail}
                          name="provinsi_id"
                          styles={customStyles}
                          options={provinsi.map((item: any) => ({
                            value: item.provinsi_id,
                            label: item.nama_provinsi,
                          }))
                          }
                          onChange={handleSelectProvinsi}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'provinsi_id' ? 'Pilih provinsi' : ''
                          )}
                        </p>
                      </div>
                      {/* Kota */}
                      <div className="form-group w-full ">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Kota
                        </label>

                        {/* <select
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="kota_id"
                          onChange={handleChange}
                          value={formState.kota_id}
                          disabled={isDetail}
                        >
                          <option disabled value="">
                            Pilih kota
                          </option>
                          {kota
                            .filter((item: any) => {
                              return item.provinsi_id === formState.provinsi_id; 
                            })
                            .map((item) => (
                              <option value={item.kota_id}>
                                {item.nama_kota}
                              </option>
                            ))}
                        </select> */}
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          defaultValue={isEdit || isDetail ? (
                            {
                              value: formState.kota_id,
                              label: formState.nama_kota
                            })
                            :
                            formState.kota_id
                          }
                          placeholder={'Pilih kota'}
                          isClearable={true}
                          isSearchable={true}
                          isDisabled={isDetail}
                          name="kota_id"
                          styles={customStyles}
                          options={
                            kota
                              .filter((item: any) => {
                                return (
                                  item.provinsi_id === formState.provinsi_id
                                );
                              })
                              .map((item) => ({
                                value: item.kota_id,
                                label: item.nama_kota,
                              }))
                          }

                          onChange={handleSelectKota}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'kota_id' ? 'Pilih kota' : ''
                          )}
                        </p>
                      </div>
                    </div>

                    <div>
                      {/* Alamat */}
                      <div className="form-group w-full ">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Alamat
                        </label>
                        <textarea
                          className="w-full max-h-[94px] min-h-[94px] rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="alamat"
                          placeholder="Alamat"
                          onChange={handleChange}
                          value={formState.alamat}
                          disabled={isDetail}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'alamat' ? 'Masukan alamat' : ''
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {errors.filter((item: string) => item.startsWith('INVALID_ID'))
                  .length > 0 && (
                    <>
                      <br />
                      <div className="error">
                        {errors
                          .filter((item: string) =>
                            item.startsWith('INVALID_ID')
                          )[0]
                          .replace('INVALID_ID_', '')}{' '}
                        is not a valid bond
                      </div>
                    </>
                  )}
                {errors.length > 0 && (
                  <div className="error mt-4">
                    <p className="text-red-400">
                      Ada data yang masih belum terisi !
                    </p>
                  </div>
                )}
                {/* {errors.filter((item: string) => !item.startsWith('INVALID_ID'))
                  .length > 0 && (
                  <div className="error mt-4">
                    <span>Please input :</span>
                    <p className="text-red-400">
                      {errors
                        .filter(
                          (item: string) => !item.startsWith('INVALID_ID')
                        )
                        .join(', ')}
                    </p>
                  </div>
                )} */}

                <br></br>
                {isDetail ? null : isEdit ? (
                  <button
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${buttonLoad ? 'bg-slate-400' : ''
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
                    Ubah Data Petugas
                  </button>
                ) : (
                  <button
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${buttonLoad ? 'bg-slate-400' : ''
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
                    Tambah Data Petugas
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
