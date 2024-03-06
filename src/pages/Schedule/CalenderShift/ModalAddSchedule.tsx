import { useEffect, useRef, useState } from 'react';
import { apiReadAllScheduleShift, apiReadAllShift } from '../../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import id from 'date-fns/locale/id';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'dayjs/locale/id';
import { Alerts } from '../SceduleShift/Alert';
import { BiLoaderAlt } from 'react-icons/bi';

const AddDataSchedule = ({ closeModal, onSubmit }: any) => {
  //get Token
  const tokenItem = localStorage.getItem('token');
  let tokens = tokenItem ? JSON.parse(tokenItem) : null;
  let token = tokens.token;

  // //DatePicker
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [selectedEndDate, setSelectedEndDate] = useState(
    dayjs(new Date()).add(4, 'day'),
  );

  registerLocale('id', id);
  setDefaultLocale('id');

  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);

  const [startDate, setStartDate] = useState({
    tanggal: parseInt(dayjs(selectedDate).format('D')),
    bulan: parseInt(dayjs(selectedDate).format('M')),
    tahun: parseInt(dayjs(selectedDate).format('YYYY')),
  });

  const [endDate, setEndDate] = useState({
    tanggal: parseInt(dayjs(selectedEndDate).format('D')),
    bulan: parseInt(dayjs(selectedEndDate).format('M')),
    tahun: parseInt(dayjs(selectedEndDate).format('YYYY')),
  });

  const [dataADD, setData] = useState([
    {
      tanggal: '',
      bulan: '',
      tahun: '',
      shift_id: '',
    },
  ]);
  const [Adddata, setAddData] = useState<any[]>([
    // {
    //   tanggal: '',
    //   bulan: '',
    //   tahun: '',
    //   shift_id: '',
    // },
  ]);

  const [shiftData, setShiftData] = useState<any[]>([
    {
      shift_id: '',
      nama_shift: '',
    },
  ]);
  const [schedule, setSchedule] = useState<any>({
    shift_id: '',
    nama_shift: '',
  });

  const [dataSchedule, setDataSchedule] = useState<any[]>([]);
  const [jamShift, setJamShift] = useState({
    waktu_mulai: '',
    waktu_selesai: '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleDateChange = (date: any) => {
    const end = dayjs(date).add(4, 'day');
    setSelectedDate(dayjs(date));
    setStartDate({
      ...startDate,
      tanggal: parseInt(dayjs(date).format('D')),
      bulan: parseInt(dayjs(date).format('M')),
      tahun: parseInt(dayjs(date).format('YYYY')),
    });
    setSelectedEndDate(dayjs(date).add(4, 'day'));
    setEndDate({
      ...endDate,
      tanggal: parseInt(dayjs(end).format('D')),
      bulan: parseInt(dayjs(end).format('M')),
      tahun: parseInt(dayjs(end).format('YYYY')),
    });
  };

  const handleDateChangeEndDate = (date: any) => {
    setSelectedEndDate(dayjs(date));
    setEndDate({
      ...endDate,
      tanggal: parseInt(dayjs(date).format('D')),
      bulan: parseInt(dayjs(date).format('M')),
      tahun: parseInt(dayjs(date).format('YYYY')),
    });
  };

  useEffect(() => {
    const filterSchedule = {
      pageSize: Number.MAX_SAFE_INTEGER,
      filter: {
        nama_shift: schedule.nama_shift,
        tanggal: `${startDate.tanggal}-${endDate.tanggal}`,
        bulan: startDate.bulan,
        tahun: startDate.tahun,
      },
    };
    const readSchedule = async () => {
      try {
        const response = await apiReadAllScheduleShift(filterSchedule, token);
        const data = response.data.records;
        setDataSchedule(data);
        const filteredData = dataADD.filter(
          (item: any) =>
            !data.some(
              (scheduleItem: any) => scheduleItem.tanggal === item.tanggal,
            ),
        );
        setAddData(filteredData);
      } catch (error: any) {
        Alerts.fire({
          icon: 'error',
          title: error.message,
        });
      }
    };
    readSchedule();
  }, [schedule]);

  useEffect(() => {
    const rangeTanggal = () => {
      const startDay = startDate.tanggal;
      const endDay = endDate.tanggal;

      // Create a new array with day numbers between startDay and endDay
      const dateRange = Array.from(
        { length: endDay - startDay + 1 },
        (_, index) => startDay + index,
      );

      // Map the day numbers to the 'data' state format
      const newData = dateRange?.map((day) => ({
        tanggal: day.toString(),
        bulan: startDate.bulan.toString(), // Convert bulan to string
        tahun: startDate.tahun.toString(),
        shift_id: '', // Add the appropriate value for shift_id/ Add the appropriate value for shift_id
      }));

      // Update the 'data' state with the new data
      setData(newData);
    };
    setDataSchedule([]);
    setAddData([
      {
        tanggal: '',
        bulan: '',
        tahun: '',
        shift_id: '',
      },
    ]);
    setSchedule({ ...schedule, shift_id: '', nama_shift: '' });
    setJamShift({ ...jamShift, waktu_mulai: '', waktu_selesai: '' });
    rangeTanggal();
  }, [selectedDate, selectedEndDate]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    const filter = {
      filter: '',
    };

    const dataStaff = async () => {
      try {
        const shift = await apiReadAllShift(filter, token);
        setShiftData(shift?.data.records);
      } catch (error: any) {
        Alerts.fire({
          icon: 'error',
          title: error.message,
        });
      }
    };
    dataStaff();
  }, []);

  //useEffect untuk menambahkan event listener  ke elemen dokumen
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(e.target as Node)
      ) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closeModal]);

  const validateForm = () => {
    let errorFields = [];

    // Reset pesan kesalahan sebelum memeriksa kondisi
    setErrors([]);

    if (!schedule.shift_id) {
      errorFields.push('shift_id');
    }

    if (Adddata.length === 0) {
      errorFields.push('tanggal');
    }
    setErrors(errorFields);

    if (errorFields.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleChangeShift = (e: any) => {
    const filterShift = shiftData?.find(
      (item: any) => item.shift_id === e.target.value,
    );
    setSchedule({
      ...schedule,
      shift_id: e.target.value,
      nama_shift: filterShift?.nama_shift,
    });
    setJamShift({
      ...jamShift,
      waktu_mulai: filterShift?.waktu_mulai,
      waktu_selesai: filterShift?.waktu_selesai,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formstate = Adddata?.map((item: any) => ({
      tanggal: item.tanggal,
      bulan: item.bulan,
      tahun: item.tahun,
      shift_id: schedule.shift_id,
    }));

    if (!validateForm()) return;
    setButtonLoad(true);
    onSubmit(formstate).then(() => setButtonLoad(false));
  };

  return (
    <div className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <div
        className={`modal rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[70vh]`}
        ref={modalContainerRef}
      >
        {isLoading ? (
          <div className={`justify-center flex items-center`}>
            <svg
              className="animate-spin h-20 w-20 text-white"
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
        ) : (
          <>
            <div className="w-full flex justify-between px-4 mt-2">
              <h1 className="text-xl font-semibold text-black dark:text-white">
                Tambah Jadwal Shift Kerja
              </h1>
              <strong
                className="text-xl align-center cursor-pointer "
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-3 mt-3 px-4">
                <div className="w-full">
                  <label
                    className="block text-md font-medium text-black dark:text-white "
                    htmlFor="nama_grup_petugas"
                  >
                    Tanggal
                  </label>
                  <div className="w-full flex items-center space-x-1">
                    <DatePicker
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      selected={selectedDate.toDate()}
                      onChange={handleDateChange}
                      dateFormat="dd MMMM yyyy"
                      placeholderText="Pilih tanggal"
                      locale="id"
                    />
                    <h1>s/d</h1>
                    <DatePicker
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      selected={selectedEndDate.toDate()}
                      onChange={handleDateChangeEndDate}
                      dateFormat="dd MMMM yyyy"
                      placeholderText="Pilih tanggal"
                      locale="id"
                      minDate={dayjs(selectedDate).endOf('day').toDate()} // Set minDate to the selected start date
                      maxDate={dayjs(selectedDate).endOf('month').toDate()}
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <label
                    className="block text-sm font-medium text-black dark:text-white"
                    htmlFor="petugas_id"
                  >
                    Shift
                  </label>
                  <select
                    name="shift_id"
                    value={schedule.shift_id}
                    onChange={handleChangeShift}
                    className="capitalize w-full rounded  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-stroke dark dark-bg-meta-4 dark:focus-border-primary"
                  >
                    <option value="">Pilih Shift</option>
                    {shiftData.map((item: any) => {
                      return (
                        <>
                          <option value={item.shift_id}>
                            {item.nama_shift}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <div>
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'shift_id' ? 'Pilih Shift kerja' : '',
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between space-x-2">
                  <div className="form-group w-1/2 ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Waktu Mulai
                    </label>
                    <input
                      name="waktu_mulai"
                      value={jamShift.waktu_mulai}
                      type="time"
                      className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                    />
                    <div className="h-3">
                      <h1 className="pl-2 text-xs text-red-500">
                        {/* {errors.waktu_mulai} */}
                      </h1>
                    </div>
                  </div>
                  <div className="form-group w-1/2 ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Waktu Selesai
                    </label>
                    <input
                      name="waktu_selesai"
                      value={jamShift.waktu_selesai}
                      type="time"
                      className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                    />
                    <div className="h-3">
                      <h1 className="pl-2 text-xs text-red-500">
                        {/* {errors.waktu_selesai} */}
                      </h1>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="block text-sm font-medium text-black dark:text-white">
                    Jadwal Yang Akan Dibuat
                  </h1>

                  <div className="flex items-center mt-2 pl-4 bg-slate-700 rounded-t">
                    <div className="form-group w-3/6">
                      <label className="  block text-sm font-medium text-black dark:text-white">
                        Tanggal
                      </label>
                    </div>

                    <div className="form-group w-3/6 ">
                      <label className="  block text-sm font-medium text-black dark:text-white">
                        Keterangan
                      </label>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-b-md h-28 overflow-y-auto pl-4">
                    {Adddata.length === 0 ? (
                      <div>
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'tanggal' ? 'Data Tidak Ditemukan' : '',
                          )}
                        </p>
                      </div>
                    ) : (
                      Adddata.map((item: any) => {
                        const tanggal = `${item.tahun} ${item.bulan} ${item.tanggal}`; // Reorder tahun, bulan, tanggal
                        const jadwal = !item.tanggal
                          ? null
                          : dayjs(tanggal).format('DD MMMM YYYY');
                        const ket = !item.tanggal
                          ? null
                          : 'Jadwal Belum Dibuat';
                        return (
                          <div className=" grid grid-cols-2 gap-2 mt-2">
                            <div className="form-group">
                              <label className="  block text-sm font-medium text-black dark:text-white">
                                {jadwal}
                              </label>
                            </div>
                            <div className="form-group">
                              <label className="  block text-sm font-medium text-black dark:text-white">
                                {ket}
                              </label>
                            </div>

                            {/* <div className="form-group w-3/6 ">
                      <label className="  block text-sm font-medium text-black dark:text-white">
                        Keterangan
                      </label>
                    </div> */}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <button
                  className={`btn w-4/5 flex justify-center rounded bg-primary py-2 px-6 my-2 font-medium text-gray hover:shadow-1 ${
                    buttonLoad ? 'bg-slate-400' : ''
                  }`}
                  type="submit"
                  disabled={buttonLoad}
                >
                  {buttonLoad ? (
                    <>
                      <BiLoaderAlt className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    </>
                  ) : (
                    <></>
                  )}
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddDataSchedule;
