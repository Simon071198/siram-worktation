import { useEffect, useState } from 'react';
import Loader from '../../../common/Loader/index';
import { AddKategoriPerkaraModal } from './ModalAddKategoriPerkara';
import { DeleteKategoriPerkaraTypeModal } from './ModalDeleteKategoriPerkara';
import { Alerts } from './AlertKategoriPerkara';
import {
  apiReadKategoriPerkara,
  apiDeleteKategoriPerkara,
  apiCreateKategoriPerkara,
  apiUpdateKategoriPerkara
} from '../../../services/api';
import Pagination from '../../../components/Pagination/index';
import SearchInputButton from '../Search';
import * as xlsx from 'xlsx';

// Interface untuk objek 'params' dan 'item'
interface Params {
  filter: string;
  token: any;
}

interface Item {
  nama_kategori_perkara : string;
}

const KategoriPerkaraList = () => {
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
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [dataExcel, setDataExcel] = useState([]);


  const handleFilterChange = async (e: any) => {
    const newFilter = e.target.value;
    setFilter(newFilter);

    // try {
    //   const response = await apiReadKategoriPerkara({ filter: { nama_kategori_perkara: newFilter } });
    //   setPages(response.data.pagination.totalPages);
    //   setRows(response.data.pagination.totalRecords);
    //   if (response.data.status === 'OK') {
    //     const result = response.data;
    //     setData(result.records);
    //   } else {
    //     throw new Error('Terjadi kesalahan saat mencari data.');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleSearchClick = async () => {
    try {
      const response = await apiReadKategoriPerkara({
        filter: { nama_kategori_perkara: filter },
      });
      setPages(response.data.pagination.totalPages);
      setRows(response.data.pagination.totalRecords);
      if (response.status === 200) {
        const result = response.data;
        setData(result.records);
      } else {
        throw new Error('Terjadi kesalahan saat mencari data.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnterKeyPress = (event:any) => {
    if (event.key === 'Enter') {
      handleSearchClick();
      console.log('ENTER DIPNCET')
    }
  };

  const handleChagePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  }

  // useEffect untuk fetch data dari API
  useEffect(() => {
    fetchData();
  }, [currentPage]); // Anda juga dapat menambahkan dependencies jika diperlukan
  
  const fetchData = async () => {
    let param = {
      filter: ' ',
      page: currentPage,
      pageSize: 10,
    };
    setIsLoading(true);
    try {
      const response = await apiReadKategoriPerkara(param);
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

  const token = localStorage.getItem('token')
  // function untuk menghapus data
  const handleSubmitDeleteKategotiPerkara = (params: Params) => {
    const fetchParams = {
      params: params,
      token: token,
    };
    apiDeleteKategoriPerkara(fetchParams).then((res) => {
      if (res.data.status === 'OK') {
        setModalDeleteOpen(false);
        apiReadKategoriPerkara(fetchParams).then((res) => {
          setData(res.data.records);
          setPages(res.data.pagination.totalPages);
        setRows(res.data.pagination.totalRecords);
          Alerts.fire({
            icon: 'success',
            title: 'Berhasil menghapus data',
          });
        });
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
  const handleSubmitAddKategotiPerkara = async (params: Params) => {
    const fetchParams = {
      params:params,
      filter : '',
      token: token,
    };
    apiCreateKategoriPerkara(fetchParams).then((res) => {
      if (res.data.status === 'OK') {
        setModalDeleteOpen(false);
        apiReadKategoriPerkara(fetchParams).then((res) => {
          setData(res.data.records);
          setPages(res.data.pagination.totalPages);
        setRows(res.data.pagination.totalRecords);
          Alerts.fire({
            icon: 'success',
            title: 'Berhasil menambah data',
          });
          //atur mau tetap buka modal atau tidak
          handleCloseAddModal(); //tutup modal
        });
      } else {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal menambah data',
        });
        handleCloseAddModal(); //tutup modal
      }
    });

    setModalDeleteOpen(false);
  };

  // function untuk mengubah data
  const handleSubmitEditKategotiPerkara = async (params: Params) => {
    const fetchParams = {
      params:params,
      token: token,
    };
    apiUpdateKategoriPerkara(fetchParams).then((res) => {
      if (res.data.status === 'OK') {
        setModalDeleteOpen(false);
        apiReadKategoriPerkara(fetchParams).then((res) => {
          setData(res.data.records);
          setPages(res.data.pagination.totalPages);
        setRows(res.data.pagination.totalRecords);
          handleCloseEditModal(); //tutup modal
        });
      } else {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal mengubah data',
        });
      }
    });

    setModalDeleteOpen(false);
    Alerts.fire({
      icon: 'success',
      title: 'Berhasil mengubah data',
    });
  };

  const exportToExcel = async () => {
  
    const dataToExcel = [
      ['Name', 'Ruangan Tahanan', 'Nomor DMAC Gelang' , 'Tanggal diTahan' , 'Kasus Perkara' , 'Alamat'],
      ...dataExcel.map((item:any) => [item.nama, item.nama_hunian_wbp_otmil, item.DMAC , item.tanggal_ditahan_otmil, item.nama_kategori_perkara, item.alamat]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'data.xlsx');
  };

  useEffect(() => {
    // Menambahkan event listener untuk tombol "Enter" pada komponen ini
    document.addEventListener('keypress', handleEnterKeyPress);

    // Membersihkan event listener ketika komponen di-unmount
    return () => {
      document.removeEventListener('keypress', handleEnterKeyPress);
    };
  }, [filter]); // [] menandakan bahwa useEffect hanya akan dijalankan sekali saat komponen dimuat


  return isLoading ? (
    <Loader />
  ) : (
    <div className="container py-[16px]">
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-center w-full">
        <div className="mb-4 flex gap-2 items-center border-[1px] border-slate-800 px-4 py-2 rounded-md">
          <div className="w-full">
            <SearchInputButton
              value={filter}
              placehorder="Cari nama"
              onChange={handleFilterChange}
         
              // onClick={handleSearchClick}
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
          className="text-white rounded-sm bg-blue-500 px-10 py-1 text-sm font-medium">
            Export&nbsp;Excel
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-3">
        <h4 className="ext-xl font-semibold text-black dark:text-white">
          Data Kategori Perkara
        </h4>
        <button
          onClick={() => setModalAddOpen(true)}
          className=" text-black rounded-md font-semibold bg-blue-300 py-2 px-3"
        >
          Tambah
        </button>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-2 rounded-t-md bg-gray-2 dark:bg-slate-600 sm:grid-cols-2   ">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nama Kategori Perkara
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Aksi
            </h5>
          </div>
        </div>

        {data.map((item: any) => {
          return (
            <div>
              <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">
                    {item.nama_kategori_perkara}
                  </p>
                </div>
                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 flex-wrap lg:flex-nowrap gap-2">
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
                    onClick={() => handleDeleteClick(item)}
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
          <AddKategoriPerkaraModal
            closeModal={() => setModalDetailOpen(false)}
            onSubmit={handleSubmitAddKategotiPerkara}
            defaultValue={detailData}
            isDetail={true}
          />
        )}
        {modalEditOpen && (
          <AddKategoriPerkaraModal
            closeModal={handleCloseEditModal}
            onSubmit={handleSubmitEditKategotiPerkara}
            defaultValue={editData}
            isEdit={true}
          />
        )}
        {modalAddOpen && (
          <AddKategoriPerkaraModal
            closeModal={handleCloseAddModal}
            onSubmit={handleSubmitAddKategotiPerkara}
          />
        )}
        {modalDeleteOpen && (
          <DeleteKategoriPerkaraTypeModal
            closeModal={handleCloseDeleteModal}
            onSubmit={handleSubmitDeleteKategotiPerkara}
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

export default KategoriPerkaraList;
