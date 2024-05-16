import { useEffect, useRef, useState } from 'react';
import { apiBuilding } from '../../services/api';
import { GiCancel } from 'react-icons/gi';

export const ModalAddCameraSave = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  token,
}: any) => {
  const [buildings, setBuilding] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedCamera, setSelectedCamera] = useState('');
  const [addCamera, setAddCamera] = useState(false);
  const [pilihKamera, setPilihKamera] = useState('');
  const [cameraList, setCameraList] = useState([]);
  const [previousSelectedCamera, setPreviousSelectedCamera] = useState('');
  console.log(cameraList);

  const modalStyles: any = {
    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(5px)',
      zIndex: 40,
    },
    modalContainer: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const modalContainerRef = useRef<HTMLDivElement>(null);
  const handleAddCamera = () => {
    if (selectedBuilding && selectedFloor && selectedRoom && selectedCamera) {
      const selectedBuildingObj = buildings.data.records.gedung.find(
        (building) => building.gedung_otmil_id === selectedBuilding,
      );
      const selectedFloorObj = selectedBuildingObj.lantai.find(
        (floor) => floor.lantai_otmil_id === selectedFloor,
      );
      const selectedRoomObj = selectedFloorObj.ruangan.find(
        (room) => room.ruangan_otmil_id === selectedRoom,
      );

      const newCamera = {
        building: selectedBuildingObj.nama_gedung_otmil,
        floor: selectedFloorObj.nama_lantai,
        room: selectedRoomObj.nama_ruangan_otmil,
        camera: selectedCamera,
      };
      setCameraList((prevList) => [...prevList, newCamera]);
      setSelectedBuilding('');
      setSelectedFloor('');
      setSelectedRoom('');
      setSelectedCamera('');
      setPilihKamera('');
    }
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
    // setCurrentPage(1);
  };

  const handleClickKamera = (cam) => {
    console.log('ini_camera', cam);
    let dataKamera = JSON.parse(cam);
    setPreviousSelectedCamera(selectedCamera);
    setSelectedCamera(dataKamera);
    console.log('data_kamera1', pilihKamera);
    console.log('data_kamera', dataKamera);
    console.log('data_kamera2', dataKamera.nama_kamera);
  };
  const handleRemoveCamera = (cameraId) => {
    const updatedCameraList = cameraList.filter(
      (item) => item.camera.kamera_id !== cameraId,
    );
    setCameraList(updatedCameraList);
  };

  return (
    <div>
      <div style={modalStyles.backdrop}></div>
      <div
        ref={modalContainerRef}
        style={modalStyles.modalContainer}
        className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-2/3 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
      >
        <div className="modal rounded-sm w-full">
          {isLoading ? (
            <div>
              <div className="flex flex-row-reverse pr-5 pt-3">
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
                    strokeWidth="4"
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
              <div className="w-full flex justify-between mb-2  items-center  ">
                <div className="flex items-center gap-4  w-full">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {isDetail
                      ? 'Detail Tampilan Kamera'
                      : isEdit
                        ? 'Edit Tampilan Kamera'
                        : 'Tambah Tampilan Kamera'}
                  </h3>
                </div>

                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>

              <form action="">
                <div className=" flex py-6 flex-col items-center gap-5">
                  {/* ini kotak kiri */}
                  <div className="flex flex-row gap-3 bg-slate-500 w-full text-xl justify-start px-4 py-3 rounded-xl">
                    <p className="w-1/4 text-white font-satoshi">
                      Nama Tampilan :
                    </p>
                    <input
                      type="text"
                      className="border-none focus:outline-none bg-transparent text-white w-full"
                      placeholder="Masukan nama tampilan"
                    />
                  </div>
                  <div className="flex flex-row gap-5 w-full h-[60vh] text-xl justify-start py-3 rounded-xl ">
                    <div className="h-[25rem] w-1/2 bg-slate-500 rounded-2xl flex flex-col items-center px-10 pt-8">
                      <div className="flex gap-7 flex-col">
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
                                      building.gedung_otmil_id ===
                                      selectedBuilding,
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
                            {selectedFloor && (
                              <>
                                {buildings?.data?.records?.gedung
                                  ?.find(
                                    (building) =>
                                      building.gedung_otmil_id ===
                                      selectedBuilding,
                                  )
                                  ?.lantai.find(
                                    (floor) =>
                                      floor.lantai_otmil_id === selectedFloor,
                                  )?.ruangan.length > 0 && (
                                  <select
                                    value={selectedRoom}
                                    onChange={(e) =>
                                      setSelectedRoom(e.target.value)
                                    }
                                    className="p-2 border rounded bg-meta-4 font-semibold w-full"
                                  >
                                    <option disabled value="">
                                      Pilih Ruangan
                                    </option>
                                    {buildings?.data?.records?.gedung
                                      ?.find(
                                        (building) =>
                                          building.gedung_otmil_id ===
                                          selectedBuilding,
                                      )
                                      ?.lantai.find(
                                        (floor) =>
                                          floor.lantai_otmil_id ===
                                          selectedFloor,
                                      )
                                      ?.ruangan.map((room) => (
                                        <option
                                          key={room.ruangan_otmil_id}
                                          value={room.ruangan_otmil_id}
                                          onClick={() =>
                                            handleClickRoom(
                                              room.ruangan_otmil_id,
                                            )
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
                                      building.gedung_otmil_id ===
                                      selectedBuilding,
                                  )
                                  ?.lantai.find(
                                    (floor) =>
                                      floor.lantai_otmil_id === selectedFloor,
                                  )
                                  ?.ruangan.find(
                                    (room) =>
                                      room.ruangan_otmil_id === selectedRoom,
                                  )?.kamera.length > 0 && (
                                  <select
                                    value={
                                      selectedCamera || previousSelectedCamera
                                    }
                                    onChange={(e) => {
                                      handleClickKamera(e.target.value);
                                      setPilihKamera(e.target.value);
                                    }}
                                    className="p-2 border rounded bg-meta-4 font-semibold w-full"
                                  >
                                    <option disabled value="">
                                      Pilih Kamera
                                    </option>
                                    {/* Filter daftar kamera yang tersedia */}
                                    {buildings?.data?.records?.gedung
                                      ?.find(
                                        (building) =>
                                          building.gedung_otmil_id ===
                                          selectedBuilding,
                                      )
                                      ?.lantai.find(
                                        (floor) =>
                                          floor.lantai_otmil_id ===
                                          selectedFloor,
                                      )
                                      ?.ruangan.find(
                                        (room) =>
                                          room.ruangan_otmil_id ===
                                          selectedRoom,
                                      )
                                      ?.kamera.filter(
                                        (cam) =>
                                          !cameraList.find(
                                            (item) =>
                                              item.camera.kamera_id ===
                                              cam.kamera_id,
                                          ),
                                      )
                                      .map((cam) => (
                                        <option
                                          key={cam.kamera_id}
                                          value={JSON.stringify(cam)}
                                        >
                                          {cam.nama_kamera}
                                        </option>
                                      ))}
                                  </select>
                                )}
                              </>
                            )}
                            {selectedCamera && (
                              <button
                                onClick={handleAddCamera}
                                className="p-2 border rounded bg-meta-4 font-semibold w-full"
                              >
                                Tambahkan
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="h-[25rem] w-1/2 bg-slate-500 rounded-2xl flex flex-col items-center pt-10 px-7 flex-wrap">
                      <ul className="list-disc text-white">
                        {cameraList.map((item) => (
                          <li
                            key={item.camera.kamera_id}
                            className="mb-2 text-sm flex items-center"
                          >
                            <div className=" flex flex-row text-md ">
                              <div className="">
                                {item?.building} - {item?.floor} - {item?.room}{' '}
                                - {item?.camera?.nama_kamera}
                              </div>
                              <div className=" flex justify-center px-2">
                                <button
                                  className="text-red-500"
                                  onClick={() =>
                                    handleRemoveCamera(item.camera.kamera_id)
                                  }
                                >
                                  <GiCancel className="text-2xl" />
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex  flex-row gap-3 w-full text-xl rounded-xl justify-end mt-15 ">
                    <button className="rounded-lg bg-slate-500 w-30 h-10 border">
                      Simpan
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
