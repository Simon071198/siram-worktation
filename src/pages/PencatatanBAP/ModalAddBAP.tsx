import React, { useEffect, useRef, useState } from 'react';
import { apiReadKasus, apiReadPenyidikan } from '../../services/api';
import Select from 'react-select';


interface AddBAPModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
}

const dataUserItem = localStorage.getItem('dataUser');
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

export const AddBAPModal: React.FC<AddBAPModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      nama_dokumen_bap: '',
      link_dokumen_bap: '',
      penyidikan_id: '',
      kasus_id: '',
      // lokasi_otmil: dataAdmin.nama_lokasi_otmil,
    }
  );

  const modalContainerRef = useRef(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [dataPenyidikan, setDataPenyidikan] = useState([])
  const [dataKasus, setDataKasus] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);
  const tokenItem = localStorage.getItem('token')
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token

  // useEffect untuk mengambil data dari api
  useEffect(() => {
    penyidikan()
    kasus()
  }, []);

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== 'lokasi_lemasmil'
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
    e: any
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formState, 'formState');

    if (!validateForm()) return;
    setButtonLoad(true)
    onSubmit(formState);
  };

  const handlePenyidikanChange = (e: any) => {
    const selectedPenyidikan: any = dataPenyidikan.find(
      (item: any) => item.penyidikan_id === e?.value
    );
    const saksi = selectedPenyidikan ? selectedPenyidikan.saksi : [];
    const firstWitness = saksi[0];
    const namaSaksiPertama = firstWitness ? firstWitness.nama_saksi : '';

    setFormState({
      ...formState,
      penyidikan_id: e?.value,
      nomor_penyidikan: selectedPenyidikan ? selectedPenyidikan.nomor_penyidikan : '',
      alasan_penyidikan: selectedPenyidikan ? selectedPenyidikan.alasan_penyidikan : '',
      lokasi_penyidikan: selectedPenyidikan ? selectedPenyidikan.lokasi_penyidikan : '',
      waktu_penyidikan: selectedPenyidikan ? selectedPenyidikan.waktu_penyidikan : '',
      agenda_penyidikan: selectedPenyidikan ? selectedPenyidikan.agenda_penyidikan : '',
      hasil_penyidikan: selectedPenyidikan ? selectedPenyidikan.hasil_penyidikan : '',
      nama_saksi: saksi.map((item: any) => item.nama_saksi),
      // nama_saksi: namaSaksiPertama ? namaSaksiPertama : '',
      keterangan_saksi: selectedPenyidikan ? selectedPenyidikan.keterangan_saksi : [],
    });
  };


  const handlekasusChange = (e: any) => {
    const selectedKasus: any = dataKasus.find(
      (item: any) => item.kasus_id === e?.value
    );
    setFormState({
      ...formState,
      kasus_id: e?.value,
      nomor_kasus: selectedKasus ? selectedKasus.nomor_kasus : '',
      nama_kasus: selectedKasus ? selectedKasus.nama_kasus : '',
      nrp_wbp: selectedKasus ? selectedKasus.nrp : '',
      nama_wbp: selectedKasus ? selectedKasus.nama : '',
    });
  };

  const penyidikan = async () => {
    try {
      let params = {
        pageSize: 10000,
      };
      const response = await apiReadPenyidikan(params, token)
      if (response.data.status !== 'OK') {
        throw new Error(response.data.message);
      }
      const result = response.data;
      setDataPenyidikan(result.records)
      setIsLoading(false);
    } catch (e: any) {
      console.log(e.message)
    }
  }

  const kasus = async () => {
    try {
      let params = {
        pageSize: 10000,
      }
      const response = await apiReadKasus(params, token)
      if (response.data.status !== 'OK') {
        throw new Error(response.data.massage)
      }
      const result = response.data.records
      setDataKasus(result)
      setIsLoading(false)
    } catch (e: any) {
      console.log(e.message)
    }
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

  // Add this CSS style within your modal component
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
        className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
      >
        {/* <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-full w-[80vh]"> */}
        <div className="modal rounded-sm w-full">
          {isLoading ? (
            <div>
              <div className='flex flex-row-reverse pr-5 pt-3'>
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
                      ? 'Detail data Dokumen BAP'
                      : isEdit
                        ? 'Edit data Dokumen BAP'
                        : 'Tambah data Dokumen BAP'}
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

                <div className="grid grid-cols-2 gap-4 justify-normal mt-10">

                  {/* Nama Dokumen start */}
                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Dokumen BAP
                    </label>
                    <input
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="nama_dokumen_bap"
                      placeholder='Nama Dokumen BAP'
                      onChange={handleChange}
                      value={formState.nama_dokumen_bap}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'nama_dokumen_bap'
                          ? 'Pilih Nama Dokumen BAP'
                          : ''
                      )}
                    </p>
                  </div>
                  {/* Nama Dokumen end */}

                  {/* Link Dokumen BAP start */}
                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Link Dokumen BAP
                    </label>
                    <input
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="link_dokumen_bap"
                      placeholder='Link Dokumen BAP'
                      onChange={handleChange}
                      value={formState.link_dokumen_bap}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'link_dokumen_bap'
                          ? 'Pilih Link Dokumen BAP'
                          : ''
                      )}
                    </p>
                  </div>
                  {/* Link Dokumen BAP end */}

                  {/* penyidikan */}
                  <div className="form-group w-full ">
                    <label
                      className=" mb-1.5 block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nomor penyidikan
                    </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={isEdit || isDetail ? (
                        {
                          value: formState.penyidikan_id,
                          label: formState.nomor_penyidikan
                        })
                        :
                        formState.penyidikan_id
                      }
                      placeholder={'Pilih Nomor penyidikan'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="penyidikan_id"
                      styles={customStyles}
                      options={dataPenyidikan.map((item: any) => ({
                        value: item.penyidikan_id,
                        label: item.nomor_penyidikan,
                      }))
                      }
                      onChange={handlePenyidikanChange}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'penyidikan_id' ? 'Pilih penyidikan' : ''
                      )}
                    </p>
                  </div>


                  {/* Alasan Penyidikan */}
                  <div className="form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Alasan Penyidikan
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="alasan_penyidikan"
                      placeholder="Alasan Penyidikan"
                      onChange={handleChange}
                      value={formState.alasan_penyidikan}
                      disabled
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'alasan_penyidikan' ? 'Pilih Alasan Penyidikan' : ''
                      )}
                    </p>
                  </div>

                  {/* Lokasi Penyidikan */}
                  <div className="form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Lokasi Penyidikan
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="lokasi_penyidikan"
                      placeholder="lokasi penyidikan"
                      onChange={handleChange}
                      value={formState.lokasi_penyidikan}
                      disabled
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'lokasi_penyidikan' ? 'Pilih Lokasi Penyidikan' : ''
                      )}
                    </p>
                  </div>

                  {/* Waktu Penyidikan */}
                  <div className="form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Waktu Penyidikan
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="waktu_penyidikan"
                      placeholder="Waktu Penyidikan"
                      onChange={handleChange}
                      value={formState.waktu_penyidikan}
                      disabled
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'waktu_penyidikan' ? 'Pilih Waktu Penyidikan' : ''
                      )}
                    </p>
                  </div>

                  {/* Agenda Penyidikan */}
                  <div className="form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Agenda Penyidikan
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="agenda_penyidikan"
                      placeholder="Agenda Penyidikan"
                      onChange={handleChange}
                      value={formState.agenda_penyidikan}
                      disabled
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'agenda_penyidikan' ? 'Pilih Agenda Penyidikan' : ''
                      )}
                    </p>
                  </div>

                  {/* Hasil Penyidikan */}
                  <div className="form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Hasil Penyidikan
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="hasil_penyidikan"
                      placeholder="Hasil Penyidikan"
                      onChange={handleChange}
                      value={formState.hasil_penyidikan}
                      disabled
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'hasil_penyidikan' ? 'Pilih Hasil Penyidikan' : ''
                      )}
                    </p>
                  </div>

                  {/* Nama Saksi */}
                  <div className="form-group w-full ">
                    <label
                      className=" capitalize block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Saksi
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="nama_saksi"
                      placeholder="Nama Saksi"
                      onChange={handleChange}
                      value={formState.nama_saksi}
                      disabled
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_saksi' ? 'Pilih Nama Saksi' : ''
                      )}
                    </p>
                  </div>

                  {/* Keterangan Saksi */}
                  <div className="form-group w-full ">
                    <label
                      className=" capitalize block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Keterangan Saksi
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="keterangan_saksi"
                      placeholder="Keterangan Saksi"
                      onChange={handleChange}
                      value={formState.keterangan_saksi}
                      disabled
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'keterangan_saksi' ? 'Pilih Keterangan Saksi' : ''
                      )}
                    </p>
                  </div>

                  {/* kasus */}
                  <div className="form-group w-full ">
                    <label
                      className=" mb-1.5 block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nomor kasus
                    </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={isEdit || isDetail ? (
                        {
                          value: formState.kasus_id,
                          label: formState.nomor_kasus
                        })
                        :
                        formState.kasus_id
                      }
                      placeholder={'Pilih Nomor kasus'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="kasus_id"
                      styles={customStyles}
                      options={dataKasus.map((item: any) => ({
                        value: item.kasus_id,
                        label: item.nomor_kasus,
                      }))
                      }
                      onChange={handlekasusChange}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'kasus_id' ? 'Pilih kasus' : ''
                      )}
                    </p>
                  </div>

                  {/* nama kasus */}
                  <div className="form-group w-full ">
                    <label
                      className=" capitalize block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      nama kasus
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="nama_kasus"
                      placeholder="nama kasus"
                      onChange={handleChange}
                      value={formState.nama_kasus}
                      disabled
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_kasus' ? 'Pilih nama kasus' : ''
                      )}
                    </p>
                  </div>

                  {/* Nama WBP */}
                  <div className="form-group w-full ">
                    <label
                      className=" capitalize block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama WBP
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="nama_wbp"
                      placeholder="Nama WBP"
                      onChange={handleChange}
                      value={formState.nama_wbp}
                      disabled
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_wbp' ? 'Pilih Nama WBP' : ''
                      )}
                    </p>
                  </div>

                  {/* NRP WBP */}
                  <div className="form-group w-full ">
                    <label
                      className=" capitalize block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      NRP WBP
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="nrp_wbp"
                      placeholder="NRP WBP"
                      onChange={handleChange}
                      value={formState.nrp_wbp}
                      disabled
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nrp_wbp' ? 'Pilih NRP WBP' : ''
                      )}
                    </p>
                  </div>

                  {/* Lokasi Otmil */}
                  <div className="form-group w-full ">
                    <label
                      className=" capitalize block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Lokasi Otmil
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="lokasi_otmil"
                      placeholder="Lokasi Otmil"
                      onChange={handleChange}
                      value={formState.lokasi_otmil}
                      disabled
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'lokasi_otmil' ? 'Pilih Lokasi Otmil' : ''
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
                          .filter((item: string) => item.startsWith('INVALID_ID'))[0]
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
                    Ubah Data Pengguna
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
                    Tambah Data Pengguna
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
