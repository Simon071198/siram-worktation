import { useEffect, useRef, useState } from 'react';
import {
  apiReadAllPenugasanShift,
  apiReadAllScheduleShift,
  apiReadAllShift,
  apiReadAllStaff,
} from '../../../services/api';
import { Alerts } from '../GrupShift/Alert';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { BiLoaderAlt } from 'react-icons/bi';


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
const AddPetugasShiftGrup = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
}: any) => {
  //get Token
  const tokenItem = localStorage.getItem('token');
  let tokens = tokenItem ? JSON.parse(tokenItem) : null;
  let token = tokens.token;

  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);

  const [dataPetugasShift, setDataPetugasShift] = useState(
    defaultValue || {
      grup_petugas_id: '',
      nama_grup_petugas: '',
      nama_ketua_grup: '',
      tanggal: '',
      bulan: '',
      tahun: '',
    }
  );
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
      shift_id: '',
      petugas_id: '',
      schedule_id: '',
      status_kehadiran: '0',
      jam_kehadiran: '',
      status_izin: '',
      penugasan_id: '',
      ruangan_otmil_id: '',
      ruangan_lemasmil_id: '',
      status_pengganti: '',
      created_at: '',
      updated_at: '',
    },
  ]);

  useEffect(() => {
    const addEntriesForStaff = () => {
      const newEntries = staff.map((staffItem: any) => {
        return {
          shift_id: addShift.shift_id, // Isi dengan shift_id yang sesuai
          petugas_id: staffItem.petugas_id,
          schedule_id: addShift.schedule_id,
          status_kehadiran: '0',
          jam_kehadiran: '',
          status_izin: '',
          penugasan_id: '',
          ruangan_otmil_id: '',
          ruangan_lemasmil_id: '',
          status_pengganti: '',
          created_at: '',
          updated_at: '',
        };
      });

      // Mengatur ulang nilai petugasShiftAdd
      setPetugasShiftAdd([...newEntries]);

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
          grup_petugas_id: dataPetugasShift.grup_petugas_id,
        },
      };
      const filter = {
        filter: {
          tanggal: dataPetugasShift.tanggal,
          bulan: dataPetugasShift.bulan,
          tahun: dataPetugasShift.tahun,
        },
      };
      try {
        const schedule = await apiReadAllScheduleShift(filter, token);
        const shift = await apiReadAllShift(data, token);
        const staff = await apiReadAllStaff(params, token);
        const penugasan = await apiReadAllPenugasanShift(data, token);
        const selectedScheduleId = schedule.data.records.find(
          (item: any) => item.schedule_id === defaultValue?.schedule_id
        );
        const selectedShiftId = shift.data.records.find(
          (item: any) => item.shif_id === selectedScheduleId?.shif_id
        );

        setSchedule(schedule.data.records);
        setShift(shift.data.records);
        setAddShift({
          ...addShift,
          shift_id: selectedScheduleId?.shift_id,
          schedule_id: defaultValue?.schedule_id,
        });
        setWaktu({
          ...waktu,
          waktu_mulai: selectedShiftId?.waktu_mulai,
          waktu_selesai: selectedShiftId?.waktu_selesai,
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

  const handleChangeShift = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedShiftId = e.target.value;
    const jamKerja = shift.find(
      (item: any) => item.shift_id === selectedShiftId
    );
    const selectedSchedule = schedule.find(
      (item: any) => item.shift_id === selectedShiftId
    );
    setWaktu({
      ...waktu,
      waktu_mulai: jamKerja?.waktu_mulai,
      waktu_selesai: jamKerja?.waktu_selesai,
    });
    setAddShift({
      ...addShift,
      shift_id: e.target.value,
      schedule_id: selectedSchedule?.schedule_id,
    });
  };

  const handleChangePenugasan = (e: any, petugas: any) => {
    const petugasId = petugasShiftAdd.findIndex(
      (item) => item.petugas_id === petugas
    );
    const updatedPetugasShiftAdd = [...petugasShiftAdd];
    updatedPetugasShiftAdd[petugasId].penugasan_id = e;
    setPetugasShiftAdd(updatedPetugasShiftAdd);
  };
  console.log('adad:', petugasShiftAdd);

  const handleSubmit = () => {
    setButtonLoad(true);
    onSubmit(petugasShiftAdd).then(() => setButtonLoad(false));
  };

  const tanggal = dayjs(`${defaultValue.tahun}-${defaultValue.bulan}-${defaultValue.tanggal}`, {
    locale: 'id'
  }).format('DD MMMM YYYY')
  console.log(defaultValue.bulan);


  return (
    <div className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <div
        className={`modal rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[90vh]`}
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
                Data Schedule Shift {tanggal}
              </h1>
              <strong
                className="text-xl align-center cursor-pointer "
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <div>
              <div className="m-4">
                <div className="">
                  <div className="form-group w-full ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Jadwal Shift
                    </label>
                    <select
                      name="shift_id"
                      onChange={handleChangeShift}
                      value={addShift.shift_id}
                      className="capitalize w-full rounded dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-stroke dark dark-bg-meta-4 dark:text-white dark:focus-border-primary"
                    >
                      <option value="" disabled>
                        Pilih Shift
                      </option>
                      {schedule.map((schedule: any) => {
                        const matchingShift = shift.find(
                          (item) => item.shift_id === schedule.shift_id
                        );

                        return (
                          <>
                            <option value={matchingShift?.shift_id}>
                              {matchingShift?.nama_shift}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="form-group w-1/2 ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Waktu Masuk
                      </label>
                      <input
                        disabled
                        value={waktu.waktu_mulai}
                        name="nama_grup_petugas"
                        className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      />
                    </div>
                    <div className="form-group w-1/2 ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Waktu Pulang
                      </label>
                      <input
                        disabled
                        value={waktu.waktu_selesai}
                        name="nama_grup_petugas"
                        className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="form-group w-full ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Grup
                    </label>
                    <input
                      value={dataPetugasShift.nama_grup_petugas}
                      name="grup_petuas_id"
                      className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                    />
                  </div>
                  <div className="form-group w-full mt-2">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Ketua Grup
                    </label>
                    <input
                      value={dataPetugasShift.nama_ketua_grup}
                      name="nama_ketua_grup"
                      className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                    />
                  </div>
                  <label
                    className="block text-sm font-semibold text-black dark:text-white mt-2 "
                    htmlFor="id"
                  >
                    Anggota Grup
                  </label>
                  <div className=" w-full flex justify-between space-x-2">
                    <div className="form-group w-1/2 ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white ml-2"
                        htmlFor="id"
                      >
                        Nama
                      </label>
                    </div>
                    <div className="form-group w-1/2 ">
                      <label
                        className="pl-3 block text-sm font-medium text-black dark:text-white "
                        htmlFor="id"
                      >
                        Penugasan
                      </label>
                    </div>
                  </div>
                  <div className="w-full h-48 overflow-y-auto">
                    {staff.map((item: any) => {
                      return (
                        <div className="flex justify-between space-x-2 mx-1 rounded border border-stroke my-1 dark:text-gray dark:bg-slate-800 ">
                          <div className="form-group w-3/6 ">
                            <input
                              name="nama"
                              disabled
                              className="capitalize w-full dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              value={item.nama}
                            />
                          </div>
                          <div className="form-group w-3/6 ">
                            <select
                              onChange={(e) =>
                                handleChangePenugasan(
                                  e.target.value,
                                  item.petugas_id
                                )
                              }
                              className="capitalize w-full rounded  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-stroke dark dark-bg-meta-4 dark:focus-border-primary"
                            >
                              <option value="">Pilih Penugasan</option>
                              {penugasan.map((penugasan: any) => {
                                return (
                                  <option value={penugasan.penugasan_id}>
                                    {penugasan.nama_penugasan}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {isDetail ? null : (
                  <button
                    onClick={handleSubmit}
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${buttonLoad ? 'bg-slate-400' : ''
                      }`}
                    type="submit"
                    disabled={buttonLoad}
                  >
                    {buttonLoad ? (<>
                      <BiLoaderAlt className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' /></>) : (<></>)}
                    Submit
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddPetugasShiftGrup;
