import { useEffect, useState } from 'react';
import GambarKamera from '../../images/camera_images_test.jpeg';
import { IoAdd } from 'react-icons/io5';
import { apiBuilding } from '../../services/api';

const CameraSave = () => {
  const [addCamera, setAddCamera] = useState(false);
  const [buildings, setBuilding] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
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
      {!addCamera ? (
        <>
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
        </>
      ) : (
        <>
          <form action="">
            <div className=" flex py-6 flex-col items-center gap-5">
              <div className="flex flex-row gap-3 bg-slate-500 w-3/4 text-xl justify-start px-6 py-3 rounded-xl">
                <p className=" text-white">Nama Tampilan :</p>
                <input
                  type="text"
                  className="border-none focus:outline-none bg-transparent text-white w-[74%]"
                />
              </div>
              <div className="flex flex-row gap-6 w-3/4 h-[60vh] text-xl justify-start py-3 rounded-xl">
                <div className="h-full w-1/2 bg-slate-500 rounded-2xl flex flex-col items-center pt-10">
                  <div className="flex gap-10 flex-col">
                    <select
                      value={selectedBuilding}
                      onChange={handleSelectBuilding}
                      className="p-2 border rounded bg-meta-4 font-semibold w-full"
                    >
                      <option disabled value="">
                        Pilih Gedung
                      </option>
                      {buildings?.data?.records?.gedung?.map((building) => (
                        <option
                          key={building.gedung_otmil_id}
                          value={building.gedung_otmil_id}
                        >
                          {building.nama_gedung_otmil}
                        </option>
                      ))}
                    </select>

                    {selectedBuilding && (
                      <>
                        {buildings?.data?.records?.gedung?.find(
                          (building) =>
                            building.gedung_otmil_id === selectedBuilding,
                        )?.lantai.length > 0 && (
                          <select
                            value={selectedFloor}
                            onChange={handleSelectFloor}
                            className="p-2 border rounded bg-meta-4 font-semibold w-full"
                          >
                            <option disabled value="">
                              Pilih Lantai
                            </option>
                            {buildings?.data?.records?.gedung
                              ?.find(
                                (building) =>
                                  building.gedung_otmil_id === selectedBuilding,
                              )
                              ?.lantai.map((floor) => (
                                <option
                                  key={floor.lantai_otmil_id}
                                  value={floor.lantai_otmil_id}
                                >
                                  {floor.nama_lantai}
                                </option>
                              ))}
                          </select>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="h-full w-1/2 bg-slate-500 rounded-2xl flex flex-col items-center pt-10">
                  <div className="flex gap-10 flex-col">
                    {selectedFloor && (
                      <>
                        {buildings?.data?.records?.gedung
                          ?.find(
                            (building) =>
                              building.gedung_otmil_id === selectedBuilding,
                          )
                          ?.lantai.find(
                            (floor) => floor.lantai_otmil_id === selectedFloor,
                          )?.ruangan.length > 0 && (
                          <select
                            value={selectedRoom}
                            onChange={(e) => setSelectedRoom(e.target.value)}
                            className="p-2 border rounded bg-meta-4 font-semibold w-full"
                          >
                            <option disabled value="">
                              Pilih Ruangan
                            </option>
                            {buildings?.data?.records?.gedung
                              ?.find(
                                (building) =>
                                  building.gedung_otmil_id === selectedBuilding,
                              )
                              ?.lantai.find(
                                (floor) =>
                                  floor.lantai_otmil_id === selectedFloor,
                              )
                              ?.ruangan.map((room) => (
                                <option
                                  key={room.ruangan_otmil_id}
                                  value={room.ruangan_otmil_id}
                                  onClick={() =>
                                    handleClickRoom(room.ruangan_otmil_id)
                                  }
                                >
                                  {room.nama_ruangan_otmil}
                                </option>
                              ))}
                          </select>
                        )}
                      </>
                    )}
                    {selectedRoom && (
                      <>
                        {buildings?.data?.records?.gedung
                          ?.find(
                            (building) =>
                              building.gedung_otmil_id === selectedBuilding,
                          )
                          ?.lantai.find(
                            (floor) => floor.lantai_otmil_id === selectedFloor,
                          )
                          ?.ruangan.find(
                            (room) => room.ruangan_otmil_id === selectedRoom,
                          )?.kamera.length > 0 && (
                          <select
                            value={pilihKamera}
                            onChange={(e) => {
                              handleClickKamera(e.target.value);
                              setPilihKamera(e.target.value);
                              // console.log('eTargetValue', e.target.value);
                            }}
                            className="p-2 border rounded bg-meta-4 font-semibold w-full"
                          >
                            <option disabled value="">
                              Pilih Kamera
                            </option>
                            {buildings?.data?.records?.gedung
                              ?.find(
                                (building) =>
                                  building.gedung_otmil_id === selectedBuilding,
                              )
                              ?.lantai.find(
                                (floor) =>
                                  floor.lantai_otmil_id === selectedFloor,
                              )
                              ?.ruangan.find(
                                (room) =>
                                  room.ruangan_otmil_id === selectedRoom,
                              )
                              ?.kamera.map((cam) => (
                                <option
                                  key={cam.kamera_id}
                                  value={JSON.stringify(cam)}
                                  onClick={() => handleClickKamera(cam)}
                                >
                                  {cam.nama_kamera}
                                </option>
                              ))}
                          </select>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-3 w-3/4 text-xl rounded-xl justify-end mt-[-1%]">
                <div className="bg-green-500 py-2 px-8 rounded-lg">
                  <p className="text-black text-[1rem]">Save</p>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default CameraSave;
