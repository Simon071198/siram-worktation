import React, { useEffect, useRef, useState } from 'react';
import { apiReadKategoriPerkara } from '../../../services/api';


// interface
interface AddCaseTypeModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
}

export const AddCaseTypeModal: React.FC<AddCaseTypeModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      nama_jenis_perkara: '',
      pasal: '',
      kategori_perkara_id: '',
      // vonis_bulan_perkara: '',
      // vonis_hari_perkara : '',
      // vonis_tahun_perkara: '',
    }
  );

  //state
  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [kategori_perkara, setkategoriperkara] = useState([])
  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // function
  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== 'jenis_perkara_id' &&
        key !== 'vonis_bulan_perkara' &&
        key !== 'vonis_hari_perkara' &&
        key !== 'vonis_tahun_perkara'
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState, 'formState');

    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState);
    // closeModal();
  };


  useEffect(() => {
    const fetchDataKategori = async () => {
      let params = {
        pageSize: 1000,
      }
      try {
        const perka = await apiReadKategoriPerkara(params)
        const kategori = perka.data.records
        setkategoriperkara(kategori);

        setTimeout(() => {
          setIsLoading(false)
        }, 500);

      } catch (err) { throw err }
    }
    fetchDataKategori();
  }, []);

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

  //return
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
                  stroke-width="4"
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
                      ? 'Detail Jenis Perkara'
                      : isEdit
                        ? 'Edit Jenis Perkara'
                        : 'Tambah Jenis Perkara'}
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

                <div className="mt-5 grid grid-cols-1 gap-4 justify-normal">

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Jenis Perkara
                    </label>
                    <input
                      className="w-full rounded border border-stroke   py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="nama_jenis_perkara"
                      placeholder='Nama Jenis Perkara'
                      onChange={handleChange}
                      value={formState.nama_jenis_perkara}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_jenis_perkara'
                          ? 'Pilih Jenis Perkara'
                          : ''
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Pasal
                    </label>
                    <input
                      className="w-full rounded border border-stroke   py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="pasal"
                      placeholder='pasal'
                      onChange={handleChange}
                      value={formState.pasal}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'pasal'
                          ? 'Pilih Pasal'
                          : ''
                      )}
                    </p>
                  </div>

                  {/* kategori perkara id start */}
                  <div className="form-group w-full flex flex-col">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Kategori Perkara
                    </label>
                    <select
                      className="w-full rounded border border-stroke   py-3 pl-3 pr-6.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="kategori_perkara_id"
                      onChange={handleChange}
                      value={formState.kategori_perkara_id}
                      disabled={isDetail}
                    >
                      <option disabled value="">
                        Pilih Kategori Perkara
                      </option>
                      {kategori_perkara.map((item: any) => (
                        <option value={item.kategori_perkara_id}>
                          {item.nama_kategori_perkara}
                        </option>
                      ))}
                    </select>
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'kategori_perkara_id'
                          ? 'Pilih Kategori Perkara'
                          : ''
                      )}
                    </p>
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-3 mt-4'>
                  {/* <div className="form-group w-full">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Vonis Tahun
                </label>
                <input
                  className="w-full rounded border border-stroke   py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                  name="vonis_tahun_perkara"
                  placeholder='vonis tahun'
                  onChange={handleChange}
                  value={formState.vonis_tahun_perkara}
                  disabled={isDetail}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'vonis_tahun_perkara'
                      ? 'Pilih vonis tahun'
                      : ''
                  )}
                </p>
              </div>
              <div className="form-group w-full">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Vonis Bulan
                </label>
                <input
                  className="w-full rounded border border-stroke   py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                  name="vonis_bulan_perkara"
                  placeholder='vonis bulan'
                  onChange={handleChange}
                  value={formState.vonis_bulan_perkara}
                  disabled={isDetail}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'vonis_bulan_perkara'
                      ? 'Pilih vonis bulan'
                      : ''
                  )}
                </p>
              </div>
              <div className="form-group w-full">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Vonis Hari
                </label>
                <input
                  className="w-full rounded border border-stroke   py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                  name="vonis_hari_perkara"
                  placeholder='vonis hari'
                  onChange={handleChange}
                  value={formState.vonis_hari_perkara}
                  disabled={isDetail}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'vonis_hari_perkara'
                      ? 'Pilih vonis hari'
                      : ''
                  )}
                </p>
              </div> */}
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
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${buttonLoad ? 'bg-slate-400' : ''
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
                    Ubah Jenis Perkara
                  </button>
                ) : (
                  <button
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${buttonLoad ? 'bg-slate-400' : ''
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
                    Tambah Jenis Perkara
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
