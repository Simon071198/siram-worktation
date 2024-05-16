import { useState } from 'react';
import GambarKamera from '../../images/camera_images_test.jpeg';
import { IoAdd } from 'react-icons/io5';
import { ModalAddCameraSave } from './ModalAddCameraSave';

const CameraSave = () => {
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const DataKamera = [
    { name: 'Favorite 1', img: GambarKamera },
    { name: 'Favorite 2', img: GambarKamera },
    { name: 'Favorite 3', img: GambarKamera },
    { name: 'Favorite 4', img: GambarKamera },
    { name: 'Favorite 5', img: GambarKamera },
    { name: 'Favorite 6', img: GambarKamera },
    { name: 'Favorite 7', img: GambarKamera },
    { name: 'Favorite 8', img: GambarKamera },
    { name: 'Favorite 9', img: GambarKamera },
  ];

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
        {DataKamera.map((item, index) => (
          <div
            key={index}
            className="bg-slate-500 py-10 px-16 rounded-2xl text-2xl text-white"
          >
            <p>{item.name}</p>
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
