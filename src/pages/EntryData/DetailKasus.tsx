import React, { Component, useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const DetailKasus = ({
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
    jenis_perkara_id: defaultValue?.jenis_perkara_id,
    jenis_pidana_id: defaultValue?.jenis_pidana_id,
    kategori_perkara_id: '',
    waktu_kejadian: '',
    waktu_pelaporan_kasus: '',
    wbp_profile_ids: [],
    keterangans: [],
    role_ketua_oditur_ids: '',
    oditur_penyidik_id: [],
    nama_jenis_perkara: defaultValue?.nama_jenis_perkara,
    nama_jenis_pidana: defaultValue?.nama_jenis_pidana,
    saksi_id: [],
    keteranganSaksis: [],
    zona_waktu: '',
  });

  const [isLoading, setIsLoading] = useState(false);

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
    setFormState({
      ...formState,
      waktu_pelaporan_kasus: dayjs(e).format('YYYY-MM-DDTHH:mm'),
      zona_waktu: zonaWaktu,
    });
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

  useEffect(() => {
    Promise.all([getTimeZone()]).then(() => {
      setIsLoading(false);
    });
  });

  return (
    <div>
      {/* <input type="text" placeholder="form 2" className="p-2 rounded-md" /> */}

      <div className="w-full flex justify-between">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Tambah Data Daftar Kasus
        </h3>
      </div>

      <form>
        <div className="grid grid-cols-2 gap-4">
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
            />
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
            />
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
            />
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
            />
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
            />
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
                className="w-full rounded border border-stroke py-3 pl-3 pr-[28rem] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
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
                  formState.waktu_pelaporan_kasus
                    ? dayjs(formState.waktu_pelaporan_kasus).toDate()
                    : dayjs().toDate()
                }
                showTimeInput
                timeFormat="HH:mm"
                onChange={handleWaktuPelaporan}
                timeCaption="Time"
                dateFormat="dd/MM/yyyy HH:mm"
                customTimeInput={<ExampleCustomTimeInput />}
                className="w-full rounded border border-stroke py-3 pl-3 pr-[28rem] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
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
          </div>

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
            />
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
              isDisabled={isDetail}
            />
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
              isDisabled={isDetail}
              placeholder="Pilih Ketua Oditur"
              styles={customStyles}
            />
          </div>

          <div className="form-group w-full">
            <label
              className="block text-sm font-medium text-black dark:text-white pt-3"
              htmlFor="id"
            >
              Pihak Terlibat
            </label>
            <Select className='capitalize' isMulti isDisabled={isDetail} placeholder="Pihak Terlibat" styles={customStyles} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default DetailKasus;
