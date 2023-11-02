import React, { useEffect, useRef, useState } from 'react';
import { apiReadAllRole, apiReadAllStaff, apiReadAllUser } from '../../../services/api';

interface AddBAPModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
}

const dataUserItem = localStorage.getItem('dataUser');
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

export const AddBAPModal: React.FC<AddBAPModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      petugas_id:'',
      user_role_id:'',
      email: '',
      phone: '',
      username:'',
      password :'',
      is_suspended: '',
      lokasi_otmil_id: dataAdmin.lokasi_otmil_id,
      lokasi_lemasmil_id: "",
      image:'',
    }
  );

  const modalContainerRef = useRef(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [staffData , setStaffData] =useState([])
  const [roleData , setRoleData] =useState([])
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


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

  // useEffect untuk mengambil data dari api
  useEffect(() => {
    getAllPetugas()
    getAllRole()
  }, []);

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== 'lokasi_lemasmil_id' &&  key !== 'last_login' &&  key !== 'nama_lokasi_lemasmil' &&  key !== 'image'// Tidak melakukan pemeriksaan pada lokasi_lemasmil_id
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

  const handleChange = (
    e: any
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(formState, 'formState');

    if (!validateForm()) return;
    setButtonLoad(true)
    onSubmit(formState);
  };


  const getAllPetugas = async ()=> {
    try{
      let params = {
        filter: ''
      };
   const response = await apiReadAllStaff(params)
     if (response.data.status !== 'OK') {
      throw new Error(response.data.message);
     }
    const result = response.data;
    setStaffData(result.records)
    setIsLoading(false);
    } catch(e:any){
      console.log(e.message)
    }
  }

  const getAllRole = async ()=> {
    try{
      let params = {
        filter: ''
      };
   const response = await apiReadAllRole(params)
     if (response.data.status !== 'OK') {
      throw new Error(response.data.message);
     }
    const result = response.data;
    setRoleData(result.records)

    } catch(e:any){
      console.log(e.message)
    }
  }

  // Add this CSS style within your modal component
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
      className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
    >
      {/* <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-full w-[80vh]"> */}
      <div className="modal rounded-sm w-full">
      {isLoading ? (
            <div>
              <div className='flex flex-row-reverse pr-5 pt-3'>
                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>
              <div className="h-[500px] justify-center flex items-center">
                <svg
                  className="animate-spin h-20 w-20 text-white "
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
            </div>
          ) : (
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <div className="w-full flex justify-between">
            <div>
              <h3 className="text-xl font-semibold text-black dark:text-white">
                {isDetail
                  ? 'Detail Data Pengguna'
                  : isEdit
                  ? 'Edit Data Pengguna'
                  : 'Tambah Data Pengguna'}
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

            <div className="grid grid-cols-2 gap-4 justify-normal mt-10">

              {/* Nama */}
              <div className="form-group w-full ">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Nama Petugas
                </label>
                <select 
                onChange={handleChange}
                name="petugas_id"
                value={formState.petugas_id}
                disabled={isDetail}
                className='w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'>
                
                <option disabled value=''>
                  Pilih Petugas
                </option>
                {staffData.map((item:any)=>(

                <option value={item.petugas_id}>
                  {item.nama}
                </option>
                ))}
                </select>
                <p className='error-text'>
                {errors.map((item)=> item === 'petugas_id' ? 'Pilih petugas':'')}
              </p>
              </div>

              {/* Role*/}
              <div className="form-group w-full ">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Role
                </label>
                <select 
                onChange={handleChange}
                name="user_role_id"
                value={formState.user_role_id}
                disabled={isDetail}
                className='capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'>
                
                <option disabled value=''>
                  Pilih Role
                </option>
                {roleData.map((item:any)=>(

                <option value={item.user_role_id}>
                {item.role_name} 
                </option>
                ))}
                </select>
                <p className='error-text'>
                {errors.map((item)=> item === 'user_role_id' ? 'Pilih role':'')}
              </p>
              </div>

              {/* NRP */}
              <div className="form-group w-full ">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  NRP
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  onChange={handleChange}
                  placeholder="NRP"
                  // value={}
                  disabled
                />
                 {/* <p className='error-text'>
                {errors.map((item)=> item === 'email' ? 'Masukan nrp':'')}
              </p> */}
              </div>
              {/* Matra */}
              <div className="form-group w-full ">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Matra
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  onChange={handleChange}
                  placeholder="Matra"
                  // value={}
                  disabled
                />
                 {/* <p className='error-text'>
                {errors.map((item)=> item === 'email' ? 'Masukan nrp':'')}
              </p> */}
              </div>
              {/* Jabatan */}
              <div className="form-group w-full ">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Jabatan
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  onChange={handleChange}
                  placeholder="Jabatan"
                  // value={}
                  disabled
                />
                 {/* <p className='error-text'>
                {errors.map((item)=> item === 'email' ? 'Masukan nrp':'')}
              </p> */}
              </div>
              {/* Divisi */}
              <div className="form-group w-full ">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Divisi
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  onChange={handleChange}
                  placeholder="Divisi"
                  // value={}
                  disabled
                />
                 {/* <p className='error-text'>
                {errors.map((item)=> item === 'email' ? 'Masukan nrp':'')}
              </p> */}
              </div>
              
              {/* Email */}
               <div className="form-group w-full ">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Email
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  placeholder="Email"
                  value={formState.email}
                  disabled={isDetail}
                />
                 <p className='error-text'>
                {errors.map((item)=> item === 'email' ? 'Masukan email':'')}
              </p>
              </div>
              
              {/* Phone */}
              <div className="form-group w-full ">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Phone
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={formState.phone}
                  disabled={isDetail}
                />
                 <p className='error-text'>
                {errors.map((item)=> item === 'phone' ? 'Masukan nomor handphone':'')}
              </p>
              </div>

                {/* Username */}
               <div className="form-group w-full ">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Username
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="username"
                  onChange={handleChange}
                  placeholder="Username"
                  value={formState.username}
                  disabled={isDetail}
                />
                 <p className='error-text'>
                {errors.map((item)=> item === 'username' ? 'Masukan username':'')}
              </p>
              </div>
              
              {/* Password */}
              {!isEdit && !isDetail &&
               <div className="form-group w-full ">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Password
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  placeholder="Password"
                  value={formState.password}
                  disabled={isDetail}
                />
                 <p className='error-text'>
                {errors.map((item)=> item === 'password' ? 'Masukan password':'')}
              </p>
              </div>
            } 
          
              {/* Suspen */}
              <div className="form-group w-full ">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Suspended (?)
                </label>
                <select 
                onChange={handleChange}
                name="is_suspended"
                value={formState.is_suspended}
                disabled={isDetail}
                className='capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'>
                
                <option disabled value=''>
                  Pilih
                </option>
                <option value='0'>
                  Tidak
                </option>
                <option value='1'>
                  Ya
                </option>
               
                </select>
                <p className='error-text'>
                {errors.map((item)=> item === 'is_suspended' ? 'Pilih suspended (?)':'')}
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
                    Ubah Data Pengguna
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
                    Tambah Data Pengguna
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
