import { useEffect, useState } from 'react';
import GambarKamera from '../../images/camera_images_test.jpeg';
import { IoAdd } from 'react-icons/io5';
import { apiBuilding } from '../../services/api';
import { ModalAddCameraSave } from './ModalAddCameraSave';

const CameraSave = () => {
  const [addCamera, setAddCamera] = useState(false);
  const [buildings, setBuilding] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pilihKamera, setPilihKamera] = useState('');
  const DataKamera = [
    { name: 'Favorite 1', img: GambarKamera },
    { name: 'Favorite 2', img: GambarKamera },
    { name: 'Favorite 3', img: GambarKamera },
  ];

  const handleAddCamera = () => {
    setAddCamera(true);
    console.log('Add Camera');
  };

  const handleCloseAddModal = () => {
    setModalAddOpen(false);
  };
  const fetchData = async () => {
    try {
      let dataLocal = localStorage.getItem('dataUser');
      let dataUser = JSON.parse(dataLocal!);
      dataUser = {
        lokasi_lemasmil_id: dataUser.lokasi_lemasmil_id,
        lokasi_otmil_id: dataUser.lokasi_otmil_id,
        nama_lokasi_lemasmil: dataUser.nama_lokasi_lemasmil,
        nama_lokasi_otmil: dataUser.nama_lokasi_otmil,
      };
      const response = await apiBuilding(dataUser);
      if (response.data.status === 'OK') {
        setBuilding(response);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectBuilding = (e) => {
    const selectedBuildingId = e.target.value;
    setSelectedBuilding(selectedBuildingId);
    setSelectedFloor('');
    setSelectedRoom('');
  };

  const handleSelectFloor = (e) => {
    const selectedFloorId = e.target.value;
    setSelectedFloor(selectedFloorId);
    setSelectedRoom('');
  };
  const handleClickRoom = (roomId) => {
    console.log('idroom', roomId);
    setSelectedRoom(roomId);
    setCurrentPage(1);
  };

  const handleClickKamera = (cam) => {
    console.log('ini_camera', cam);
    let dataKamera = JSON.parse(cam);
    setSelectedCamera(dataKamera);
    // setPilihKamera(dataKamera.kamera_id);
    console.log('data_kamera1', pilihKamera);
    console.log('data_kamera', dataKamera);
    console.log('data_kamera2', dataKamera.nama_kamera);
  };

  return (
    <>
      <button
        onClick={() => setModalAddOpen(true)}
        className="  text-black rounded-md font-semibold bg-blue-300 py-2 px-3 b-tambah"
      >
        Tambah
      </button>
      <div className=" flex flex-row gap-6 py-6 px-10">
        {DataKamera.map((item, index) => (
          <div key={index}>
            <div className="bg-slate-500 py-10 px-16 rounded-2xl text-2xl text-white">
              <p>{item.name}</p>
            </div>
          </div>
        ))}
        <div className="text-white" onClick={handleAddCamera}>
          <div className="bg-meta-4-dark rounded-2xl py-2 px-2">
            <div className="bg-slate-600 py-6 px-18 rounded-2xl">
              <IoAdd size={51} />
            </div>
          </div>
        </div>
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
