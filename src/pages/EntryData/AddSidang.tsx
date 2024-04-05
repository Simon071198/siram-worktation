import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import { CustomStyles } from './CustomStyle';
import { Error403Message } from '../../utils/constants';
import { Alerts } from '../DaftarSidangPerkara/AlertSidang';
import {
  apiAhliRead,
  apiHakimRead,
  apiJenisSidangRead,
  apiKasusRead,
  apiPengadilanMiliterRead,
  apiReadJaksapenuntut,
  apiReadSaksi,
  apiSidangInsert,
} from '../../services/api';

const tokenItem = localStorage.getItem('token');
const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
const token = dataToken.token;

const AddSidang = () => {
  const [formState, setFormState] = useState({
    waktu_mulai_sidang: '',
    waktu_selesai_sidang: '',
    jadwal_sidang: '',
    perubahan_jadwal_sidang: '',
    kasus_id: '',
    nama_kasus: '',
    nomor_kasus: '',
    masa_tahanan_tahun: '',
    masa_tahanan_bulan: '',
    masa_tahanan_hari: '',
    nama_sidang: '',
    juru_sita: '',
    hasil_keputusan_sidang: '',
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
    role_ketua_oditur: {},
    zona_waktu: '',
  });
  const navigate = useNavigate();

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
  const [pengadilanMiliter, setPengadilanMiliter] = useState([]);
  const [ahli, setAhli] = useState([]);
  const [saksi, setSaksi] = useState([]);
  const [wbp, setWbp] = useState([]);
  const [getSaksi, setGetSaksi] = useState([]);
  const [saksiField, setSaksiField] = useState('');
  const [pengacaraField, setPengacaraField] = useState('');
  const [filter, setFilter] = useState('');

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
  const getAllJenisSidang = async () => {
    let params = {
      filter: '',
      pageSize: 1000,
    };
    try {
      const response = await apiJenisSidangRead(params, token);
      const data = response.data.data;
      const uniqueData: any[] = [];
      const trackedNames: any[] = [];

      data.forEach((item: any) => {
        if (!trackedNames.includes(item.nama_jenis_persidangan)) {
          trackedNames.push(item.nama_jenis_persidangan);
          uniqueData.push(item);
        }
      });
      setJenisSidang(uniqueData);
      console.log('uniq', uniqueData);
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

  const getAllHakim = async () => {
    let params = {
      filter: '',
      pageSize: 1000,
    };
    try {
      const response = await apiHakimRead(params, token);
      setHakim(response.data.records);
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
  const getAllKasus = async () => {
    let params = {
      filter: '',
      pageSize: 1000,
    };
    try {
      const response = await apiKasusRead(params, token);
      setKasus(response.data.records);
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

  const getAllPengadilanMiliter = async () => {
    let params = {
      filter: '',
      pageSize: 1000,
    };
    try {
      const response = await apiPengadilanMiliterRead(params, token);
      setPengadilanMiliter(response.data.records);
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

  const getAllAhli = async () => {
    let params = {
      filter: '',
      pageSize: 1000,
    };
    try {
      const response = await apiAhliRead(params, token);
      setAhli(response.data.records);
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

  const getAllSaksi = async () => {
    let params = {
      filter: '',
      pageSize: 1000,
    };
    try {
      const response = await apiReadSaksi(params, token);
      setSaksi(response.data.records);
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
  useEffect(() => {
    Promise.all([
      getTimeZone(),
      getAllJenisSidang(),
      getAllJaksaPenuntut(),
      getAllHakim(),
      getAllKasus(),
      getAllPengadilanMiliter(),
      getAllAhli(),
      getAllSaksi(),
    ]);
  }, []);
  const handleSelectJaksa = (e: any) => {
    console.log('jaksa', e);
    let arrayTemp: any = [];
    for (let i = 0; i < e.length; i++) {
      arrayTemp.push(e[i].value);
    }

    setFormState({ ...formState, oditur_penuntut_id: arrayTemp });
  };
  const handleKasus = async (selectedOption: any) => {
    if (selectedOption) {
      setFormState({ ...formState, kasus_id: selectedOption.value });
      const saksiFilter = kasus.filter(
        (item: any) => item.kasus_id === selectedOption.value,
      )[0];
      console.log(saksiFilter, 'saksiFilter');
      if (saksiFilter) {
        const saksiMap = saksiFilter.saksi.map((item: any) => ({
          label: item.nama_saksi,
          value: item.saksi_id,
        }));
        setGetSaksi(saksiMap);

        setFormState({
          ...formState,
          nomor_kasus: saksiFilter.nomor_kasus,
          kasus_id: saksiFilter.kasus_id,
          nama_kasus: saksiFilter.nama_kasus,
        });
        console.log('getSaksi', getSaksi);
      } else {
        setGetSaksi([]); // Set getSaksi to an empty array if no matching kasus is found
      }
    } else {
      setFormState({ ...formState, kasus_id: '' });
      setGetSaksi([]);
    }
  };
  const handlePenadilanMiliter = (e: any) => {
    setFormState({ ...formState, pengadilan_militer_id: e?.value });
  };

  const handleJadwalSidang = (e: any) => {
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
      jadwal_sidang: dayjs(e).format('YYYY-MM-DDTHH:mm'),
      zona_waktu: zonaWaktu,
    });
  };
  const handlePerubahanJadwal = (e: any) => {
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
      perubahan_jadwal_sidang: dayjs(e).format('YYYY-MM-DDTHH:mm'),
      zona_waktu: zonaWaktu,
    });
  };

  const handleWaktuMulai = (e: any) => {
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
      waktu_mulai_sidang: dayjs(e).format('YYYY-MM-DDTHH:mm'),
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
      waktu_selesai_sidang: dayjs(e).format('YYYY-MM-DDTHH:mm'),
      zona_waktu: zonaWaktu,
    });
  };
  const handleSelectAhli = (e: any) => {
    let arrayTemp = [];
    for (let i = 0; i < e.length; i++) {
      arrayTemp.push(e[i].value);
    }

    setFormState({ ...formState, ahli: arrayTemp });
  };
  const handleSelectSaksi = (e: any) => {
    console.log(e, 'handleSelectSaksi');
    const selectedValues = e.map((item: any) => ({
      value: item.value,
      label: item.label,
    }));

    setFormState((prevFormState: any) => ({
      ...prevFormState,
      saksi: selectedValues.map((valueItem: any) => valueItem.value),
      saksiHolder: selectedValues.map((valueItem: any) => ({
        saksi_id: valueItem.value,
        nama_saksi: valueItem.label,
      })),
    }));

    setGetSaksi(selectedValues);
    // console.log('getSaksi', getSaksi);
  };

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
      (_: any, i: any) => i !== index,
    );
    setFormState({
      ...formState,
      pengacara: newArrayPasal,
    });
  };
  const handleJenisPersidangan = (e: any) => {
    setFormState({ ...formState, jenis_persidangan_id: e?.value });
  };
  const handleSelectKetuaHakim = (e: any) => {
    setFormState({ ...formState, role_ketua_oditur: e?.value });
  };
  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmitAddUser = async (params: any) => {
    console.log(params, 'params submit add');
    try {
      const responseCreate = await apiSidangInsert(params, token);
      if (responseCreate.data.status === 'OK') {
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menambah data',
        });
        // setModalAddOpen(false);
        // console.log(responseCreate, 'crrr');
        // fetchData();
      } else if (responseCreate.data.status === 'error') {
        const errorCreate = responseCreate.data.message;
        Alerts.fire({
          icon: 'error',
          title: errorCreate,
        });
      } else {
        throw new Error(responseCreate.data.message);
      }
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formState, 'formState');
    // console.log('SUBMIT', e);

    // if (!validateForm()) return;
    // setButtonLoad(true);
    // console.log('formstateValidate', formState);
    // handleSubmitAddUser(formState).then(() => {
    //   setButtonLoad(false);
    //   setFormState({
    //     waktu_mulai_sidang: '',
    //     waktu_selesai_sidang: '',
    //     jadwal_sidang: '',
    //     perubahan_jadwal_sidang: '',
    //     kasus_id: '',
    //     nama_kasus: '',
    //     nomor_kasus: '',
    //     masa_tahanan_tahun: '',
    //     masa_tahanan_bulan: '',
    //     masa_tahanan_hari: '',
    //     nama_sidang: '',
    //     juru_sita: '',
    //     hasil_keputusan_sidang: '',
    //     pengawas_peradilan_militer: '',
    //     jenis_persidangan_id: '',
    //     pengadilan_militer_id: '',
    //     nama_dokumen_persidangan: '',
    //     pdf_file_base64: '',
    //     hasil_vonis: '',
    //     ahli: [],
    //     agenda_sidang: '',
    //     saksi: [],
    //     pengacara: [],
    //     // hakim_id: [],
    //     // role_ketua_hakim: '',
    //     oditur_penuntut_id: [],
    //     role_ketua_oditur: {},
    //     zona_waktu: '',
    //   });
    // });
  };
  const handleDownloadDoc = () => {
    window.open(
      `https://dev.transforme.co.id${formState.link_dokumen_persidangan}`,
      '_blank',
    );
  };
  const ExampleCustomTimeInput = ({ date, value, onChange }: any) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ border: 'solid 1px pink' }}
    />
  );
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
      'fileUpload',
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  };

  return (
    <div className="px-10">
      <div className="bg-slate-500 p-5 shadow-xl rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mt-5">
            <div className="grid grid-cols-2 gap-4 justify-normal">
              <div className="form-group w-full">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Nama Sidang
                </label>
                <select
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary p-nama"
                  onChange={handleChange}
                  // placeholder="Tahap sidang"
                  name="nama_sidang"
                  value={formState.nama_sidang}
                  // disabled={isDetail}
                >
                  <option value="" disabled>
                    Pilih tahap sidang{' '}
                  </option>
                  <option value="Tahap Pertama">Tahap Pertama</option>
                  <option value="Tahap Kedua">Tahap Kedua</option>
                  <option value="Tahap Ketiga">Tahap Ketiga</option>
                </select>
              </div>
              <div className="">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Pilih Jenis Sidang
                </label>
                <Select
                  className="basic-single p-jenis"
                  name="jenis_persidangan_id"
                  isClearable={true}
                  isSearchable={true}
                  // isDisabled={isDetail}
                  placeholder="Pilih jenis sidang"
                  styles={CustomStyles}
                  options={jenisSidang.map((item: any) => ({
                    value: item.jenis_persidangan_id,
                    label: item.nama_jenis_persidangan,
                  }))}
                  onChange={handleJenisPersidangan}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'nama_jenis_persidangan'
                      ? 'Masukan jenis sidang'
                      : '',
                  )}
                </p>
              </div>
            </div>
            <div className="form-group w-full ">
              <label
                className="block mb-1 text-base font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Anggota Oditur Penuntut
              </label>
              <Select
                className="basic-multi-select p-anggota"
                isMulti
                classNamePrefix="select"
                placeholder={'Pilih oditur penuntut'}
                isClearable={true}
                isSearchable={true}
                // isDisabled={isDetail}
                name="oditur_penuntut_id"
                styles={CustomStyles}
                options={jaksa?.map((item: any) => ({
                  value: item.oditur_penuntut_id,
                  label: item.nama_oditur,
                }))}
                onChange={handleSelectJaksa}
              />
              <p className="error-text">
                {errors.map((item) => (item === '' ? 'Pilih jaksa' : ''))}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-normal">
              <div className="form-group w-full ">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Ketua Oditur
                </label>
                <Select
                  className="basic-select p-ketua"
                  classNamePrefix="select"
                  placeholder={'Pilih ketua oditur'}
                  isClearable={true}
                  isSearchable={true}
                  name="oditur_penuntut_id"
                  styles={CustomStyles}
                  options={jaksa
                    .filter((item) =>
                      formState?.oditur_penuntut_id?.includes(
                        item.oditur_penuntut_id,
                      ),
                    )
                    .map((item: any) => ({
                      value: item.oditur_penuntut_id,
                      label: item.nama_oditur,
                    }))}
                  onChange={handleSelectKetuaHakim}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'role_ketua_jaksa' ? 'Pilih ketua oditur' : '',
                  )}
                </p>
              </div>
              <div className="form-group w-full ">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Kasus
                </label>
                <Select
                  className="basic-single p-kasus"
                  classNamePrefix="select"
                  // defaultValue={
                  //   isEdit || isDetail
                  //     ? {
                  //         value: formState.kasus_id,
                  //         label: formState.nama_kasus,
                  //       }
                  //     : formState.kasus_id
                  // }
                  placeholder={'Pilih kasus'}
                  isClearable={true}
                  isSearchable={true}
                  // isDisabled={isDetail}
                  name="kasus_id"
                  styles={CustomStyles}
                  options={kasus.map((item: any) => ({
                    value: item.kasus_id,
                    label: item.nama_kasus,
                  }))}
                  onChange={handleKasus}
                />
                {/* <p className="error-text">
                        {errors.map((item) =>
                          item === 'kasus_id' ? 'Pilih kasus' : '',
                        )}
                      </p> */}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-normal">
              <div className="form-group w-full ">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Nomor Kasus
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2.5 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-nomor"
                  onChange={handleChange}
                  placeholder="Nomor kasus"
                  name="nomor_kasus"
                  value={formState?.nomor_kasus}
                  disabled
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'role_ketua_jaksa' ? 'Pilih ketua oditur' : '',
                  )}
                </p>
              </div>
              <div className="form-group w-full ">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Pengadilan Militer
                </label>
                <Select
                  className="basic-single p-militer"
                  classNamePrefix="select"
                  isClearable={true}
                  isSearchable={true}
                  placeholder={'Pilih pengadilan militer'}
                  onChange={handleChange}
                  name="pengadilan_militer_id"
                  styles={CustomStyles}
                  options={pengadilanMiliter.map((item: any) => ({
                    value: item.pengadilan_militer_id,
                    label: item.nama_pengadilan_militer,
                  }))}
                  onChange={handlePenadilanMiliter}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'kasus_id' ? 'Pilih kasus' : '',
                  )}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-normal">
              <div className="form-group w-full ">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Juru Sita
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2.5 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-nomor"
                  onChange={handleChange}
                  placeholder="Juru sita"
                  name="juru_sita"
                  value={formState?.juru_sita}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'juru_sita' ? 'Pilih juru sita' : '',
                  )}
                </p>
              </div>
              <div className="form-group w-full ">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Pengawas Peradilan Militer
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2.5 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-nomor"
                  onChange={handleChange}
                  placeholder="Pengawas peradilan militer"
                  name="pengawas_peradilan_militer"
                  value={formState?.pengawas_peradilan_militer}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'pengawas_peradilan_militer'
                      ? 'Pilih juru sita'
                      : '',
                  )}
                </p>
              </div>
            </div>
            <div className="form-group w-full ">
              <label
                className="block mb-1 text-base font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Agenda Sidang
              </label>
              <input
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2.5 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-agenda"
                onChange={handleChange}
                placeholder="Agenda sidang"
                name="agenda_sidang"
                value={formState.agenda_sidang}
                // disabled={isDetail}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === 'agenda_sidang' ? 'Masukan agenda sidang' : '',
                )}
              </p>
            </div>
            <div className="form-group w-full ">
              <label
                className="block mb-1 text-base font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Hasil Keputusan Sidang
              </label>
              <input
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2.5 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-agenda"
                onChange={handleChange}
                placeholder="Hasil keputusan sidang"
                name="hasil_keputusan_sidang"
                value={formState.hasil_keputusan_sidang}
                // disabled={isDetail}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === 'hasil_keputusan_sidang'
                    ? 'Masukan agenda sidang'
                    : '',
                )}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 justify-normal">
                {/* jadwal sidang */}
                <div className="form-group w-full ">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Jadwal sidang
                  </label>
                  <div className="flex flex-row">
                    <DatePicker
                      selected={
                        formState.jadwal_sidang
                          ? dayjs(formState.jadwal_sidang).toDate()
                          : dayjs().toDate()
                      }
                      onChange={handleJadwalSidang}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeCaption="Pilih Waktu"
                      dateFormat="dd/MM/yyyy HH:mm"
                      // customInput={<ExampleCustomTimeInput />}
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-mulai"
                      name="jadwal_sidang"
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
                      item === 'jadwal_sidang' ? 'Masukan jadwal sidang' : '',
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
                  <div className="flex flex-row">
                    {/* <input
                        type="datetime-local"
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-perubahan"
                        name="perubahan_jadwal_sidang"
                        onChange={handleChange}
                        value={formState.perubahan_jadwal_sidang}
                        disabled={isDetail}
                      /> */}
                    <DatePicker
                      selected={
                        formState.perubahan_jadwal_sidang
                          ? dayjs(formState.perubahan_jadwal_sidang).toDate()
                          : dayjs().toDate()
                      }
                      onChange={handlePerubahanJadwal}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeCaption="Pilih Waktu"
                      dateFormat="dd/MM/yyyy HH:mm"
                      // customInput={<ExampleCustomTimeInput />}
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-selesai"
                      name="perubahan_jadwal_sidang"
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
                      item === 'perubahan_jadwal_sidang'
                        ? 'Masukan perubahan jadwal'
                        : '',
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
                  <div className="flex flex-row">
                    {/* <input
                          type="datetime-local"
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-waktu"
                          name="waktu_mulai_sidang"
                          onChange={handleChange}
                          value={formState.waktu_mulai_sidang}
                          disabled={isDetail}
                        /> */}
                    <DatePicker
                      selected={
                        formState.waktu_mulai_sidang
                          ? dayjs(formState.waktu_mulai_sidang).toDate()
                          : dayjs().toDate()
                      }
                      onChange={handleWaktuMulai}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeCaption="Pilih Waktu"
                      dateFormat="dd/MM/yyyy HH:mm"
                      // customInput={<ExampleCustomTimeInput />}
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-mulai"
                      name="waktu_mulai_sidang"
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
                      item === 'waktu_mulai_sidang'
                        ? 'Masukan tanggal mulai'
                        : '',
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
                  <div className="flex flex-row">
                    {/* <input
                          type="datetime-local"
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-selesai"
                          name="waktu_selesai_sidang"
                          onChange={handleChange}
                          value={formState.waktu_selesai_sidang}
                          disabled={isDetail}
                        /> */}
                    <DatePicker
                      selected={
                        formState.waktu_selesai_sidang
                          ? dayjs(formState.waktu_selesai_sidang).toDate()
                          : dayjs().toDate()
                      }
                      onChange={handleWaktuSelesai}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeCaption="Pilih Waktu"
                      dateFormat="dd/MM/yyyy HH:mm"
                      // customInput={<ExampleCustomTimeInput />}
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-selesai"
                      name="waktu_selesai_sidang"
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
                      item === 'waktu_selesai_sidang'
                        ? 'Masukan tanggal selesai'
                        : '',
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-normal">
              <div className="form-group w-full ">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Ahli
                </label>
                <Select
                  className="basic-multi-select p-ahli"
                  isMulti
                  classNamePrefix="select"
                  placeholder={'Pilih ahli'}
                  isClearable={true}
                  isSearchable={true}
                  // isDisabled={isDetail}
                  name="ahli"
                  styles={CustomStyles}
                  options={ahli.map((item: any) => ({
                    value: item.ahli_id,
                    label: item.nama_ahli + ' ' + '(' + item.bidang_ahli + ')',
                  }))}
                  onChange={handleSelectAhli}
                />
                <p className="error-text">
                  {errors.map((item) => (item === 'ahli' ? 'Pilih ahli' : ''))}
                </p>
              </div>
              <div className="form-group w-full ">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Saksi
                </label>
                <Select
                  className="basic-multi-select p-saksi"
                  isMulti
                  classNamePrefix="select"
                  value={getSaksi.map((item: any) => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder={'Pilih saksi'}
                  isClearable={true}
                  isSearchable={true}
                  // isDisabled={isDetail}
                  name="saksi"
                  styles={CustomStyles}
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
                    item === 'saksi' ? 'Pilih saksi' : '',
                  )}
                </p>
              </div>
            </div>
            <div className="">
              {/* <div className="flex -items-center block mb-1 text-base font-medium text-black dark:text-white">
                    Pengacara
                  </div> */}
              <div className="flex items-center">
                <p className="block mb-1 text-base font-medium text-black dark:text-white">
                  Pengacara
                </p>
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
                  <input
                    type="text"
                    // defaultValue={
                    //   isDetail || isEdit ? formState.pengacara : ''
                    // }
                    value={pengacaraField}
                    placeholder="Masukan pengacara"
                    onChange={handleInputPengacara}
                    // disabled={isDetail}
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
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className={`mt-2 flex flex-col overflow-hidden gap-2 ${
                    formState.pengacara?.length === 0 ? 'hidden' : 'block'
                  }`}
                >
                  {formState.pengacara?.map((item: any, index: any) => (
                    <div className="flex flex-row items-center">
                      <p
                        key={index}
                        className="capitalize px-3 py-1 truncate w-full  rounded-md bg-boxdark border-[1px] border-slate-500  text-white"
                      >
                        {item}
                      </p>
                      <button
                        className="block"
                        type="button"
                        onClick={() => {
                          handleRemovePengacara(index);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-normal">
              <div className="form-group w-full">
                <label className="block mb-1 text-base font-medium text-black dark:text-white">
                  Vonis
                </label>
                <div className="grid grid-cols-3 gap-4 border px-2 py-2 rounded-lg border-blue-500 i-vonis">
                  <div className="form-group w-full ">
                    <input
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      onChange={handleChange}
                      placeholder="Tahun"
                      name="masa_tahanan_tahun"
                      value={formState.masa_tahanan_tahun}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'masa_tahanan_tahun'
                          ? 'Masukan vonis tahun'
                          : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full ">
                    <input
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      onChange={handleChange}
                      name="masa_tahanan_bulan"
                      placeholder="Bulan"
                      value={formState.masa_tahanan_bulan}
                      // disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'masa_tahanan_bulan'
                          ? 'Masukan vonis bulan'
                          : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full ">
                    <input
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      onChange={handleChange}
                      placeholder="Hari"
                      name="masa_tahanan_hari"
                      value={formState.masa_tahanan_hari}
                      // disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'masa_tahanan_hari'
                          ? 'Masukan vonis hari'
                          : '',
                      )}
                    </p>
                  </div>
                </div>
              </div>
              {/* Nama Dokument */}
              <div className="form-group w-full ">
                <label
                  className="block mb-4 text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Nama Dokumen
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-nama"
                  onChange={handleChange}
                  placeholder="Nama Dokumen"
                  name="nama_dokumen_persidangan"
                  value={formState.nama_dokumen_persidangan}
                  // disabled={isDetail}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'nama_dokumen_persidangan'
                      ? 'Masukan nama dokumen'
                      : '',
                  )}
                </p>
              </div>
            </div>
            {/* Dokumentasi */}
            <div className="grid grid-cols-1 h-fit">
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
                      className={`absolute top-0 right-0  bg-red-500 flex items-center  rounded-bl block`}
                    >
                      <button className="p-[2px]" onClick={handleRemoveDoc}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          width="20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
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
                      className={`flex justify-center mt-3 
                              hidden`}
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
                  <div className="flex flex-col items-center justify-center space-y-3 p-unggah">
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
                    <label htmlFor="fileUpload" className="cursor-pointer">
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
                  item === 'pdf_file_base64' ? 'Masukan dokumen sidang' : '',
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
                className="w-full max-h-[94px] min-h-[94px] rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary t-hasil"
                name="hasil_vonis"
                placeholder="Hasil vonis"
                onChange={handleChange}
                value={formState.hasil_vonis}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === 'hasil_vonis' ? 'Masukan hasil vonis' : '',
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
            <button className="items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1">
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
              Tambah Data Sidang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSidang;
