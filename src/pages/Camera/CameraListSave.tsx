import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { apiReadKameraTersimpan } from '../../services/api';
import { Link } from 'react-router-dom';
import { RiCameraOffLine, RiErrorWarningFill } from 'react-icons/ri';
import ToolsTip from '../../components/ToolsTip';
import { HiRefresh } from 'react-icons/hi';
import { IoMdArrowRoundBack } from 'react-icons/io';

const CameraListSave = () => {
  const [data, setData] = useState<any>([]);
  const tokenItem = localStorage.getItem('token');
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCamOnline, setCurrentPageCamOnline] = useState(1);
  const [messageCamera, setMessageCamera] = useState();
  const isWebSocketConnected = true;
  const id = useParams().id;
  const camerasPerPage = columns * rows;

  useEffect(() => {
    fetchData(id);
  }, [id]);
  const fetchData = async (id: any) => {
    const params = id ? { id } : {};
    console.log('ini params', params);
    console.log(params, 'params');
    try {
      const response = await apiReadKameraTersimpan(params, token);
      setData(response.data.records);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLayoutChange = (columns: any, rows: any) => {
    setColumns(columns);
    setRows(rows);
    setCurrentPage(1);
  };

  const indexOfLastCamera = currentPage * camerasPerPage;
  const indexOfFirstCamera = indexOfLastCamera - camerasPerPage;

  const totalCameras = data?.map((item: any) =>
    item.kamera_tersimpan?.map((c) => c.kamera),
  );
  console.log(data);
  const currentCameras = totalCameras.slice(
    indexOfFirstCamera,
    indexOfLastCamera,
  );

  const totalPages = Math.ceil(totalCameras.length / camerasPerPage);

  const handlePageClick = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      // pageNumbers.push(i);
      console.log('push', pageNumbers.push(i));
    }
    return pageNumbers;
  };
  const getPageNumbers = () => {
    const maxPageNumbersToShow = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxPageNumbersToShow / 2),
    );
    let endPage = startPage + maxPageNumbersToShow - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = getPageNumbers();

  console.log(totalCameras, 'totalCameras');
  console.log(
    currentCameras[0].map((kamera) => kamera.nama_kamera),
    'currentCameras',
  );
  console.log(totalPages, 'totalPages');
  return (
    <>
      <div className="w-full ml-1 flex gap-5  px-7 mt-4 items-center justify-between">
        <div className="flex items-center justify-between w-1/2">
          <button
            // onClick={() => navigate(-1)}
            className="flex items-center gap-2 border border-white rounded-md px-4 py-2 text-white hover:bg-meta-4 hover:text-white transition duration-300 ease-in-out"
          >
            <IoMdArrowRoundBack /> Kembali
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <ToolsTip text="Refresh">
            <HiRefresh
              size={33}
              className="mr-3 transition-all duration-300 hover:text-slate-100 transform-gpu hover:rotate-180"
              // onClick={handleRefreshClick}
            />
          </ToolsTip>
          <>
            <select
              id="layoutSelect"
              className="p-2  border rounded w-22  bg-meta-4 font-semibold"
              value={`${columns}x${rows}`}
              onChange={(e) => {
                const [cols, rows] = e.target.value.split('x').map(Number);
                handleLayoutChange(cols, rows);
              }}
            >
              <option value="1x1">1x1</option>
              <option value="2x2">2x2</option>
              <option value="2x3">2x3</option>
              <option value="2x4">2x4</option>
            </select>
          </>
          {/* <select
            value={selectedBuilding}
            onChange={handleSelectBuilding}
            className="p-2 border rounded w-36 bg-meta-4 font-semibold"
          > */}
          {/* <option disabled value="">
              Pilih Gedung
            </option> */}
          {/* {buildings?.data?.records?.gedung?.map((building) => (
              <option
                key={building.gedung_otmil_id}
                value={building.gedung_otmil_id}
              >
                {building.nama_gedung_otmil}
              </option>
            ))} */}
          {/* </select> */}

          {/* {selectedBuilding && (
            <>
              {buildings?.data?.records?.gedung?.find(
                (building) => building.gedung_otmil_id === selectedBuilding,
              )?.lantai.length > 0 && (
                <select
                  value={selectedFloor}
                  onChange={handleSelectFloor}
                  className="p-2 border rounded w-36 bg-meta-4 font-semibold"
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
          )} */}

          {/* {selectedFloor && (
            <>
              {buildings?.data?.records?.gedung
                ?.find(
                  (building) => building.gedung_otmil_id === selectedBuilding,
                )
                ?.lantai.find(
                  (floor) => floor.lantai_otmil_id === selectedFloor,
                )?.ruangan.length > 0 && (
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="p-2 border rounded w-36 bg-meta-4 font-semibold"
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
                      (floor) => floor.lantai_otmil_id === selectedFloor,
                    )
                    ?.ruangan.map((room) => (
                      <option
                        key={room.ruangan_otmil_id}
                        value={room.ruangan_otmil_id}
                        onClick={() => handleClickRoom(room.ruangan_otmil_id)}
                      >
                        {room.nama_ruangan_otmil}
                      </option>
                    ))}
                </select>
              )}
            </>
          )} */}
        </div>
        <div className="mt-4 flex justify-end">
          {currentPage > 1 && (
            <button
              onClick={handlePrevPage}
              className="mx-1 px-3 py-1 rounded bg-blue-500 text-white"
            >
              Previous
            </button>
          )}
          {renderPagination()
            .filter((page) => page >= startPage && page <= endPage)
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {page}
              </button>
            ))}
          {currentPage < totalPages && (
            <button
              onClick={handleNextPage}
              className="mx-1 px-3 py-1 rounded bg-blue-500 text-white"
            >
              Next
            </button>
          )}
        </div>
      </div>

      <div>
        {currentCameras[0].map((item: any, index: number) => (
          <div
            key={item.id}
            className={`rounded-sm border bg-meta-4-dark py-2 px-2 shadow-default backdrop-blur-sm relative ${columns && rows === 1 && ' h-[28rem]'} hover:bg-slate-700`}
          >
            <Link
              to={item.nama_kamera}
              state={item.id}
              key={index}
              className="block w-full h-full rounded-lg overflow-hidden relative"
            >
              {/* header */}
              <div className=" flex h-full w-full items-center justify-center rounded-t-lg bg-meta-4 text-white relative">
                {/* {item.kamera?.status_kamera === 'online' ? (
                  renderThumb(camera)
                ) : (
                  <RiCameraOffLine
                    className={`${rows === 4 ? 'w-2/5 h-2/5' : 'w-3/5 h-3/5'} text-white`}
                  />
                )} */}
                {/* {camera.kamera?.status_kamera === 'online' ? (
                  renderThumb(camera)
                ) : client.current.readyState !== WebSocket.OPEN ? (
                  <RiErrorWarningFill
                    className={`${rows === 4 ? 'w-2/5 h-2/5' : 'w-3/5 h-3/5'} text-white`}
                  />
                ) : (
                  <RiCameraOffLine
                    className={`${rows === 4 ? 'w-2/5 h-2/5' : 'w-3/5 h-3/5'} text-white`}
                  />
                )} */}
                {item.status_kamera === 'online' ? (
                  isWebSocketConnected ? (
                    // renderThumb(camera)
                    <h1>haha</h1>
                  ) : (
                    <RiErrorWarningFill
                      className={`${rows === 4 ? 'w-2/5 h-2/5' : 'w-3/5 h-3/5'} text-white`}
                    />
                  )
                ) : (
                  <RiCameraOffLine
                    className={`${rows === 4 ? 'w-2/5 h-2/5' : 'w-3/5 h-3/5'} text-white`}
                  />
                )}
              </div>
              {/* footer kamera */}

              <div className="absolute top-1 right-2 flex items-center">
                {item.status_kamera === 'online' ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2 mt-1 animate-pulse"></div>
                    <h5 className="text-green-500 text-center mt-1">Online</h5>
                  </>
                ) : (
                  <>
                    <h5 className="text-red-500 text-center mt-1">Offline</h5>
                  </>
                )}
              </div>
              <div className="absolute bottom-2 left-2 text-white">
                <h4
                  className={`${(rows === 3 && 'text-xs') || (rows === 4 && 'text-xs')} text-center font-bold text-red-50`}
                >
                  {item.nama_kamera}
                  {/* (
                    {getRoomLocationCamOnline(camera.ruangan_otmil_id)}) */}
                </h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default CameraListSave;
