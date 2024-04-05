// import React from 'react'
import Select from 'react-select';
import { CustomStyles } from './CustomStyle';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import { apiReadKasus } from '../../services/api';

const tokenItem = localStorage.getItem('token');
const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
const token = dataToken.token;

const AddPenyidikan = () => {
  const [formState, setFormState] = useState({
    penyidikan_id: '',
    kasus_id: '',
    nomor_penyidikan: '',
    nama_kasus: '',
    agenda_penyidikan: '',
    waktu_dimulai_penyidikan: '',
    waktu_selesai_penyidikan: '',
    wbp_profile_id: '',
    nomor_kasus: '',
    saksi_id: '',
    oditur_penyidik_id: '',
    nama_jenis_perkara: '',
    nama_kategori_perkara: '',
    nrp_wbp: '',
    zona_waktu: '',
  });
  const [buttonLoad, setButtonLoad] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [dataKasus, setDataKasus] = useState<any[]>([]);
  const [dataKasusSelect, setDataKasusSelect] = useState<any>();
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

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    console.log('3333', e.target.value);
  };

  useEffect(() => {
    const params = {
      pageSize: Number.MAX_SAFE_INTEGER,
    };
    const fetchData = async () => {
      try {
        const kasus = await apiReadKasus(params, token);
        setDataKasus(kasus.data.records);
        // setIsLoading(false);
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
        // setIsLoading(false);
        // if (e.response.status === 403) {
        //   navigate('/auth/signin', {
        //     state: { forceLogout: true, lastPage: location.pathname },
        //   });
        // }
        // Alerts.fire({
        //   icon: e.response.status === 403 ? 'warning' : 'error',
        //   title: e.response.status === 403 ? Error403Message : e.message,
        // });
      }
    };
    fetchData();
  }, []);

  const kasusOptions = dataKasus?.map((item: any) => ({
    value: item.kasus_id,
    label: item.nomor_kasus,
  }));

  // const kasusOptionsValue = {
  //   value: defaultValue?.kasus_id,
  //   label: defaultValue?.nomor_kasus,
  // };

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
  const selectedKasus = dataKasus?.find(
    (item: any) => item.kasus_id === formState.kasus_id,
  );

  const penyidikOptions: any = selectedKasus
    ? selectedKasus?.oditur_penyidik?.map((item: any) => ({
        value: item.oditur_penyidik_id,
        label: item.nama_oditur,
      }))
    : [];

  const onChangePenyidik = (e: any) => {
    setFormState({ ...formState, oditur_penyidik_id: e.value });
  };

  return (
    <div className="bg-slate-600 w-full h-full flex flex-col gap-10 p-8 rounded-lg">
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
            {/* {errors?.map((item) =>
                        item === 'nomor_penyidikan'
                          ? 'Masukan Nomor Penyidikan'
                          : '',
                      )} */}
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
            //   isDisabled={isDetail}
            onChange={onChangeKasus}
            // defaultValue={kasusOptionsValue}
            options={kasusOptions}
            styles={CustomStyles}
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
            {/* {errors?.map((item) =>
                        item === 'nama_jenis_perkara'
                          ? 'Masukan Jenis Perkara'
                          : '',
                      )} */}
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
            //   isDisabled={isDetail}
            // defaultValue={terlibatOptionsValue}
            onChange={handleSelectPihakTerlibat}
            placeholder="Pihak Terlibat"
            styles={CustomStyles}
            id="p-terlibat"
          />
          <p className="error-text">
            {/* {errors.map((item) =>
                        item === 'nama' ? 'Masukan Tersangka' : '',
                      )} */}
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
            {errors?.map((item) => (item === 'nrp_wbp' ? 'Masukan NRP' : ''))}
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
          // isDisabled={isDetail}
          // defaultValue={penyidikOptionsValue}
          options={penyidikOptions}
          placeholder="Penyidik"
          styles={CustomStyles}
          id="p-penyidikan"
        />
        <p className="error-text">
          {errors?.map((item) =>
            item === 'wbp_profile_id' ? 'Masukan Penyidik' : '',
          )}
        </p>
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
            // disabled={isDetail}
          />
          <p className="error-text absolute bottom-1">
            {errors?.map((item) =>
              item === 'agenda_penyidikan' ? 'Masukan Alasan Penyidikan' : '',
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddPenyidikan;
