import React, { useEffect, useRef, useState } from 'react';
import { apiReadPenyidikan } from '../../services/api';
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
      nama_dokumen_bap:'',
      link_dokumen_bap:'',
      penyidikan_id: '',
      pdf_file_base64:'',
    }
  );

  const modalContainerRef = useRef(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [dataPenyidikan , setDataPenyidikan] =useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);
  const tokenItem = localStorage.getItem('token')
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token

  // useEffect untuk mengambil data dari api
  useEffect(() => {
    penyidikan()
  }, []);

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== 'lokasi_lemasmil' &&
        key !== 'lokasi_otmil' &&
        key !== 'nama' &&
        key !== 'saksi_id' &&
        key !== 'nama_saksi' &&
        key !== 'wbp_profile_id' &&
        key !== 'nrp_wbp' &&
        key !== 'link_dokumen_bap' &&
        key !== 'nama'
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

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(formState, 'formState');

    if (!validateForm()) return;
    setButtonLoad(true)
    onSubmit(formState);
  };

    useEffect(() => {
    if (isEdit || isDetail) {
      setFormState({
        ...formState,
        pdf_file_base64: formState.link_dokumen_bap,
      });
    }
  }, [formState.link_dokumen_bap]);

  // useEffect(() => {
  //   if (isDetail || isEdit) {
  //     setFormState((prevFormState:any) => ({
  //       ...prevFormState,
  //       pdf_file_base64: prevFormState.link_dokumen_bap,
  //     }));
  //   }
  // }, [formState.link_dokumen_bap]);

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log(reader.result, 'reader reader');

      reader.onloadend = async () => {
        setFormState({ ...formState, pdf_file_base64: reader.result });

        console.log(formState.pdf_file_base64, 'Preview');
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(formState,'ada')

  const openNewWindow = () => {
    // URL to be opened in the new window
    const url = `https://dev.transforme.co.id/siram_admin_api${formState.link_dokumen_bap}`;

    // Specify window features (optional)
    const windowFeatures = 'width=600,height=400';

    // Open the new window
    window.open(url, '_blank', windowFeatures);
  };

  const handleRemoveDoc = () => {
    setFormState({ ...formState, pdf_file_base64: '' });
    const inputElement = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  };

  const handlePenyidikanChange = (e: any) => {
    const selectedPenyidikan: any = dataPenyidikan.find(
      (item: any) => item.penyidikan_id === e?.value);

    setFormState({
      ...formState,
      penyidikan_id: e?.value,
      nomor_penyidikan: selectedPenyidikan ? selectedPenyidikan.nomor_penyidikan : '',
      agenda_penyidikan: selectedPenyidikan ? selectedPenyidikan.agenda_penyidikan : '',
      nomor_kasus: selectedPenyidikan ? selectedPenyidikan.nomor_kasus : '',
      nama_kasus: selectedPenyidikan ? selectedPenyidikan.nama_kasus : '',
      nrp_wbp: selectedPenyidikan ? selectedPenyidikan.nrp_wbp : '',
      lokasi_otmil: selectedPenyidikan ? selectedPenyidikan.lokasi_otmil : '',
      wbp_profile_id: selectedPenyidikan ? selectedPenyidikan.wbp_profile_id : '',
      nama: selectedPenyidikan ? selectedPenyidikan.nama_wbp : '',
      saksi_id: selectedPenyidikan ? selectedPenyidikan.saksi_id : '',
      nama_saksi: selectedPenyidikan ? selectedPenyidikan.nama_saksi : '',
    });
  };

  const penyidikan = async ()=> {
    try{
      let params = {
        pageSize : 10000,
      };
   const response = await apiReadPenyidikan(params,token) 
     if (response.data.status !== 'OK') {
      throw new Error(response.data.message);
     }
    const result = response.data.records;
    // const datapen = result.map((item:any) => ({
    //   penyidikan_id: item.penyidikan_id,
    //   wbp_profile_id: item.wbp_profile_id,
    //   nama: item.nama_wbp,
    //   nomor_penyidikan : item.nomor_penyidikan,
    //   agenda_penyidikan : item.agenda_penyidikan,
    //   nomor_kasus : item.nomor_kasus,
    //   nama_kasus : item.nama_kasus,
    //   nrp_wbp : item.nrp_wbp,
    //   nama_saksi : item.nama_saksi,
    // }));
    setIsLoading(false);
    setDataPenyidikan(result)
    } catch(e:any){
      console.log(e.message)
    }
  }

  console.log(dataPenyidikan,'data')

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
const modalStyles:any = {
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

          <div className="grid grid-cols-2 gap-x-4 justify-normal mt-4">
            
            {/* Nama Dokumen start */}
            <div className="form-group w-full h-22">
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

            {/* penyidikan */}
            <div className="form-group w-full h-22">
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
                    {value: formState.penyidikan_id,
                    label: formState.nomor_penyidikan})
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
          </div>

          <div className="grid grid-cols-2 gap-4 justify-normal">
            {/* Nomor Kasus */}
            <div className="form-group w-full ">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Nomor Kasus
              </label>
              <input
                type=""
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                name="nomor_kasus"
                placeholder="Nomor Kasus"
                onChange={handleChange}
                value={formState.nomor_kasus}
                disabled
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === 'nomor_kasus' ? 'Pilih Nomor Kasus' : ''
                )}
              </p>
            </div>

            {/* Nama Kasus */}
            <div className="form-group w-full ">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Nama Kasus
              </label>
              <input
                type="text"
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                name="nama_kasus"
                placeholder="Nama Kasus"
                onChange={handleChange}
                value={formState.nama_kasus}
                disabled
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === 'nama_kasus' ? 'Pilih Nama Kasus' : ''
                )}
              </p>
            </div>

            {/* Pihak Terlibat */}
            <div className="form-group w-full ">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Pihak Terlibat
              </label>
              <input
                type="text"
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                placeholder="Pihak Terlibat"
                name='nama'
                onChange={handleChange}
                value={(formState.nama_saksi !== undefined && formState.nama_saksi !== null && formState.nama_saksi !== '') ? `${formState.nama_saksi} (saksi)` : (formState.nama || '')}
                disabled
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === '' ? 'Pilih Pihak Terlibat' : ''
                )}
              </p>
            </div>
            
            {formState.nama &&
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
                placeholder="NRP"
                name='nrp_wbp'
                onChange={handleChange}
                value={formState.nama_saksi ? '' : formState.nrp_wbp}
                disabled
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === 'nrp_wbp' ? 'Pilih NRP' : ''
                )}
              </p>
            </div>
            }

          </div>

          <div className="form-group w-full mt-4">
            <label
              className="  block text-sm font-medium text-black dark:text-white"
              htmlFor="id"
            >
              Agenda Penyidikan
            </label>
            <textarea
              className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
              name="agenda_penyidikan"
              id="textArea"
              placeholder="Agenda Penyidikan"
              onChange={handleChange}
              value={formState.agenda_penyidikan}
              disabled={isDetail}
            />
            <p className="error-text">
              {errors?.map((item) =>
                item === 'agenda_penyidikan'
                  ? 'Masukan Agenda Penyidikan'
                  : ''
              )}
            </p>
          </div>

          {/* Dokumentasi */}
          <div className="grid grid-cols-1">
              <label
                className="block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Dokumen BAP
              </label>
              <div
                // id="FileUpload"
                className="relative  block w-full appearance-none overflow-hidden rounded border border-blue-500 bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
              >
                <input
                  type="file"
                  id="fileUpload"
                  accept=".pdf"
                  onChange={handleUpload}
                  // className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  className="hidden"
                />
                {formState.pdf_file_base64 ? (
                  <div className="grid grid-cols-1">
                    <div
                      className={`absolute top-0 right-0  bg-red-500 flex items-center  rounded-bl  ${
                        isDetail ? 'hidden' : 'block'
                      }`}
                    >
                      <button
                        className="p-[2px]"
                        onClick={handleRemoveDoc}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          width="20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="50"
                        height="50"
                      >
                        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                        <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                      </svg>
                    </div>
                    <p className="text-center text-sm text-blue-500">
                      Dokumen terupload !
                    </p>
                    <div
                      className={`flex justify-center mt-3 ${
                        isDetail ? 'block' : 'hidden'
                      }`}
                    >
                      <button
                        type='button'
                        onClick={openNewWindow}
                        className="bg-blue-500 px-3 py-1 rounded-xl text-white duration-300 ease-in-out  hover:scale-105 "
                      >
                        Unduh Dokumen
                      </button>
                    </div>
                  </div>
                ) : (
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
                    <label
                      htmlFor="fileUpload"
                      className="cursor-pointer"
                    >
                      <span className="text-blue-500 underline">
                        Klik untuk unggah
                      </span>
                    </label>
                    <p className="mt-1.5">PDF</p>
                  </div>
                )}
              </div>
              <p className="error-text">
                {errors.map((item) =>
                  item === 'pdf_file_base64'
                    ? 'Masukan dokumen sidang'
                    : ''
                )}
              </p>
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
            <div className={` ${isDetail ? 'h-auto' : 'h-15'}  mt-3`}>
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
              Ubah Data BAP
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
                  Tambah Data BAP
                </button>
                )}
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
