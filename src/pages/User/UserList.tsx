import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiUserList } from '../../services/api';
const CameraList = () => {
  const [data, setData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false) ;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  }
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  }

  const openEditModal = () => {
    setIsEditModalOpen(true);
  }
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  }

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  }
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  }

  useEffect(() => {
    let params = {
      filter: ' ',
    };
    apiUserList(params).then((res) => {
      console.log(res, 'res');

      setData(res);
    });
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Data Pengguna Aplikasi
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nama Pengguna
            </h5>
          </div>
      
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              ID Pengguna
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
Tanggal Dibuat            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Aksi
            </h5>
          </div>
        </div>

        {data.map((item) => {
          return (
            <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {item.username}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{item.userId}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{item.createstamp}</p>
              </div>

              <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
                <button 
                  className="ml-8 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                  onClick={openAddModal}
                >
                  Tambah
                </button>
                <button 
                  className=" text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                  onClick={openEditModal}
                >
                  Edit
                </button>
                <button 
                  className="mr-10 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                  onClick={openDeleteModal}
                >
                  Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {
        isAddModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-5 shadow-lg w-[50%] mt-30">
              <div className="position relative space-y-4">
                <div className="flex justify-between items-center border-b">
                  <h1 className="text-xl font-bold text-transparent-dark3">
                    Tambah Pengguna
                  </h1>
                  <button 
                    onClick={closeAddModal}
                    className="px-4 py-2 text-sm font-semibold text-bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    Close
                  </button>
                </div>
                <form action="">
                  <div className="mb-4">
                    <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-200" 
                    placeholder='Nama Pengguna'
                    required
                  />
                  </div>
                  <div className="mb-4">
                    <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-200" 
                    placeholder='Kata Sandi'
                    required
                  />
                  </div>
                  <div className="mb-4">
                    <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-200" 
                    placeholder='Telepon'
                    required
                  />
                  </div>
                  <div className="mb-4">
                    <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-200" 
                    placeholder='Email'
                    required
                  />
                  <div>
                    <button className="px-4 py-2 ml-70 mt-10 mb-2 rounded-lg font-medium text-white bg-primary"
                    >
                      SIMPAN
                    </button>
                  </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }
      {
        isEditModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-5 shadow-lg w-[50%] mt-30">
              <div className="position relative space-y-4">
                <div className="flex justify-between items-center border-b">
                  <h1 className="text-xl font-bold text-transparent-dark3">
                    Ubah Data Pengguna
                  </h1>
                  <button
                    onClick={closeEditModal}
                    className="px-4 py-2 text-sm font-semibold text-bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    Close
                  </button>
                </div>
                <form action="">
                  <div className="mb-4">
                    <input type="text" className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-200' 
                    placeholder='Nama Pengguna'
                    required
                  />
                  </div>
                  <div className="mb-4">
                    <input type="text" className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-200' 
                    placeholder='Kata Sandi'
                    required
                  />
                  </div>
                  <div className="mb-4">
                    <input type="text" className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-200' 
                    placeholder='Telepon'
                    required
                  />
                  </div>
                  <div className="mb-4">
                    <input type="text" className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-200' 
                    placeholder='Email'
                    required
                  />
                  </div>
                  <div>
                    <button className="px-4 py-2 ml-70 mt-10 mb-2 rounded-lg font-medium text-white bg-primary"
                  >
                    SIMPAN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }
      {
        isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-5 mb-20 shadow-lg w-[30%]">
            <div className="position relative space-y-4">
                <div className="flex justify-between items-center">
                  <h1 className='text-xl text-transparent-dark3 font-bold'>Konfirmasi Hapus Data</h1>
                </div>
                <div className='card'>
                  <p className='mb-10 mt-5 font-medium'>Apakah anda yakin untuk menghapus data ?</p>
                </div>
                <div className='flex justify-end'>
                  <button 
                    onClick={closeDeleteModal}
                    className='px-4 py-2 text-sm text-primary font-bold text-bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none'
                  >
                    BATAL
                  </button>
                  <button 
                    // onClick={}
                    className='px-4 py-2 text-sm text-white font-bold text-bg-b0 rounded-md hover:bg-blue-600 focus:outline-none bg-meta-10'
                  >
                    HAPUS
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default CameraList;
