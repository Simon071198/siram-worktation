import React, { useState, useEffect, useRef } from 'react';

export const UbahPasswordModal = ({
  closeModal,
  onSubmit,
  defaultValue
}: any) => {
  const [formState, setFormState] = useState({
    user_id : defaultValue.user_id,
    password :'',
    new_password :'',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef: any = useRef(null);
  const [buttonLoad, setButtonLoad] = useState(false);

  // useEffect(() => {
  //   const handleOutsideClick = (e: any) => {
  //     if (
  //       modalContainerRef.current &&
  //       !modalContainerRef.current.contains(e.target)
  //     ) {
  //       closeModal();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, [closeModal]);

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
        if (value === '') {
          errorFields.push(key);
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


  const handleChange = (
    e: any
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formState, 'formState');
    if (!validateForm()) return;
    setButtonLoad(true)
    onSubmit(formState).then(()=>setButtonLoad(false))
    console.log(formState, 'Succes validate formState');
    // closeModal();
  };

  const modalStyles:any = {
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

  return (
    <div>
       <div style={modalStyles.backdrop}></div>
    <div
      ref={modalContainerRef}
      style={modalStyles.modalContainer}
      className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
    >
      <div className="modal rounded-sm w-full">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <div className="w-full flex justify-between">
            <div>
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Ganti Password
              </h3>
            </div>
            <strong
              className="text-xl align-center cursor-pointer "
              onClick={closeModal}
            >
              &times;
            </strong>
          </div>
          <div className="grid grid-row-1 mt-5 gap-4">
            <div className="form-group w-full ">
              <label
                className="block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Password Sekarang
              </label>
              <input
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Current password"
               
              />
              <p className='error-text'>
                {errors.map((item)=> item === 'password' ? 'Masukan password lama':'')}
              </p>
            </div>

            <div className="form-group w-full ">
              <label
                className="block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Password Baru
              </label>
              <input
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                name="new_password"
                type="password"
                onChange={handleChange}
                placeholder="New password"
                
              />

                <p className='error-text'>
                {errors.map((item)=> item === 'new_password' ? 'Masukan password baru':'')}
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
           {/* {errors.filter((item: string) => !item.startsWith('INVALID_ID'))
              .length > 0 && (
              <div className="error mt-4">
                <span>Please input :</span>
                <p className="text-red-400">
                  {errors
                    .filter((item: string) => !item.startsWith('INVALID_ID'))
                    .join(', ')}
                
                </p>
              </div>
            )} */}

          
          <br></br>

          <div className="flex justify-between">
             <button
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                      buttonLoad ? 'bg-slate-400' : ''
                    }`}
                    type="submit"
                    onClick={handleSubmit}
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
                    Ubah Password
                  </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
