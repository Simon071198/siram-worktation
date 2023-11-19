import { useEffect, useRef, useState } from 'react';
import {
  apiReadAllGrupPetugas,
  apiReadAllPenugasanShift,
  apiReadAllPetugasShift,
  apiReadAllScheduleShift,
  apiReadAllShift,
  apiReadAllStaff,
} from '../../../services/api';
import 'react-datepicker/dist/react-datepicker.css';
import 'dayjs/locale/id';
import { Alerts } from '../GrupShift/Alert';
import dayjs from 'dayjs';
import { BiLoaderAlt } from 'react-icons/bi';

interface grupPetugas {
  grup_petugas_id: any;
  nama_grup_petugas: any;
  // tambahkan atribut lain sesuai kebutuhan
}

interface Schedule {
  schedule_id: any;
  shif_id: any;
}
interface Shift {
  shift_id: any;
  nama_shift: any;
  waktu_mulai: any;
  waktu_selesai: any;
}

interface Staff {
  petugas_id: number;
  nama: string;
  // tambahkan atribut lain sesuai kebutuhan
}
const DeletePetugasShift = ({
  closeModal,
  onSubmit,
  defaultValue,
}: any) => {
  //get Token
  const tokenItem = localStorage.getItem('token');
  let tokens = tokenItem ? JSON.parse(tokenItem) : null;
  let token = tokens.token;

  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [dataPetugasShift, setDataPetugasShift] = useState([{
    petugas_shift_id: '',
  }]);
  const [staff, setStaff] = useState<Staff[]>([]);

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

  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [shift, setShift] = useState<Shift[]>([]);
  const [waktu, setWaktu] = useState({
    waktu_mulai: shift[0]?.waktu_mulai,
    waktu_selesai: shift[0]?.waktu_selesai,
  });
  const [penugasan, setPenugasan] = useState([
    {
      penugasan_id: '',
      nama_penugasan: '',
    },
  ]);
  const [addShift, setAddShift] = useState({
    shift_id: '',
    schedule_id: '',
  });
  const [petugasShiftAdd, setPetugasShiftAdd] = useState([
    {
      petugas_shift_id: '',
    },
  ]);
  console.log(petugasShiftAdd);



  useEffect(() => {
    setIsLoading(true)
    const addEntriesForStaff = () => {
      const newEntries = staff.map((staffItem: any) => {
        const penugasanId = dataPetugasShift?.find((itemNa: any) => itemNa.petugas_id === staffItem.petugas_id)
        return {
          petugas_shift_id: penugasanId?.petugas_shift_id || '',
        };
      });

      // Mengatur ulang nilai petugasShiftAdd
      setPetugasShiftAdd([...newEntries]);
      setIsLoading(false)

      // Mengembalikan nilai yang diatur ulang
      return [...petugasShiftAdd, ...newEntries];
    };
    addEntriesForStaff();
  }, [staff, addShift]);

  useEffect(() => {
    setIsLoading(true);
    const fetchSchedule = async () => {
      const data = {};
      const params = {
        pageSize: Number.MAX_SAFE_INTEGER,
        filter: {
          grup_petugas_id: defaultValue.grup_petugas_id,
        },
      };
      const filter = {
        filter: {
          tanggal: defaultValue.tanggal,
          bulan: defaultValue.bulan,
          tahun: defaultValue.tahun,
        },
      };
      const filterPetugasShift = {
        pageSize: Number.MAX_SAFE_INTEGER,
        filter: {
          schedule_id: defaultValue.schedule_id,
          // grup_petugas_id:defaultValue.grup_petugas_id,
          tanggal: defaultValue.tanggal,
          bulan: defaultValue.bulan,
          tahun: defaultValue.tahun,
        },
      };

      try {
        const schedule = await apiReadAllScheduleShift(filter, token);
        const shift = await apiReadAllShift(data, token);
        const staff = await apiReadAllStaff(params, token);
        const penugasan = await apiReadAllPenugasanShift(data, token);
        const petugasShift = await apiReadAllPetugasShift(
          filterPetugasShift,
          token
        );

        setDataPetugasShift(petugasShift.data.records)
        setSchedule(schedule.data.records);
        setShift(shift.data.records);
        setAddShift({
          ...addShift,
          shift_id: defaultValue.shift_id,
          schedule_id: defaultValue.schedule_id,
        });
        setWaktu({
          ...waktu,
          waktu_mulai: defaultValue?.waktu_mulai,
          waktu_selesai: defaultValue?.waktu_selesai,
        });
        setStaff(staff.data.records);
        setPenugasan(penugasan.data.records);
        setIsLoading(false);
      } catch (error: any) {
        Alerts.fire({
          icon: 'error',
          title: error.message,
        });
      }
    };
    fetchSchedule();
  }, []);


  const handleSubmit = () => {
    setIsLoading(true)
    onSubmit(petugasShiftAdd).then(() => setButtonLoad(false));
  };


  return (
    <div
      ref={modalContainerRef}
      className="modal-container rounded-md fixed z-50 flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <div className="w-full flex justify-between">
              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  Konfirmasi Hapus Data
                </h3>
              </div>
              <strong
                className="text-xl align-center cursor-pointer "
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <div className="pt-6">
              <p className="text-sm te  xt-black dark:text-white">
                Apakah Anda yakin ingin menghapus data ini?
              </p>
              <p className="text-sm text-black dark:text-white">

              </p>
            </div>

            <br></br>

            <div className="flex justify-between">
              <button
                className="btn flex justify-center rounded bg-gray-200 py-2 px-6 font-medium hover:font-semibold text-gray-900 hover:shadow-1"
                type="submit"
                onClick={closeModal}
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className={`btn hover:bg-blue-500 flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${buttonLoad ? 'bg-slate-400' : ''
                  }`}
                type="submit"
                disabled={buttonLoad}
              >
                {buttonLoad ? (<>
                  <BiLoaderAlt className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' /></>) : (<></>)}

                Hapus
              </button>
            </div>
          </div>
        </div>)}
    </div>
  );
};

export default DeletePetugasShift;
