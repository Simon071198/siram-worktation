import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { Alerts } from './AlertDaftarKasus';
import {
  apiReadAllWBP,
  apiReadJaksaPenyidik,
  apiReadSaksi,
  apiReadStatusWBP,
  apiReadjenisperkara,
} from '../../services/api';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

dayjs.extend(utc);
dayjs.extend(timezone);


interface WBP {
  wbp_profile_id: string;
  nama: string;
  nrp: string;
}

export const AddDaftarKasusModal = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  token,
}: any) => {
  const [formState, setFormState] = useState<any>({
    nama_kasus: '',
    nomor_kasus: defaultValue?.nomor_kasus,
    lokasi_kasus: '',
    jenis_perkara_id: '',
    kategori_perkara_id: '',
    waktu_kejadian: '',
    waktu_pelaporan_kasus: '',
    wbp_profile_ids: [],
    keterangans: [],
    role_ketua_oditur_ids: '',
    oditur_penyidik_id: [],
    saksi_id: [],
    keteranganSaksis: [],
    zona_waktu:''
  });
  // const lokasi_lemasmil_id = localStorage.getItem('lokasi_lemasmil_id')

  //state

  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const [DataWBP, setDataWBP] = useState<WBP[]>([]);
  const [dataStatusWBP, setDataStatusWBP] = useState([]);
  const [dataOditurPenyidik, setDataOditurPenyidik] = useState([]);
  const [dataJenisPerkara, setDataJenisPerkara] = useState<any[]>([]);
  const [dataSaksi, setDataSaksi] = useState([]);

  const [pihakTerlibat, setPihakTerlibat] = useState([]);

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (!value) {
        errorFields.push(key);
      }
      if (
        key === 'wbp_profile_ids' &&
        Array.isArray(value) &&
        value.length === 0
      ) {
        errorFields.push(key);
      }

      if (key === 'keterangans' && Array.isArray(value) && value.length === 0) {
        errorFields.push(key);
      }
      if (key === 'saksi_id' && Array.isArray(value) && value.length === 0) {
        errorFields.push(key);
      }

      if (
        key === 'keteranganSaksis' &&
        Array.isArray(value) &&
        value.length === 0
      ) {
        errorFields.push(key);
      }
    }

    if (errorFields.length > 0) {
      setErrors(errorFields);
      return false;
    }

    setErrors([]);
    return true;
  };

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState).then(() => setButtonLoad(false));
  };

  const jenisPerkara = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadjenisperkara(params, token)
      .then((res) => {
        setDataJenisPerkara(res.data.records);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.massage,
        }),
      );
  };

  const Oditur = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadJaksaPenyidik(params, token)
      .then((res) => {
        setDataOditurPenyidik(res.data.records);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.massage,
        }),
      );
  };

  useEffect(() => {
    Promise.all([
      tersangka(),
      Saksi(),
      status(),
      jenisPerkara(),
      Oditur(),
    ]).then(() => {
      setIsLoading(false);
    });
  }, []);

  const tersangka = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadAllWBP(params, token)
      .then((res) => {
        setDataWBP(res.data.records);
        const tersangka = res.data.records?.map((item: any) => ({
          value: item.wbp_profile_id,
          label: `${item.nama} (Tersangka)`,
        }));
        setPihakTerlibat((prevPihakTerlibat) =>
          prevPihakTerlibat.concat(tersangka),
        );
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.massage,
        }),
      );
  };

  const Saksi = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadSaksi(params, token)
      .then((res) => {
        setDataSaksi(res.data.records);
        console.log('responsaksi', res.data.records);

        const Saksi = res.data.records?.map((item: any) => ({
          value: item.saksi_id,
          label: `${item.nama_saksi} (Saksi)`,
        }));
        setPihakTerlibat((prevPihaklibat) => prevPihaklibat.concat(Saksi));
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.massage,
        }),
      );
  };

  const status = async () => {
    let params = {};
    await apiReadStatusWBP(params, token)
      .then((res) => {
        setDataStatusWBP(res.data.records);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.massage,
        }),
      );
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
      height: '35px',
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
      color: 'grey',
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

  const [ketuaOditurPenyidik, setKetuaOditurPenyidik] = useState([
    {
      value: '',
      label: '',
    },
  ]);
  const OditurPenyidikOpstions = dataOditurPenyidik.map((item: any) => ({
    value: item.oditur_penyidik_id,
    label: item.nama_oditur,
  }));

  const handleSelectOditurPenyidik = (e: any) => {
    let arrayTemp: any = [];
    let arrayAnggota: any = [];
    for (let i = 0; i < e?.length; i++) {
      arrayTemp.push(e[i].value);
      arrayAnggota.push(e[i]);
    }
    setFormState({ ...formState, oditur_penyidik_id: arrayTemp });
    setKetuaOditurPenyidik(arrayAnggota);
  };

  const handleSelectKetuaOditur = (e: any) => {
    setFormState({ ...formState, role_ketua_oditur_ids: e.value });
  };

  const jenisPerkaraOpstions = dataJenisPerkara.map((item: any) => ({
    value: item.jenis_perkara_id,
    label: item.nama_jenis_perkara,
  }));

  const [selectSaksi, setSelectSaksi] = useState([]);
  const [selectTersangka, setSelectTersangka] = useState([]);

  const handleSelectPihakTerlibat = (e: any) => {
    let arrayTersangka: any = [];
    let arraSaksi: any = [];
    let arraySaksiOptions: any = [];
    let arrayTersangkaOptions: any = [];
    for (let i = 0; i < e?.length; i++) {
      if (e[i].label.includes('(Tersangka)')) {
        arrayTersangka.push(e[i].value);
        arrayTersangkaOptions.push(e[i]);
      } else if (e[i].label.includes('(Saksi)')) {
        arraSaksi.push(e[i].value);
        arraySaksiOptions.push(e[i]);
      }
    }
    setFormState({
      ...formState,
      wbp_profile_ids: arrayTersangka,
      saksi_id: arraSaksi,
    });
    setSelectSaksi(arraySaksiOptions);
    setSelectTersangka(arrayTersangkaOptions);
  };

  const handleChangeKeteranganTersangka = (e: any, index: any) => {
    const newKeteranganSaksi = [...formState.keterangans]; // Salin array keterangan yang ada
    newKeteranganSaksi[index] = e.target.value; // Perbarui nilai keterangan sesuai dengan indeks elemen
    setFormState({
      ...formState,
      keterangans: newKeteranganSaksi, // Set array keterangan yang diperbarui
    });
  };
  const handleChangeKeterangan = (e: any, index: any) => {
    const newKeteranganSaksi = [...formState.keteranganSaksis]; // Salin array keterangan yang ada
    newKeteranganSaksi[index] = e.target.value; // Perbarui nilai keterangan sesuai dengan indeks elemen
    setFormState({
      ...formState,
      keteranganSaksis: newKeteranganSaksi, // Set array keterangan yang diperbarui
    });
  };

  const handleSelectPerkara = (e: any) => {
    const kategoriPerkara = dataJenisPerkara?.filter(
      (item: any) => item.jenis_perkara_id === e.value,
    );
    const kategoriPerkaraId =
      kategoriPerkara?.length > 0
        ? kategoriPerkara[0]?.kategori_perkara_id
        : '';
    setFormState({
      ...formState,
      jenis_perkara_id: e.value,
      kategori_perkara_id: kategoriPerkaraId,
    });
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group w-full">
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
                      defaultValue={formState.nomor_kasus}
                      disabled={isDetail}
                    />
                    <div className="h-2">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'nomor_kasus' ? 'Masukan Nomor Kasus' : '',
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="form-group w-full">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Kasus
                    </label>
                    <input
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="nama_kasus"
                      placeholder="Nama Kasus"
                      onChange={handleChange}
                      disabled={isDetail}
                    />
                    <div className="h-2">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'nama_kasus' ? 'Masukan Nama Kasus' : '',
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="form-group w-full">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Jenis Perkara
                    </label>
                    <Select
                      className="capitalize"
                      options={jenisPerkaraOpstions}
                      isDisabled={isDetail}
                      onChange={handleSelectPerkara}
                      placeholder="Pilih Jenis Perkara"
                      styles={customStyles}
                    />
                    <div className="h-2">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'lokasi_kasus' ? 'Masukan Lokasi Kasus' : '',
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="form-group w-full">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Lokasi Kasus
                    </label>
                    <input
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="lokasi_kasus"
                      placeholder="Lokasi Kasus"
                      onChange={handleChange}
                      disabled={isDetail}
                    />
                    <div className="h-2">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'lokasi_kasus' ? 'Masukan Lokasi Kasus' : '',
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="form-group w-full">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Tanggal Kejadian Kasus
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="waktu_kejadian"
                      placeholder="Tanggal Kejadian Kasus"
                      onChange={handleChange}
                      disabled={isDetail}
                    />
                    <div className="h-2">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'waktu_kejadian'
                            ? 'Masukan Tanggal Kejadian Kasus'
                            : '',
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="form-group w-full">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Tanggal Pelaporan Kasus
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="waktu_pelaporan_kasus"
                      placeholder="Tanggal Pelaporan Kasus"
                      onChange={handleChange}
                      disabled={isDetail}
                    />
                    <div className="h-2">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'waktu_pelaporan_kasus'
                            ? 'Masukan Tanggal Pelaporan Kasus'
                            : '',
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`${isDetail ? 'block mt-4' : 'hidden'}`}>
                  <div className="form-group w-full">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Jumlah Penyidikan
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="waktu_pelaporan_kasus"
                      placeholder="Jumlah Penyidikan"
                      onChange={handleChange}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'waktu_pelaporan_kasus'
                          ? 'Masukan Jumlah Penyidikan'
                          : '',
                      )}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="form-group w-full">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Oditur Penyidik
                    </label>
                    <Select
                      className="capitalize"
                      isMulti
                      options={OditurPenyidikOpstions}
                      isDisabled={isDetail}
                      onChange={handleSelectOditurPenyidik}
                      placeholder="Pilih Oditur Penyidik"
                      styles={customStyles}
                    />
                    <div className="h-2">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'nama' ? 'Masukan Tersangka' : '',
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Ketua Oditur Penyidik
                    </label>
                    <Select
                      className="capitalize"
                      options={ketuaOditurPenyidik}
                      isDisabled={isDetail}
                      onChange={handleSelectKetuaOditur}
                      placeholder="Pilih Ketua Oditur"
                      styles={customStyles}
                    />
                    <div className="h-2">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'role_ketua_oditur_ids'
                            ? 'Pilih Ketua Oditur Penyidik'
                            : '',
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="form-group w-full mt-3">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Pihak Terlibat
                  </label>
                  <Select
                    className="capitalize"
                    isMulti
                    options={pihakTerlibat}
                    isDisabled={isDetail}
                    onChange={handleSelectPihakTerlibat}
                    placeholder="Pihak Terlibat"
                    styles={customStyles}
                  />
                  <div className="h-2">
                    <p className="error-text">
                      {errors.includes('saksi_id') ||
                      errors.includes('wbp_profile_ids')
                        ? `${
                            errors.includes('wbp_profile_ids')
                              ? 'Tersangka'
                              : ''
                          } ${
                            errors.includes('saksi_id') &&
                            errors.includes('wbp_profile_ids')
                              ? 'Dan'
                              : ''
                          } ${
                            errors.includes('saksi_id') ? 'Saksi' : ''
                          } Belum di Pilih`
                        : ''}
                    </p>
                  </div>
                </div>
                {selectTersangka.length === 0 ? null : (
                  <>
                    <label
                      className=" mt-4 block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Tersangka
                    </label>

                    <div className="flex items-center mt-2 pl-4 bg-slate-700 rounded-t">
                      <div className="form-group w-2/6">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Nama Tersangka
                        </label>
                      </div>

                      <div className="form-group w-4/6 ">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Keterangan
                        </label>
                      </div>
                    </div>
                    <div className="h-32 overflow-y-auto bg-slate-800 rounded-b">
                      {selectTersangka.map((item: any, index: number) => {
                        return (
                          <div
                            className="flex items-center mt-2 bg-slate-800 py-2 pl-4"
                            key={index}
                          >
                            <div className="form-group w-2/6">
                              <label
                                className="capitalize block text-sm font-medium text-black dark:text-white"
                                htmlFor={`keterangans-${index}`}
                              >
                                {item.label}
                              </label>
                            </div>

                            <div className="form-group w-4/6 flex items-center mr-2">
                              <input
                                id={`keterangans-${index}`}
                                className="w-full rounded border border-stroke py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                                placeholder={`${
                                  errors.includes('keterangans')
                                    ? 'Keterangan Belum Di Isi'
                                    : 'Keterangan'
                                }`}
                                onChange={(e) =>
                                  handleChangeKeteranganTersangka(e, index)
                                } // Menggunakan parameter tambahan index
                                disabled={isDetail}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                {selectSaksi.length === 0 ? null : (
                  <>
                    <label
                      className=" mt-4 block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Saksi
                    </label>

                    <div className="flex items-center mt-2 pl-4 bg-slate-700 rounded-t">
                      <div className="form-group w-2/6">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Nama Saksi
                        </label>
                      </div>

                      <div className="form-group w-4/6 ">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Keterangan Saksi
                        </label>
                      </div>
                    </div>
                    <div className="h-32 overflow-y-auto bg-slate-800 rounded-b">
                      {selectSaksi.map((item: any, index: number) => {
                        return (
                          <div
                            className="flex items-center mt-2 bg-slate-800 py-2 pl-4"
                            key={index}
                          >
                            <div className="form-group w-2/6">
                              <label
                                className="capitalize block text-sm font-medium text-black dark:text-white"
                                htmlFor={`keterangan-${index}`}
                              >
                                {item.label}
                              </label>
                            </div>

                            <div className="form-group w-4/6 flex items-center mr-2">
                              <input
                                id={`keterangan-${index}`}
                                className="w-full rounded border border-stroke py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                                placeholder={`${
                                  errors.includes('keteranganSaksis')
                                    ? 'Keterangan Belum Di Isi'
                                    : 'Keterangan Saksi'
                                }`}
                                onChange={(e) =>
                                  handleChangeKeterangan(e, index)
                                } // Menggunakan parameter tambahan index
                                disabled={isDetail}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {errors.filter((item: string) => item.startsWith('INVALID_ID'))
                  .length > 0 && (
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
                    Ubah Data Kasus
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
