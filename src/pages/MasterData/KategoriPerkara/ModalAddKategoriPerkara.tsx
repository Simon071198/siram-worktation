import React, { useEffect, useRef, useState } from 'react';


// interface
interface AddKategoriPerkaraModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
}



export const AddKategoriPerkaraModal: React.FC<AddKategoriPerkaraModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      nama_kategori_perkara: '',
    }
  );

  //state
  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

//useEffect untuk menambahkan event listener  ke elemen dokumen
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(e.target as Node)
      ) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closeModal]);

  // function
  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== ''
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

    // fetch data
    useEffect(() => {
      const fetchData = async () => {
        try {

          setTimeout(() => {
            setIsLoading(false)  
          }, 300);
        } catch(err) {throw err}
  };
    fetchData();
  }, []);

  //return
  return (
    <div
      ref={modalContainerRef}
      className="modal-container fixed z-50 flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] bg-boxdark"
    >
      <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-slate-600 h-full w-[80vh]">
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
                  ? 'Detail Data Kejahatan'
                  : isEdit
                  ? 'Edit Data Kejahatan'
                  : 'Tambah Data Kejahatan'}
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

            <div className="mt-5 grid grid-cols-1 gap-5 justify-normal">
             
              <div className="form-group w-full">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Nama kategori perkara
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="nama_kategori_perkara"
                  placeholder='Nama kategori Perkara'
                  onChange={handleChange}
                  value={formState.nama_kategori_perkara}
                  disabled={isDetail}
                />
                <p className="error-text p-0 m-0">
                  {errors.map((item) =>
                    item === 'nama_kategori_perkara'
                      ? 'Pilih Kategori Perkara'
                      : ''
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
                    .filter((item: string) => item.startsWith('INVALID_ID'))[0]
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
              Ubah Data Kategori Perkara
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
                  Tambah Data Kategori Perkara
                </button>
                )}
          </form>
        </div>
        )}
      </div>
    </div>
  );
};
