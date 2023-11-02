import React, { useEffect, useRef, useState } from 'react';
import {
  apiHakimRead,
  apiJaksaRead,
  apiJenisSidangRead,
  apiReadAllRole,
  apiReadAllStaff,
  apiReadAllUser,
  apiReadAllWBP,
} from '../../../services/api';
import Select from 'react-select';
import { Alerts } from './AlertSidang';

interface AddSidangModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => any;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
  token: any;
}

const dataUserItem = localStorage.getItem('dataUser');
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

export const AddSidangModal: React.FC<AddSidangModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  token,
}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      wbp_profile_id: '',
      waktu_mulai_sidang: '',
      waktu_selesai_sidang: '',
      masa_tahanan_tahun: '',
      masa_tahanan_bulan: '',
      masa_tahanan_hari: '',
      nama_sidang: '',
      juru_pengacara_sidang: '',
      pengawas_peradilan_militer: '',
      jenis_persidangan_id: '',
      dokumentasi: '',
      hasil_vonis: '',
      ahli: '',
      hasil_keputusan_sidang: '',
      agenda_sidang: '',
      saksi: [],
      pengacara: [],
      hakim_id: [],
      jaksa_id: [],
    }
  );

  const modalContainerRef = useRef(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [staffData, setStaffData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [saksiEror, setSaksiEror] = useState(false);
  const [pengacaraEror, setPengacaraEror] = useState(false);

  const [jenisSidang, setJenisSidang] = useState([]);
  const [jaksa, setJaksa] = useState([]);
  const [hakim, setHakim] = useState([]);
  const [wbp, setWbp] = useState([]);

  const [saksiField, setSaksiField] = useState('');
  const [pengacaraField, setPengacaraField] = useState('');

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

  // useEffect untuk mengambil data dari api

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== 'lokasi_lemasmil_id' &&
        key !== 'last_login' &&
        key !== 'nama_lokasi_lemasmil' &&
        key !== 'image' &&
        key !== 'saksi' &&
        key !== 'pengacara' // Tidak melakukan pemeriksaan pada lokasi_lemasmil_id
        // || key === 'saksi' && Array.isArray(value) && value.length === 0
      ) {
        if (
          !value ||
          (key === 'hakim_id' && Array.isArray(value) && value.length === 0) ||
          (key === 'jaksa_id' && Array.isArray(value) && value.length === 0)
        ) {
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

  const handleSelectWbp = (e: any) => {
    setFormState({ ...formState, wbp_profile_id: e?.value });
  };

  const handleSelectHakim = (e: any) => {
    let arrayTemp = [];
    for (let i = 0; i < e.length; i++) {
      arrayTemp.push(e[i].value);
    }

    setFormState({ ...formState, hakim_id: arrayTemp });
  };

  const handleSelectJaksa = (e: any) => {
    let arrayTemp = [];
    for (let i = 0; i < e.length; i++) {
      arrayTemp.push(e[i].value);
    }

    setFormState({ ...formState, jaksa_id: arrayTemp });
  };

  const handleSelectSaksi = (e: any) => {
    let arrayTemp = [];
    for (let i = 0; i < e.length; i++) {
      arrayTemp.push(e[i].value);
    }

    setFormState({ ...formState, saksi: arrayTemp });
  };

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setButtonLoad(true);
    console.log(formState, 'formState');

    if (!validateForm()) return;
    onSubmit(formState).then(() => setButtonLoad(false));
  };
  

  //pengacara
  const handleInputPengacara = (e: any) => {
    const newValue = e.target.value;
    // setFormState({ ...formState, pengacara: newValue });
    setPengacaraField(newValue);
  };

  const handlePengacara = () => {
    if (!pengacaraField) {
      setPengacaraEror(true);
    } else {
      if (pengacaraField.trim() !== '') {
        setPengacaraEror(false);
        setFormState({
          ...formState,
          pengacara: [...formState.pengacara, pengacaraField],
        });
        setPengacaraField('');
      }
    }
  };

  const handleRemovePengacara = (index: any) => {
    const newArrayPasal = formState.pengacara.filter(
      (_: any, i: any) => i !== index
    );

    setFormState({
      ...formState,
      pengacara: newArrayPasal,
    });
  };

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log(reader.result, 'reader reader');

      reader.onloadend = async () => {
        setFormState({ ...formState, dokumentasi: reader.result });

        // setImagePreview(reader.result);
        console.log(formState.dokumentasi, 'Preview');
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getAllJenisSidang();
    getAllJaksa();
    getAllHakim();
    getAllWbp();
  }, []);

  const getAllJenisSidang = async () => {
    let params = {
      filter: '',
    };
    try {
      const response = await apiJenisSidangRead(params, token);
      setJenisSidang(response.data.data);
    } catch (e: any) {
      Alerts.fire({
        icon: 'error',
        title: e.message,
      });
    }
  };

  const getAllJaksa = async () => {
    let params = {
      filter: '',
    };
    try {
      const response = await apiJaksaRead(params, token);
      setJaksa(response.data.records);
    } catch (e: any) {
      Alerts.fire({
        icon: 'error',
        title: e.message,
      });
    }
  };

  const getAllHakim = async () => {
    let params = {
      filter: '',
    };
    try {
      const response = await apiHakimRead(params, token);
      setHakim(response.data.records);
    } catch (e: any) {
      Alerts.fire({
        icon: 'error',
        title: e.message,
      });
    }
  };

  const getAllWbp = async () => {
    let params = {
      filter: '',
    };
    try {
      const response = await apiReadAllWBP(params, token);
      setWbp(response.data.records);
    } catch (e: any) {
      Alerts.fire({
        icon: 'error',
        title: e.message,
      });
    }
  };

  console.log(jenisSidang);
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
    <div>
      <div style={modalStyles.backdrop}></div>
      <div
        ref={modalContainerRef}
        style={modalStyles.modalContainer}
        className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
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
                      ? 'Detail Data Sidang'
                      : isEdit
                      ? 'Edit Data Sidang'
                      : 'Tambah Data Sidang'}
                  </h3>
                </div>
                <strong
                  className="text-xl align-center cursor-pointer  "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 mt-5">
                  {/* NamaWbp */}
                  <div className="form-group w-full ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Wbp
                    </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={
                        isEdit || isDetail
                          ? {
                              value: formState.wbp_profile_id,
                              label: formState.nama_wbp_profile,
                            }
                          : formState.wbp_profile_id
                      }
                      placeholder={'Pilih WBP'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="wbp_profile_id"
                      styles={customStyles}
                      options={wbp.map((item: any) => ({
                        value: item.wbp_profile_id,
                        label: item.nama,
                      }))}
                      onChange={handleSelectWbp}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'wbp_profile_id' ? 'Pilih WBP' : ''
                      )}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 justify-normal">
                    {/* Nama sidang */}
                    <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Nama sidang
                      </label>

                      <select
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        onChange={handleChange}
                        placeholder="Tahap sidang"
                        name="nama_sidang"
                        value={formState.nama_sidang}
                        disabled={isDetail}
                      >
                        <option value="" disabled>
                          Pilih tahap sidang{' '}
                        </option>
                        <option value="Tahap Pertama">Tahap Pertama</option>
                        <option value="Tahap Kedua">Tahap Kedua</option>
                        <option value="Tahap Ketiga">Tahap Ketiga</option>
                      </select>

                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'nama_sidang' ? 'Masukan nama sidang' : ''
                        )}
                      </p>
                    </div>

                    {/* Jenis persidangan */}
                    <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Jenis sidang
                      </label>
                      <select
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        onChange={handleChange}
                        name="jenis_persidangan_id"
                        value={formState.jenis_persidangan_id}
                        disabled={isDetail}
                      >
                        <option value="" disabled>
                          Pilih jenis sidang
                        </option>
                        {jenisSidang.map((item: any) => (
                          <option value={item.jenis_persidangan_id}>
                            {item.nama_jenis_persidangan}
                          </option>
                        ))}
                      </select>
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'jenis_persidangan_id'
                            ? 'Masukan jenis sidang'
                            : ''
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Hakim */}
                  <div className="form-group w-full ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Hakim
                    </label>
                    <Select
                      className="basic-multi-select"
                      isMulti
                      classNamePrefix="select"
                      defaultValue={
                        isEdit || isDetail
                          ? formState?.sidang_hakim.map((item: any) => ({
                              value: item.hakim_id,
                              label: item.nama_hakim,
                            }))
                          : formState.hakim_id
                      }
                      placeholder={'Pilih hakim'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="hakim_id"
                      styles={customStyles}
                      options={
                        hakim.map((item: any) => ({
                        value: item.hakim_id,
                        label: item.nama_hakim,
                      }))}
                      onChange={handleSelectHakim}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'hakim_id' ? 'Pilih hakim' : ''
                      )}
                    </p>
                  </div>

                  {/* Jaksa */}
                  <div className="grid grid-cols-1">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Jaksa
                    </label>
                    <div className="grid grid-cols-1 gap-4 border px-2 py-2 rounded-lg border-blue-500">
                      {/* jaksa penyidik */}
                      
                      <div className="form-group w-full ">
                        
                        <Select
                          className="basic-multi-select"
                          isMulti
                          classNamePrefix="select"
                          defaultValue={
                            isEdit || isDetail
                              ? formState?.sidang_jaksa.map((item: any) => ({
                                  value: item.jaksa_id,
                                  label: item.nama_jaksa,
                                }))
                              : formState.jaksa_id
                          }
                          placeholder={'Pilih jaksa penyidik'}
                          isClearable={true}
                          isSearchable={true}
                          isDisabled={isDetail}
                          name="jaksa_id"
                          styles={customStyles}
                          options={jaksa.map((item: any) => ({
                            value: item.jaksa_id,
                            label: item.nama_jaksa,
                          }))}
                          onChange={handleSelectJaksa}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'jaksa_id' ? 'Pilih jaksa' : ''
                          )}
                        </p>
                      </div>
                        
                          {/* jaksa penuntut*/}
                      <div className="form-group w-full ">
                        <Select
                          className="basic-multi-select"
                          isMulti
                          classNamePrefix="select"
                          defaultValue={
                            isEdit || isDetail
                              ? formState?.sidang_jaksa.map((item: any) => ({
                                  value: item.jaksa_id,
                                  label: item.nama_jaksa,
                                }))
                              : formState.jaksa_id
                          }
                          placeholder={'Pilih jaksa penuntut'}
                          isClearable={true}
                          isSearchable={true}
                          isDisabled={isDetail}
                          name="jaksa_id"
                          styles={customStyles}
                          options={jaksa.map((item: any) => ({
                            value: item.jaksa_id,
                            label: item.nama_jaksa,
                          }))}
                          onChange={handleSelectJaksa}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'jaksa_id' ? 'Pilih jaksa' : ''
                          )}
                        </p>
                      </div>


                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 justify-normal">
                    {/* juru sita */}
                    <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Juru sita
                      </label>
                      <input
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        onChange={handleChange}
                        placeholder="Juru sita"
                        name="juru_pengacara_sidang"
                        value={formState.juru_pengacara_sidang}
                        disabled={isDetail}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'juru_pengacara_sidang'
                            ? 'Masukan juru sidang'
                            : ''
                        )}
                      </p>
                    </div>

                    {/* Pengawas Peradilan */}
                    <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Pengawas peradilan militer
                      </label>
                      <input
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        onChange={handleChange}
                        placeholder="Pengawas"
                        name="pengawas_peradilan_militer"
                        value={formState.pengawas_peradilan_militer}
                        disabled={isDetail}
                      />

                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'pengawas_peradilan_militer'
                            ? 'Masukan pengawas'
                            : ''
                        )}
                      </p>
                    </div>

                    {/* agenda sidang */}
                    <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Agenda sidang
                      </label>
                      <input
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        onChange={handleChange}
                        placeholder="Agenda sidang"
                        name="agenda_sidang"
                        value={formState.agenda_sidang}
                        disabled={isDetail}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'agenda_sidang'
                            ? 'Masukan agenda sidang'
                            : ''
                        )}
                      </p>
                    </div>

                    {/* ahli */}
                    <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Ahli
                      </label>
                      <select
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        onChange={handleChange}
                        placeholder="Ahli"
                        name="ahli"
                        value={formState.ahli}
                        disabled={isDetail}
                      >
                        <option value='' disabled>
                          Pilih ahli
                        </option>

                        </select>
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'ahli' ? 'Masukan ahli' : ''
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 justify-normal">
                    {/* waktu mulai */}
                    <div className="form-group w-full ">
                      <label
                        className="  block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Waktu mulai
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        name="waktu_mulai_sidang"
                        onChange={handleChange}
                        value={formState.waktu_mulai_sidang}
                        disabled={isDetail}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'waktu_mulai_sidang'
                            ? 'Masukan tanggal mulai'
                            : ''
                        )}
                      </p>
                    </div>

                    {/* waktu selesai */}
                    <div className="form-group w-full ">
                      <label
                        className="  block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Waktu selesai
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        name="waktu_selesai_sidang"
                        onChange={handleChange}
                        value={formState.waktu_selesai_sidang}
                        disabled={isDetail}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'waktu_selesai_sidang'
                            ? 'Masukan tanggal selesai'
                            : ''
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 ">
                    <p className="text-white text-sm font-medium">Vonis</p>
                    <div className=" grid grid-cols-3 gap-4 border px-2 py-2 rounded-lg border-blue-500">
                      {/* Vonis tahun */}
                      <div className="form-group w-full ">
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          onChange={handleChange}
                          placeholder="Tahun"
                          name="masa_tahanan_tahun"
                          value={formState.masa_tahanan_tahun}
                          disabled={isDetail}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'masa_tahanan_tahun'
                              ? 'Masukan vonis tahun'
                              : ''
                          )}
                        </p>
                      </div>
                      {/* Vonis bulan */}
                      <div className="form-group w-full ">
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          onChange={handleChange}
                          name="masa_tahanan_bulan"
                          placeholder="Bulan"
                          value={formState.masa_tahanan_bulan}
                          disabled={isDetail}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'masa_tahanan_bulan'
                              ? 'Masukan vonis bulan'
                              : ''
                          )}
                        </p>
                      </div>
                      {/* Vonis hari */}
                      <div className="form-group w-full ">
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          onChange={handleChange}
                          placeholder="Hari"
                          name="masa_tahanan_hari"
                          value={formState.masa_tahanan_hari}
                          disabled={isDetail}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'masa_tahanan_hari'
                              ? 'Masukan vonis hari'
                              : ''
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                 
                    {/* Saksi */}
                    <div className="form-group w-full ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Saksi
                    </label>
                    <Select
                      className="basic-multi-select"
                      isMulti
                      classNamePrefix="select"
                      defaultValue={''
                        // isEdit || isDetail
                        //   ? formState?.sidang_hakim.map((item: any) => ({
                        //       value: item.hakim_id,
                        //       label: item.nama_hakim,
                        //     }))
                        //   : formState.hakim_id
                      }
                      placeholder={'Pilih saksi'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="saksi"
                      styles={customStyles}
                      // options={hakim.map((item: any) => ({
                      //   value: item.hakim_id,
                      //   label: item.nama_hakim,
                      // }))}
                      onChange={handleSelectSaksi}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'saksi' ? 'Pilih saksi' : ''
                      )}
                    </p>
                  </div>

                
                    {/* pengacara */}
                    <div className="">
                      <div className="flex items-center">
                        <p className="text-white">Pengacara</p>
                        <p
                          className={`${
                            pengacaraEror ? 'block' : 'hidden'
                          } ml-4 text-red-400 text-sm`}
                        >
                          Masukan nama pengacara
                        </p>
                      </div>

                      <div className="border-[1px] border-blue-500 rounded-md p-2">
                        <div className="flex flex-row gap-2">
                          {!isDetail && (
                            <>
                              <input
                                type="text"
                                value={pengacaraField}
                                placeholder={
                                  isDetail ? '' : 'Masukan pengacara'
                                }
                                onChange={handleInputPengacara}
                                disabled={isDetail}
                                className="w-full rounded border border-stroke  dark:bg-slate-800 py-3 pl-3 pr-4.5 text-white focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              ></input>

                              <button
                                onClick={handlePengacara}
                                type="button"
                                className="py-3 px-3 rounded-md bg-blue-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6 text-white"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                  />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                        <div
                          className={`mt-2 flex flex-col overflow-hidden gap-2 ${
                            formState.pengacara?.length === 0
                              ? 'hidden'
                              : 'block'
                          }`}
                        >
                          {isDetail || isEdit
                            ? formState.sidang_pengacara?.map(
                                (item: any, index: any) => (
                                  <div className="flex flex-row items-center">
                                    <p
                                      key={index}
                                      className="capitalize px-3 py-1 truncate w-full  rounded-md bg-boxdark border-[1px] border-slate-500  text-white"
                                    >
                                      {item.nama_pengacara}
                                    </p>

                                    {!isDetail && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          handleRemovePengacara(index);
                                        }}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="1.5"
                                          stroke="currentColor"
                                          className="w-6 h-6"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                          />
                                        </svg>
                                      </button>
                                    )}
                                  </div>
                                )
                              )
                            : formState.pengacara?.map(
                                (item: any, index: any) => (
                                  <div className="flex flex-row items-center">
                                    <p
                                      key={index}
                                      className="capitalize px-3 py-1 truncate w-full  rounded-md bg-boxdark border-[1px] border-slate-500  text-white"
                                    >
                                      {item}
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleRemovePengacara(index);
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M6 18L18 6M6 6l12 12"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                )
                              )}
                        </div>
                      </div>
                    </div>

                  {/* <div className='w-full flex flex-col'>
                  <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                     Dokumentasi
                    </label>
                    <div className='border border-slate-500 px-2 py-2 rounded-lg'>
                      <div className='flex flex-wrap justify-center items-center py-1 b'>
                      <input id="image-upload" className='hidden' type='file' accept="image/*"/>
                      <div className='w-full text-center'>aaaa</div>
                      <label htmlFor="image-upload" className='cursor-pointer text-white bg-blue-500 px-3 py-1 rounded-md '> Upload File</label>
                      </div>
                    </div>
                  </div> */}
                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-blue-500 bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept=".pdf, .doc, .docx"
                      onChange={handleUpload}
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="text-blue-500"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <p className="text-blue-500">Klik untuk unggah</p>
                      <p className="mt-1.5">Pdf,doc dan docx </p>
                      <p></p>
                    </div>
                  </div>

                  {/* Keputusan Hakim*/}
                  <div className="form-group w-full flex flex-col">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Keputusan sidang
                    </label>
                    <textarea
                      className="w-full max-h-[94px] min-h-[94px] rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="hasil_keputusan_sidang"
                      placeholder="Keputusan sidang"
                      onChange={handleChange}
                      value={formState.hasil_keputusan_sidang}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'hasil_keputusan_sidang'
                          ? 'Masukan keputusan'
                          : ''
                      )}
                    </p>
                  </div>

                  {/* Hasil vonis */}
                  <div className="form-group w-full flex flex-col">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Hasil vonis
                    </label>
                    <textarea
                      className="w-full max-h-[94px] min-h-[94px] rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="hasil_vonis"
                      placeholder="Hasil vonis"
                      onChange={handleChange}
                      value={formState.hasil_vonis}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'hasil_vonis' ? 'Masukan hasil vonis' : ''
                      )}
                    </p>
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
                {/* {errors.filter((item: string) => !item.startsWith('INVALID_ID'))
              .length > 0 && (
              <div className="error mt-4">
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
                    Ubah Data Sidang
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
                    Tambah Data Sidang
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
