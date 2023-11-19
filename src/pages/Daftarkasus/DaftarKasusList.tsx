import React, { useEffect, useState } from 'react';
import Loader from '../../common/Loader';
import { Alerts } from './AlertDaftarKasus';
import {
  apiCreateDaftarKasus,
  apiReadDaftarKasus,
  apiUpdateDaftarKasus,
  apiDeleteDaftarKasus,
} from '../../services/api';
import { AddDaftarKasusModal } from './ModalAddDaftarKasus';
import { DeleteDaftarKasusModal } from './ModalDeleteDaftarKasus';
import Pagination from '../../components/Pagination';
import * as xlsx from 'xlsx';
import SearchInputButton from '../Device/Search';
import DropdownAction from '../../components/DropdownAction';

// Interface untuk objek 'params' dan 'item'
interface Params {
  filter: string;
}

interface Item {
  nama_kasus: string;
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
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [rows, setRows] = useState(1);
  const [pageSize, setPageSize] = useState(10)
  const [isOperator, setIsOperator] = useState<boolean>();

  const tokenItem = localStorage.getItem('token')
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token

  const dataUserItem = localStorage.getItem('dataUser');
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

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
    // try {
    //   const response = await apiReadAllStaff({ filter: { nama: newFilter } });

    //   if (response.data.status === 'OK') {
    //     const result = response.data;
    //     setData(result.records);
    //     setPages(response.data.pagination.totalPages);
    //     setRows(response.data.pagination.totalRecords);
    //   } else {
    //     throw new Error('Terjadi kesalahan saat mencari data.');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
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
        // setPages(response.data.pagination.totalPages);
        // setRows(response.data.pagination.totalRecords);
      }
      else {
        throw new Error('Terjadi kesalahan saat mencari data.');
      }
    } catch (e: any) {
      const error = e.message
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
    setCurrentPage(1)
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
  }, [filter,]); // [] menandakan bahwa useEffect hanya akan dijalankan sekali saat komponen dimuat


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
      const error = e.message
      Alerts.fire({
        icon: 'error',
        title: error,
      });
    }
  };


  // function untuk menampilkan modal detail
  const handleDetailClick = (item: Item) => {
    console.log('detail', item)
    setDetailData(item);
    setModalDetailOpen(true);
  };

  // function untuk menampilkan modal edit
  const handleEditClick = (item: Item) => {
    console.log('edit', item)
    setEditData(item);
    setModalEditOpen(true);
  };

  // function untuk menampilkan modal delete
  const handleDeleteClick = (item: Item) => {
    setDeleteData(item);
    setModalDeleteOpen(true);
  };

  // function untuk menutup modal
  const handleCloseDeleteModal = () => {
    setModalDeleteOpen(false);
  };

  // function untuk menutup modal
  const handleCloseAddModal = () => {
    setModalAddOpen(false);
  };

  const handleCloseEditModal = () => {
    setModalEditOpen(false);
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
        fetchData()
      } else if (responseDelete.data.status === "NO") {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal hapus data',
        });
      } else {
        throw new Error(responseDelete.data.message);
      }
    } catch (e: any) {
      const error = e.message
      Alerts.fire({
        icon: 'error',
        title: error,
      });
    }
  };

  // function untuk menambah data
  const handleSubmitAdd = async (params: any) => {
    console.log('DATA DARI LIST', params);
    try {
      const responseCreate = await apiCreateDaftarKasus(params, token)
      if (responseCreate.data.status === "OK") {

        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menambah data',
        });
        setModalAddOpen(false);
        fetchData()
      } else if (responseCreate.data.status === 'NO') {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal membuat data',
        });
      } else {
        throw new Error(responseCreate.data.message);
      }
    } catch (e: any) {
      const error = e.message
      Alerts.fire({
        icon: 'error',
        title: error,
      });
    }
  };

  // function untuk mengubah data
  const handleSubmitEdit = async (params: any) => {
    console.log(params, 'edit');
    try {
      const responseEdit = await apiUpdateDaftarKasus(params, token)
      if (responseEdit.data.status === "OK") {

        Alerts.fire({
          icon: 'success',
          title: 'Berhasil mengubah data',
        });
        setModalEditOpen(false);
        fetchData()
      } else if (responseEdit.data.status === 'NO') {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal mengubah data',
        });
      } else {
        throw new Error(responseEdit.data.message);
      }
    } catch (e: any) {
      const error = e.message
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

    console.log(isOperator, 'Operator');
  }, [isOperator]);



  const exportToExcel = () => {
    const dataToExcel = [
      [
        'nama kasus',
        'nomer kasus',
        'nrp',
        'nama',
        'nama kategori perkara',
        'nama jenis perkara',
        'lokasi kasus',
        'waktu kejadian',
        'tanggal pelimpahan kasus',
        'waktu pelaporan kasus',
      ],
      ...data.map((item: any) => [
        item.nama_kasus,
        item.nomor_kasus,
        item.nrp,
        item.nama,
        item.nama_kategori_perkara,
        item.nama_jenis_perkara,
        item.lokasi_kasus,
        item.waktu_kejadian,
        item.tanggal_pelimpahan_kasus,
        item.waktu_pelaporan_kasus,
      ]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'data_jenis_sidang.xlsx');
  }


  return isLoading ? (
    <Loader />
  ) : (
    <div className='container py-[16px]'>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-center w-full">
          <div className="mb-4 flex gap-2 items-center border-[1px] border-slate-800 px-4 py-2 rounded-md">
            <div className="w-full">
              <SearchInputButton
                value={filter}
                placehorder="Cari Nama Kasus"
                onChange={handleFilterChange}
              />
            </div>

            <button
              className=" rounded-sm bg-blue-300 px-6 py-1 text-xs font-medium "
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
              className="text-white rounded-sm bg-blue-500 px-10 py-1 text-sm font-medium"
            >
              Export&nbsp;Excel
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Daftar Kasus
          </h4>
          {!isOperator &&
            <button
              onClick={() => setModalAddOpen(true)}
              className="  text-black rounded-md font-semibold bg-blue-300 py-2 px-3"
            >
              Tambah
            </button>
          }
        </div>
        <div className="flex flex-col">

          {isOperator ?

            <div className="grid grid-cols-5 rounded-t-md bg-gray-2 dark:bg-slate-600 ">
              <div className="p-2.5 xl:p-5 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama Kasus
                </h5>
              </div>

              <div className="p-2.5 xl:p-5 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nomer Kasus
                </h5>
              </div>

              <div className="p-2.5 xl:p-5 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama WBP
                </h5>
              </div>

              <div className="p-2.5 xl:p-5 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  NRP
                </h5>
              </div>

              <div className="p-2.5 xl:p-5 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Kategori Perkara
                </h5>
              </div>

              {/* <div className="p-2.5 xl:p-5 justify-center flex">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Jenis Perkara
            </h5>
          </div> */}

              {/* <div className="p-2.5 xl:p-5 justify-center flex">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Tanggal Mulai Penyidikan
            </h5>
          </div>

          <div className="p-2.5 xl:p-5 justify-center flex">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Tanggal Mulai Sidang
            </h5>
          </div> */}
            </div>

            :
            <div className="grid grid-cols-11 rounded-t-md bg-gray-2 dark:bg-slate-600 sm:grid-cols-11">
              <div className="p-2.5 xl:p-5 col-span-2 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama Kasus
                </h5>
              </div>

              <div className="p-2.5 xl:p-5 col-span-2 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nomer Kasus
                </h5>
              </div>

              <div className="p-2.5 xl:p-5 col-span-2 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama WBP
                </h5>
              </div>

              <div className="p-2.5 xl:p-5 col-span-2 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  NRP
                </h5>
              </div>

              <div className="p-2.5 xl:py-5 px-2 col-span-2 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Kategori Perkara
                </h5>
              </div>

              {/* <div className="p-2.5 xl:p-5 col-span-2 justify-center flex">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Jenis Perkara
            </h5>
          </div> */}

              {/* <div className="p-2.5 xl:p-5 col-span-2 justify-center flex">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Tanggal Mulai Penyidikan
            </h5>
          </div>

          <div className="p-2.5 xl:p-5 col-span-2 justify-center flex">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Tanggal Mulai Sidang
            </h5>
          </div> */}

              <div className=" p-2.5 text-center col-span-1 xl:p-5 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Aksi
                </h5>
              </div>

            </div>
          }



          {data.length === 0 ? (
            <div className="flex justify-center p-4 w-ful">No Data</div>
          ) : (
            <>
              {data.map((item: any) => {
                return (
                  <div>
                    {isOperator ?
                      <>
                        <div
                          className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5 capitalize"
                          key={item.nama_kasus}
                        >
                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                            <p className=" text-black truncate dark:text-white capitalize">
                              {item.nama_kasus}
                            </p>
                          </div>

                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                            <p className=" text-black truncate dark:text-white capitalize">
                              {item.nomor_kasus}
                            </p>
                          </div>

                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                            <p className=" text-black truncate dark:text-white capitalize">
                              {item.nama}
                            </p>
                          </div>

                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                            <p className=" text-black truncate dark:text-white capitalize">
                              {item.nrp}
                            </p>
                          </div>

                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                            <p className=" text-black truncate text-center dark:text-white capitalize">
                              {item.nama_kategori_perkara}
                            </p>
                          </div>

                          {/* <div 
                  onClick={() => handleDetailClick(item)}
                  className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                    <p className=" text-black truncate text-center dark:text-white capitalize">
                      {item.nama_jenis_perkara}
                    </p>
                  </div> */}

                          {/* <div 
                  onClick={() => handleDetailClick(item)}
                  className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                    <p className=" text-black truncate dark:text-white capitalize">
                      {item.tanggal_mulai_penyidikan}
                    </p>
                  </div>
                 
                  <div 
                  onClick={() => handleDetailClick(item)}
                  className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                    <p className=" text-black truncate dark:text-white capitalize">
                      {item.tanggal_mulai_sidang}
                    </p>
                  </div> */}

                        </div>
                        <div className="border-t border-slate-600"></div>
                      </>
                      :
                      <>
                        <div
                          className="grid grid-cols-11 rounded-sm bg-gray-2 dark:bg-meta-4 capitalize"
                          key={item.nama_kasus}
                        >
                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex items-center col-span-2 justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                            <p className=" text-black truncate dark:text-white capitalize">
                              {item.nama_kasus}
                            </p>
                          </div>

                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex items-center col-span-2 justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                            <p className=" text-black truncate dark:text-white capitalize">
                              {item.nomor_kasus}
                            </p>
                          </div>

                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex items-center col-span-2 justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                            <p className=" text-black truncate dark:text-white capitalize">
                              {item.nama}
                            </p>
                          </div>

                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex items-center col-span-2 justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                            <p className=" text-black truncate dark:text-white capitalize">
                              {item.nrp}
                            </p>
                          </div>

                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex items-center col-span-2 justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                            <p className=" text-black truncate text-center dark:text-white capitalize">
                              {item.nama_kategori_perkara}
                            </p>
                          </div>

                          {/* <div 
                  onClick={() => handleDetailClick(item)}
                  className="flex items-center col-span-2 justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                    <p className=" text-black truncate text-center dark:text-white capitalize">
                      {item.nama_jenis_perkara}
                    </p>
                  </div> */}

                          {/* <div 
                  onClick={() => handleDetailClick(item)}
                  className="flex items-center col-span-2 justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                    <p className=" text-black truncate dark:text-white capitalize">
                      {item.tanggal_mulai_penyidikan}
                    </p>
                  </div>
                 
                  <div 
                  onClick={() => handleDetailClick(item)}
                  className="flex items-center col-span-2 justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                    <p className=" text-black truncate dark:text-white capitalize">
                      {item.tanggal_mulai_sidang}
                    </p>
                  </div> */}
                          <div className="hidden items-center col-span-1 justify-center p-2.5 sm:flex xl:p-5 flex-wrap lg:flex-nowrap gap-2">

                            <div className="relative">
                              <DropdownAction
                                handleEditClick={() => handleEditClick(item)}
                                handleDeleteClick={() => handleDeleteClick(item)}
                              ></DropdownAction>
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-slate-600"></div>
                      </>
                    }


                  </div>
                );
              })}
            </>
          )}

          {modalDetailOpen && (
            <AddDaftarKasusModal
              closeModal={() => setModalDetailOpen(false)}
              onSubmit={handleSubmitAdd}
              defaultValue={detailData}
              isDetail={true}
              token={token}
            />
          )}
          {modalEditOpen && (
            <AddDaftarKasusModal
              closeModal={handleCloseEditModal}
              onSubmit={handleSubmitEdit}
              defaultValue={editData}
              isEdit={true}
              token={token}
            />
          )}
          {modalAddOpen && (
            <AddDaftarKasusModal
              closeModal={handleCloseAddModal}
              onSubmit={handleSubmitAdd}
              token={token}
            />
          )}
          {modalDeleteOpen && (
            <DeleteDaftarKasusModal
              closeModal={handleCloseDeleteModal}
              onSubmit={handleSubmitDelete}
              defaultValue={deleteData}
            />
          )}
        </div>

        {data.length === 0 ? null : (
          <div className="mt-5">
            <div className='flex gap-4 items-center '>
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
