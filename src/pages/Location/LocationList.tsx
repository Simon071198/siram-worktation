import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiLocationList } from '../../services/api';
import CreateLocationModal from './components/AddLocation';
const LocationList = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iseEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

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
    apiLocationList(params).then((res) => {
      console.log(res.data.data.records, 'res');

      setData(res.data.data.records);
    });
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Data Lokasi Lemasmil
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nama Lokasi
            </h5>
          </div>
      
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
Latitude            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
Longitude          </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Aksi{' '}
            </h5>
          </div>
        </div>

        {data.map((item) => {
          return (
            <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {item.location_name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{item.lat}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{item.long}</p>
              </div>

              <div className="flex justify-end mb-4 mr-18">
                  <button 
                    className="px-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                    onClick={openModal} // Membuka modal sesuai dengan indeks item
                  >
                    Tambah
                  </button>
                  <button 
                    className="px-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                    onClick={openEditModal} // Membuka modal sesuai dengan indeks item
                  >
                    Edit
                  </button>
                  <button 
                    className="px-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                    onClick={openDeleteModal} // Membuka modal sesuai dengan indeks item
                  >
                    Hapus
                  </button>
              </div>
              {/* <CreateLocationModal isOpen={isModalOpen} onClose={closeModal} /> */}
            </div>
          );
        })}
      </div>
      {
        isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className='bg-white rounded-lg p-5 shadow-lg w-[50%]'>
              <div className=' position relative space-y-4'>
                <div className='flex justify-between items-center border-b'>
                  <h1 className='text-xl font-bold text-transparent-dark3'>Tambah Lokasi</h1>
                  <button 
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-semibold text- bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    Close
                  </button>
                </div>
                <form>
                  <div className='mb-4'>
                  {/* <label htmlFor="location_name" className='block font-semibold inline-block w-50'>Location Name :</label> */}
                  <input
                    type="text"
                    id="location_name"
                    name="location_name"
                    className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-200'
                    placeholder='Nama Lokasi'
                    // value={formData.location_name}
                    // onChange={handleChange}
                    required
                  />
                  </div>
                  <div className='mb-4'>
                  {/* <label htmlFor="latitude" className='block font-semibold inline-block w-50'>Latitude :</label> */}
                  <input 
                    type="text"
                    id="latitude"
                    name="latitude"
                    className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-200'
                    placeholder='Latitude'
                    required
                  />
                  </div>
                  <div className='mb-4'>
                  {/* <label htmlFor="longitude" className='block font-semibold inline-block w-50'>Longitude :</label> */}
                  <input 
                    type="text"
                    id="longitude"
                    name="longitude"
                    className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-200'
                    placeholder='Longitude'
                    required
                  />
                  </div>
                  <div>
                    <button className='px-4 py-2 rounded-lg bg-primary text-white ml-70 mt-5 mb-2 font-medium'>
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
        iseEditModalOpen && (
          <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-5 shadow-lg w-[50%]'>
            <div className=' position relative space-y-4'>
              <div className='flex justify-between items-center border-b'>
                <h1 className='text-xl font-bold text-transparent-dark3'>Ubah Lokasi</h1>
                <button 
                  onClick={closeEditModal} 
                  className='px-4 py-2 text-sm font-semibold text- bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none'
                >
                  Close
                </button>
              </div>
              <form>
                <div className='mb-4'>
                  {/* <label htmlFor="location_name">Location Name:</label> */}
                  <input
                    type="text"
                    id="location_name"
                    name="location_name"
                    className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-200'
                    placeholder='Nama Lokasi'
                    // value={formData.location_name}
                    // onChange={handleChange}
                    required
                    />
                </div>
                <div className='mb-4'>
                  {/* <label htmlFor="latitude">Latitude :</label> */}
                  <input 
                    type="text"
                    id=""
                    name=""
                    placeholder='Latitude'
                    className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-200'
                    // value={}
                    // onChange={}
                    required
                    />
                </div>
                <div className='mb-4'>
                {/* <label htmlFor="latitude">Longitude :</label> */}
                <input 
                  type="text"
                  id=""
                  name=""
                  placeholder='Longitude'
                  className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-200'
                  // value={}
                  // onChange={}
                  required
                />
                </div>
                <div>
                  <button className='px-4 py-2 ml-70 mt-5 mb-2 rounded-lg  font-medium text-white bg-primary'>
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

export default LocationList;
