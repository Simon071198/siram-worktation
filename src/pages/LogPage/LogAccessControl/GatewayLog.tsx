import { useState, useEffect, useMemo } from 'react';

import axios from 'axios';
import { apiGatewayLog, apiVisitorLogList } from '../../services/api';
import { webserviceurl } from '../../services/api';
import { NavLink } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import Loader from '../../common/Loader';

export default function GatewayLog() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');

  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedAnalytics, setSelectedAnalytics] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLocationChange = (event: any) => {
    setSelectedLocation(event.target.value);
    setSelectedDevice('');
  };

  const handleDeviceChange = (event: any) => {
    setSelectedDevice(event.target.value);
  };

  // const selectedLocationEntry:any = jsonData.find(
  //   (entry:any) => entry.location === selectedLocation
  // );

  // const devices = selectedLocationEntry ? selectedLocationEntry.devices : [];

  const handleExportClick = () => {
    // if (data && data.length > 0) {
    //   exportToCSV(data, 'exported_data.csv');
    // } else {
    //   setShowModal(true);
    //   setModalMessage('No data found to export.');
    // }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage('');
  };
  function handleStartDateChange(e: any) {
    setStartDate(e.target.value);
  }
  function handleEndDateChange(e: any) {
    setEndDate(e.target.value);
  }

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    // setEndDate(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  }

  const handleChangePage = (event: any, page: any) => {
    setCurrentPage(event);
  };

  const handleAnalyticsChange = (e: any) => {
    // Reset current page to 1 when analytics value changes
    setSelectedAnalytics(e.target.value);
    // setCurrentPage(1);
  };

  function calculateAge(birthdate: any) {
    const birthDate = new Date(birthdate);

    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    const birthMonth = birthDate.getMonth();
    const currentMonth = currentDate.getMonth();

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--; // Subtract 1 if birthday hasn't occurred yet this year
    }

    return age;
  }

  // let fetch = () => {
  //   let params = {
  //     from: `${startDate} 00:00`,
  //     to: `${endDate} 23:59`,
  //     device_id: selectedDevice,
  //     country_id: selectedCountry,
  //     age: selectedAge,
  //     analytics: selectedAnalytics,
  //     name: selectedName,
  //     gender: selectedGender,
  //     pageSize: itemsPerPage,
  //     pageIndex: currentPage,
  //   };
  //   setLoading(true);
  //   console.log(params);
  //   apiVisitorLogList(params).then((res) => {
  //     console.log(res);
  //     setData(res.records);
  //     setLoading(false);
  //     setTotalPages(res.pagesCount);
  //     setTotalItemPage(res.total);
  //     console.log(data);
  //   });
  // };

  // useEffect(() => {
  //   const date = getTodayDate();
  //   setEndDate(date);
  //   setStartDate(date);
  // }, []);

  // useEffect(() => {
  //   if (endDate !== '') {
  //     // Perform your fetch request here, using todayDate as needed
  //     fetch();
  //   }
  // }, [
  //   currentPage,
  //   endDate,
  //   startDate,
  //   selectedDevice,
  //   selectedCountry,
  //   selectedAge,
  //   selectedAnalytics,
  //   selectedName,
  //   selectedGender,
  // ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.post(
  //       webserviceurl + 'gema_admin_api/location/readOnline.php'
  //     );
  //     console.log(result.data.data.records);
  //     setJsonData(result.data.data.records);
  //   };
  //   fetchData();
  // }, []);
  useEffect(() => {
    getGatewayLog();
  }, []);

  const getGatewayLog = async () => {
    try {
      setIsLoading(true);
      let params = {
        filter: '',
      };
      const responseLog = await apiGatewayLog(params);
      setData(responseLog.data.records);
      setPages(responseLog.data.pagination.totalPages);
      setRows(responseLog.data.pagination.totalRecords);
      setIsLoading(false);
    } catch (e: any) {
      console.log('ERROR GATEWAY', e.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container py-[16px]">
      <div>
        <h3 className="text-2xl font-semibold"> Gateway Log</h3>
        <div className="mt-5 mb-5">
          <form>
            <div className="space-y-3 ">
              <div className="grid grid-rows-2 gap-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="grid grid-row-2 gap-2">
                    <label className="text-white">Pilih Analitik</label>
                    <select
                      name="Select Analytics"
                      value={selectedAnalytics}
                      className="w-full rounded border border-stroke  dark:bg-slate-800 py-[5.5px] px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                      onChange={handleAnalyticsChange}
                    >
                      <option value="">Semua Analitik</option>
                      <option value="unrecognized">Unrecognized</option>
                      <option value="face_recognition">Face Recognition</option>
                    </select>
                  </div>

                  {selectedAnalytics == 'unrecognized' ? null : (
                    <>
                      <div className="grid grid-row-2 gap-2">
                        <label className="text-white">Nama</label>
                        <input
                          name="Name"
                          className="w-full rounded border border-stroke  dark:bg-slate-800 py-1 px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                          // value={selectedName}
                          // onChange={(e) => setSelectedName(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-row-2 gap-2">
                        <label className="text-white">Usia</label>
                        <input
                          type="number"
                          name="Age"
                          className="w-full rounded border border-stroke  dark:bg-slate-800 py-1 px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                          // value={selectedAge}
                          // onChange={(e) => setSelectedAge(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-row-2 gap-2">
                        <label className="text-white">Pilih Gender</label>
                        <select
                          name="Select Gender"
                          className="w-full rounded border border-stroke  dark:bg-slate-800 py-[5.5px] px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                          // value={selectedGender}
                          // onChange={(e) => setSelectedGender(e.target.value)}
                        >
                          <option value="">Semua Gender</option>
                          <option value="true">Pria</option>
                          <option value="false">Wanita</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label id="demo-simple-select-autowidth-label">
                      Pilih Lokasi
                    </label>
                    <select
                      name="Select Location"
                      // value={selectedLocation}
                      // onChange={handleLocationChange}
                      className="w-full rounded border border-stroke  dark:bg-slate-800 py-[5.5px] px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Semua Lokasi</option>
                      {/* {jsonData.map((entry) => (
                        <option key={entry.location} value={entry.location}>
                          {entry.location}
                        </option>
                      ))} */}
                    </select>
                  </div>

                  <div>
                    <label id="demo-simple-select-autowidth-label">
                      Pilih Perangkat
                    </label>
                    <select
                      name="Select Device"
                      // value={selectedDevice}
                      className="w-full rounded border border-stroke  dark:bg-slate-800 py-[5.5px] px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                      // onChange={handleDeviceChange}
                    >
                      <option value="">Semua Perangkat</option>

                      {/* {devices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                          {device.deviceName}
                        </option>
                      ))} */}
                    </select>
                  </div>

                  <div className="">
                    <label>Tanggal Awal</label>
                    <input
                      type="date"
                      // value={startDate}
                      className="w-full rounded border border-stroke  dark:bg-slate-800 py-1 px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                      // onChange={handleStartDateChange}
                    />
                  </div>

                  <div className="">
                    <label>Tanggal Akhir</label>
                    <input
                      type="date"
                      // value={endDate}
                      className="w-full rounded border border-stroke  dark:bg-slate-800 py-1 px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary"
                      // onChange={handleEndDateChange}
                    />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button
                  className="bg-blue-500 text-white px-2 rounded-md py-1"
                  type="button"
                  // onClick={handleExportClick}
                >
                  Export Excel
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* {showModal && (
          <DataNotFoundModal
            onClose={handleCloseModal}
            message={modalMessage}
          />
        )} */}
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-slate-600 sm:grid-cols-5 text-xs uppercase items-center">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="font-medium uppercase">Nama Prajurit Binaan</h5>
          </div>

          <div className="p-2.5 text-center xl:p-5">
            <h5 className="">No DMAC Gelang </h5>
          </div>

          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="">
              Baterai Gelang{' '}
            </h5>
          </div> */}

          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="">
              Detak Jantung{' '}
            </h5>
          </div> */}

          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="">
              Suhu Tubuh{' '}
            </h5>
          </div> */}

          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="">Lokasi Ruangan </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="">Zonasi Gateway </h5>
          </div>

          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="">Time Stamp </h5>
          </div>

          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="">
              Lokasi Gedung{' '}
            </h5>
          </div> */}
        </div>
        {data.map((item: any) => {
          return (
            <div>
              <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4  text-sm">
                <div className="p-2.5 xl:p-5 justify-center flex ">
                  <p className="hidden text-black dark:text-white sm:block truncate capitalize">
                    {item.nama_wbp}
                  </p>
                </div>

                <div className="p-2.5 sm:flex xl:p-5 justify-center flex t">
                  <p className="text-black dark:text-white truncate capitalize">
                    {item.gmac}
                  </p>
                </div>

                <div className="p-2.5 xl:p-5 justify-center flex  ">
                  <p className="text-black dark:text-white truncate capitalize">
                    {item.nama_ruangan_otmil}
                  </p>
                </div>

                <div className="p-2.5 sm:flex xl:p-5 justify-center flex  ">
                  <p className="text-black dark:text-white truncate capitalize">
                    {item.status_zona_ruangan_otmil}
                  </p>
                </div>

                <div className="p-2.5 sm:flex xl:p-5 justify-center flex ">
                  <p className="text-black dark:text-white capitalize ">
                    {item.timestamp}
                  </p>
                </div>

                {/* <div 
                  
                    className="p-2.5  xl:p-5 justify-center flex  ">
                      <p className="text-black dark:text-white max-w-sm truncate cursor-pointer">
                        {item.alamat}
                      </p>
                    </div> */}
              </div>
              <div className="border-t border-slate-600"></div>
            </div>
          );
        })}

        {/* {data.map((item: any) => {
          return (
            <div className="grid grid-cols-9 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-9">
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-2">
                  {item.visitor_name == 'unrecognized'
                    ? 'Tidak Dikenal'
                    : item.visitor_name}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-2">
                  {item.visitor_name == 'unrecognized'
                    ? 'DMAC 1234'
                    : 'iDMAC 1234'}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-2">
                  {item.dob == null ? item.age : calculateAge(item.dob)}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-2">
                  {item.dob == null ? item.age : calculateAge(item.dob)}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-2">
                  {item.dob == null ? item.age : calculateAge(item.dob)}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{item.device_name}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                {item.visitor_name == 'unrecognized' ? (
                  <p className="text-red-500 dark:text-red-500">Zona Merah </p>
                ) : item.isemployee == true ? (
                  <p className="text-yellow-500 dark:text-yellow-500">
                    Zona Kuning{' '}
                  </p>
                ) : item.isdpo == true ? (
                  <p className="text-red-500 dark:text-red-500">Zona Merah </p>
                ) : (
                  <p className="text-green-500 dark:text-green-500">
                    Zona Hijau{' '}
                  </p>
                )}
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{item.timestamp}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                  {item.location_name}
                </p>
              </div>
            </div>
          );
        })} */}
        {data.length === 0 ? null : (
          <div className="mt-5">
            <p>
              Total Rows: {rows} Page: {rows ? currentPage : null} of {pages}
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={pages}
              onChangePage={handleChangePage}
            />
          </div>
        )}
      </div>

      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 100,
        }}
      >

      </div> */}
    </div>
  );
}
