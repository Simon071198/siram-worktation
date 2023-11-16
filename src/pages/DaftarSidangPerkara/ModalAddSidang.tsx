import React, { useEffect, useRef, useState } from 'react';
import {
  apiAhliRead,
  apiHakimRead,
  apiJaksaRead,
  apiJenisSidangRead,
  apiKasusRead,
  apiPengadilanMiliterRead,
  apiReadAllRole,
  apiReadAllStaff,
  apiReadAllUser,
  apiReadAllWBP,
  apiReadJaksapenuntut,
  apiReadSaksi,
} from '../../services/api';
import Select from 'react-select';
import { Alerts } from './AlertSidang';
import { CiGlass } from 'react-icons/ci';
// import { ipcRenderer } from 'electron';

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
      waktu_mulai_sidang: '',
      waktu_selesai_sidang: '',
      jadwal_sidang: '',
      perubahan_jadwal_sidang: '',
      kasus_id: '',
      masa_tahanan_tahun: '',
      masa_tahanan_bulan: '',
      masa_tahanan_hari: '',
      nama_sidang: '',
      juru_sita: '',
      pengawas_peradilan_militer: '',
      jenis_persidangan_id: '',
      pengadilan_militer_id: '',
      nama_dokumen_persidangan: '',
      pdf_file_base64: '',
      hasil_vonis: '',
      ahli: [],
      agenda_sidang: '',
      saksi: [],
      pengacara: [],
      // hakim_id: [],
      // role_ketua_hakim: '',
      oditur_penuntut_id: [],
      role_ketua_oditur: '',
    }
  );

  const modalContainerRef = useRef(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [staffData, setStaffData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [saksiEror, setSaksiEror] = useState(false);
  const [pengacaraEror, setPengacaraEror] = useState(false);

  const [jenisSidang, setJenisSidang] = useState([]);
  const [jaksa, setJaksa] = useState([]);
  const [hakim, setHakim] = useState([]);
  const [kasus, setKasus] = useState([]);
  console.log(kasus, 'kasus');
  const [pengadilanMiliter, setPengadilanMiliter] = useState([]);
  const [ahli, setAhli] = useState([]);
  const [saksi, setSaksi] = useState([]);
  const [wbp, setWbp] = useState([]);
  const [getSaksi, setGetSaksi] = useState([]);
  const [saksiField, setSaksiField] = useState('');
  const [pengacaraField, setPengacaraField] = useState('');

  // useEffect untuk mengambil data dari api

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== 'lokasi_lemasmil_id' &&
        key !== 'last_login' &&
        key !== 'nama_lokasi_lemasmil' &&
        key !== 'image' &&
        key !== 'pengacara' &&
        key !== 'perubahan_jadwal_sidang' &&
        key !== 'hasil_keputusan_sidang' &&
        key !== 'provinsi_id' &&
        key !== 'nama_provinsi' &&
        key !== 'nama_kota'

        // Tidak melakukan pemeriksaan pada lokasi_lemasmil_id
        // || key === 'saksi' && Array.isArray(value) && value.length === 0
      ) {
        if (
          !value ||
          // (key === 'hakim_id' && Array.isArray(value) && value.length === 0) ||
          (key === 'jaksa_penuntut_id' &&
            Array.isArray(value) &&
            value.length === 0) ||
          (key === 'saksi' && Array.isArray(value) && value.length === 0) ||
          // (key === 'ahli' && Array.isArray(value) && value.length === 0)||
          (key === 'pengacara' && Array.isArray(value) && value.length === 0)
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

  const handleSelectKetuaHakim = (e: any) => {
    setFormState({ ...formState, role_ketua_hakim: e?.value });
  };

  const handleSelectKetuaJaksa = (e: any) => {
    setFormState({ ...formState, role_ketua_oditur: e?.value });
  };

  const handleSelectHakim = (e: any) => {
    console.log('hakim', e);
    let arrayTemp: any = [];
    for (let i = 0; i < e.length; i++) {
      arrayTemp.push(e[i].value);
    }
    setFormState({ ...formState, hakim_id: arrayTemp });
  };

  const handleSelectJaksa = (e: any) => {
    console.log('jaksa', e);
    let arrayTemp: any = [];
    for (let i = 0; i < e.length; i++) {
      arrayTemp.push(e[i].value);
    }

    setFormState({ ...formState, oditur_penuntut_id: arrayTemp });
  };

  useEffect(() => {
    console.log('jaksa');
    if (isEdit || isDetail) {
      const jaksaMap = formState?.oditurHolder?.map(
        (item: any) => item?.oditur_penuntut_id
      );
      const ahliMap = formState.ahliHolder.map((item: any) => item.ahli_id);
      const saksiMap = formState.saksiHolder.map((item: any) => item.saksi_id);
      const pengacaraMap = formState.pengacaraHolder.map(
        (item: any) => item.nama_pengacara
      );
      // setFormState({ ...formState, jaksa_penuntut_id: jaksaMap });
      const hakimMap = formState.hakimHolder.map((item: any) => item.hakim_id);
      setFormState({
        ...formState,
        hakim_id: hakimMap,
        oditur_penuntut_id: jaksaMap,
        // role_ketua_hakim: formState.role_ketua_hakim_holder.hakim_id,
        role_ketua_oditur:
          formState?.role_ketua_oditur_holder?.oditur_penuntut_id,
        ahli: ahliMap,
        saksi: saksiMap,
        pengacara: pengacaraMap,
        pdf_file_base64: formState.link_dokumen_persidangan,
      });
    }
  }, []);

  useEffect(() => {
    if (getSaksi.length > 0) {
      const saksiValues = getSaksi.map((item: any) => item.value);
      setFormState((prevFormState: any) => ({
        ...prevFormState,
        saksi: saksiValues,
      }));
    }
  }, [getSaksi]);

  const handleSelectSaksi = (e: any) => {
    console.log(e, 'handleSelectSaksi');
    const selectedValues = e.map((item: any) => ({
      value: item.value,
      label: item.label,
    }));

    setFormState((prevFormState: any) => ({
      ...prevFormState,
      saksi: selectedValues.map((valueItem: any) => valueItem.value),
    }));

    setGetSaksi(selectedValues);
  };

  const handleSelectAhli = (e: any) => {
    let arrayTemp = [];
    for (let i = 0; i < e.length; i++) {
      arrayTemp.push(e[i].value);
    }

    setFormState({ ...formState, ahli: arrayTemp });
  };

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(formState, 'formState');
    console.log('SUBMIT', e);

    if (!validateForm()) return;
    setButtonLoad(true);
    console.log('formstateValidate', formState);
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

      reader.onloadend = () => {
        setFormState({ ...formState, pdf_file_base64: reader.result });
        console.log('Preview:', reader.result);
      };

      reader.readAsDataURL(file);
    }
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

  const handleKasus = async (e: any) => {
    setFormState({ ...formState, kasus_id: e.target.value });
    const saksiFilter = kasus.filter(
      (item: any) => item.kasus_id == e.target.value
    )[0];
    if (saksiFilter) {
      const saksiMap = saksiFilter.saksi.map((item: any) => ({
        label: item.nama_saksi,
        value: item.saksi_id,
      }));
      setGetSaksi(saksiMap);
      console.log('getSaksi', getSaksi);
    } else {
      setGetSaksi([]); // Set getSaksi to an empty array if no matching kasus is found
    }
  };
  useEffect(() => {
    Promise.all([
      getAllJenisSidang(),
      getAllJaksaPenuntut(),
      getAllHakim(),
      getAllKasus(),
      getAllPengadilanMiliter(),
      getAllAhli(),
      getAllSaksi(),
    ]).then(() => setIsLoading(false));
  }, []);

  const getAllJenisSidang = async () => {
    let params = {
      filter: '',
      pageSize: 1000,
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

  const getAllJaksaPenuntut = async () => {
    let params = {
      filter: '',
      pageSize: 1000,
    };

    try {
      const response = await apiReadJaksapenuntut(params, token);
      setJaksa(response.data.records);
      // console.log('JAKSA', response.data.records);
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
      pageSize: 1000,
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
      pageSize: 1000,
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

  const getAllKasus = async () => {
    let params = {
      filter: '',
      pageSize: 1000,
    };
    try {
      const response = await apiKasusRead(params, token);
      setKasus(response.data.records);
    } catch (e: any) {
      Alerts.fire({
        icon: 'error',
        title: e.message,
      });
    }
  };

  const getAllPengadilanMiliter = async () => {
    let params = {
      filter: '',
      pageSize: 1000,
    };
    try {
      const response = await apiPengadilanMiliterRead(params, token);
      setPengadilanMiliter(response.data.records);
    } catch (e: any) {
      Alerts.fire({
        icon: 'error',
        title: e.message,
      });
    }
  };

  const getAllAhli = async () => {
    let params = {
      filter: '',
      pageSize: 1000,
    };
    try {
      const response = await apiAhliRead(params, token);
      setAhli(response.data.records);
    } catch (e: any) {
      Alerts.fire({
        icon: 'error',
        title: e.message,
      });
    }
  };

  const getAllSaksi = async () => {
    let params = {
      filter: '',
      pageSize: 1000,
    };
    try {
      const response = await apiReadSaksi(params, token);
      setSaksi(response.data.records);
    } catch (e: any) {
      Alerts.fire({
        icon: 'error',
        title: e.message,
      });
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

  console.log('FORMSTATEMODAL', formState);

  // const handleDownloadDoc = () => {
  //   const url = `https://dev.transforme.co.id${formState.link_dokumen_persidangan}`; // Replace with the actual file URL
  //   // const url = window.URL.createObjectURL(`https://dev.transforme.co.id${formState.link_dokumen_persidangan}`);
  //   const filename:any = url.split('/').pop()
  //   const link = document.createElement('a');
  //   const nameFile = `${formState.nama_dokumen_persidangan}-${filename}`
  //   console.log(filename)
  //   link.style.display = 'none';
  //   link.href = url;
  //   link.setAttribute(nameFile, nameFile); // Set the filename for the download
  //   // link.download =`${formState.nama_dokumen_persidangan}-${filename}`
  //   document.body.appendChild(link);
  //   link.click();
  //    document.body.removeChild(link);
  //   URL.revokeObjectURL(url);
  // };

  const handleDownloadDoc = () => {
    // const url = `/proxy?url=https://dev.transforme.co.id${formState.link_dokumen_persidangan}`; // Ganti dengan URL file yang ingin Anda unduh

    // fetch(url)
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     const blobUrl = URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     const filename: any = url.split('/').pop();
    //     a.href = blobUrl;
    //     a.download = `${formState.nama_dokumen_persidangan}-${filename}`; // Ganti dengan nama file yang Anda inginkan
    //     a.style.display = 'none';
    //     document.body.appendChild(a);
    //     a.click();
    //     // document.body.removeChild(a);
    //     window.URL.revokeObjectURL(blobUrl);
    //   })
    //   .catch((error) => {
    //     console.error('Gagal mengunduh file:', error);
    //   });
    window.open(
      `https://dev.transforme.co.id${formState.link_dokumen_persidangan}`,
      '_blank'
    );

    // Optional: Customize the new window (size, position, etc.)
    // if (newWindow) {
    //   newWindow.resizeTo(500, 500);
    // }
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
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
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
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
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

                  {/* anggota Jaksa Penuntut */}
                  <div className="form-group w-full ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Anggota Oditur Penuntut
                    </label>
                    <Select
                      className="basic-multi-select"
                      isMulti
                      classNamePrefix="select"
                      defaultValue={
                        isEdit || isDetail
                          ? formState?.oditurHolder?.map((item: any) => ({
                              value: item.oditur_penuntut_id,
                              label: item.nama_oditur,
                            }))
                          : ''
                      }
                      placeholder={'Pilih oditur penuntut'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="oditur_penuntut_id"
                      styles={customStyles}
                      options={jaksa?.map((item: any) => ({
                        value: item.oditur_penuntut_id,
                        label: item.nama_oditur,
                      }))}
                      onChange={handleSelectJaksa}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'oditur_penuntut_id' ? 'Pilih jaksa' : ''
                      )}
                    </p>
                  </div>

                  {/* anggota Hakim */}
                  {/* <div className="form-group w-full ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Anggota Hakim
                    </label>
                    <Select
                      className="basic-multi-select"
                      isMulti
                      classNamePrefix="select"
                      defaultValue={
                        isEdit || isDetail
                          ? formState.hakimHolder.map((item: any) => ({
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
                      options={hakim.map((item: any) => ({
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
                  </div> */}

                  <div className="grid grid-cols-2 gap-4">
                    {/* Ketua Hakim */}
                    {/* <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Ketua Hakim
                      </label>
                      <Select
                        className="basic-select"
                        classNamePrefix="select"
                        // defaultValue={
                        //   isEdit || isDetail
                        //     ? {
                        //         value:
                        //           formState.role_ketua_hakim_holder.hakim_id,
                        //         label:
                        //           formState.role_ketua_hakim_holder.nama_hakim,
                        //       }
                        //     : formState.role_ketua_hakim
                        // }
                        placeholder={'Pilih ketua hakim'}
                        isClearable={true}
                        isSearchable={true}
                        isDisabled={isDetail}
                        name="role_ketua_hakim"
                        styles={customStyles}
                        options={hakim
                          .filter((hakim: any) =>
                            formState.hakim_id.includes(hakim.hakim_id)
                          )
                          .map((item: any) => ({
                            value: item.hakim_id,
                            label: item.nama_hakim,
                          }))}
                        onChange={handleSelectKetuaHakim}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'role_ketua_hakim' ? 'Pilih ketua hakim' : ''
                        )}
                      </p>
                    </div> */}
                    {/* Ketua Jaksa */}
                    <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Ketua Oditur
                      </label>
                      <Select
                        className="basic-select"
                        classNamePrefix="select"
                        defaultValue={
                          isEdit || isDetail
                            ? {
                                value:
                                  formState?.role_ketua_oditur_holder
                                    ?.oditur_penuntut_id,
                                label:
                                  formState?.role_ketua_oditur_holder
                                    ?.nama_oditur,
                              }
                            : //   ? formState?.sidang_jaksa
                              //       .filter((item: any) => item.ketua_jaksa=== '1')
                              //       .map((obj: any) => ({
                              //         value: obj.jaksa_penuntut_id,
                              //         label: obj.nama_jaksa,
                              //       }))
                              // ''
                              formState.oditur_penuntut_id
                        }
                        placeholder={'Pilih ketua oditur'}
                        isClearable={true}
                        isSearchable={true}
                        isDisabled={isDetail}
                        name="role_ketua_jaksa"
                        styles={customStyles}
                        options={
                          // isEdit ?
                          // jaksa
                          // .filter((jaksa: any) =>
                          //   formState.jaksa_penuntut_id_holder.includes(
                          //     jaksa.jaksa_penuntut_id)).map((item: any) => ({
                          //   value: item.jaksa_penuntut_id,
                          //   label: item.nama_jaksa,
                          // }))
                          // ? formState.sidang_jaksa.map((item: any) => ({
                          //     value: item.jaksa_id,
                          //     label: item.nama_jaksa,
                          //   }))
                          // :
                          jaksa
                            ?.filter((jaksa: any) =>
                              formState?.oditur_penuntut_id?.includes(
                                jaksa.oditur_penuntut_id
                              )
                            )
                            ?.map((item: any) => ({
                              value: item.oditur_penuntut_id,
                              label: item.nama_oditur,
                            }))
                        }
                        onChange={handleSelectKetuaJaksa}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'role_ketua_jaksa'
                            ? 'Pilih ketua oditur'
                            : ''
                        )}
                      </p>
                    </div>
                    {/* kasus sidang */}
                    <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Kasus
                      </label>
                      <select
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        onChange={handleKasus}
                        name="kasus_id"
                        value={formState.kasus_id}
                        disabled={isDetail}
                      >
                        <option value="" disabled>
                          Pilih kasus
                        </option>
                        {kasus.map((item: any) => (
                          <option value={item.kasus_id}>
                            {item.nama_kasus}
                          </option>
                        ))}
                      </select>
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'kasus_id' ? 'Pilih kasus' : ''
                        )}
                      </p>
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
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        onChange={handleChange}
                        placeholder="Juru sita"
                        name="juru_sita"
                        value={formState.juru_sita}
                        disabled={isDetail}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'juru_sita' ? 'Masukan juru sita' : ''
                        )}
                      </p>
                    </div>

                    {/* pengadilan militer */}
                    <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Pengadilan militer
                      </label>
                      <select
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        onChange={handleChange}
                        name="pengadilan_militer_id"
                        value={formState.pengadilan_militer_id}
                        disabled={isDetail}
                      >
                        <option value="" disabled>
                          Pilih pengadilan militer
                        </option>
                        {pengadilanMiliter.map((item: any) => (
                          <option value={item.pengadilan_militer_id}>
                            {item.nama_pengadilan_militer}
                          </option>
                        ))}
                      </select>
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'pengadilan_militer_id'
                            ? 'Pilih pengadilan militer'
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
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
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
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      onChange={handleChange}
                      placeholder="Agenda sidang"
                      name="agenda_sidang"
                      value={formState.agenda_sidang}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'agenda_sidang' ? 'Masukan agenda sidang' : ''
                      )}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 justify-normal">
                    {/* jadwal sidang */}
                    <div className="form-group w-full ">
                      <label
                        className="  block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Jadwal sidang
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        name="jadwal_sidang"
                        onChange={handleChange}
                        value={formState.jadwal_sidang}
                        disabled={isDetail}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'jadwal_sidang'
                            ? 'Masukan jadwal sidang'
                            : ''
                        )}
                      </p>
                    </div>

                    {/* perubahan jadwal sidang*/}
                    <div className="form-group w-full ">
                      <label
                        className="  block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Perubahan jadwal sidang
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        name="perubahan_jadwal_sidang"
                        onChange={handleChange}
                        value={formState.perubahan_jadwal_sidang}
                        disabled={isDetail}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'perubahan_jadwal_sidang'
                            ? 'Masukan perubahan jadwal'
                            : ''
                        )}
                      </p>
                    </div>

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

                  {/* Ahli */}
                  <div className="form-group w-full ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Ahli
                    </label>
                    <Select
                      className="basic-multi-select"
                      isMulti
                      classNamePrefix="select"
                      defaultValue={
                        isEdit || isDetail
                          ? formState.ahliHolder.map((item: any) => ({
                              value: item.ahli_id,
                              label:
                                item.nama_ahli +
                                ' ' +
                                '(' +
                                item.bidang_ahli +
                                ')',
                            }))
                          : formState.ahli_id
                      }
                      placeholder={'Pilih ahli'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="ahli"
                      styles={customStyles}
                      options={ahli.map((item: any) => ({
                        value: item.ahli_id,
                        label:
                          item.nama_ahli + ' ' + '(' + item.bidang_ahli + ')',
                      }))}
                      onChange={handleSelectAhli}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'ahli' ? 'Pilih ahli' : ''
                      )}
                    </p>
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
                      defaultValue={
                        isEdit || isDetail
                          ? formState.saksiHolder.map((item: any) => ({
                              value: item.saksi_id,
                              label: item.nama_saksi,
                            }))
                          : //   ? formState?.sidang_saksi.map((item: any) => ({
                            //       value: item.saksi_id,
                            //       label: item.nama_saksi,
                            //     }))
                            // formState.kasus_id
                            // ? formState.saksi.saksi.map((item: any) => ({
                            //     value: item.saksi_id,
                            //     label: item.nama_saksi,
                            //   }))
                            // getSaksi.length > 0
                            // ? getSaksi.map((item: any) => ({
                            //     value: item.value,
                            //     label: item.label,
                            //   })) :
                            formState.saksi_id
                      }
                      value={getSaksi.map((item: any) => ({
                        value: item.value,
                        label: item.label,
                      }))}
                      placeholder={'Pilih saksi'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="saksi"
                      styles={customStyles}
                      options={
                        // formState.kasus_id
                        //   ? getSaksi.map((item: any) => ({
                        //       value: item.value,
                        //       label: item.label,
                        //     })) :
                        saksi.map((item: any) => ({
                          value: item.saksi_id,
                          label: item.nama_saksi,
                        }))
                      }
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
                              placeholder={isDetail ? '' : 'Masukan pengacara'}
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
                          formState.pengacara?.length === 0 ? 'hidden' : 'block'
                        }`}
                      >
                        {/* {isDetail || isEdit
                          ? formState.pengacara?.map(
                              (item: any, index: any) => (
                                <div className="flex flex-row items-center">
                                  <p
                                    key={index}
                                    className="capitalize px-3 py-1 truncate w-full  rounded-md bg-boxdark border-[1px] border-slate-500  text-white"
                                  >
                                    {item}
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
                          :  */}
                        {formState.pengacara?.map((item: any, index: any) => (
                          <div className="flex flex-row items-center">
                            <p
                              key={index}
                              className="capitalize px-3 py-1 truncate w-full  rounded-md bg-boxdark border-[1px] border-slate-500  text-white"
                            >
                              {item}
                            </p>
                            <button
                              className={`${isDetail ? 'hidden' : 'block'}`}
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
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Vonis */}
                  <div className="grid grid-cols-1 ">
                    <p className="text-white text-sm font-medium">Vonis</p>
                    <div className=" grid grid-cols-3 gap-4 border px-2 py-2 rounded-lg border-blue-500">
                      {/* Vonis tahun */}
                      <div className="form-group w-full ">
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
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
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
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
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
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

                  {/* Nama Dokument */}
                  <div className="form-group w-full ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Dokumen
                    </label>
                    <input
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      onChange={handleChange}
                      placeholder="Nama Dokumen"
                      name="nama_dokumen_persidangan"
                      value={formState.nama_dokumen_persidangan}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_dokumen_persidangan'
                          ? 'Masukan nama dokumen'
                          : ''
                      )}
                    </p>
                  </div>

                  {/* Dokumentasi */}
                  <div className="grid grid-cols-1">
                    <div
                      // id="FileUpload"
                      className="relative  block w-full appearance-none overflow-hidden rounded border border-blue-500 bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                    >
                      <input
                        type="file"
                        id="fileUpload"
                        accept=".pdf, .doc, .docx"
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
                              type="button"
                              onClick={handleDownloadDoc}
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
                          <p className="mt-1.5">Pdf,doc dan docx </p>
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
