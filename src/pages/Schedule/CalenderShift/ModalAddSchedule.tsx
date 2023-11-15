import { useEffect, useRef, useState } from 'react';
import {
  apiReadAllScheduleShift,
  apiReadAllShift,
} from '../../../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import id from 'date-fns/locale/id';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'dayjs/locale/id';
import { Alerts } from '../SceduleShift/Alert';
import { BiLoaderAlt } from 'react-icons/bi';

const AddDataSchedule = ({
  closeModal,
  onSubmit,
}: any) => {
  //get Token
  const tokenItem = localStorage.getItem('token');
  let tokens = tokenItem ? JSON.parse(tokenItem) : null;
  let token = tokens.token;

  // //DatePicker
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

  registerLocale('id', id);
  setDefaultLocale('id');

  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);

  const [data, setData] = useState({
    tanggal: parseInt(dayjs(new Date()).format('D')),
    bulan: parseInt(dayjs(new Date()).format('M')),
    tahun: parseInt(dayjs(new Date()).format('YYYY')),
    shift_id: '',
    // created_at: dayjs(new Date()).format('DD/MM/YYYY'),
    // updated_at: dayjs(new Date()).format('DD/MM/YYYY')
  });
  const [shiftData, setShiftData] = useState([
    {
      shift_id: '',
      nama_shift: '',
    },
  ]);
  const [schedule, setSchedule] = useState([
    {
      shift_id: '',
    },
  ]);
  const [errors, setErrors] = useState<string[]>([]);
  const [errors2, setErrors2] = useState<string[]>([]);

  const handleDateChange = (date: any) => {
    setSelectedDate(dayjs(date));
    setData({
      ...data,
      tanggal: parseInt(dayjs(date).format('D')),
      bulan: parseInt(dayjs(date).format('M')),
      tahun: parseInt(dayjs(date).format('YYYY')),
    });
  };

  useEffect(() => {
    const filterSchedule = {
      pageSize: Number.MAX_SAFE_INTEGER,
      filter: {
        tanggal: data.tanggal,
        bulan: data.bulan,
        tahun: data.tahun,
      },
    };
    const readSchedule = async () => {
      try {
        const response = await apiReadAllScheduleShift(filterSchedule, token);
        const data = response.data.records;
        console.log('data:', filterSchedule);

        setSchedule(data);
      } catch (error: any) {
        Alerts.fire({
          icon: 'error',
          title: error.message,
        });
      }
    };
    readSchedule();
  }, [data]);

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
    setErrors2([]);

    if (!data.tanggal) {
      errorFields.push('Nama Grup');
      setErrors(errorFields);
    }

    if (!data.shift_id) {
      errorFields.push('Ketua Grup');
      setErrors2(errorFields);
    }

    if (errorFields.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    setButtonLoad(true)
    onSubmit(data).then(() => setButtonLoad(false));
  };

  return (
    <div className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <div
        className={`modal rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[55vh]`}
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
                Tambah Schedule Shift
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
                  <div className="w-full">
                    <DatePicker
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      selected={selectedDate.toDate()}
                      onChange={handleDateChange}
                      dateFormat="dd MMMM yyyy"
                      placeholderText="Pilih tanggal"
                      locale="id"
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
                    onChange={handleChange}
                    className="capitalize w-full rounded  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-stroke dark dark-bg-meta-4 dark:focus-border-primary"
                  >
                    <option value="">Pilih Shift</option>
                    {shiftData.map((item: any) => {
                      const isDisabled = schedule.some(
                        (schedule: any) => schedule?.shift_id === item.shift_id
                      );
                      return (
                        <>
                          <option
                            disabled={isDisabled}
                            value={item.shift_id}
                          >
                            {item.nama_shift}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <button
                  className={`btn w-4/5 flex justify-center rounded bg-primary py-2 px-6 my-2 font-medium text-gray hover:shadow-1 ${buttonLoad ? 'bg-slate-400' : ''
                    }`}
                  type="submit"
                  disabled={buttonLoad}
                >
                  {buttonLoad ? (<>
                    <BiLoaderAlt className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' /></>) : (<></>)}
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
