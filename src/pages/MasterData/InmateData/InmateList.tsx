import { NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  apiReadAllWBP,
  apiCreateWBP,
  apiUpdateWBP,
  apiDeleteAllWBP,
  apiReadAllKategoriJahat,
  apiReadAllHunian,
} from '../../../services/api';
import { AddInmateModal } from './ModalAddInmate';
import { Alerts } from './AlertInmate';
import { DeleteInmateModal } from './ModalDeleteInmate';
import Loader from '../../../common/Loader';
import SearchInputButton from '../Search';
import Pagination from '../../../components/Pagination';
import { HiDotsVertical, HiPencilAlt, HiOutlineTrash } from 'react-icons/hi';

import * as xlsx from 'xlsx';
// import ToolsTip from '../../../../components/ToolsTip';
import DropdownAction from '../../../components/DropdownAction';

const InmateList = () => {
  const [data, setData] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [alertIsAdded, setAlertIsAdded] = useState(false);
  const [alertIsEdited, setAlertIsEdited] = useState(false);
  const [alertIsDeleted, setAlertIsDeleted] = useState(false);

  const [alertFailed, setAlertFailed] = useState(false);
  const [failedMessage, setFailedMessage] = useState('');

  const [filter, setFilter] = useState('');
  const [filterPekara, setFilterPerkara] = useState('');
  const [filterHunian, setFilterHunian] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [rows, setRows] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [kategoriPerkara, setKategoriPerkara] = useState([]);
  const [hunian, setHunian]: any = useState([]);
  const [isOperator, setIsOperator] = useState<boolean>();
  const [modalDot, setModalDot] = useState(Array(data.length).fill(false));

  const tokenItem = localStorage.getItem('token');
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  const dataUserItem = localStorage.getItem('dataUser');
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  const handleDetailClick = (item: any) => {
    console.log(item, 'item item');
    setDetailData(item);
    setModalDetailOpen(true);
  };
  const handleEditClick = (item: any) => {
    console.log(item, 'ITEM EDIT');

    const newAksesRuangOtmil: any = [];
    item?.akses_ruangan_otmil.map((item: any) =>
      newAksesRuangOtmil.push(item?.ruangan_otmil_id)
    );

    const newEditItem: any = {
      wbp_profile_id: item?.wbp_profile_id,
      foto_wajah: item?.foto_wajah,
      nama: item?.nama,
      pangkat_id: item?.pangkat_id,
      matra_id: item?.matra_id,
      nrp: item?.nrp,
      alamat: item?.alamat,
      kesatuan_id: item?.kesatuan_id,
      nama_kontak_keluarga: item?.nama_kontak_keluarga,
      nomor_kontak_keluarga: item?.nomor_kontak_keluarga,
      hubungan_kontak_keluarga: item?.hubungan_kontak_keluarga,
      provinsi_id: item?.provinsi_id,
      nama_provinsi: item?.nama_provinsi,
      kota_id: item?.kota_id,
      nama_kota: item?.nama_kota,
      jenis_kelamin: item?.jenis_kelamin,
      agama_id: item?.agama_id,
      tanggal_lahir: item?.tanggal_lahir,
      tempat_lahir: item?.tempat_lahir,
      status_kawin_id: item?.status_kawin_id,
      pendidikan_id: item?.pendidikan_id,
      is_sick: item?.is_sick,
      wbp_sickness: item?.wbp_sickness,
      tanggal_ditahan_otmil: item?.tanggal_ditahan_otmil,
      bidang_keahlian_id: item?.bidang_keahlian_id,
      gelang_id: item?.gelang_id,
      DMAC: item?.DMAC,
      residivis: item?.residivis,
      hunian_wbp_otmil_id: item?.hunian_wbp_otmil_id,
      nomor_tahanan: item?.nomor_tahanan,
      is_isolated: item?.is_isolated,
      akses_ruangan_otmil_id: newAksesRuangOtmil,
      zona_merah: [],
      lokasi_otmil_id: item?.lokasi_otmil_id,
      is_deleted: '0',
      status_wbp_kasus_id: item?.status_wbp_kasus_id,
      tanggal_penetapan_tersangka: item?.tanggal_penetapan_tersangka,
      tanggal_penetapan_terdakwa: item?.tanggal_penetapan_terdakwa,
      tanggal_penetapan_terpidana: item?.tanggal_penetapan_terpidana,
    };

    console.log('NEW EDIT', newEditItem);
    setEditData(newEditItem);
    setModalEditOpen(true);
  };

  const handleDeleteClick = (item: any) => {
    console.log(item, 'item item');
    setDeleteData(item);
    setModalDeleteOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setModalDeleteOpen(false);
  };

  const handleCloseAddModal = () => {
    setModalAddOpen(false);
  };

  const handleCloseEditModal = () => {
    setModalEditOpen(false);
  };

  const handleSubmitDeleteUser = async (params: any) => {
    console.log(params, 'params submit delete');
    try {
      const responseDelete = await apiDeleteAllWBP(params, token);
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
          title: 'Gagal menghapus data',
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

  const handleSubmitAddUser = async (params: any) => {
    console.log(params, 'params submit add');

    try {
      const responseAdd = await apiCreateWBP(params, token);
      if (responseAdd.data.status === 'OK') {
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil membuat data',
        });

        setModalAddOpen(false);
        fetchData();
      } else if (responseAdd.data.status === 'NO') {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal membuat data',
        });
      } else {
        throw new Error(responseAdd.data.message);
      }

      // return true
    } catch (e: any) {
      const error = e.message;
      Alerts.fire({
        icon: 'error',
        title: error,
      });

      // return false
    }
  };

  const handleSubmitEditUser = async (params: any) => {
    console.log(params, 'params submit edit');
    try {
      const responseEdit = await apiUpdateWBP(params, token);
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

  //page
  const handleChangePageSize = async (e: any) => {
    const size = e.target.value;
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleChagePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchClick = async () => {
    try {
      let params = {
        filter: {
          nama: filter,
          // nama_kategori_perkara: filterPekara,
          nama_hunian_wbp_otmil: filterHunian,
        },
        pagination: {
          currentPage: currentPage,
          pageSize: pageSize,
        },
      };
      const responseRead = await apiReadAllWBP(params, token);
      if (responseRead.data.status === 'OK') {
        let temp = responseRead.data.records;
        temp.forEach((obj: any) => {
          obj.akses_ruangan_otmil_id = obj.akses_ruangan_otmil.map(
            (item: any) => item.ruangan_otmil_id
          );
        });
        setData(temp);
        setPages(responseRead.data.pagination.totalPages);
        setRows(responseRead.data.pagination.totalRecords);
      } else {
        throw new Error(responseRead.data.message);
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

  const handleFilterChange = async (e: any) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
  };

  const handleFilterChangePerkara = (e: any) => {
    const newFilter = e.target.value;
    setFilterPerkara(newFilter);
  };

  const handleFilterChangeHunian = (e: any) => {
    const newFilter = e.target.value;
    setFilterHunian(newFilter);
  };

  useEffect(() => {
    fetchData();
    hunianData();

    apiReadAllKategoriJahat()
      .then((res) => {
        setKategoriPerkara(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        })
      );
  }, [currentPage, pageSize]);

  useEffect(() => {
    // Menambahkan event listener untuk tombol "Enter" pada komponen ini
    document.addEventListener('keypress', handleEnterKeyPress);

    // Membersihkan event listener ketika komponen di-unmount
    return () => {
      document.removeEventListener('keypress', handleEnterKeyPress);
    };
  }, [filter, filterHunian, filterPekara]); // [] menandakan bahwa useEffect hanya akan dijalankan sekali saat komponen dimuat

  useEffect(() => {
    if (dataAdmin?.role_name === 'operator') {
      setIsOperator(true);
    } else {
      setIsOperator(false);
    }

    console.log(isOperator, 'Operator');
  }, [isOperator]);

  let fetchData = async () => {
    setIsLoading(true);
    try {
      let params = {
        pagination: {
          currentPage: currentPage,
          pageSize: pageSize,
        },
      };
      const responseRead = await apiReadAllWBP(params, token);
      if (responseRead.data.status === 'OK') {
        let temp = responseRead.data.records;
        temp.forEach((obj: any) => {
          obj.akses_ruangan_otmil_id = obj.akses_ruangan_otmil.map(
            (item: any) => item.ruangan_otmil_id
          );
        });
        setData(temp);
        setPages(responseRead.data.pagination.totalPages);
        setRows(responseRead.data.pagination.totalRecords);
        setIsLoading(false);
      } else if (responseRead.data.status === 'NO') {
        Alerts.fire({
          icon: 'error',
          title: 'Data tidak bisa dimuat',
        });
      } else {
        throw new Error(responseRead.data.message);
      }
    } catch (e: any) {
      const error = e.message;
      Alerts.fire({
        icon: 'error',
        title: error,
      });
    }
  };

  const hunianData = () => {
    apiReadAllHunian({
      params: {
        pageSize: 1000,
        page: 1,
        filter: {},
      },
    })
      .then((res) => {
        setHunian(res.data.records);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        })
      );
  };

  //untuk excel

  const exportToExcel = async () => {
    const dataToExcel = [
      [
        'Name',
        'Ruangan Tahanan',
        'Nomor DMAC Gelang',
        'Tanggal diTahan',
        // 'Kasus Perkara',
        'Alamat',
      ],
      ...data.map((item: any) => [
        item.nama,
        item.nama_hunian_wbp_otmil,
        item.DMAC,
        item.tanggal_ditahan_otmil,
        // item.nama_kategori_perkara,
        item.alamat,
      ]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'data.xlsx');
  };

  // const modalRefs = data.map(() => useRef(null));
  const toggleModal = (index: any) => {
    const newModalDots = [...modalDot];
    newModalDots[index] = !newModalDots[index]; // Mengubah status modal
    setModalDot(newModalDots);
  };

  const openModal = (index: any) => {
    const newModalDots = [...modalDot];
    newModalDots[index] = true;
    setModalDot(newModalDots);
  };

  const closeModal = (index: any) => {
    const newModalDots = [...modalDot];
    newModalDots[index] = false;
    setModalDot(newModalDots);
  };

  // useEffect(() => {
  //   function handleClickOutside(event:any, index:any) {
  //     if (modalRefs[index].current && !modalRefs[index].current.contains(event.target)) {
  //       closeModal(index);
  //     }
  //   }
  //   // Fungsi untuk menutup modal saat mengklik di luar modal
  //   // Menambahkan event listener untuk setiap modal
  //   modalDot.forEach((_, index) => {
  //     document.addEventListener('click', (event) => handleClickOutside(event, index));
  //   });

  //   // Membersihkan event listener saat komponen unmount
  //   return () => {
  //     modalDot.forEach((_, index) => {
  //       document.removeEventListener('click', (event) => handleClickOutside(event, index));
  //     });
  //   };
  // }, [modalRefs]);

  const [hoveredIndex, setHoveredIndex] = useState(false);

  const handleMouseEnter = () => {
    setHoveredIndex(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(false);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container py-[16px]">
      <div className="rounded-sm border  border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-center w-full">
          <div className="mb-4 flex gap-2 items-center border-[1px] border-slate-800 px-4 py-2 rounded-md">
            <div className="w-full">
              <SearchInputButton
                value={filter}
                placehorder="Cari nama binaan"
                onChange={handleFilterChange}
              />
            </div>
            {/* <select
            value={filterPekara}
            onChange={handleFilterChangePerkara}
            className="w-full rounded border border-stroke py-1 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
          >
            <option value="">Semua kasus</option>
            {kategoriPerkara.map((item: any) => (
              <option value={item.kategori_perkara}>
                {item.nama_kategori_perkara}
              </option>
            ))}
          </select> */}

            <select
              value={filterHunian}
              onChange={handleFilterChangeHunian}
              className="w-full rounded border border-stroke py-1 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
            >
              <option value="">Semua ruang</option>
              {hunian.map((item: any) => (
                <option value={item.hunian_wbp_otmil}>
                  {item.nama_hunian_wbp_otmil}
                </option>
              ))}
            </select>

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

        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Data Tersangka
          </h4>

          {!isOperator && (
            <button
              onClick={() => setModalAddOpen(true)}
              className=" text-black rounded-md font-semibold bg-blue-300 py-2 px-3"
            >
              Tambah
            </button>
          )}
        </div>

        <div className="">
          <div
            className={`rounded-t-md bg-gray-2 dark:bg-slate-600 text-center text-md ${isOperator ? 'grid grid-cols-4 ' : 'grid grid-cols-5 '
              }`}
          >
            <div className="p-2.5 xl:p-5">
              <h5 className=" font-medium uppercase ">Nama</h5>
            </div>

            <div className="p-2.5 xl:p-5">
              <h5 className="font-medium uppercase ">Ruang Tahanan</h5>
            </div>

            <div className="p-2.5 xl:p-5">
              <h5 className="font-medium uppercase ">Nomor DMAC Gelang</h5>
            </div>

            <div className="p-2.5 xl:p-5">
              <h5 className="font-medium uppercase ">Tanggal Ditahan</h5>
            </div>

            {/* <div className="p-2.5 xl:p-5">
            <h5 className="font-medium uppercase ">Kasus Perkara</h5>
          </div> */}

            {/* <div className="p-2.5 xl:p-5">
            <h5 className="font-medium uppercase ">Alamat</h5>
          </div> */}
            {!isOperator && (
              <div className="p-2.5 xl:p-5">
                <h5 className="font-medium uppercase ">Aksi</h5>
              </div>
            )}
          </div>

          {data.length == 0 ? (
            <div className="flex justify-center p-4 w-ful">No Data</div>
          ) : (
            <>
              {data.map((item: any, index) => {
                return (
                  <div>
                    <div
                      className={` rounded-sm bg-gray-2 dark:bg-meta-4  text-md ${isOperator ? 'grid grid-cols-4' : 'grid grid-cols-5'
                        }`}
                    >
                      <div
                        onClick={() => handleDetailClick(item)}
                        className="fp-2.5 xl:p-5 justify-center flex "
                      >
                        <p className="hidden text-black dark:text-white sm:block truncate">
                          {item.nama}
                        </p>
                      </div>

                      <div
                        onClick={() => handleDetailClick(item)}
                        className="p-2.5 xl:p-5 justify-center flex  "
                      >
                        <p className="text-black dark:text-white truncate cursor-pointer">
                          {item.nama_hunian_wbp_otmil}
                        </p>
                      </div>

                      <div
                        onClick={() => handleDetailClick(item)}
                        className="p-2.5 sm:flex xl:p-5 justify-center flex t"
                      >
                        <p className="text-black dark:text-white truncate cursor-pointer">
                          {item.DMAC}
                        </p>
                      </div>

                      <div
                        onClick={() => handleDetailClick(item)}
                        className="p-2.5 sm:flex xl:p-5 justify-center flex  "
                      >
                        <p className="text-black dark:text-white truncate cursor-pointer">
                          {item.tanggal_ditahan_otmil}
                        </p>
                      </div>

                      {/* <div
                      onClick={() => handleDetailClick(item)}
                      className="p-2.5 sm:flex xl:p-5 justify-center flex "
                    >
                      <p className="text-black dark:text-white capitalize">
                        {item.nama_kategori_perkara}
                      </p>
                    </div>

                    <div
                      onClick={() => handleDetailClick(item)}
                      className="p-2.5  xl:p-5 justify-center flex  "
                    >
                      <p className="text-black dark:text-white max-w-sm truncate cursor-pointer">
                        {item.alamat}
                      </p>
                    </div> */}

                      {!isOperator && (
                        <div
                          key={index}
                          className="relative items-center justify-center p-1.5 flex flex-wrap lg:flex-nowrap gap-1 text-md"
                        >
                          {/* <ToolsTip text="Ubah">
                            <button
                              onClick={() => handleEditClick(item)}
                              className="py-1 px-2 rounded-md action-button-bg-edit"
                            >
                              <HiPencilAlt className="w-5 h-5" />
                            </button>
                          </ToolsTip>

                          <ToolsTip text="Hapus">
                            <button
                              onClick={() => handleDeleteClick(item)}
                              className="py-1 px-2  rounded-md action-button-bg-del"
                            >
                              <HiOutlineTrash className="w-5 h-5" />
                            </button>
                          </ToolsTip> */}
                          <div className='relative'>

                            {/* <button onClick={() => toggleModal(index)}>
                            <HiDotsVertical></HiDotsVertical>
                          </button> */}
                            {/* <div
                            className={`bg-boxdark rounded-lg border-1 border border-slate-600 text-white text-left px-2 py-2 absolute right-0 flex flex-col gap-2 ${
                              modalDot[index] ? 'block' : 'hidden'
                            }`}
                          >
                            <button
                              onClick={() => handleEditClick(item)}
                              className="py-1 px-2 text-white rounded-md bg-blue-500"
                            >
                              Ubah
                            </button>
                            <button
                              onClick={() => handleDeleteClick(item)}
                              className="py-1 px-2 text-white rounded-md bg-red-500"
                            >
                              Hapus
                            </button>
                          </div> */}
                            <DropdownAction handleEditClick={() => handleEditClick(item)} handleDeleteClick={() => handleDeleteClick(item)}></DropdownAction>
                          </div>

                        </div>
                      )}
                    </div>
                    <div className="border-t border-slate-600"></div>
                  </div>
                );
              })}
            </>
          )}

          {modalDetailOpen && (
            <AddInmateModal
              closeModal={() => setModalDetailOpen(false)}
              onSubmit={handleSubmitAddUser}
              defaultValue={detailData}
              isDetail={true}
              token={token}
              dataWbp={data}
            />
          )}
          {modalEditOpen && (
            <AddInmateModal
              closeModal={handleCloseEditModal}
              onSubmit={handleSubmitEditUser}
              defaultValue={editData}
              isEdit={true}
              token={token}
              dataWbp={data}
            />
          )}
          {modalAddOpen && (
            <AddInmateModal
              closeModal={handleCloseAddModal}
              onSubmit={handleSubmitAddUser}
              token={token}
              dataWbp={data}
            />
          )}
          {modalDeleteOpen && (
            <DeleteInmateModal
              closeModal={handleCloseDeleteModal}
              onSubmit={handleSubmitDeleteUser}
              defaultValue={deleteData}
            />
          )}
          {/* {alertIsAdded && (
          <Alerts
            alertType="success"
            alertMessage="Added"
            alertDescription="Successfully added data"
          />
        )}

        {alertIsEdited && (
          <Alerts
            alertType="success"
            alertMessage="Edited"
            alertDescription="Successfully edited data"
          />
        )}
        {alertIsDeleted && (
          <Alerts
            alertType="success"
            alertMessage="Deleted"
            alertDescription="Successfully Deleted data"
          />
        )}
        {alertFailed && (
          <Alerts
            alertType="failed"
            alertMessage="Failed"
            alertDescription={failedMessage}
          />
        )} */}
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

export default InmateList;
