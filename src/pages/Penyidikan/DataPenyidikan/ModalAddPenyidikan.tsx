import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import Select from 'react-select';
import { apiReadKasus } from '../../services/api';

const dataUserItem = localStorage.getItem('dataUser');
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

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
  });

  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [dataKasus, setDataKasus] = useState<any[]>([]);

  useEffect(() => {
    const params = {
      pageSize: Number.MAX_SAFE_INTEGER,
    };
    const fetchData = async () => {
      const kasus = await apiReadKasus(params, token);
      setDataKasus(kasus.data.records);

      setIsLoading(false);
    };
    fetchData();
  }, []);

  console.log(formState, 'formstate');

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
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
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
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="nama_kasus"
                      placeholder="Nama Kasus"
                      onChange={handleChange}
                      value={formState.nama_kasus}
                      disabled={isDetail}
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
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="nama_jenis_perkara"
                      placeholder="Jenis Perkara"
                      onChange={handleChange}
                      value={formState.nama_jenis_perkara}
                      disabled={isDetail}
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
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="nama_kategori_perkara"
                      placeholder="Kategori Perkara"
                      onChange={handleChange}
                      value={formState.nama_kategori_perkara}
                      disabled={isDetail}
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
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="nrp_wbp"
                      placeholder="NRP"
                      onChange={handleChange}
                      value={formState.nrp_wbp}
                      disabled={isDetail}
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
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Waktu Mulai Penyidikan
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="waktu_dimulai_penyidikan"
                      placeholder="Waktu Mulai Penyidikan"
                      onChange={handleChange}
                      value={formState.waktu_dimulai_penyidikan}
                      disabled={isDetail}
                    />
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
                    <input
                      type="datetime-local"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="waktu_selesai_penyidikan"
                      placeholder="Waktu Selesai Penyidikan"
                      onChange={handleChange}
                      value={formState.waktu_selesai_penyidikan}
                      disabled={isDetail}
                    />
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
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
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
