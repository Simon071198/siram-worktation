import React, { useState, useEffect, useRef } from 'react';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
// import { useForm, Controller } from 'react-hook-form';
import {
  apiReadAllWBP,
  apiReadAllRuanganOtmil,
  apiReadAlllokasiOtmil,
  apiReadZona,
  apiReadAllEvent,
} from '../../../services/api';
import { Alerts } from './AlertEvent';
// import Select from 'react-select/dist/declarations/src/Select';
import Select from 'react-select';
import dayjs from 'dayjs';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Error403Message } from '../../../utils/constants';

interface AddVisitorModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
}
interface ruangan {
  ruangan_otmil_id: string;
  lokasi_otmil_id: string;
  nama_ruangan_otmil: string;
  jenis_ruangan_otmil: string;
  nama_lokasi_otmil: string;
  zona_id: string;
  nama_zona: string;
}
interface lokasi {
  nama_lokasi_otmil: string;
}

interface namawbpDetail {
  wbp_profile_id: string;
  wbp_nama: string;
}

interface namazona {
  zona_id: string;
  nama_zona: string;
}

export const AddEventModal: React.FC<AddVisitorModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formState, setFormState] = useState({
    kegiatan_id: defaultValue?.kegiatan_id ?? '',
    nama_kegiatan: defaultValue?.nama_kegiatan ?? '',
    status_kegiatan: defaultValue?.status_kegiatan ?? '',
    waktu_mulai_kegiatan: defaultValue?.waktu_mulai_kegiatan ?? '',
    waktu_selesai_kegiatan: defaultValue?.waktu_selesai_kegiatan ?? '',
    peserta: isEdit
      ? defaultValue?.peserta.map((item: any) => item.wbp_profile_id)
      : [],
    lokasi_otmil_id: defaultValue?.lokasi_otmil_id ?? '',
    ruangan_otmil_id: defaultValue?.ruangan_otmil_id ?? '',
    nama_ruangan_otmil: defaultValue?.nama_ruangan_otmil ?? '',
    jenis_ruangan_otmil: defaultValue?.jenis_ruangan_otmil ?? '',
    nama_lokasi_otmil: defaultValue?.nama_lokasi_otmil ?? '',
    nama_zona: defaultValue?.status_zona_otmil ?? '',
    zona_waktu: defaultValue?.zona_waktu ?? '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [NamaZona, setNamaZona] = useState<namazona[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ruanganotmil, setruanganotmil] = useState<ruangan[]>([]);
  const [lokasiotmil, setlokasiotmil] = useState<lokasi[]>([]);
  const [sourceList, setSourceList] = useState<namawbpDetail[]>([]);
  const [targetList, setTargetList] = useState<namawbpDetail[]>([]);
  const [selectedSourceItems, setSelectedSourceItems] = useState<string[]>([]);
  const [selectedTargetItems, setSelectedTargetItems] = useState<string[]>([]);
  const [dataEvent, setDataEvent] = useState([]);
  const [filter, setFilter] = useState('');

  const tokenItem = localStorage.getItem('token');
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

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

  const validateForm = () => {
    let errorFields = [];
    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== 'kegiatan_id' &&
        key !== 'lokasi_lemasmil_id' &&
        key !== 'nama_lokasi_lemasmil' &&
        key !== 'nama_ruangan_lemasmil' &&
        key !== 'jenis_ruangan_lemasmil' &&
        key !== 'status_zona_lemasmil' &&
        key !== 'ruangan_lemasmil_id'
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

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '.i-nama',
          popover: {
            title: 'Nama Kegiatan',
            description: 'Isi nama kegiatan',
          },
        },
        {
          element: '.i-mulai',
          popover: {
            title: 'Waktu Mulai Kegiatan',
            description: 'Menentukan waktu mulai kegiatan',
          },
        },
        {
          element: '.i-akhir',
          popover: {
            title: 'Waktu Akhir Kegiatan',
            description: 'Menentukan waktu akhir kegiatan',
          },
        },
        {
          element: '.i-status',
          popover: {
            title: 'Status Kegiatan',
            description: 'Isi status kegiatan',
          },
        },
        {
          element: '#p-ruang',
          popover: {
            title: 'Pilih Ruangan Otmil',
            description: 'Pilih ruangan otmil yang diinginkan',
          },
        },
        {
          element: '.i-jenis',
          popover: {
            title: 'Jenis Ruangan',
            description: 'Isi jenis ruangan',
          },
        },
        {
          element: '.i-lokasi',
          popover: {
            title: 'Nama Lokasi Otmil',
            description: 'Isi nama lokasi otmil',
          },
        },
        {
          element: '.i-zona',
          popover: {
            title: 'Zona',
            description: 'Isi zona',
          },
        },
        {
          element: '.d-peserta',
          popover: {
            title: 'Pilih Peserta',
            description: 'Pilih peserta yang diinginkan',
          },
        },
        {
          element: '.d-ikut',
          popover: {
            title: 'Peserta Ikut',
            description: 'Menampilkan peserta ikut',
          },
        },
        {
          element: `${isEdit ? '#b-ubah' : '#b-tambah'}`,
          popover: {
            title: `${isEdit ? 'Ubah' : 'Tambah'}`,
            description: `Klik untuk ${isEdit ? 'mengubah' : 'menambahkan'} data event`,
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    let updatedFormState = { ...formState, [name]: value };

    if (name === 'waktu_mulai_kegiatan' || name === 'waktu_selesai_kegiatan') {
      const now = new Date(); // Waktu sekarang
      const waktuMulai = new Date(updatedFormState.waktu_mulai_kegiatan);
      const waktuSelesai = new Date(updatedFormState.waktu_selesai_kegiatan);

      if (now < waktuMulai) {
        updatedFormState.status_kegiatan = 'Terjadwal';
      } else if (now >= waktuMulai && now <= waktuSelesai) {
        updatedFormState.status_kegiatan = 'Berlangsung';
      } else {
        updatedFormState.status_kegiatan = 'Selesai';
      }
    }

    setFormState(updatedFormState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState, 'formState');
    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState);
    console.log(onSubmit);
    // closeModal();
  };
  const getTimeZone = () => {
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
  };

  const handleWaktuMulai = (e: any) => {
    console.log('test', e);

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

    // console.log('Formatted Date:', formattedDate);
    console.log('Zona Waktu:', zonaWaktu);
    setFormState({
      ...formState,
      waktu_mulai_kegiatan: dayjs(e).format('YYYY-MM-DDTHH:mm'),
      zona_waktu: zonaWaktu,
    });
  };

  const handleWaktuSelesai = (e: any) => {
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
      waktu_selesai_kegiatan: dayjs(e).format('YYYY-MM-DDTHH:mm'),
      zona_waktu: zonaWaktu,
    });
  };

  useEffect(() => {
    getTimeZone();
    const fetchData = async () => {
      let params = {
        pageSize: 1000,
      };
      try {
        const response = await apiReadAllWBP(params, token);
        const wbpData = response.data.records;
        const selectedData = wbpData.map((item: any) => ({
          wbp_profile_id: item.wbp_profile_id,
          wbp_nama: item.nama,
        }));
        if (isEdit) {
          let idsToExclude = defaultValue.peserta.map(
            (obj: any) => obj.wbp_profile_id,
          );
          const filteredData = selectedData.filter(
            (item: any) => !idsToExclude.includes(item.wbp_profile_id),
          );
          console.log('filtered data', idsToExclude);
          console.log('ds:', filteredData);
          setSourceList(filteredData);
        } else {
          setSourceList(selectedData);
        }
        Promise.all([ruangan(), lokasi()]);

        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (e: any) {
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

  const ruangan = async () => {
    let params = {
      pageSize: 10000,
      filter: {
        nama_lokasi_otmil: 'Cimahi',
      },
    };
    await apiReadAllRuanganOtmil(params, token)
      .then((res) => {
        setruanganotmil(res.data.records);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate('/auth/signin', {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? 'warning' : 'error',
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const lokasi = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadAlllokasiOtmil(params, token)
      .then((res) => {
        setlokasiotmil(res.data.records);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate('/auth/signin', {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? 'warning' : 'error',
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const handleRuanganChange = (e: any) => {
    const selectedRuangan = e.value;

    // Temukan data ruangan berdasarkan ID yang dipilih
    const selectedData = ruanganotmil.find(
      (item) => item.ruangan_otmil_id === selectedRuangan,
    );
    if (selectedData) {
      setFormState({
        ...formState,
        ruangan_otmil_id: selectedData.ruangan_otmil_id,
        nama_ruangan_otmil: selectedData.nama_ruangan_otmil,
        jenis_ruangan_otmil: selectedData.jenis_ruangan_otmil,
        lokasi_otmil_id: selectedData.lokasi_otmil_id,
        nama_lokasi_otmil: selectedData.nama_lokasi_otmil,
        // zona_id: selectedData.zona_id,
        nama_zona: selectedData.nama_zona,
      });
    } else {
      setFormState({
        ...formState,
        ruangan_otmil_id: '',
        nama_ruangan_otmil: '',
        jenis_ruangan_otmil: '',
        lokasi_otmil_id: '',
        nama_lokasi_otmil: '',
        // zona_id: '',
        nama_zona: '',
      });
    }
  };
  const handleCheckboxChange = (wbpId: string) => {
    if (selectedSourceItems.includes(wbpId)) {
      setSelectedSourceItems(selectedSourceItems.filter((id) => id !== wbpId));
    } else {
      setSelectedSourceItems([...selectedSourceItems, wbpId]);
    }
  };

  // Fungsi untuk mentransfer item terpilih dari daftar sumber ke daftar target
  const transferRight = () => {
    const updatedSourceList = sourceList.filter(
      (item) => !selectedSourceItems.includes(item.wbp_profile_id),
    );
    const transferredItems = sourceList.filter((item) =>
      selectedSourceItems.includes(item.wbp_profile_id),
    );

    setSourceList(updatedSourceList);
    setTargetList([...targetList, ...transferredItems]);
    setSelectedSourceItems([]);

    // Hanya tambahkan `wbp_profile_id` dari item terpilih ke dalam "peserta" dalam formState
    const transferredIds = transferredItems.map((item) => item.wbp_profile_id);
    setFormState((prevFormState: any) => ({
      ...prevFormState,
      peserta: [...prevFormState.peserta, ...transferredIds],
    }));
  };

  // ...

  // Fungsi untuk mentransfer item terpilih dari daftar target ke daftar sumber
  const transferLeft = () => {
    const updatedTargetList = targetList.filter(
      (item) => !selectedTargetItems.includes(item.wbp_profile_id),
    );
    const transferredItems = targetList.filter((item) =>
      selectedTargetItems.includes(item.wbp_profile_id),
    );

    setTargetList(updatedTargetList);
    setSourceList([...sourceList, ...transferredItems]);
    setSelectedTargetItems([]);

    // Hanya hapus `wbp_profile_id` dari item terpilih dari "peserta" dalam formState
    const removedIds = transferredItems.map((item) => item.wbp_profile_id);
    setFormState((prevFormState: any) => ({
      ...prevFormState,
      peserta: prevFormState.peserta.filter(
        (id: any) => !removedIds.includes(id),
      ),
    }));
  };

  useEffect(() => {
    if (defaultValue && defaultValue.peserta) {
      setTargetList(defaultValue.peserta);
    }
  }, [defaultValue]);

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
        className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
      >
        <div className="modal rounded-sm w-full">
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
                  strokeWidth="4"
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
                      ? 'Detail Data Event'
                      : isEdit
                        ? 'Edit Data Event'
                        : 'Tambah Data Event'}
                  </h3>
                </div>

                {/* <div className="w-10"> */}
                {isDetail ? null : isEdit ? (
                  <button className="pr-90">
                    <HiQuestionMarkCircle
                      values={filter}
                      aria-placeholder="Show tutorial"
                      // onChange={}
                      onClick={handleClickTutorial}
                    />
                  </button>
                ) : (
                  <button className="pr-80">
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
                <div className="grid grid-cols-2 gap-5 justify-normal mt-5">
                  {/* Nama Kegiatan*/}
                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Kegiatan
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-nama"
                      name="nama_kegiatan"
                      dark:text-gray
                      placeholder="nama kegiatan"
                      onChange={handleChange}
                      value={formState.nama_kegiatan}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_kegiatan' ? 'Masukan Nama Kegiatan' : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      waktu mulai kegiatan
                    </label>
                    <div className="flex flex-row">
                      <DatePicker
                        selected={
                          formState.waktu_mulai_kegiatan
                            ? dayjs(formState.waktu_mulai_kegiatan).toDate()
                            : dayjs().toDate()
                        }
                        // onChange={handleWaktuMulai}
                        onChange={(date) => {
                          handleWaktuMulai(date); // Panggil handleWaktuMulai
                          handleChange({
                            // Panggil handleChange
                            target: {
                              name: 'waktu_mulai_kegiatan',
                              value: date,
                            },
                          });
                        }}
                        showTimeInput
                        timeFormat="HH:mm"
                        timeCaption="Pilih Waktu"
                        dateFormat="dd/MM/yyyy HH:mm"
                        customTimeInput={<ExampleCustomTimeInput />}
                        className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-mulai"
                        name="waktu_mulai_kegiatan"
                        disabled={false}
                        locale="id"
                      />
                      <input
                        type="text"
                        className="w-1/4 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                        // name="zona_waktu"
                        value={formState?.zona_waktu}
                        disabled
                      />
                    </div>
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'waktu_mulai_kegiatan'
                          ? 'Pilih Waktu Mulai Kegiatan'
                          : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Waktu Akhir Kegiatan
                    </label>
                    <div className="flex flex-row">
                      {/* <input
                      type="datetime-local"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-akhir"
                      name="waktu_selesai_kegiatan"
                      onChange={handleChange}
                      value={formState.waktu_selesai_kegiatan}
                      disabled={isDetail}
                    /> */}
                      <DatePicker
                        selected={
                          formState.waktu_selesai_kegiatan
                            ? dayjs(formState.waktu_selesai_kegiatan).toDate()
                            : dayjs().toDate()
                        }
                        // onChange={handleWaktuSelesai}
                        onChange={(date) => {
                          handleWaktuSelesai(date); // Panggil handleWaktuMulai
                          handleChange({
                            // Panggil handleChange
                            target: {
                              name: 'waktu_selesai_kegiatan',
                              value: date,
                            },
                          });
                        }}
                        showTimeInput
                        timeFormat="HH:mm"
                        timeCaption="Pilih Waktu"
                        dateFormat="dd/MM/yyyy HH:mm"
                        customTimeInput={<ExampleCustomTimeInput />}
                        className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-akhir"
                        name="waktu_selesai_kegiatan"
                        disabled={false}
                        locale="id"
                      />
                      <input
                        type="text"
                        className="w-1/4 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                        name="zona_waktu"
                        value={formState.zona_waktu}
                        disabled
                      />
                    </div>
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'waktu_selesai_kegiatan'
                          ? 'Pilih Waktu Selesai Kegiatan'
                          : '',
                      )}
                    </p>
                  </div>

                  {/* status_kegiatan */}
                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Status Kegiatan
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-status"
                      name="status_kegiatan"
                      dark:text-gray
                      placeholder="Status kegiatan"
                      onChange={handleChange}
                      value={formState.status_kegiatan}
                      disabled
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'status_kegiatan'
                          ? 'Masukan Status Kegiatan'
                          : '',
                      )}
                    </p>
                  </div>

                  {/* <div className="form-group w-full ">
                  <label
                    className="block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    status kegiatan
                  </label>
                  <select
                    className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                    name="status_kegiatan"
                    onChange={handleChange}
                    value={formState.status_kegiatan}
                    disabled={isDetail}
                  >
                    <option disabled value="">
                      Pilih status
                    </option>
                    <option value="Terjadwal">Terjadwal</option>
                    <option value="Berlangsung">Berlangsung</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                  <p className="error-text">
                  {errors.map((item) =>
                    item === 'status_kegiatan'
                      ? 'Pilih Status Kegiatan'
                      : ''
                  )}
                </p>
                </div> */}
                </div>

                <div className="grid grid-cols-2 gap-5 justify-normal pt-5">
                  <div className="form-group w-full">
                    <label htmlFor="ruangan_otmil_id">
                      Pilih Ruangan otmil:
                    </label>
                    {/* <select
                      id="ruangan_otmil_id"
                      name="ruangan_otmil_id"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      value={formState.ruangan_otmil_id}
                      onChange={handleRuanganChange}
                      disabled={isDetail}
                    >
                      <option value="">Pilih Ruangan</option>
                      {ruanganotmil.map((item) => (
                        <option
                          key={item.ruangan_otmil_id}
                          value={item.ruangan_otmil_id}
                        >
                          {item.nama_ruangan_otmil}
                        </option>
                      ))}
                    </select> */}
                    <Select
                      name="ruangan_otmil_id"
                      id="p-ruang"
                      isDisabled={isDetail}
                      isClearable={true}
                      isSearchable={true}
                      placeholder="Pilih Ruangan"
                      defaultValue={
                        isEdit || isDetail
                          ? {
                              value: formState.ruangan_otmil_id,
                              label: formState.nama_ruangan_otmil,
                            }
                          : formState.ruangan_otmil_id
                      }
                      onChange={handleRuanganChange}
                      styles={customStyles}
                      options={ruanganotmil.map((item) => ({
                        value: item.ruangan_otmil_id,
                        label: item.nama_ruangan_otmil,
                      }))}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'ruangan_otmil_id'
                          ? 'Pilih Ruangan Otmil'
                          : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full">
                    <label htmlFor="jenis_ruangan_otmil">Jenis Ruangan:</label>
                    <input
                      type="text"
                      id="jenis_ruangan_otmil"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-jenis"
                      name="jenis_ruangan_otmil"
                      value={formState.jenis_ruangan_otmil}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'jenis_ruangan_otmil'
                          ? 'Masukan Jenis Ruangan'
                          : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full">
                    <label htmlFor="nama_lokasi_otmil">
                      Nama Lokasi otmil:
                    </label>
                    <input
                      type="text"
                      id="nama_lokasi_otmil"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-lokasi"
                      name="nama_lokasi_otmil"
                      value={formState.nama_lokasi_otmil}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_lokasi_otmil'
                          ? 'Masukan Nama Lokasi'
                          : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full">
                    <label htmlFor="nama_zona">Zona :</label>
                    <input
                      type="text"
                      id="nama_zona"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-zona"
                      name="nama_zona"
                      onChange={handleChange}
                      value={formState.nama_zona}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_zona' ? 'Masukan Zona' : '',
                      )}
                    </p>
                  </div>
                </div>

                {isEdit ? (
                  <div className="grid grid-cols-9 w-full justify-between mt-5">
                    <div className="max-h-60 focus:border-primary focus-visible:outline-none dark:border-strokedark bg-slate-800 dark:text-white dark:focus:border-primary col-span-4 text-center px-1 py-1 font-medium text-white rounded-md overflow-y-scroll d-peserta">
                      <h2 className="py-2 rounded-md bg-slate-600 mb-2">
                        Pilih Peserta
                      </h2>
                      <ul>
                        {sourceList.map((item: namawbpDetail) => (
                          <li
                            key={item.wbp_profile_id}
                            className="text-start px-2 "
                          >
                            <label>
                              <input
                                className="py-1 mr-1"
                                name="wbp_profile_id"
                                type="checkbox"
                                checked={selectedSourceItems.includes(
                                  item.wbp_profile_id,
                                )}
                                onChange={() =>
                                  handleCheckboxChange(item.wbp_profile_id)
                                }
                              />
                              {item.wbp_nama}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className=" box-border m-auto flex-row">
                      <p onClick={transferLeft} className="cursor-pointer py-2">
                        <BiSolidLeftArrow size={25} color="white" />
                      </p>
                      <p
                        onClick={transferRight}
                        className="cursor-pointer py-2"
                      >
                        <BiSolidRightArrow size={25} color="white" />
                      </p>
                    </div>

                    <div className="max-h-60 focus:border-primary focus-visible:outline-none dark:border-strokedark bg-slate-800 dark:text-white dark:focus:border-primary col-span-4 text-center px-1 py-1 font-medium text-white rounded-md overflow-y-scroll d-ikut">
                      <h2 className="py-2 rounded-md bg-slate-600 mb-2">
                        Peserta Ikut
                      </h2>
                      <ul>
                        {targetList.map((item: namawbpDetail) => (
                          <li key={item.wbp_profile_id} className="text-start">
                            <label>
                              <input
                                className="mx-1"
                                name="wbp_profile_id"
                                type="checkbox"
                                value={formState.peserta}
                                checked={selectedTargetItems.includes(
                                  item.wbp_profile_id,
                                )}
                                onChange={() =>
                                  setSelectedTargetItems((prevItems) =>
                                    prevItems.includes(item.wbp_profile_id)
                                      ? prevItems.filter(
                                          (id) => id !== item.wbp_profile_id,
                                        )
                                      : [...prevItems, item.wbp_profile_id],
                                  )
                                }
                              />
                              {item.wbp_nama}
                            </label>
                          </li>
                        ))}
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'wbp_profile_id' ? 'masukan WBP' : '',
                          )}
                        </p>
                      </ul>
                    </div>
                  </div>
                ) : isDetail ? (
                  <div className=" w-full justify-between mt-5">
                    <div className="max-h-60 focus:border-primary focus-visible:outline-none dark:border-strokedark bg-slate-800 dark:text-white dark:focus:border-primary text-center px-1 py-1 font-medium text-white rounded-md overflow-y-scroll d-ikut">
                      <h2 className="py-2 rounded-md bg-slate-600 mb-2">
                        Peserta Ikut
                      </h2>
                      <ul className="grid grid-cols-3 gap-x-5 mx-2">
                        {defaultValue.peserta.map((item: namawbpDetail) => (
                          <li
                            key={item.wbp_profile_id}
                            className="text-center py-2 rounded-md truncate border-2 border-slate-500 my-2 box-border"
                          >
                            <label>{item.wbp_nama}</label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-9 w-full justify-between mt-5">
                    <div className="max-h-60 focus:border-primary bg-slate-800 focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary col-span-4 text-center px-1 py-1 font-medium text-white rounded-md overflow-y-scroll d-peserta">
                      <h2 className="py-2 rounded-md bg-slate-600 mb-2">
                        Pilih Peserta
                      </h2>
                      <ul>
                        {sourceList.map((item: namawbpDetail) => (
                          <li key={item.wbp_profile_id} className="text-start">
                            <label>
                              <input
                                className="mx-1"
                                name="wbp_profile_id"
                                type="checkbox"
                                checked={selectedSourceItems.includes(
                                  item.wbp_profile_id,
                                )}
                                onChange={() =>
                                  handleCheckboxChange(item.wbp_profile_id)
                                }
                              />
                              {item.wbp_nama}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className=" box-border m-auto flex-row">
                      <p onClick={transferLeft} className="cursor-pointer py-2">
                        <BiSolidLeftArrow size={25} color="white" />
                      </p>
                      <p
                        onClick={transferRight}
                        className="cursor-pointer py-2"
                      >
                        <BiSolidRightArrow size={25} color="white" />
                      </p>
                    </div>

                    <div className="max-h-60 focus:border-primary focus-visible:outline-none dark:border-strokedark bg-slate-800 dark:text-white dark:focus:border-primary col-span-4 text-center px-1 py-1 font-medium text-white rounded-md overflow-y-scroll d-ikut">
                      <h2 className="py-2 rounded-md bg-slate-600 mb-2">
                        Peserta Ikut
                      </h2>
                      <ul>
                        {targetList.map((item: namawbpDetail) => (
                          <li key={item.wbp_profile_id} className="text-start">
                            <label>
                              <input
                                className="mr-1"
                                type="checkbox"
                                value={formState.peserta}
                                checked={selectedTargetItems.includes(
                                  item.wbp_profile_id,
                                )}
                                onChange={() =>
                                  setSelectedTargetItems((prevItems) =>
                                    prevItems.includes(item.wbp_profile_id)
                                      ? prevItems.filter(
                                          (id) => id !== item.wbp_profile_id,
                                        )
                                      : [...prevItems, item.wbp_profile_id],
                                  )
                                }
                              />
                              {item.wbp_nama}
                            </label>
                          </li>
                        ))}
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'wbp_profile_id' ? 'masukan WBP' : '',
                          )}
                        </p>
                      </ul>
                    </div>
                  </div>
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
                          strokeWidth="4"
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
                    Ubah Data Event
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
                          strokeWidth="4"
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
                    Tambah Data Event
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
