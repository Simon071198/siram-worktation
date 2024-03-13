import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import { Alerts } from './AlertDaftarKasus';
import {
  apiCreateDaftarKasus,
  apiReadDaftarKasus,
  apiUpdateDaftarKasus,
  apiDeleteDaftarKasus,
  apiCreateBarangBukti,
} from '../../services/api';
import { AddDaftarKasusModal } from './ModalAddDaftarKasus';
import { DeleteDaftarKasusModal } from './ModalDeleteDaftarKasus';
import Pagination from '../../components/Pagination';
import * as xlsx from 'xlsx';
import SearchInputButton from '../Device/Search';
import DropdownAction from '../../components/DropdownAction';
import dayjs from 'dayjs';
import { EditDaftarKasusModal } from './modalEditdaftarKasus';
import { AddBarangBuktiModal } from '../MasterData/BarangBukti/ModalAddBarangBukti';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

interface Item {
  nama_kasus: string;
  nomor_kasus: string;
}

const DaftarKasus = () => {
  // useState untuk menampung data dari API
  const [data, setData] = useState<Item[]>([]);
  const [detailData, setDetailData] = useState<Item | null>(null);
  const [editData, setEditData] = useState<Item | null>(null);
  const [deleteData, setDeleteData] = useState<Item | null>(null);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalAddBarangBukti, setModalAddBarangBukti] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [rows, setRows] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOperator, setIsOperator] = useState<boolean>();

  const tokenItem = localStorage.getItem('token');
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  const dataUserItem = localStorage.getItem('dataUser');
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;
  const navigate = useNavigate();

  // const navigate = useNavigate();

  // const dataUserItem = localStorage.getItem('dataUser');
  // const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  // useEffect(()=>{
  //   if(dataAdmin.role_name !== "superadmin"){
  //     navigate('/')
  //   }
  // },[])

  const handleFilterChange = async (e: any) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '.search',
          popover: {
            title: 'Search',
            description: 'Mencari nama kasus',
          },
        },
        {
          element: '.b-search',
          popover: {
            title: 'Button Search',
            description: 'Click button untuk mencari nama kasus',
          },
        },
        {
          element: '.excel',
          popover: {
            title: 'Excel',
            description: 'Mendapatkan file excel',
          },
        },
        {
          element: '.b-tambah',
          popover: {
            title: 'Tambah',
            description: 'Menambahkan daftar kasus',
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleSearchClick = async () => {
    try {
      const params = {
        filter: {
          nama_kasus: filter,
        },
        page: currentPage,
        pageSize: pageSize,
      };
      const response = await apiReadDaftarKasus(params, token);

      if (response.data.status === 'OK') {
        const result = response.data.records;
        setData(result);
        setPages(response.data.pagination.totalPages);
        setRows(response.data.pagination.totalRecords);
      } else if (response.data.status === 'No Data') {
        const result = response.data.records;
        setData(result);
      } else {
        throw new Error('Terjadi kesalahan saat mencari data.');
      }
    } catch (e: any) {
      const error = e.message;
      Alerts.fire({
        icon: 'error',
        title: error,
      });
    }
  };

  const handleEnterKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleChagePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const handleChangePageSize = async (e: any) => {
    const size = e.target.value;
    setPageSize(size);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]); // Anda juga dapat menambahkan dependencies jika diperlukan

  useEffect(() => {
    // Menambahkan event listener untuk tombol "Enter" pada komponen ini
    document.addEventListener('keypress', handleEnterKeyPress);

    // Membersihkan event listener ketika komponen di-unmount
    return () => {
      document.removeEventListener('keypress', handleEnterKeyPress);
    };
  }, [filter]); // [] menandakan bahwa useEffect hanya akan dijalankan sekali saat komponen dimuat

  const fetchData = async () => {
    let param = {
      filter: ' ',
      page: currentPage,
      pageSize: pageSize,
    };

    setIsLoading(true);
    try {
      const response = await apiReadDaftarKasus(param, token);
      if (response.data.status !== 'OK') {
        throw new Error(response.data.message);
      }
      const result = response.data.records;
      setData(result);
      setPages(response.data.pagination.totalPages);
      setRows(response.data.pagination.totalRecords);
      setIsLoading(false);
    } catch (e: any) {
      const error = e.message;
      Alerts.fire({
        icon: 'error',
        title: error,
      });
    }
  };

  // function untuk menampilkan modal detail
  const handleDetailClick = (item: Item) => {
    setDetailData(item);
    setModalDetailOpen(true);
  };

  // function untuk menampilkan modal edit
  const handleEditClick = (item: Item) => {
    setEditData(item);
    setModalEditOpen(true);
  };

  const handleAddBarangBuktiClick = (item: Item) => {
    setDetailData(item);
    setModalAddBarangBukti(true);
  };

  // function untuk menampilkan modal delete
  const handleDeleteClick = (item: Item) => {
    setDeleteData(item);
    setModalDeleteOpen(true);
  };

  // function untuk menutup modal
  const handleCloseModal = () => {
    setModalDeleteOpen(false);
    setModalAddOpen(false);
    setModalEditOpen(false);
    setModalAddBarangBukti(false);
  };

  // function untuk menghapus data
  const handleSubmitDelete = async (params: any) => {
    try {
      const responseDelete = await apiDeleteDaftarKasus(params, token);
      if (responseDelete.data.status === 'OK') {
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menghapus data',
        });
        setModalDeleteOpen(false);
        fetchData();
      } else if (responseDelete.data.status === 'NO') {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal hapus data',
        });
      } else {
        throw new Error(responseDelete.data.message);
      }
    } catch (e: any) {
      const error = e.message;
      Alerts.fire({
        icon: 'error',
        title: error,
      });
    }
  };

  // function untuk menambah data
  const handleSubmitAdd = async (params: any) => {
    try {
      const responseCreate = await apiCreateDaftarKasus(params, token);

      if (responseCreate.data.status === 'OK') {
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menambah data',
        });
        setModalAddOpen(false);
        fetchData();
      } else if (responseCreate.data.status === 'NO') {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal membuat data',
        });
      } else {
        throw new Error(responseCreate.data.message);
      }
    } catch (e: any) {
      const error = e.message;
      Alerts.fire({
        icon: 'error',
        title: error,
      });
    }
  };

  // function untuk mengubah data
  const handleSubmitEdit = async (params: any) => {
    try {
      const responseEdit = await apiUpdateDaftarKasus(params, token);

      if (responseEdit.data.status === 'OK') {
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil mengubah data',
        });
        setModalEditOpen(false);
        fetchData();
      } else if (responseEdit.data.status === 'NO') {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal mengubah data',
        });
      } else {
        throw new Error(responseEdit.data.message);
      }
    } catch (e: any) {
      const error = e.message;
      Alerts.fire({
        icon: 'error',
        title: error,
      });
    }
  };

  useEffect(() => {
    if (dataAdmin?.role_name === 'operator') {
      setIsOperator(true);
    } else {
      setIsOperator(false);
    }
  }, [isOperator]);

  const [nomorKasus, setNomorKasus] = useState({
    nomor_kasus: '',
  });

  const handleModalAddOpen = () => {
    function convertToRoman(num: number) {
      const romanNumerals = [
        'M',
        'CM',
        'D',
        'CD',
        'C',
        'XC',
        'L',
        'XL',
        'X',
        'IX',
        'V',
        'IV',
        'I',
      ];
      const decimalValues = [
        1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1,
      ];

      let result = '';

      for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= decimalValues[i]) {
          result += romanNumerals[i];
          num -= decimalValues[i];
        }
      }

      return result;
    }
    const type = 'Pid.K';
    const day = dayjs(new Date()).format('DD');
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const year = new Date().getFullYear().toString();
    const lokasi = 'Otmil';
    const romanNumber = convertToRoman(parseInt(month));
    const currentDate = `${day}-${romanNumber}/${year}`;
    let angkaTerbesar = 0;

    data.forEach((item) => {
      const nomorKasus = item.nomor_kasus.split('/')[0]; // Get the first part of the case number
      const angka = parseInt(nomorKasus, 10);

      if (!isNaN(angka) && item.nomor_kasus.includes(currentDate)) {
        angkaTerbesar = Math.max(angkaTerbesar, angka);
      }
    });

    // Increment the largest number by 1 if the date is the same
    if (angkaTerbesar === 0) {
      // No matching cases for the current date
      angkaTerbesar = 1;
    } else {
      angkaTerbesar += 1;
    }

    setNomorKasus({
      ...nomorKasus,
      nomor_kasus: `${angkaTerbesar}/${type}/${currentDate}/${lokasi}`,
    });

    setModalAddOpen(true);
  };

  const exportToExcel = () => {
    const dataToExcel = [
      [
        'nama kasus',
        'nomer kasus',
        'nrp',
        'nama',
        'nama kategori perkara',
        'nama jenis perkara',
        'tanggal registrasi kasus',
        'tanggal penutupan kasus',
        'tanggal mulai penyidikan',
        'tanggal mulai sidang',
        'nama oditur',
      ],
      ...data.map((item: any) => [
        item.nama_kasus,
        item.nomor_kasus,
        item.nrp,
        item.nama,
        item.nama_kategori_perkara,
        item.nama_jenis_perkara,
        item.tanggal_registrasi_kasus,
        item.tanggal_penutupan_kasus,
        item.tanggal_mulai_penyidikan,
        item.tanggal_mulai_sidang,
        item.nama_oditur,
      ]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(
      wb,
      `DataKasus${dayjs(new Date()).format('DDMMYYYY-HHmmss')}.xlsx`,
    );
  };

  //AddBarang bukti
  const handleSubmitAddBarangBukti = async (params: any) => {
    try {
      const responseCreate = await apiCreateBarangBukti(params, token);
      if (responseCreate.data.status === 'OK') {
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menambah data',
        });
        handleCloseModal();
        fetchData();
      } else if (responseCreate.data.status === 'NO') {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal membuat data',
        });
      } else {
        throw new Error(responseCreate.data.message);
      }
    } catch (e: any) {
      const error = e.message;
      Alerts.fire({
        icon: 'error',
        title: error,
      });
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container py-[16px]">
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-center w-full">
          <div className="mb-4 flex gap-2 items-center border-[1px] border-slate-800 px-4 py-2 rounded-md">
            <div className="w-full search">
              <SearchInputButton
                value={filter}
                placehorder="Cari Nama Kasus"
                onChange={handleFilterChange}
              />
            </div>

            <button
              className=" rounded-sm bg-blue-300 px-6 py-1 text-xs font-medium b-search "
              type="button"
              onClick={handleSearchClick}
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 text-black"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={exportToExcel}
              className="text-white rounded-sm bg-blue-500 px-10 py-1 text-sm font-medium excel"
            >
              Export&nbsp;Excel
            </button>

            <div className="w-10">
              <button>
                <HiQuestionMarkCircle
                  values={filter}
                  aria-placeholder="Show tutorial"
                  // onChange={}
                  onClick={handleClickTutorial}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Daftar Kasus
          </h4>
          <div className="flex flex-row space-x-4 space-x">
            <div>
              <button
                className='text-black rounded-md font-semibold py-2 px-3 bg-green-600'
                onClick={() => navigate('/penyidikan')}
              >
                Penyidikan
              </button>
            </div>
            <div>
              {!isOperator && (
                <button
                  onClick={handleModalAddOpen}
                  className="  text-black rounded-md font-semibold bg-blue-300 py-2 px-3 b-tambah"
                >
                  Tambah
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <div
            className={`${isOperator ? 'grid grid-cols-4' : 'grid grid-cols-5'
              } rounded-t-md bg-gray-2 dark:bg-slate-600`}
          >
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nomer Kasus
              </h5>
            </div>

            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nama Kasus
              </h5>
            </div>

            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tanggal Pelaporan
              </h5>
            </div>

            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tanggal Kejadian
              </h5>
            </div>

            {isOperator ? null : (
              <div className=" p-2.5 text-center col-span-1 xl:p-5 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Aksi
                </h5>
              </div>
            )}
          </div>

          {data.length === 0 ? (
            <div className="flex justify-center p-4 w-ful">No Data</div>
          ) : (
            <>
              {data.map((item: any) => {
                return (
                  <div>
                    <div
                      className={`${isOperator ? 'grid grid-cols-4' : 'grid grid-cols-5'
                        } rounded-sm bg-gray-2 dark:bg-meta-4 capitalize`}
                      key={item.nama_kasus}
                    >
                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center p-2.5 xl:p-5 cursor-pointer"
                      >
                        <p className=" text-black truncate dark:text-white capitalize">
                          {item.nomor_kasus}
                        </p>
                      </div>

                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center p-2.5 xl:p-5 cursor-pointer"
                      >
                        <p className=" text-black truncate dark:text-white capitalize">
                          {item.nama_kasus}
                        </p>
                      </div>

                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center p-2.5 xl:p-5 cursor-pointer"
                      >
                        <p className=" text-black truncate dark:text-white capitalize">
                          {item.waktu_pelaporan_kasus}
                        </p>
                      </div>

                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center p-2.5 xl:p-5 cursor-pointer"
                      >
                        <p className=" text-black truncate text-center dark:text-white capitalize">
                          {item.waktu_kejadian}
                        </p>
                      </div>
                      {isOperator ? (
                        <></>
                      ) : (
                        <>
                          <div className="hidden items-center  justify-center p-2.5 sm:flex xl:p-5 flex-wrap lg:flex-nowrap gap-2">
                            <div className="relative">
                              <DropdownAction
                                kasus={true}
                                handleAddClick={() =>
                                  handleAddBarangBuktiClick(item)
                                }
                                handleEditClick={() => handleEditClick(item)}
                                handleDeleteClick={() =>
                                  handleDeleteClick(item)
                                }
                              >
                                <button></button>
                              </DropdownAction>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="border-t border-slate-600"></div>
                  </div>
                );
              })}
            </>
          )}

          {modalDetailOpen && (
            <EditDaftarKasusModal
              closeModal={() => setModalDetailOpen(false)}
              onSubmit={handleSubmitAdd}
              defaultValue={detailData}
              isDetail={true}
              token={token}
            />
          )}
          {modalEditOpen && (
            <EditDaftarKasusModal
              closeModal={handleCloseModal}
              onSubmit={handleSubmitEdit}
              defaultValue={editData}
              isEdit={true}
              token={token}
            />
          )}
          {modalAddBarangBukti && (
            <AddBarangBuktiModal
              isKasus={true}
              defaultValue={detailData}
              closeModal={handleCloseModal}
              onSubmit={handleSubmitAddBarangBukti}
              token={token}
            />
          )}
          {modalAddOpen && (
            <AddDaftarKasusModal
              closeModal={handleCloseModal}
              onSubmit={handleSubmitAdd}
              defaultValue={nomorKasus}
              token={token}
            />
          )}
          {modalDeleteOpen && (
            <DeleteDaftarKasusModal
              closeModal={handleCloseModal}
              onSubmit={handleSubmitDelete}
              defaultValue={deleteData}
            />
          )}
        </div>

        {data.length === 0 ? null : (
          <div className="mt-5">
            <div className="flex gap-4 items-center ">
              <p>
                Total Rows: {rows} Page: {rows ? currentPage : null} of {pages}
              </p>
              <select
                value={pageSize}
                onChange={handleChangePageSize}
                className=" rounded border border-stroke py-1 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
              >
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
              </select>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={pages}
              onChangePage={handleChagePage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DaftarKasus;
