import { useEffect, useState } from 'react';
import GambarKamera from '../../images/camera_images_test.jpeg';
import { IoAdd } from 'react-icons/io5';
import { ModalAddCameraSave } from './ModalAddCameraSave';
import { apiGetKameraTersimpan } from '../../services/api';
import { SlOptionsVertical } from 'react-icons/sl';

const CameraSave = () => {
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [data, setData] = useState([]);
  // const tokenItem = localStorage.getItem('token');
  // const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = '8|VSdTF5sjiynfMYSlBAXlM54P11BhLiEpi0frrUVc34ce5fca';
  // const DataKamera = [
  //   { name: 'Favorite 1', img: GambarKamera },
  //   { name: 'Favorite 2', img: GambarKamera },
  //   { name: 'Favorite 3', img: GambarKamera },
  //   { name: 'Favorite 4', img: GambarKamera },
  //   { name: 'Favorite 5', img: GambarKamera },
  //   { name: 'Favorite 6', img: GambarKamera },
  //   { name: 'Favorite 7', img: GambarKamera },
  //   { name: 'Favorite 8', img: GambarKamera },
  //   { name: 'Favorite 9', img: GambarKamera },
  // ];
  useEffect(() => {
    fetchKameraTersimpan();
  }, []);
  const fetchKameraTersimpan = async () => {
    const params = {
      page: 1,
    };
    try {
      const response = await apiGetKameraTersimpan(params, token);
      setData(response.data.records);
      console.log(response.data.records);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseAddModal = () => {
    setModalAddOpen(false);
  };

  return (
    <>
      <div className="px-10 py-3">
        <button
          onClick={() => setModalAddOpen(true)}
          className="  text-black rounded-md font-semibold bg-slate-600 py-2 px-6 border-2 border-white"
        >
          <IoAdd className="text-2xl text-white" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 py-6 px-10">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-slate-500 py-10 px-16  justify-center items-center rounded-2xl text-2xl text-white relative h-30"
            onClick={() => console.log('test2', index)}
          >
            <div className="absolute top-3 right-2 zIndex-10 hover:cursor-pointer hover:bg-slate-400 hover:rounded-full flex items-center justify-center w-9 h-9">
              <span
                className="flex items-center justify-center w-full h-full"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('test1', index);
                }}
              >
                <SlOptionsVertical size={17} />
              </span>
            </div>
            <p>{item.nama_grup}</p>
            <div className="absolute bottom-1 left-2 w-full">
              <p className="text-sm">{item.kamera_tersimpan.length} Camera</p>
            </div>
          </div>
        ))}
      </div>

      {modalAddOpen && (
        <ModalAddCameraSave
          closeModal={handleCloseAddModal}
          // onSubmit={handleInsertGedungOtmil}
          // token={token}
        />
      )}
    </>
  );
};

export default CameraSave;
