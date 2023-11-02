import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { BsFilter, BsPlusSquareDotted } from 'react-icons/bs';
import AddShift from './addShift';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import id from 'date-fns/locale/id';

interface DaysInMonthProps {
  year: number;
  month: number;
}

const DaysInMonth = ({ year, month }: DaysInMonthProps) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Mendapatkan jumlah hari dalam bulan
  const daysArray = [];

  // Mengisi array dengan tanggal dari 1 hingga jumlah hari dalam bulan
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(day);
  }

  return daysArray;
};

const getDayOfWeek = (year: any, month: any, day: any) => {
  const date = dayjs().year(year).month(month).date(day).locale('id'); // Menggunakan lokal bahasa Indonesia
  return date.format('dddd'); // Format hari dalam bahasa Indonesia (Senin, Selasa, dll.)
};

const shiftJaga = () => {
  const [year, setYear] = useState(2023); // Ganti tahun sesuai kebutuhan Anda
  const [month, setMonth] = useState(0); // Ganti bulan (0-11) sesuai kebutuhan Anda, 0 = Januari, 11 = Desember
  const [startDate, setStartDate] = useState(dayjs().date()); // Tanggal awal rentang
  const [endDate, setEndDate] = useState(7); // Tanggal akhir rentang

  const [tanggal, setTanggal] = useState<number[]>([]);

  registerLocale('id', id);
  setDefaultLocale('id');

  // Modal
  const [openAddModal, setopenAddModal] = useState(false);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);

  // dropdown
  const [openFilter, setOpenFilter] = useState(false);
  const [openGrup, setOpenGrup] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  useEffect(() => {
    const days = DaysInMonth({ year, month });
    // Menggunakan metode .slice() untuk memilih rentang tanggal yang dipilih
    const selectedDays = days.slice(startDate - 1, endDate); // startDate - 1 karena indeks dimulai dari 0
    setTanggal(selectedDays);
    setEndDate(startDate + 6);
  }, [year, month, startDate, endDate]);

  const Pegawai = ['Roy', 'Jul', 'Ramdani', 'Jaelani', 'Fikri', 'Alamsyah'];
  const Grup = [
    { nama: 'Grup A', pegawai: [Pegawai[0], Pegawai[1]] },
    { nama: 'Grup B', pegawai: [Pegawai[2], Pegawai[3]] },
    { nama: 'Grup C', pegawai: [Pegawai[4], Pegawai[5]] },
  ];
  const jadwalShift = [
    { tanggal: 1, shift: 'pagi', pegawai: Grup[0] },
    { tanggal: 1, shift: 'siang', pegawai: Grup[1] },
    { tanggal: 1, shift: 'malam', pegawai: Grup[2] },
    { tanggal: 2, shift: 'pagi', pegawai: Grup[1] },
    { tanggal: 2, shift: 'siang', pegawai: Grup[2] },
    { tanggal: 2, shift: 'malam', pegawai: Grup[0] },
    { tanggal: 3, shift: 'pagi', pegawai: Grup[2] },
    { tanggal: 3, shift: 'siang', pegawai: Grup[0] },
    { tanggal: 3, shift: 'siang', pegawai: Grup[1] },
    { tanggal: 4, shift: 'pagi', pegawai: Grup[2] },
    { tanggal: 4, shift: 'siang', pegawai: Grup[1] },
    { tanggal: 4, shift: 'malam', pegawai: Grup[0] },
    { tanggal: 5, shift: 'pagi', pegawai: Grup[1] },
    { tanggal: 5, shift: 'siang', pegawai: Grup[0] },
    { tanggal: 5, shift: 'malam', pegawai: Grup[2] },
    { tanggal: 6, shift: 'pagi', pegawai: Grup[1] },
    { tanggal: 6, shift: 'siang', pegawai: Grup[2] },
    { tanggal: 6, shift: 'malam', pegawai: Grup[0] },
    { tanggal: 7, shift: 'pagi', pegawai: Grup[1] },
    { tanggal: 7, shift: 'siang', pegawai: Grup[2] },
    { tanggal: 7, shift: 'malam', pegawai: Grup[2] },
    { tanggal: 8, shift: 'malam', pegawai: Grup[2] },
  ];

  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

  const   handleDateChange = (date:any) => {
    const dateValue = (date);
    setSelectedDate(dayjs(dateValue));
    console.log('tanggald',dayjs(dateValue).format('DD/YY/YYYY'));
    

    // Mendapatkan tanggal, bulan, dan tahun dari tanggal yang dipilih
    const selectedDateObj = new Date(dateValue);
    const selectDate = selectedDateObj.getDate();
    const selectedYear = selectedDateObj.getFullYear();
    const selectedMonth = selectedDateObj.getMonth();

    // Mengupdate state tahun dan bulan
    setStartDate(selectDate);
    setYear(selectedYear);
    setMonth(selectedMonth);
  };

  const handleOpenAddModal = () => {
    setopenAddModal(!openAddModal);
    setModalAddOpen(!modalAddOpen);
  };

  const handleOpenEditModal = () => {
    setopenAddModal(!openAddModal);
    setModalDetailOpen(!modalDetailOpen);
  };

  const handleOpenGrup = (value: any) => {
    setOpenGrup(value);
  };

  return (
    <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className={`w-full ${openAddModal ? '' : 'hidden'}`}>
        {modalAddOpen && <AddShift closeModal={handleOpenAddModal} />}
        {modalDetailOpen && (
          <AddShift closeModal={handleOpenEditModal} isDetail={true} />
        )}
      </div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Schedule Shift</h1>
        <div className='rounded-md'>
          <label htmlFor="tanggal">Pilih Tanggal:</label>
          <DatePicker
            selected={selectedDate.toDate()}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Pilih tanggal"
            locale="id"
            isClearable
          />
        </div>
      </div>
      <div className="mt-3">
        <div className="flex w-full">
          <div className="w-1/6 bg-slate-600 flex justify-between mr-1">
            <h2 className=" pl-3 flex items-center h-full">Nama Pegawai</h2>
            <button className="pr-2" onClick={handleOpenFilter}>
              <BsFilter className="hover:w-5 hover:h-5" />
            </button>
          </div>
          <div
            className={`${
              openFilter ? 'h-16' : 'h-0'
            } overflow-hidden transition-all duration-300 absolute z-9999 bg-slate-500 rounded shadow-lg text-sm ml-32 mt-6`}
          >
            <a
              href="#"
              className="block px-4 py-1 text-gray-800 hover:text-white mt-1"
              onClick={() => handleOpenGrup(false)}
            >
              Pegawai
            </a>
            <a
              href="#"
              className="block px-4 py-1 text-gray-800 hover:text-white"
              onClick={() => handleOpenGrup(true)}
            >
              Grup
            </a>
          </div>
          <div className="w-4/6">
            <div className="flex space-x-1">
              {tanggal.map((item: any, index) => {
                const backgroundColor =
                  index % 2 === 0 ? 'bg-slate-500' : 'bg-slate-600';
                const dayOfWeek = getDayOfWeek(year, month, item);
                return (
                  <div
                    key={index}
                    className={`w-26 xl:flex items-center justify-center ${backgroundColor}`}
                  >
                    <h3 className={`flex justify-center font-bold text-2xl`}>
                      {item}
                    </h3>
                    <h3 className="font-semibold ml-2 flex justify-center sm:text-xs xl:text-sm">
                      {dayOfWeek}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-1/6 bg-slate-500 ml-1">
            <h2 className="w-40 flex justify-center h-full items-center w-full">
              Keterangan
            </h2>
          </div>
        </div>
        {Grup.map((itemNama: any) => {
          return (
            <div className={`flex my-1 ${openGrup ? '' : 'hidden'}`}>
              <div className="w-1/6 bg-slate-600 mr-1">
                <h2 className=" pl-3 flex items-center h-full">
                  {itemNama.nama}
                </h2>
              </div>
              <div className="w-4/6">
                <div className="flex space-x-1">
                  {tanggal.map((item: any, index) => {
                    const backgroundColor =
                      index % 2 === 0 ? 'bg-slate-500' : 'bg-slate-600';
                    const jadwalPegawai = jadwalShift.filter(
                      (shiftItem: any) =>
                        shiftItem.pegawai.nama === itemNama.nama
                    );

                    // Cari shift sesuai dengan tanggal
                    const shiftPegawai = jadwalPegawai.find(
                      (shiftItem: any) => shiftItem.tanggal === item
                    );
                    let jam:
                      | ''
                      | '06:00 - 14:00'
                      | '14:00 - 22:00'
                      | '22:00 - 06:00' = '';
                    let shiftBackgroundColor = '';
                    let shiftBgList = '';
                    if (shiftPegawai) {
                      switch (shiftPegawai.shift) {
                        case 'pagi':
                          shiftBackgroundColor = 'bg-yellow-300';
                          shiftBgList = 'bg-yellow-500';
                          jam = '06:00 - 14:00';
                          break;
                        case 'siang':
                          shiftBackgroundColor = 'bg-orange-500';
                          shiftBgList = 'bg-orange-700';
                          jam = '14:00 - 22:00';
                          break;
                        case 'malam':
                          shiftBackgroundColor = 'bg-blue-500';
                          shiftBgList = 'bg-blue-700';
                          jam = '22:00 - 06:00';
                          break;
                        default:
                          shiftBackgroundColor = 'bg-gray-400'; // Warna default jika jenis shift tidak sesuai
                          break;
                      }
                    }
                    return (
                      <>
                        {shiftPegawai ? (
                          <button
                            key={index}
                            className={`w-26 flex justify-center ${shiftBackgroundColor} h-16 `}
                            onClick={handleOpenEditModal}
                          >
                            <div className="text-black">
                              <div
                                className={`h-2 w-full ${shiftBgList}`}
                              ></div>
                              <h3 className="sm:hidden xl:block text-sm font-semibold ml-1">
                                {jam}
                              </h3>
                              <h3
                                className={`flex items-center font-bold text-sm ml-1`}
                              >
                                {shiftPegawai.shift
                                  .toLowerCase()
                                  .replace(/^\w|\s\w/g, (char) =>
                                    char.toUpperCase()
                                  )}
                              </h3>
                            </div>
                          </button>
                        ) : (
                          <div
                            key={index}
                            className={`w-26 flex justify-center items-center ${backgroundColor} h-16`}
                          >
                            <button
                              onClick={handleOpenAddModal}
                              className="text-white h-5 w-5 hover:border rounded flex items-center justify-center"
                            >
                              <BsPlusSquareDotted className="w-full h-full" />
                            </button>
                          </div>
                        )}
                        {/* <h3 className="font-semibold ml-2">{dayOfWeek}</h3> */}
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="w-1/6 bg-slate-500 ml-1">
                <h2 className="w-40 flex justify-center h-full items-center w-full"></h2>
              </div>
            </div>
          );
        })}
        {Pegawai.map((itemNama: any) => {
          return (
            <div className={`flex my-1 ${!openGrup ? '' : 'hidden'}`}>
              <div className="w-1/6 bg-slate-600 mr-1">
                <h2 className=" pl-3 flex items-center h-full truncate">
                  {itemNama}
                </h2>
              </div>
              <div className="w-4/6">
                <div className="flex space-x-1">
                  {tanggal.map((item: any, index) => {
                    const backgroundColor =
                      index % 2 === 0 ? 'bg-slate-500' : 'bg-slate-600';
                    const jadwalPegawai = jadwalShift.filter((shiftItem: any) =>
                      shiftItem.pegawai.pegawai.includes(itemNama)
                    );

                    // Cari shift sesuai dengan tanggal
                    const shiftPegawai = jadwalPegawai.find(
                      (shiftItem: any) => shiftItem.tanggal === item
                    );
                    let jam:
                      | ''
                      | '06:00 - 14:00'
                      | '14:00 - 22:00'
                      | '22:00 - 06:00' = '';
                    let shiftBackgroundColor = '';
                    let shiftBgList = '';
                    if (shiftPegawai) {
                      switch (shiftPegawai.shift) {
                        case 'pagi':
                          shiftBackgroundColor = 'bg-yellow-300';
                          shiftBgList = 'bg-yellow-500';
                          jam = '06:00 - 14:00';
                          break;
                        case 'siang':
                          shiftBackgroundColor = 'bg-orange-500';
                          shiftBgList = 'bg-orange-700';
                          jam = '14:00 - 22:00';
                          break;
                        case 'malam':
                          shiftBackgroundColor = 'bg-blue-500';
                          shiftBgList = 'bg-blue-700';
                          jam = '22:00 - 06:00';
                          break;
                        default:
                          shiftBackgroundColor = 'bg-gray-400'; // Warna default jika jenis shift tidak sesuai
                          break;
                      }
                    }
                    return (
                      <>
                        {shiftPegawai ? (
                          <button
                            key={index}
                            className={`w-26 flex justify-center ${shiftBackgroundColor} h-16 `}
                            onClick={handleOpenEditModal}
                          >
                            <div className="text-black">
                              <div
                                className={`h-2 w-full ${shiftBgList}`}
                              ></div>
                              <h3 className="sm:hidden xl:block text-sm font-semibold ml-1">
                                {jam}
                              </h3>
                              <h3
                                className={`flex items-center font-bold text-sm ml-1`}
                              >
                                {shiftPegawai.shift
                                  .toLowerCase()
                                  .replace(/^\w|\s\w/g, (char) =>
                                    char.toUpperCase()
                                  )}
                              </h3>
                            </div>
                          </button>
                        ) : (
                          <div
                            key={index}
                            className={`w-26 flex justify-center items-center ${backgroundColor} h-16`}
                          >
                            <button
                              onClick={handleOpenAddModal}
                              className="text-white h-5 w-5 hover:border rounded flex items-center justify-center"
                            >
                              <BsPlusSquareDotted className="w-full h-full" />
                            </button>
                          </div>
                        )}
                        {/* <h3 className="font-semibold ml-2">{dayOfWeek}</h3> */}
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="w-1/6 bg-slate-500 ml-1">
                <h2 className="w-40 flex justify-center h-full items-center w-full"></h2>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between">
        <div className="mt-2 ml-4 flex items-center h-5">
          <button className="w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4 hover:w-5 hover:h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button className="h-6 w-6 border rounded flex items-center justify-center bg-blue">
            1
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4 hover:w-5 hover:h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center space-x-1">
            <h1 className="rounded-full bg-green-600 h-3 w-3"></h1>
            <h1 className="text-xs">Cuti</h1>
          </div>
          <div className="flex items-center space-x-1">
            <h1 className="rounded-full bg-red-600 h-3 w-3"></h1>
            <h1 className="text-xs">Off</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default shiftJaga;
