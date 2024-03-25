import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import Select from 'react-select';
import { apiReadKasus } from '../../../services/api';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import utc from 'dayjs/plugin/utc';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Alerts } from './AlertPenyidikan';
import { Error403Message } from '../../../utils/constants';

dayjs.locale('id');
dayjs.extend(utc);
dayjs.extend(timezone);

export const AddPenyidikanModal = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  token,
}: any) => {
  const [formState, setFormState] = useState({
    penyidikan_id: defaultValue?.penyidikan_id,
    kasus_id: defaultValue?.kasus_id,
    nomor_penyidikan: defaultValue?.nomor_penyidikan,
    nama_kasus: defaultValue?.nama_kasus,
    agenda_penyidikan: defaultValue?.agenda_penyidikan,
    waktu_dimulai_penyidikan: defaultValue?.waktu_dimulai_penyidikan,
    waktu_selesai_penyidikan: defaultValue?.waktu_selesai_penyidikan,
    wbp_profile_id: defaultValue?.wbp_profile_id,
    nomor_kasus: defaultValue?.no_kasus,
    saksi_id: defaultValue?.saksi_id,
    oditur_penyidik_id: defaultValue?.oditur_penyidik_id,
    nama_jenis_perkara: defaultValue?.nama_jenis_perkara,
    nama_kategori_perkara: defaultValue?.nama_kategori_perkara,
    nrp_wbp: defaultValue?.nrp_wbp,
    zona_waktu: defaultValue?.zona_waktu,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [dataKasus, setDataKasus] = useState<any[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const params = {
      pageSize: Number.MAX_SAFE_INTEGER,
    };
    const fetchData = async () => {
      try {
        const kasus = await apiReadKasus(params, token);
        setDataKasus(kasus.data.records);
        setIsLoading(false);
        const timeZone = dayjs().format('Z');
        let zonaWaktu;
        switch (timeZone) {
          case '+07:00':
            zonaWaktu = 'WIB';
            break;
          case '+08:00':
            zonaWaktu = 'WITA';
            break;
          case '+09:00':
            zonaWaktu = 'WIT';
            break;
          default:
            zonaWaktu = 'Zona Waktu Tidak Dikenal';
        }
        if (!formState?.zona_waktu) {
          setFormState({
            ...formState,
            zona_waktu: zonaWaktu,
          });
        }
      } catch (e: any) {
        setIsLoading(false);
        if (e.response.status === 403) {
          navigate('/auth/signin', {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? 'warning' : 'error',
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      }
    };
    fetchData();
  }, []);

  const timezone = dayjs();
  console.log('timezone', timezone.format('Z'));

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== 'wbp_profile_id' &&
        key !== 'penyidikan_id' &&
        key !== 'nrp_wbp' &&
        key !== 'no_kasus' &&
        key !== 'nomor_kasus' &&
        key !== 'saksi_id'
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

  //select Penyidik
  const selectedKasus = dataKasus?.find(
    (item: any) => item.kasus_id === formState.kasus_id,
  );

  const penyidikOptions: any = selectedKasus
    ? selectedKasus?.oditur_penyidik?.map((item: any) => ({
        value: item.oditur_penyidik_id,
        label: item.nama_oditur,
      }))
    : [];

  const [dataKasusSelect, setDataKasusSelect] = useState<any>();

  const penyidikOptionsValue = {
    value: defaultValue?.oditur_penyidik_id,
    label: defaultValue?.nama_oditur,
  };

  const onChangePenyidik = (e: any) => {
    setFormState({ ...formState, oditur_penyidik_id: e.value });
  };

  // yg terlibat
  const terlibatOptions = dataKasusSelect
    ? [
        ...dataKasusSelect?.saksi?.map((item: any) => ({
          value: item.saksi_id,
          label: `${item.nama_saksi} (saksi)`,
        })),
        ...dataKasusSelect?.wbp_profile?.map((item: any) => ({
          value: item.wbp_profile_id,
          label: `${item.nama} (tersangka)`,
        })),
      ]
    : [];

  const terlibatOptionsValue = {
    value: defaultValue?.saksi_id || defaultValue?.wbp_profile_id,
    label: defaultValue?.nama_saksi || defaultValue?.nama_wbp,
  };

  const handleSelectPihakTerlibat = (e: any) => {
    const selectedOption = terlibatOptions.find(
      (option) => option.value === e.value,
    );

    if (selectedOption?.label.includes('(saksi)')) {
      setFormState({
        ...formState,
        saksi_id: e.value,
        wbp_profile_id: null,
        nrp_wbp: '',
      });
    } else {
      // Jika yang dipilih adalah tersangka, ambil data terkait
      const tersangkaData = dataKasusSelect?.wbp_profile?.find(
        (tersangka: any) => tersangka.wbp_profile_id === e.value,
      );

      if (tersangkaData) {
        setFormState({
          ...formState,
          wbp_profile_id: e.value,
          saksi_id: null,
          nrp_wbp: tersangkaData.nrp || '', // Sesuaikan dengan struktur data yang sesuai
        });
      } else {
        // Handle jika data tersangkaData tidak ditemukan
        console.error('Data Tersangka tidak ditemukan.');
      }
    }
  };

  //select kasus
  const kasusOptions = dataKasus?.map((item: any) => ({
    value: item.kasus_id,
    label: item.nomor_kasus,
  }));

  const kasusOptionsValue = {
    value: defaultValue?.kasus_id,
    label: defaultValue?.nomor_kasus,
  };

  const onChangeKasus = (e: any) => {
    const kasusFilter: any = dataKasus.find(
      (item: any) => item.kasus_id === e?.value,
    );
    setDataKasusSelect(kasusFilter);
    setFormState({
      ...formState,
      kasus_id: e?.value,
      nomor_kasus: kasusFilter ? kasusFilter.nomor_kasus : '',
      nama_kasus: kasusFilter ? kasusFilter.nama_kasus : '',
      nama_jenis_perkara: kasusFilter ? kasusFilter.nama_jenis_perkara : '',
      nama_kategori_perkara: kasusFilter
        ? kasusFilter.nama_kategori_perkara
        : '',
    });
  };

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    console.log('3333', e.target.value);
  };

  const handleChangeWaktu = (e: any) => {
    console.log('1213', e);

    const timeZone = dayjs().format('Z');
    let zonaWaktu;
    switch (timeZone) {
      case '+07:00':
        zonaWaktu = 'WIB';
        break;
      case '+08:00':
        zonaWaktu = 'WITA';
        break;
      case '+09:00':
        zonaWaktu = 'WIT';
        break;
      default:
        zonaWaktu = 'Zona Waktu Tidak Dikenal';
    }
    setFormState({
      ...formState,
      waktu_dimulai_penyidikan: dayjs(e).format('YYYY-MM-DDTHH:mm'),
      zona_waktu: zonaWaktu,
    });
  };
  const handleChangeWaktuSelesai = (e: any) => {
    try {
      const timeZone = dayjs().format('Z');
      let zonaWaktu;
      switch (timeZone) {
        case '+07:00':
          zonaWaktu = 'WIB';
          break;
        case '+08:00':
          zonaWaktu = 'WITA';
          break;
        case '+09:00':
          zonaWaktu = 'WIT';
          break;
        default:
          zonaWaktu = 'Zona Waktu Tidak Dikenal';
      }
      setFormState({
        ...formState,
        waktu_selesai_penyidikan: dayjs(e).format('YYYY-MM-DDTHH:mm'),
        zona_waktu: zonaWaktu,
      });
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '.input-nomor',
          popover: {
            title: 'Nomor Penyidikan',
            description: 'Isi nomor penyidikan',
          },
        },
        {
          element: '#p-kasus',
          popover: {
            title: 'Nomor Kasus',
            description: 'Pilih nomor kasus yang diinginkan',
          },
        },
        {
          element: '.input-nama',
          popover: { title: 'Nama Kasus', description: 'Isi nama kasus' },
        },
        {
          element: '.input-perkara',
          popover: {
            title: 'Jenis Perkara',
            description: 'Isi jenis perkara',
          },
        },
        {
          element: '.input-kategori',
          popover: {
            title: 'Kategori Perkara',
            description: 'Isi kategori perkara',
          },
        },
        {
          element: '#p-terlibat',
          popover: {
            title: 'Pihak Terlibat',
            description: 'Pilih pihak terlibat yang diinginkan',
          },
        },
        {
          element: '.input-nrp',
          popover: {
            title: 'NRP',
            description: 'Isi NRP',
          },
        },
        {
          element: '#p-penyidikan',
          popover: {
            title: 'Penyidikan',
            description: 'Pilih penyidikan yang diinginkan',
          },
        },
        {
          element: '.input-waktu',
          popover: {
            title: 'Waktu Mulai Penyidikan',
            description: 'Menentukan tanggal waktu mulai penyidikan',
          },
        },
        {
          element: '.input-selesai',
          popover: {
            title: 'Waktu Selesai Penyidikan',
            description: 'Menentukan tanggal waktu selesai penyidikan',
          },
        },
        {
          element: '.t-agenda',
          popover: {
            title: 'Agenda Penyidikan',
            description: 'Isi agenda penyidikan dengan lengkap',
          },
        },
        {
          element: `${isEdit ? '#b-ubah' : '#b-tambah'}`,
          popover: {
            title: `${isEdit ? 'Ubah' : 'Tambah'} Penyidikan`,
            description: `Klik untuk ${isEdit ? 'mengubah' : 'menambahkan'} penyidikan`,
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setButtonLoad(true);
    onSubmit(formState).then(() => setButtonLoad(false));
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

  //react Select
  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: '100%',
    }),
    control: (provided: any) => ({
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
      fontSize: '16px',
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
      fontSize: '16px',
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
  const ExampleCustomTimeInput = ({ date, value, onChange }: any) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ border: 'solid 1px pink' }}
    />
  );

  return (
    <div>
      <div style={modalStyles.backdrop}></div>
      <div
        ref={modalContainerRef}
        style={modalStyles.modalContainer}
        className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
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
                <AiOutlineLoading className="animate-spin h-20 w-20 text-white " />
              </div>
            </div>
          ) : (
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <div className="w-full flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {isDetail
                      ? 'Detail Data Penyidikan'
                      : isEdit
                        ? 'Edit Data Penyidikan'
                        : 'Tambah Data Penyidikan'}
                  </h3>
                </div>

                {/* <div className="w-10"> */}
                {isDetail ? null : isEdit ? (
                  <button className="pr-80">
                    <HiQuestionMarkCircle
                      values={filter}
                      aria-placeholder="Show tutorial"
                      // onChange={}
                      onClick={handleClickTutorial}
                    />
                  </button>
                ) : (
                  <button className="pr-70">
                    <HiQuestionMarkCircle
                      values={filter}
                      aria-placeholder="Show tutorial"
                      // onChange={}
                      onClick={handleClickTutorial}
                    />
                  </button>
                )}
                {/* </div> */}

                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="form-group w-full h-22 mt-4">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nomor Penyidikan
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-nomor"
                      name="nomor_penyidikan"
                      onChange={handleChange}
                      value={formState.nomor_penyidikan}
                      disabled
                    />
                    <p className="error-text">
                      {errors?.map((item) =>
                        item === 'nomor_penyidikan'
                          ? 'Masukan Nomor Penyidikan'
                          : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group h-22 mt-4 w-full">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nomor Kasus
                    </label>
                    <Select
                      placeholder="Nomor Kasus"
                      isDisabled={isDetail}
                      onChange={onChangeKasus}
                      defaultValue={kasusOptionsValue}
                      options={kasusOptions}
                      styles={customStyles}
                      id="p-kasus"
                    />
                    <p className="error-text">
                      {errors?.map((item) =>
                        item === 'kasus_id' ? 'Masukan Nomor Kasus' : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Kasus
                    </label>
                    <input
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-nama"
                      name="nama_kasus"
                      placeholder="Nama Kasus"
                      onChange={handleChange}
                      value={formState.nama_kasus}
                      // disabled={isDetail}
                      disabled
                    />
                    <p className="error-text">
                      {errors?.map((item) =>
                        item === 'nama_kasus' ? 'Masukan Nama Kasus' : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Jenis Perkara
                    </label>
                    <input
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-perkara"
                      name="nama_jenis_perkara"
                      placeholder="Jenis Perkara"
                      onChange={handleChange}
                      value={formState.nama_jenis_perkara}
                      // disabled={isDetail}
                      disabled
                    />
                    <p className="error-text">
                      {errors?.map((item) =>
                        item === 'nama_jenis_perkara'
                          ? 'Masukan Jenis Perkara'
                          : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Kategori Perkara
                    </label>
                    <input
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-kategori"
                      name="nama_kategori_perkara"
                      placeholder="Kategori Perkara"
                      onChange={handleChange}
                      value={formState.nama_kategori_perkara}
                      // disabled={isDetail}
                      disabled
                    />
                    <p className="error-text">
                      {errors?.map((item) =>
                        item === 'nama_kategori_perkara'
                          ? 'Masukan Kategori Perkara'
                          : '',
                      )}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group w-full h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Pihak Terlibat
                    </label>
                    <Select
                      className="capitalize"
                      options={terlibatOptions}
                      isDisabled={isDetail}
                      defaultValue={terlibatOptionsValue}
                      onChange={handleSelectPihakTerlibat}
                      placeholder="Pihak Terlibat"
                      styles={customStyles}
                      id="p-terlibat"
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama' ? 'Masukan Tersangka' : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      NRP
                    </label>
                    <input
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-nrp"
                      name="nrp_wbp"
                      placeholder="NRP"
                      onChange={handleChange}
                      value={formState.nrp_wbp}
                      // disabled={isDetail}
                      disabled
                    />
                    <p className="error-text">
                      {errors?.map((item) =>
                        item === 'nrp_wbp' ? 'Masukan NRP' : '',
                      )}
                    </p>
                  </div>
                </div>
                <div className="form-group w-full h-22">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Penyidik
                  </label>
                  <Select
                    onChange={onChangePenyidik}
                    isDisabled={isDetail}
                    defaultValue={penyidikOptionsValue}
                    options={penyidikOptions}
                    placeholder="Penyidik"
                    styles={customStyles}
                    id="p-penyidikan"
                  />
                  {/* <p className="error-text">
                    {errors?.map((item) =>
                      item === 'wbp_profile_id' ? 'Masukan Penyidik' : ''
                    )}
                  </p> */}
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="form-group w-full h-22">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Waktu Mulai Penyidikan
                    </label>

                    <div className="flex items-center justify-center">
                      <DatePicker
                        selected={dayjs(
                          formState.waktu_dimulai_penyidikan,
                        ).toDate()}
                        onChange={handleChangeWaktu}
                        dateFormat="dd/MM/yyyy HH:mm"
                        timeCaption="Pilih Waktu" // Ganti dengan caption waktu yang diinginkan
                        showTimeInput
                        timeInputLabel="Waktu" // Ganti dengan label waktu yang diinginkan
                        timeFormat="HH:mm" // Ganti dengan format waktu yang diinginkan
                        disabled={false} // Ganti dengan kondisi yang sesuai
                        customTimeInput={<ExampleCustomTimeInput />}
                        className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                        locale="id"
                      />

                      <input
                        type="text"
                        value={formState?.zona_waktu}
                        disabled
                        className="w-1/4 flex justify-center capitalize rounded border border-stroke p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <p className="error-text">
                      {errors?.map((item) =>
                        item === 'waktu_dimulai_penyidikan'
                          ? 'Masukan Waktu Mulai Penyidikan'
                          : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Waktu Selesai Penyidikan
                    </label>

                    <div className="flex items-center justify-center">
                      <DatePicker
                        selected={dayjs(
                          formState.waktu_selesai_penyidikan,
                        ).toDate()}
                        onChange={(date) => handleChangeWaktuSelesai(date)}
                        dateFormat="dd/MM/yyyy HH:mm"
                        timeCaption="Pilih Waktu" // Ganti dengan caption waktu yang diinginkan
                        showTimeInput
                        timeInputLabel="Waktu" // Ganti dengan label waktu yang diinginkan
                        timeFormat="HH:mm" // Ganti dengan format waktu yang diinginkan
                        disabled={false} // Ganti dengan kondisi yang sesuai
                        customTimeInput={<ExampleCustomTimeInput />}
                        className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                        locale="id"
                      />
                      <input
                        type="text"
                        value={formState?.zona_waktu}
                        disabled
                        className="w-1/4 flex justify-center capitalize rounded border border-stroke p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <p className="error-text">
                      {errors?.map((item) =>
                        item === 'waktu_selesai_penyidikan'
                          ? 'Masukan Waktu Selesai Penyidikan'
                          : '',
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1">
                  <div className="form-group w-full h-29 relative">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Agenda Penyidikan
                    </label>
                    <textarea
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary t-agenda"
                      name="agenda_penyidikan"
                      id="textArea"
                      placeholder="Alasan Penyidikan"
                      onChange={handleChange}
                      value={formState.agenda_penyidikan}
                      disabled={isDetail}
                    />
                    <p className="error-text absolute bottom-1">
                      {errors?.map((item) =>
                        item === 'agenda_penyidikan'
                          ? 'Masukan Alasan Penyidikan'
                          : '',
                      )}
                    </p>
                  </div>
                </div>

                <div className={` ${isDetail ? 'h-auto' : 'h-15'}  mt-3`}>
                  {isDetail ? null : isEdit ? (
                    <button
                      className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                        buttonLoad ? 'bg-slate-400' : ''
                      }`}
                      type="submit"
                      disabled={buttonLoad}
                      id="b-ubah"
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
                      Ubah Penyidikan
                    </button>
                  ) : (
                    <button
                      className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                        buttonLoad ? 'bg-slate-400' : ''
                      }`}
                      type="submit"
                      disabled={buttonLoad}
                      id="b-tambah"
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
                      Tambah Penyidikan
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
