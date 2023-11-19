import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { Alerts } from './AlertDaftarKasus';
import { apiReadAllWBP, apiReadKategoriPerkara, apiReadOditur, apiReadStatusWBP, apiReadjenisperkara } from '../../services/api';

const dataUserItem = localStorage.getItem('dataUser');
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;
console.log(dataAdmin, 'DATA ADMIN');

interface WBP {
  wbp_profile_id: string,
  nama: string,
  nrp: string,
}

interface JenisPerkara {
  jenis_perkara_id: string,
  kategori_perkara_id: string,
  nama_kategori_perkara: string,
  nama_jenis_perkara: string,
  nama_oditur: string,

}

export const AddDaftarKasusModal = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  token,
}: any) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      nomor_kasus: '',
      // lokasi_kasus: '',
      // tanggal_registrasi_kasus: '',
      // tanggal_penutupan_kasus: '',
      // tanggal_mulai_penyidikan: '',
      // tanggal_mulai_sidang: '',
      wbp_profile_id: '',
      kategori_perkara_id: '',
      jenis_perkara_id: '',
      status_kasus_id: '',
      lokasi_kasus: '',
      waktu_kejadian: '',
      tanggal_pelimpahan_kasus: '',
      waktu_pelaporan_kasus: '',
      // oditur_id: '',
      // nama_oditur:'',
    }
  );
  // const lokasi_lemasmil_id = localStorage.getItem('lokasi_lemasmil_id')

  //state

  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const [DataWBP, setDataWBP] = useState<WBP[]>([]);
  const [dataKategoriPerkara, setDataKategoriPerkara] = useState([]);
  const [dataJenisPerkara, setDataJenisPerkara] = useState<JenisPerkara[]>([]);
  const [dataStatusWBP, setDataStatusWBP] = useState([]);
  const [dataOditur, setDataOditur] = useState([]);


  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {

      if (!value) {
        errorFields.push(key);
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

  const handleSelectOditur = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, oditur_id: e?.value });
  };

  const handleSelectWBP = (e: any) => {

    const perkara: any = DataWBP.find(
      (item: any) => item.wbp_profile_id === e?.value
    );
    setFormState({
      ...formState,
      wbp_profile_id: e?.value,
      nama: perkara ? perkara.nama : '',
      nrp: perkara ? perkara.nrp : '',
    });
  };

  const handleSelectJenisPerkara = (e: any) => {
    const perkara: any = dataJenisPerkara.find(
      (item: any) => item.jenis_perkara_id === e?.value
    );
    setFormState({
      ...formState,
      jenis_perkara_id: e?.value,
      kategori_perkara_id: perkara ? perkara.kategori_perkara_id : '',
      nama_kategori_perkara: perkara ? perkara.nama_kategori_perkara : '',
      nama_jenis_perkara: perkara ? perkara.nama_jenis_perkara : '',
    });
  };




  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState, 'From State');

    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState).then(() => setButtonLoad(false));
    console.log('berhasil');
  };

  useEffect(() => {
    Promise.all([
      WBP(),
      kategoriPerkara(),
      jenisPerkara(),
      oditur(),
      status(),
    ]).then(() => {
      setIsLoading(false)
    })
  }, [])

  const WBP = async () => {
    let params = {
      pageSize: 1000,
    }
    await apiReadAllWBP(params, token)
      .then((res) => {
        setDataWBP(res.data.records)
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.massage,
        }))
  }

  const kategoriPerkara = async () => {
    let params = {
      pageSize: 1000,
    }
    await apiReadKategoriPerkara(params)
      .then((res) => {
        setDataKategoriPerkara(res.data.records)
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.massage,
        }))
  }

  const status = async () => {
    await apiReadStatusWBP()
      .then((res) => {
        setDataStatusWBP(res.data.records)
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.massage,
        }))
  }

  const oditur = async () => {
    let params = {}
    await apiReadOditur(params, token)
      .then((res) => {
        setDataOditur(res.data.records)
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.massage,
        }))
  }

  const jenisPerkara = async () => {
    let params = {
      pageSize: 1000,
    }
    await apiReadjenisperkara(params, token)
      .then((res) => {
        setDataJenisPerkara(res.data.records)
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.massage,
        }))
  }

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
                      ? 'Detail Data Daftar Kasus'
                      : isEdit
                        ? 'Edit Data Daftar Kasus'
                        : 'Tambah Data Daftar Kasus'}
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
                <div className='grid grid-cols-2 gap-5'>
                  <div className="form-group w-full mt-4">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nomor Kasus
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="nomor_kasus"
                      placeholder="Nomor Kasus"
                      onChange={handleChange}
                      value={formState.nomor_kasus}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nomor_kasus' ? 'Masukan Nomor Kasus' : ''
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full mt-4">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Lokasi Kasus
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="lokasi_kasus"
                      placeholder="lokasi kasus"
                      onChange={handleChange}
                      value={formState.lokasi_kasus}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'lokasi_kasus' ? 'Masukan lokasi kasus' : ''
                      )}
                    </p>
                  </div>

                  {/* <div className='items-center grid grid-cols-2 gap-5 '> */}
                  {/* WBP */}
                  <div className="form-group w-full ">
                    <label
                      className="mb-0.5 block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      WBP
                    </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={isEdit || isDetail ? (
                        {
                          value: formState.wbp_profile_id,
                          label: formState.nama
                        })
                        :
                        formState.wbp_profile_id
                      }
                      placeholder={'Pilih WBP'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="wbp_profile_id"
                      styles={customStyles}
                      options={DataWBP.map((item: any) => ({
                        value: item.wbp_profile_id,
                        label: item.nama,
                      }))
                      }
                      onChange={handleSelectWBP}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'wbp_profile_id' ? 'Pilih WBP' : ''
                      )}
                    </p>
                  </div>

                  {/* nrp*/}
                  <div className="form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      NRP
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="nrp"
                      placeholder="nrp"
                      onChange={handleChange}
                      value={formState.nrp}
                      disabled
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nrp' ? 'Pilih nrp' : ''
                      )}
                    </p>
                  </div>
                  {/* </div> */}

                  {/* jenis perkara */}
                  <div className="form-group w-full ">
                    <label
                      className=" mb-0.5 block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      jenis perkara
                    </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={isEdit || isDetail ? (
                        {
                          value: formState.jenis_perkara_id,
                          label: formState.nama_jenis_perkara
                        })
                        :
                        formState.jenis_perkara_id
                      }
                      placeholder={'Pilih jenisperkara'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="jenis_perkara_id"
                      styles={customStyles}
                      options={dataJenisPerkara.map((item: any) => ({
                        value: item.jenis_perkara_id,
                        label: item.nama_jenis_perkara,
                      }))
                      }
                      onChange={handleSelectJenisPerkara}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'jenis_perkara_id' ? 'Pilih jenis perkara' : ''
                      )}
                    </p>
                  </div>

                  {/* Kategori Perkara */}
                  <div className="form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Kategori Perkara
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="nama_kategori_perkara"
                      placeholder="nama kategori perkara"
                      onChange={handleChange}
                      value={formState.nama_kategori_perkara}
                      disabled
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_kategori_perkara' ? 'Pilih kategori perkara' : ''
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Waktu kejadian
                    </label>
                    <input
                      type='datetime-local'
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="waktu_kejadian"
                      placeholder='Waktu kejadian'
                      onChange={handleChange}
                      value={formState.waktu_kejadian}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'waktu_kejadian'
                          ? 'Pilih Waktu kejadian'
                          : ''
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      tanggal penutupan kasus
                    </label>
                    <input
                      type='date'
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="tanggal_penutupan_kasus"
                      placeholder='tanggal penutupan kasus'
                      onChange={handleChange}
                      value={formState.tanggal_penutupan_kasus}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'tanggal_penutupan_kasus'
                          ? 'Pilih tanggal penutupan kasus'
                          : ''
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      tanggal mulai penyidikan
                    </label>
                    <input
                      type='date'
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="tanggal_mulai_penyidikan"
                      placeholder='tanggal mulai penyidikan'
                      onChange={handleChange}
                      value={formState.tanggal_mulai_penyidikan}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'tanggal_mulai_penyidikan'
                          ? 'Pilih tanggal mulai penyidikan'
                          : ''
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      tanggal mulai sidang
                    </label>
                    <input
                      type='date'
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="tanggal_mulai_sidang"
                      placeholder='tanggal mulai sidang'
                      onChange={handleChange}
                      value={formState.tanggal_mulai_sidang}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'tanggal_mulai_sidang'
                          ? 'Pilih tanggal mulai sidang'
                          : ''
                      )}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="form-group w-full flex flex-col">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Status
                    </label>
                    <select
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                      name="status_kasus_id"
                      onChange={handleChange}
                      value={formState.status_kasus_id}
                      disabled={isDetail}
                    >
                      <option value="">
                        Pilih Status
                      </option>
                      {dataStatusWBP.map((item: any) => (
                        <option value={item.status_kasus_id}>
                          {item.nama_status_wbp_kasus}
                        </option>
                      ))}
                    </select>
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'status_kasus_id' ? 'Pilih status' : ''
                      )}
                    </p>
                  </div>

                  {/* Oditur */}
                  <div className="form-group w-full ">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Oditur
                    </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={isEdit || isDetail ? (
                        {
                          value: formState.oditur_id,
                          label: formState.nama_oditur
                        })
                        :
                        formState.oditur_id
                      }
                      placeholder={'Pilih Oditur'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="oditur_id"
                      styles={customStyles}
                      options={dataOditur.map((item: any) => ({
                        value: item.oditur_id,
                        label: item.nama_oditur
                      }))
                      }
                      onChange={handleSelectOditur}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'oditur_id' ? 'Pilih Oditur' : ''
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
                {/* {errors.length > 0 && (
                  <div className="error mt-4">
                    <p className="text-red-400">
                      Ada data yang masih belum terisi !
                    </p>
                  </div>
                )} */}
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
                    Ubah Data Kasus
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
                    Tambah Data Kasus
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
