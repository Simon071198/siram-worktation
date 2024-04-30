import React, { Component, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  apiReadAllWBP,
  apiReadJaksaPenyidik,
  apiReadSaksi,
  apiReadStatusWBP,
  apiReadjenisperkara,
  apiJenisPidanaRead,
  apiCreateDaftarKasus,
} from '../../services/api';
import { Error403Message } from '../../utils/constants';
import { Alerts } from '../Daftarkasus/AlertDaftarKasus';

dayjs.extend(utc);
dayjs.extend(timezone);

interface WBP {
  wbp_profile_id: string;
  nama: string;
  nrp: string;
}

// interface Item{
//   nama_kasus: string;
//   nomor_kasus: string;
//   nama_jenis_perkara: string;
//   nama_jenis_pidana: string;
// }

const DetailKasus = ({ onSubmit, defaultValue, isDetail}: any) => {
  const [formState, setFormState] = useState<any>({
    nama_kasus: '',
    nomor_kasus: defaultValue?.nomor_kasus,
    lokasi_kasus: '',
    jenis_perkara_id: defaultValue?.jenis_perkara_id,
    jenis_pidana_id: defaultValue?.jenis_pidana_id,
    kategori_perkara_id: '',
    waktu_kejadian: dayjs().format('YYYY-MM-DDTHH:mm'),
    waktu_pelaporan_kasus: dayjs().format('YYYY-MM-DDTHH:mm'),
    wbp_profile_ids: [],
    keterangans: [],
    role_ketua_oditur_ids: '',
    oditur_penyidik_id: [],
    nama_jenis_perkara: defaultValue?.nama_jenis_perkara,
    nama_jenis_pidana: defaultValue?.nama_jenis_pidana,
    saksi_id: [],
    keteranganSaksis: [],
    zona_waktu: '',
    tanggal_pelimpahan_kasus: '',
  });

  // interface type {
  //   [key: string]: any;
  // }
  // interface oditur {
  //   oditur_penyidik_id: string;
  //   nama_oditur: string;
  // }

  // interface ExampleCustomTimeInputProps {
  //   date: Date;
  //   value: string; // Assuming value is a string representing time
  //   onChange: (value: string) => void;
  // }

  // let dataAdmin = JSON.parse(localStorage.getItem('formState') || '{}');

  // const [formState, setFormState] = useState<type>(() => {
  //   const savedFormState = localStorage.getItem('formState');
  //   return savedFormState ? JSON.parse(savedFormState) : {
  //     nomor_kasus: '',
  //     nama_kasus: '',
  //     jenis_perkara_id: '',
  //     kategori_perkara_id: '',
  //     jenis_pidana_id: '',
  //     nama_jenis_perkara: '',
  //     nama_jenis_pidana: '',
  //     lokasi_kasus: '',
  //     waktu_kejadian: '',
  //     zona_waktu: '',
  //     waktu_pelaporan_kasus: '',
  //     oditur: dataAdmin.oditur || '',
  //     oditur_penyidik_id: [],
  //     ketuaOditur: dataAdmin.ketuaOditur || '',
  //     role_ketua_oditur_ids: '',
  //     wbpProfile: dataAdmin.wbpProfile || '',
  //     wbp_profile_ids: [],
  //     saksi: dataAdmin.saksi || '',
  //     saksi_id: [],
  //     keterangans: [],
  //     keteranganSaksis: [],
  //   };
  // });

  const navigate = useNavigate();
  const location = useLocation();

  const tokenItem = localStorage.getItem('token');
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  // const [data, setData] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);

  const [DataWBP, setDataWBP] = useState<WBP[]>([]);
  const [dataStatusWBP, setDataStatusWBP] = useState([]);
  const [dataOditurPenyidik, setDataOditurPenyidik] = useState([]);
  const [dataJenisPerkara, setDataJenisPerkara] = useState<any[]>([]);
  const [dataJenisPidana, setDataJenisPidana] = useState<any[]>([]);
  const [dataJenisPerkaraSelect, setDataJenisPerkaraSelect] = useState<any>();
  const [dataSaksi, setDataSaksi] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [dateEdited, setDateEdited] = useState(false);
  const [pihakTerlibat, setPihakTerlibat] = useState([]);

  const [ketuaOditurPenyidik, setKetuaOditurPenyidik] = useState([
    {
      value: '',
      label: '',
    },
  ]);

  console.log(formState, 'formstate');

  const [selectSaksi, setSelectSaksi] = useState([]);
  const [selectTersangka, setSelectTersangka] = useState([]);


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

  const ExampleCustomTimeInput = ({ date, value, onChange }: any) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ border: 'solid 1px pink' }}
    />
  );



  const handleWaktuKejadian = (e: any) => {
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
  
    // const updatedFormState = {
    //   ...formState,
    //   waktu_kejadian: dayjs(e).format('YYYY-MM-DDTHH:mm'),
    //   zona_waktu: zonaWaktu,
    // };
  
    // setFormState(updatedFormState);
  
    // // Simpan data ke localStorage
    // localStorage.setItem('formState', JSON.stringify(updatedFormState));

    setFormState({
      ...formState,
      waktu_kejadian: dayjs(e).format('YYYY-MM-DDTHH:mm'),
      zona_waktu: zonaWaktu,
    });
  };
  
  const handleWaktuPelaporan = (e: any) => {
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
    // const updatedFormState = {
    //   ...formState,
    //   waktu_pelaporan_kasus: dayjs(e).format('YYYY-MM-DDTHH:mm'),
    //   zona_waktu: zonaWaktu,
    // };
  
    // setFormState(updatedFormState);
  
    // // Simpan data ke localStorage
    // localStorage.setItem('formState', JSON.stringify(updatedFormState));

     setFormState({
       ...formState,
       waktu_pelaporan_kasus: dayjs(e).format('YYYY-MM-DDTHH:mm'),
       zona_waktu: zonaWaktu,
     });

     setDateEdited(true);
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

  const jenisPerkara = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadjenisperkara(params, token)
      .then((res) => {
        setDataJenisPerkara(res.data.records);
      })
      .catch((e) => {
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

  const jenisPidana = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiJenisPidanaRead(params, token)
      .then((res) => {
        setDataJenisPidana(res.data.records);
      })
      .catch((e) => {
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

  const Oditur = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadJaksaPenyidik(params, token)
      .then((res) => {
        setDataOditurPenyidik(res.data.records);
      })
      .catch((e) => {
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
      .catch((e) => {
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
      .catch((e) => {
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

  const status = async () => {
    let params = {};
    await apiReadStatusWBP(params, token)
      .then((res) => {
        setDataStatusWBP(res.data.records);
      })
      .catch((e) => {
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

  useEffect(() => {
    Promise.all([
      getTimeZone(),
      tersangka(),
      Saksi(),
      status(),
      jenisPerkara(),
      jenisPidana(),
      Oditur(),
    ]).then(() => {
      setIsLoading(false);
    });
  }, []);

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        errorFields.push(key);
      }

      // Tambahkan validasi khusus untuk oditur_penyidik_id
      if (
        key === 'oditur_penyidik_id' &&
        Array.isArray(value) &&
        value.length === 0
      ) {
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

  const [maxDate, setMaxDate] = useState(formatDate(new Date()));

  function formatDate(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  // const handleSubmitAdd = async (params: any) => {
  //   try {
  //     const responseCreate = await apiCreateDaftarKasus(params, token);

  //     if (responseCreate.data.status === 'OK') {
  //       Alerts.fire({
  //         icon: 'success',
  //         title: 'Berhasil menambah data',
  //       });
  //     } else if (responseCreate.data.status === 'NO') {
  //       Alerts.fire({
  //         icon: 'error',
  //         title: 'Gagal membuat data',
  //       });
  //     } else {
  //       throw new Error(responseCreate.data.message);
  //     }
  //   } catch (e: any) {
  //     if (e.response.status === 403) {
  //       navigate('/auth/signin', {
  //         state: { forceLogout: true, lastPage: location.pathname },
  //       });
  //     }
  //     Alerts.fire({
  //       icon: e.response.status === 403 ? 'warning' : 'error',
  //       title: e.response.status === 403 ? Error403Message : e.message,
  //     });
  //   }
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(formState, 'formstate');
  //   if (!validateForm()) return;
  //   setButtonLoad(true);

  //   handleSubmitAdd(formState).then(() => setButtonLoad(false));
  // };

  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   const updatedFormState = { ...formState, [name]: value };
    
  //   // Update form state and save to localStorage
  //   setFormState(updatedFormState);
  //   localStorage.setItem('formState', JSON.stringify(updatedFormState));
  // };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState).then(
      () => setFormSubmitted(true),
      setButtonLoad(false),
    );
  };

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   const savedFormState = JSON.parse(localStorage.getItem('formState'));
  //   if (savedFormState) {
  //     setFormState(savedFormState);
  //   }
  // }, []);

  const jenisPerkaraOptions = dataJenisPerkara?.map((item: any) => ({
    value: item.jenis_perkara_id,
    label: item.nama_jenis_perkara,
  }));

  // const handleSelectPerkara = (e: any) => {
  //   const kategoriPerkara: any = dataJenisPerkara.find(
  //     (item: any) => item.jenis_perkara_id === e?.value,
  //   );
  //   setDataJenisPerkaraSelect(kategoriPerkara);
  //   const updatedFormState = {
  //     ...formState,
  //     jenis_perkara_id: e.value,
  //     kategori_perkara_id: kategoriPerkara
  //       ? kategoriPerkara.kategori_perkara_id
  //       : '',
  //     jenis_pidana_id: kategoriPerkara ? kategoriPerkara.jenis_pidana_id : '',
  //     nama_jenis_perkara: kategoriPerkara
  //       ? kategoriPerkara.nama_jenis_perkara
  //       : '',
  //     nama_jenis_pidana: kategoriPerkara
  //       ? kategoriPerkara.nama_jenis_pidana
  //       : '',
  //   };
  //   setFormState(updatedFormState);
  
  //   // Simpan data ke localStorage
  //   localStorage.setItem('formState', JSON.stringify(updatedFormState));
  // };
  
  const handleSelectPerkara = (e: any) => {
    const kategoriPerkara: any = dataJenisPerkara.find(
      (item: any) => item.jenis_perkara_id === e?.value,
    );
    // const kategoriPerkaraId =
    //   kategoriPerkara?.length > 0
    //     ? kategoriPerkara[0]?.kategori_perkara_id
    //     : '';
    setDataJenisPerkaraSelect(kategoriPerkara);
    setFormState({
      ...formState,
      jenis_perkara_id: e.value,
      kategori_perkara_id: kategoriPerkara
        ? kategoriPerkara.kategori_perkara_id
        : '',
      jenis_pidana_id: kategoriPerkara ? kategoriPerkara.jenis_pidana_id : '',
      nama_jenis_perkara: kategoriPerkara
        ? kategoriPerkara.nama_jenis_perkara
        : '',
      nama_jenis_pidana: kategoriPerkara
        ? kategoriPerkara.nama_jenis_pidana
        : '',
    });
  };

  const oditurPenyidikOptions = dataOditurPenyidik.map((item: any) => ({
    value: item.oditur_penyidik_id,
    label: item.nama_oditur,
  }));

  // const handleSelectOditurPenyidik = (selectedOptions: any) => {
  //   // Membuat array untuk menyimpan nilai yang dipilih
  //   let arrayTemp: any = [];
  //   let arrayAnggota: any = [];
    
  //   // Mengisi array dengan nilai yang dipilih
  //   for (let i = 0; i < selectedOptions?.length; i++) {
  //     arrayTemp.push(selectedOptions[i].value);
  //     arrayAnggota.push(selectedOptions[i]);
  //   }
    
  //   // Mengupdate state form dan state array anggota
  //   const updatedFormState = {
  //     ...formState,
  //     oditur_penyidik_id: arrayTemp,
  //     oditur: selectedOptions // Menyimpan opsi yang dipilih ke dalam formState.oditur
  //   };
  //   setFormState(updatedFormState);
  //   setKetuaOditurPenyidik(arrayAnggota);
  
  //   // Simpan data ke localStorage
  //   localStorage.setItem('formState', JSON.stringify(updatedFormState));
  // };
  
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
  

  // const handleSelectKetuaOditur = (selectedOption: any) => {
  //   // Mengupdate state form
  //   const updatedFormState = {
  //     ...formState,
  //     role_ketua_oditur_ids: selectedOption.value,
  //     ketuaOditur: selectedOption,
  //   };
  //   setFormState(updatedFormState);
  
  //   // Simpan data ke localStorage
  //   localStorage.setItem('formState', JSON.stringify(updatedFormState));
  // };

  const handleSelectKetuaOditur = (e: any) => {
    setFormState({ ...formState, role_ketua_oditur_ids: e.value });
  };

//   const handleSelectPihakTerlibat = async (selectedOptions: any) => {
//     console.log('123456',selectedOptions);
    
//     let arrayTersangka: any = [];
//     let arraySaksi: any = [];
//     let arraySaksiOptions: any = [];
//     let arrayTersangkaOptions: any = [];
  
//     for (let i = 0; i < selectedOptions?.length; i++) {
//         if (selectedOptions[i].label.includes('(Tersangka)')) {
//             arrayTersangka.push(selectedOptions[i].value);
//             arrayTersangkaOptions.push(selectedOptions[i]);
//         } else if (selectedOptions[i].label.includes('(Saksi)')) {
//             arraySaksi.push(selectedOptions[i].value);
//             arraySaksiOptions.push(selectedOptions[i]);
//         }
//     }
  
//     const updatedFormState = {
//         ...formState,
//         wbp_profile_ids: arrayTersangka,
//         saksi_id: arraySaksi,
//         wbpProfile:arrayTersangkaOptions,
//         saksi: arraySaksiOptions,
//     };

//     // Set form state
//     setFormState(updatedFormState);
//     setSelectSaksi(arraySaksiOptions);
//     setSelectTersangka(arrayTersangkaOptions);
  
//     // Save data to localStorage
//     await localStorage.setItem('formState', JSON.stringify(updatedFormState));

//     console.log(arrayTersangkaOptions, 'qwertyui arrayTersangka');
//     console.log(arraySaksiOptions, 'qwertyui arraySaksi');
//     console.log('qwertyui updatedFormState', localStorage.getItem('formState'));
// };

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

  // const defaultOptions9 = {
  //   ...formState.wbpProfile
  // }

  const handleChangeKeteranganTersangka = (e: any, index: any) => {
    const newKeteranganSaksi = [...formState.keterangans]; // Salin array keterangan yang ada
    newKeteranganSaksi[index] = e.target.value; // Perbarui nilai keterangan sesuai dengan indeks elemen
    setFormState({
      ...formState,
      keterangans: newKeteranganSaksi, // Set array keterangan yang diperbarui
    });
  };

  const handleChangeKeterangan = (e: any, index: any) => {
    const newKeteranganSaksi = [...formState.keteranganSaksis];
    newKeteranganSaksi[index] = e.target.value;
    setFormState({
      ...formState,
      keteranganSaksis: newKeteranganSaksi, 
    });

    // localStorage.setItem('formState', JSON.stringify(formState));
  };

  // const handleModalAddOpen = () => {
  //   function convertToRoman(num: number) {
  //     const romanNumerals = [
  //       'M',
  //       'CM',
  //       'D',
  //       'CD',
  //       'C',
  //       'XC',
  //       'L',
  //       'XL',
  //       'X',
  //       'IX',
  //       'V',
  //       'IV',
  //       'I',
  //     ];
  //     const decimalValues = [
  //       1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1,
  //     ];

  //     let result = '';

  //     for (let i = 0; i < romanNumerals.length; i++) {
  //       while (num >= decimalValues[i]) {
  //         result += romanNumerals[i];
  //         num -= decimalValues[i];
  //       }
  //     }

  //     return result;
  //   }

  //   const type = 'Pid.K';
  //   const day = dayjs(new Date()).format('DD');
  //   const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
  //   const year = new Date().getFullYear().toString();
  //   const location = 'Otmil';
  //   const romanNumber = convertToRoman(parseInt(month));
  //   const currentDate = `${day}-${romanNumber}/${year}`;
  //   let largestNumber = 0;

  //   data.forEach((item: any) => {
  //     if (item.nomor_kasus) {
  //       const caseNumber = item.nomor_kasus.split('/')[0]; // Get the first part of the case number
  //       const number = parseInt(caseNumber, 10);

  //       if (!isNaN(number) && item.nomor_kasus.includes(currentDate)) {
  //         largestNumber = Math.max(largestNumber, number);
  //       }
  //     }
  //   });

  //   // Increment the largest number by 1 if the date is the same
  //   largestNumber += 1;

  //   // Set the case number with the desired format
  //   const caseNumberFormatted = `${largestNumber}/${type}/${currentDate}/${location}`;
  //   console.log(caseNumberFormatted, 'caseNumberFormatted');

  //   setFormState({
  //     ...formState,
  //     nomor_kasus: caseNumberFormatted,
  //   });

  //   // setModalAddOpen(true);
  // };

  // useEffect(() => {
  //   console.log(formState, 'formState coy');
  //   handleModalAddOpen();
  // }, []);

  // const selectedIds = new Set([...formState.wbp_profile_ids, ...formState.saksi_id]);
  // const uniqueIds = [...new Set([...formState.wbp_profile_ids, ...formState.saksi_id])];

//   const defaultOptions = uniqueIds.map(id => {
//     const option = pihakTerlibat.find(opt => opt.value === id);
//     console.log('12345',id);
    
//     return option || { 
//         value: id, 
//         label: id.label
//     }; // Default label if option is not found
// });
//   console.log('12345',defaultOptions);
  
//   // Add wbpProfile and saksi to the default options
//   defaultOptions.unshift(dataAdmin.wbpProfile ?? { value: '', label: '' });
//   defaultOptions.unshift(dataAdmin.saksi ?? { value: '', label: '' });

  // const uniqueArray = Array.from(new Set([...formState?.saksi, ...formState?.wbpProfile].map(item => item.value)))
  //   .map(value => {
  //       return [...formState?.saksi, ...formState?.wbpProfile].find(item => item.value === value);
  //   });
  //   console.log('99999',uniqueArray);
    

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 bg-slate-600 w-full h-full p-6 rounded-lg">
          <div className="form-group w-full">
            <label
              className="block text-sm font-medium text-black dark:text-white pt-3"
              htmlFor="id"
            >
              Nomor Kasus
            </label>
            <input
              className="w-full rounded border border-stroke py-3 pl-3 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
              placeholder="Nomor Kasus"
              name="nomor_kasus"
              onChange={handleChange}
              value={formState.nomor_kasus}
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
              className="block text-sm font-medium text-black dark:text-white pt-3"
              htmlFor="id"
            >
              Nama Kasus
            </label>
            <input
              className="w-full rounded border border-stroke py-3 pl-3 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
              placeholder="Nama Kasus"
              name="nama_kasus"
              onChange={handleChange}
              // disabled={isDetail}
              // value={formState.nama_kasus || ''}
            />
            <div className="h-2">
              <p className="error-text">
                {errors.map((item) =>
                  item === 'nama_kasus' ? 'Masukkan Nama Kasus' : '',
                )}
              </p>
            </div>
          </div>

          <div className="form-group w-full">
            <label
              className="block text-sm font-medium text-black dark:text-white pt-3"
              htmlFor="id"
            >
              Jenis Perkara
            </label>
            <Select
              className="capitalize"
              placeholder="Pilih Jenis Perkara"
              styles={customStyles}
              options={jenisPerkaraOptions}
              // isDisabled={isDetail}
              onChange={handleSelectPerkara}
              // defaultInputValue={formState.nama_jenis_perkara}
            />
            <div className="h-2">
              <p className="error-text">
                {errors.map((item) =>
                  item === 'jenis_perkara_id' ? 'Pilih Jenis Perkara' : '',
                )}
              </p>
            </div>
          </div>

          <div className="form-group w-full">
            <label
              className="block text-sm font-medium text-black dark:text-white pt-3"
              htmlFor="id"
            >
              Nama Jenis Pidana
            </label>
            <input
              className="w-full rounded border border-stroke py-3 pl-3 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
              placeholder="Nama Jenis Pidana"
              name="nama_jenis_pidana"
              onChange={handleChange}
              value={formState.nama_jenis_pidana}
              disabled
            />
            <div className="h-2">
              <p className="error-text"></p>
            </div>
          </div>

          <div className="form-group w-full">
            <label
              className="block text-sm font-medium text-black dark:text-white pt-3"
              htmlFor="id"
            >
              Lokasi Kasus
            </label>
            <input
              className="w-full rounded border border-stroke py-3 pl-3 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
              placeholder="Lokasi Kasus"
              name="lokasi_kasus"
              onChange={handleChange}
              // disabled={isDetail}
              // value={formState.lokasi_kasus || ''}
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
              className="block text-sm font-medium text-black dark:text-white pt-3"
              htmlFor="id"
            >
              Tanggal Kejadian Kasus
            </label>
            <div className="flex flex-row">
              <DatePicker
                selected={
                  formState.waktu_kejadian
                    ? dayjs(formState.waktu_kejadian).toDate()
                    : dayjs().toDate()
                }
                showTimeInput
                timeFormat="HH:mm"
                onChange={handleWaktuKejadian}
                timeCaption="Time"
                dateFormat="dd/MM/yyyy HH:mm"
                customTimeInput={<ExampleCustomTimeInput />}
                className="w-full rounded border border-stroke py-3 pl-3 pr-[25rem] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                name="waktu_kejadian"
                disabled={false}
                locale="id"
                // value={formState.waktu_kejadian || ''}
              />
              <input
                type="text"
                className="w-[5rem] rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9px] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                name="zona_waktu"
                value={formState.zona_waktu}
                disabled
              />
            </div>
            <div className="h-2">
              <p className="error-text">
                {formSubmitted &&
                  errors.includes('waktu_kejadian') &&
                  'Masukan Tanggal Kejadian Kasus'}
              </p>
            </div>
          </div>

          <div className="form-group w-full">
            <label
              className="block text-sm font-medium text-black dark:text-white pt-3"
              htmlFor="id"
            >
              Tanggal Pelaporan Kasus
            </label>
            <div className="flex flex-row">
              <DatePicker
                selected={
                  dateEdited && formState.waktu_pelaporan_kasus
                    ? dayjs(formState.waktu_pelaporan_kasus).toDate()
                    : dayjs().toDate()
                }
                showTimeInput
                timeFormat="HH:mm"
                onChange={handleWaktuPelaporan}
                timeCaption="Time"
                dateFormat="dd/MM/yyyy HH:mm"
                customTimeInput={<ExampleCustomTimeInput />}
                className="w-full rounded border border-stroke py-3 pl-3 pr-[25rem] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                name="waktu_kejadian"
                disabled={false}
                locale="id"
              />
              <input
                type="text"
                className="w-[5rem] rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9px] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                name="zona_waktu"
                value={formState.zona_waktu}
                disabled
              />
            </div>
            <div className="h-2">
              <p className="error-text">
                {formSubmitted &&
                  errors.includes('waktu_pelaporan_kasus') &&
                  'Masukan Tanggal Pelaporan Kasus'}
              </p>
            </div>

            <div className="form-group w-full ">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Tanggal Pelimpahan Kasus
              </label>
              <input
                type="date"
                className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-pelimpahan"
                name="tanggal_pelimpahan_kasus"
                placeholder="Tanggal Pelimpahan Kasus"
                onChange={handleChange}
                disabled={isDetail}
                max={maxDate}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === 'tanggal_pelimpahan_kasus'
                    ? 'Masukan Tanggal Pelimpahan Kasus'
                    : '',
                )}
              </p>
            </div>
          </div>

          <div className={`${isDetail ? 'block mt-4' : 'hidden'}`}>
            <div className="form-group w-full">
              <label
                className="block text-sm font-medium text-black dark:text-white pt-3"
                htmlFor="id"
              >
                Jumlah Penyidikan
              </label>
              <input
                className="w-full rounded border border-stroke py-3 pl-3 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                placeholder="Jumlah Penyidikan"
                name="waktu_pelaporan_kasus"
                onChange={handleChange}
                // disabled={isDetail}
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

          <div className="form-group w-full">
            <label
              className="block text-sm font-medium text-black dark:text-white pt-3"
              htmlFor="id"
            >
              Oditur Penyidik
            </label>
            <Select
              className="capitalize text-white"
              isMulti
              placeholder="Pilih Oditur Penyidik"
              styles={customStyles}
              // isDisabled={isDetail}
              options={oditurPenyidikOptions}
              onChange={handleSelectOditurPenyidik}
              defaultValue={formState.oditur}
              isClearable={true}
              isSearchable={true}
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
              className="block text-sm font-medium text-black dark:text-white pt-3"
              htmlFor="id"
            >
              Ketua Oditur Penyidik
            </label>
            <Select
              className="capitalize"
              // isDisabled={isDetail}
              placeholder="Pilih Ketua Oditur"
              styles={customStyles}
              options={ketuaOditurPenyidik}
              onChange={handleSelectKetuaOditur}
              defaultValue={formState.ketuaOditur}
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

          <div className="form-group w-full">
            <label
              className="block text-sm font-medium text-black dark:text-white pt-3"
              htmlFor="id"
            >
              Pihak Terlibat
            </label>
            <Select
              className="capitalize"
              isMulti
              // isDisabled={isDetail}
              placeholder="Pihak Terlibat"
              styles={customStyles}
              options={pihakTerlibat}
              onChange={handleSelectPihakTerlibat}
              // defaultValue={uniqueArray}
              // defaultValue={pihakTerlibat.filter(option => uniqueIds.includes(option.value))}
              // value={
              //   pihakTerlibat.filter(option => formState.wbp_profile_ids.includes(option.value) ||
              //   formState.saksi_id.includes(option.value))
              // }

              // value={pihakTerlibat.filter(option => selectedIds.has(option.value))}
            />
            <div className="h-2">
              <p className="error-text">
                {errors.includes('saksi_id') ||
                errors.includes('wbp_profile_ids')
                  ? `${errors.includes('wbp_profile_ids') ? 'Tersangka' : ''} ${errors.includes('saksi_id') && errors.includes('wbp_profiles_ids') ? 'Dan' : ''} ${errors.includes('saksi_id') ? 'Saksi' : ''} Belum di Pilih`
                  : ''}
              </p>
            </div>
          </div>
          {selectTersangka.length === 0 ? null : (
            <>
              <div className="grid grid-rows-2">
                <label
                  htmlFor="id"
                  className="mt-4 block text-sm font-medium text-black dark:text-white"
                >
                  Tersangka
                </label>

                <div className="flex items-center mt-2 pl-4 bg-slate-700 rounded-t">
                  <div className="form-group w-2/6">
                    <label
                      htmlFor="id"
                      className="block text-sm font-medium text-black dark:text-white"
                    >
                      Nama Tersangka
                    </label>
                  </div>

                  <div className="form-group w-4/6">
                    <label
                      htmlFor="id"
                      className="block text-sm font-medium text-black dark:text-white"
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
                            htmlFor={`keterangans-${index}`}
                            className="capitalize block text-sm font-medium text-black dark:text-white"
                          >
                            {item.label}
                          </label>
                        </div>

                        <div className="form-group w-4/6 flex items-center mr-2">
                          <input
                            id={`keterangans${index}`}
                            className="w-full rounded border border-stroke py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                            placeholder={`${errors.includes('keterangan') ? 'Keterangan Belum Di Isi' : 'Keterangan'}`}
                            onChange={(e) =>
                              handleChangeKeteranganTersangka(e, index)
                            }
                            // disabled={isDetail}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {selectSaksi.length === 0 ? null : (
            <>
              <div className="grid grid-rows-2">
                <label
                  htmlFor="id"
                  className="mt-4 block text-sm font-medium text-black dark:text-white"
                >
                  Saksi
                </label>

                <div className="flex items-center mt-2 pl-4 bg-slate-700 rounded-t">
                  <div className="form-group w-2/6">
                    <label
                      htmlFor="id"
                      className="block text-sm font-medium text-black dark:text-white"
                    >
                      Nama Saksi
                    </label>
                  </div>

                  <div className="form-group w-4/6">
                    <label
                      htmlFor="id"
                      className="block text-sm font-medium text-black dark:text-white"
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
                            placeholder={`${errors.includes('keteranganSaksis') ? 'Keterangan Belum Di Isi' : 'Keterangan Saksi'}`}
                            onChange={(e) => handleChangeKeterangan(e, index)}
                            // disabled={isDetail}
                            // value={formState.keteranganSaksis[index]}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <div className="relative col-span-2">
            <button
              className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1`}
              type="submit"
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
              Tambah Data Kasus
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DetailKasus;
