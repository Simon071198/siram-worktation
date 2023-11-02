import React, { useEffect, useState } from 'react';
import Loader from '../../../common/Loader/index';
import { Alerts } from './AlertRoom';
import { AddRoomModal } from './ModalAddRoom';
import { DeleteRoomModal } from './ModalDeleteRoom';
import SearchInputButton from '../Search';
import Pagination from '../../../components/Pagination/index';
import {
  apiCreateAllRuanganOtmil,
  apiDeleteAllRuangan,
  apiReadAllRuanganOtmil,
  apiUpdateAllRuanganOtmil,
} from '../../../services/api';

// Interface untuk objek 'params' dan 'item'
interface Params {
  filter: string;
}

interface Item {
  ruangan_otmil_id: any;
  nama_ruangan_otmil: string;
  jenis_ruangan_otmil: any;
  zona_id: any;
  nama_zona: any;
  lokasi_otmil_id: any;
  nama_lokasi_otmil: any;
}

const RoomList = () => {
  //get Token
  const token = localStorage.getItem('token');

  // useState untuk menampung data dari API
  const [data, setData] = useState<Item[]>([]);
  const [detailData, setDetailData] = useState<Item | null>(null);
  const [editData, setEditData] = useState<Item | null>(null);
  const [deleteData, setDeleteData] = useState({
    ruangan_otmil_id: '',
  });
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    nama_ruangan_otmil: '',
    jenis_ruangan_otmil: '',
  });
  const [edit, setEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [rows, setRows] = useState(0);

  const handleFilterChange = async (e: any) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));

    try {
      if (filter.jenis_ruangan_otmil !== '' || filter.nama_ruangan_otmil !== '') {
        const response = await apiReadAllRuanganOtmil({
          token: token,
          params: {
            filter: { ...filter, [name]: value },
            pageSize: 10,
          },
          
        });
        console.log(response);
        if (response.data.status === 'OK') {
          const result = response.data;
          setData(result.records);
          setPages(response.data.pagination.totalPages);
          setRows(response.data.pagination.totalRecords);
        } else {
          throw new Error('Terjadi kesalahan saat mencari data.');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
console.log(filter);

  const handleChagePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
    setFilter({ ...filter, jenis_ruangan_otmil: '', nama_ruangan_otmil: '' });
  };

  const fetchData = async () => {
    let data = {
      token: token,
      params: {
        page: currentPage,
        pageSize: 10,
      },
    };
    setIsLoading(true);
    try {
      const response = await apiReadAllRuanganOtmil(data);
      if (response.data.status !== 'OK') {
        throw new Error(response.data.message);
      }
      const result = response.data.records;
      setData(result);
      setPages(response.data.pagination.totalPages);
      setRows(response.data.pagination.totalRecords);
      setIsLoading(false);
    } catch (error) {
      Alerts.fire({
        icon: 'error',
        title: 'Gagal memuat data',
      });
    }
  };

  // useEffect untuk fetch data dari API
  useEffect(() => {
    fetchData();
  }, [currentPage, edit]); // Anda juga dapat menambahkan dependencies jika diperlukan

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

  // function untuk menampilkan modal delete
  const handleDeleteClick = (item: any) => {
    setDeleteData({ ruangan_otmil_id: item });
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
  const handleSubmitDeleteRuangan = (params: Params) => {
    const data = {
      token:token,
      params:params
    }
    apiDeleteAllRuangan(data).then((res) => {
      if (res.data.status === 'OK') {
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menghapus data',
        });
        setModalDeleteOpen(false);
        setData(res.data.records);
        handleCloseAddModal(); //tutup modal
        currentPage === 1 ? fetchData() : setCurrentPage(1);
      } else {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal menghapus data',
        });
      }
    });

    setModalDeleteOpen(false);
  };

  // function untuk menambah data
  const handleSubmitAddRuangan = async (params: Params) => {
    const data = {
      token:token,
      params:params
    }
    apiCreateAllRuanganOtmil(data).then((res) => {
      if (res.data.status === 'OK') {
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menambah data',
        });
        setData(res.data.records);
        handleCloseAddModal(); //tutup modal
        currentPage === 1 ? fetchData() : setCurrentPage(1);
      } else {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal menambah data',
        });
        handleCloseAddModal(); //tutup modal
      }
    });
  };

  // function untuk mengubah data
  const handleSubmitEditRuangan = async (params: Params) => {
    const data = {
      token:token,
      params:params
    }
    apiUpdateAllRuanganOtmil(data).then((res) => {
      if (res.data.status === 'OK') {
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil mengubah data',
        });
        setModalDeleteOpen(false);
        setEdit(!edit);
        // setData(res.data.records);
        handleCloseEditModal(); //tutup modal
      } else {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal mengubah data',
        });
      }
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container py-[16px]">
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="w-full flex justify-center">
        <div className="mb-3 flex items-center justify-center rounded space-x-1 bg-slate-600 py-1 w-2/5">
          <SearchInputButton
            name="nama_ruangan_otmil"
            value={filter.nama_ruangan_otmil}
            placehorder="Cari Ruangan"
            onChange={handleFilterChange}
            // onClick={handleSearchClick}
          />
          <select
            className="w-3/6 text-sm rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-1 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            name="jenis_ruangan_otmil"
            value={filter.jenis_ruangan_otmil}
            onChange={handleFilterChange}
          >
            <option value="">Semua Ruangan</option>
            <option value="Fasilitas Kegiatan">Fasilitas Kegiatan</option>
            <option value="Ruang Ibadah">Ruang Ibadah</option>
            <option value="Kantor">Kantor</option>
            <option value="Kamar">Kamar</option>
          </select>
          {/* <button
            className=" rounded-sm bg-blue-300 px-6 py-1 text-xl text-black font-bold "
            type="button"
            id="button-addon1"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={handleSearchClick}
          >
            <CiSearch />
          </button> */}
        </div>
      </div>
      <div className="flex justify-between mb-3">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Data Ruangan
        </h4>
        <button
          onClick={() => setModalAddOpen(true)}
          className="text-black rounded-md font-semibold bg-blue-300 py-2 px-3"
        >
          Tambah
        </button>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-5 rounded-t-md bg-gray-2 dark:bg-slate-600 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nama Ruangan
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Jenis Ruangan
            </h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Zona
            </h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Lokasi
            </h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Aksi
            </h5>
          </div>
        </div>
        {data.map((item: any) => {
          let backgroundZona = '';
          if (item.nama_zona === 'Merah') {
            backgroundZona = 'text-red-400';
          } else if (item.nama_zona === 'Kuning') {
            backgroundZona = 'text-yellow-400';
          } else {
            backgroundZona = 'text-green-400';
          }
          return (
            <div>
              <div
                className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5 "
                key={item.nama_ruangan_otmil}
              >
                <div className="flex items-center gap-4 p-2.5 xl:p-5">
                  <p className="hidden text-black dark:text-white sm:block capitalize">
                    {item.nama_ruangan_otmil}
                  </p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-white capitalize">
                    {item.jenis_ruangan_otmil}
                  </p>
                </div>
                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className={`${backgroundZona} capitalize`}>
                    {item.nama_zona}
                  </p>
                </div>
                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white capitalize">
                    {item.nama_lokasi_otmil}
                  </p>
                </div>
                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 flex gap-2">
                  <button
                    onClick={() => handleDetailClick(item)}
                    className="py-1 px-2 text-black rounded-md bg-blue-300"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => handleEditClick(item)}
                    className="py-1 px-2 text-black rounded-md bg-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item.ruangan_otmil_id)}
                    className="py-1 px-2 text-white rounded-md bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="border-t border-slate-600"></div>
            </div>
          );
        })}
        {modalDetailOpen && (
          <AddRoomModal
            closeModal={() => setModalDetailOpen(false)}
            onSubmit={handleSubmitAddRuangan}
            defaultValue={detailData}
            isDetail={true}
          />
        )}
        {modalEditOpen && (
          <AddRoomModal
            closeModal={handleCloseEditModal}
            onSubmit={handleSubmitEditRuangan}
            defaultValue={editData}
            isEdit={true}
          />
        )}
        {modalAddOpen && (
          <AddRoomModal
            closeModal={handleCloseAddModal}
            onSubmit={handleSubmitAddRuangan}
          />
        )}
        {modalDeleteOpen && (
          <DeleteRoomModal
            closeModal={handleCloseDeleteModal}
            onSubmit={handleSubmitDeleteRuangan}
            defaultValue={deleteData}
          />
        )}
      </div>
      <p>
        Total Rows: {rows} Page: {rows ? currentPage : null} of {pages}
      </p>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={pages}
          onChangePage={handleChagePage}
        />
      </div>
    </div>
    </div>
  );
};

export default RoomList;
