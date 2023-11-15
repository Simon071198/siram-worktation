import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  apiChangePassword,
  apiCreateUser,
  apiEditUser,
  apiNewDeleteUser,
  apiReadAllUser,
  apiSidangDelete,
  apiSidangInsert,
  apiSidangRead,
  apiSidangUpdate,
} from '../../services/api';
import { AddSidangModal } from './ModalAddSidang';
import { Alerts } from './AlertSidang';
import Loader from '../../common/Loader';
import Pagination from '../../components/Pagination';
import { DeleteSidangModal } from './ModalDeleteSidang';
import * as xlsx from 'xlsx';
import DropdownAction from '../../components/DropdownAction';

const tokenItem = localStorage.getItem('token');
const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
const token = dataToken.token;

const SidangList = () => {
  const [data, setData] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [ubahPasswordData, setUbahPasswordData] = useState([]);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalUbahPasswordOpen, setModalUbahPasswordOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [alertIsAdded, setAlertIsAdded] = useState(false);
  const [alertIsEdited, setAlertIsEdited] = useState(false);
  const [alertIsDeleted, setAlertIsDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);

  const handleChagePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const handleDetailClick = (item: any) => {
    console.log(item, 'detail item');
    const newArrayJaksa: any = [];
    const newArrayAhli: any = [];
    const newArraySaksi: any = [];
    const newArrayPengacara: any = [];
    const newArrayHakim: any = [];
    item?.sidang_jaksa.map((item: any) =>
      newArrayJaksa.push({
        jaksa_penuntut_id: item?.jaksa_penuntut_id,
        nama_jaksa: item?.nama_jaksa,
      })
    );

    item?.sidang_ahli.map((item: any) =>
      newArrayAhli.push({
        ahli_id: item?.ahli_id,
        nama_ahli: item?.nama_ahli,
        bidang_ahli: item?.bidang_ahli,
      })
    );

    item?.sidang_saksi.map((item: any) =>
      newArraySaksi.push({
        saksi_id: item?.saksi_id,
        nama_saksi: item?.nama_saksi,
      })
    );

    item?.sidang_hakim.map((item: any) =>
      newArrayHakim.push({
        hakim_id: item?.hakim_id,
        nama_hakim: item?.nama_hakim,
      })
    );

    const hakimKetua = item?.sidang_hakim.find(
      (item: any) => item.ketua_hakim === '1'
    );
    const jaksaKetua = item?.sidang_jaksa.find(
      (item: any) => item.ketua_jaksa === '1'
    );

    const detailItem: any = {
      sidang_id: item?.sidang_id,
      waktu_mulai_sidang: item?.waktu_mulai_sidang,
      waktu_selesai_sidang: item?.waktu_selesai_sidang,
      jadwal_sidang: item?.jadwal_sidang,
      perubahan_jadwal_sidang: item?.perubahan_jadwal_sidang,
      kasus_id: item?.kasus_id,
      masa_tahanan_tahun: item?.masa_tahanan_tahun,
      masa_tahanan_bulan: item?.masa_tahanan_bulan,
      masa_tahanan_hari: item?.masa_tahanan_hari,
      nama_sidang: item?.nama_sidang,
      juru_sita: item?.juru_sita,
      pengawas_peradilan_militer: item?.pengawas_peradilan_militer,
      jenis_persidangan_id: item?.jenis_persidangan_id,
      pengadilan_militer_id: item?.pengadilan_militer_id,
      nama_dokumen_persidangan: item?.nama_dokumen_persidangan,
      hasil_vonis: item?.hasil_vonis,
      ahliHolder: newArrayAhli,
      agenda_sidang: item?.agenda_sidang,
      saksiHolder: newArraySaksi,
      pengacaraHolder: item?.sidang_pengacara,
      hakimHolder: newArrayHakim,
      jaksaHolder: newArrayJaksa,
      role_ketua_hakim_holder: {
        hakim_id: hakimKetua.hakim_id,
        nama_hakim: hakimKetua.nama_hakim,
      },
      role_ketua_jaksa_holder: {
        jaksa_penuntut_id: jaksaKetua.jaksa_penuntut_id,
        nama_jaksa: jaksaKetua.nama_jaksa,
      },
      link_dokumen_persidangan: item.link_dokumen_persidangan,
    };
    console.log('NEW ITEM DETAIl', detailItem);
    setDetailData(detailItem);
    setModalDetailOpen(true);
  };

  const handleEditClick = (item: any) => {
    console.log(item, 'item item');
    const newArrayJaksa: any = [];
    const newArrayAhli: any = [];
    const newArraySaksi: any = [];
    const newArrayPengacara: any = [];
    const newArrayHakim: any = [];
    item?.sidang_jaksa.map((item: any) =>
      newArrayJaksa.push({
        jaksa_penuntut_id: item?.jaksa_penuntut_id,
        nama_jaksa: item?.nama_jaksa,
      })
    );

    item?.sidang_ahli.map((item: any) =>
      newArrayAhli.push({
        ahli_id: item?.ahli_id,
        nama_ahli: item?.nama_ahli,
        bidang_ahli: item?.bidang_ahli,
      })
    );

    item?.sidang_saksi.map((item: any) =>
      newArraySaksi.push({
        saksi_id: item?.saksi_id,
        nama_saksi: item?.nama_saksi,
      })
    );

    // item?.sidang_pengacara.map((item: any) =>
    //   newArrayPengacara.push({nama_pengacara:item?.nama_pengacara})
    // );

    item?.sidang_hakim.map((item: any) =>
      newArrayHakim.push({
        hakim_id: item?.hakim_id,
        nama_hakim: item?.nama_hakim,
      })
    );

    const hakimKetua = item?.sidang_hakim.find(
      (item: any) => item.ketua_hakim === '1'
    );
    const jaksaKetua = item?.sidang_jaksa.find(
      (item: any) => item.ketua_jaksa === '1'
    );
    console.log('HAKIM KETUA', hakimKetua);

    // console.log('NEW ARRAY',newArrayJaksa)

    const editItem: any = {
      sidang_id: item?.sidang_id,
      waktu_mulai_sidang: item?.waktu_mulai_sidang,
      waktu_selesai_sidang: item?.waktu_selesai_sidang,
      jadwal_sidang: item?.jadwal_sidang,
      perubahan_jadwal_sidang: item?.perubahan_jadwal_sidang,
      kasus_id: item?.kasus_id,
      masa_tahanan_tahun: item?.masa_tahanan_tahun,
      masa_tahanan_bulan: item?.masa_tahanan_bulan,
      masa_tahanan_hari: item?.masa_tahanan_hari,
      nama_sidang: item?.nama_sidang,
      juru_sita: item?.juru_sita,
      pengawas_peradilan_militer: item?.pengawas_peradilan_militer,
      jenis_persidangan_id: item?.jenis_persidangan_id,
      pengadilan_militer_id: item?.pengadilan_militer_id,
      nama_dokumen_persidangan: item?.nama_dokumen_persidangan,
      // pdf_file_base64:item?.pdf_file_base64,
      hasil_vonis: item?.hasil_vonis,
      ahliHolder: newArrayAhli,
      agenda_sidang: item?.agenda_sidang,
      saksiHolder: newArraySaksi,
      pengacaraHolder: item?.sidang_pengacara,
      hakimHolder: newArrayHakim,
      jaksaHolder: newArrayJaksa,
      // hakim_id:[],
      role_ketua_hakim_holder: {
        hakim_id: hakimKetua.hakim_id,
        nama_hakim: hakimKetua.nama_hakim,
      },
      role_ketua_jaksa_holder: {
        jaksa_penuntut_id: jaksaKetua.jaksa_penuntut_id,
        nama_jaksa: jaksaKetua.nama_jaksa,
      },
      link_dokumen_persidangan: item.link_dokumen_persidangan,
    };
    console.log('NEW ITEM EDIT', editItem);
    setEditData(editItem);
    setModalEditOpen(true);
  };

  const handleCloseAddModal = () => {
    setModalAddOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setModalDeleteOpen(false);
  };

  const handleDeleteClick = (item: any) => {
    setDeleteData(item);
    setModalDeleteOpen(true);
  };

  const handleSubmitAddUser = async (params: any) => {
    console.log(params, 'params submit add');
    try {
      const responseCreate = await apiSidangInsert(params, token);
      if (responseCreate.data.status === 'OK') {
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menambah data',
        });
        setModalAddOpen(false);
        fetchData();
      } else if (responseCreate.data.status === 'error') {
        const errorCreate = responseCreate.data.message;
        Alerts.fire({
          icon: 'error',
          title: errorCreate,
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

  const handleSubmitEditUser = async (params: any) => {
    console.log(params, 'params submit edit');
    try {
      const responseEdit = await apiSidangUpdate(params, token);
      if (responseEdit.data.status === 'OK') {
        console.log('edit succes');
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil mengubah data',
        });
        setModalEditOpen(false);

        fetchData();
      } else if (responseEdit.data.status === 'error') {
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

  const handleSubmitDeleteDataPetugas = async (params: any) => {
    console.log('DELETE', params);
    try {
      const responseDelete = await apiSidangDelete(params, token);
      if (responseDelete.data.status === 'OK') {
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menghapus data',
        });
        setModalDeleteOpen(false);
        fetchData();
      } else if (responseDelete.data.status === 'error') {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal Delete Data',
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

  const handleCloseEditModal = () => {
    setModalEditOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    setIsLoading(true);
    let params = {
      filter: '',
      currentPage: currentPage,
      pageSize: 10,
    };
    try {
      const response = await apiSidangRead(params);
      if (response.data.status === 'OK') {
        setData(response.data.records);
        setPages(response.data.pagination.totalPages);
        setRows(response.data.pagination.totalRecords);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e: any) {
      const error = e.message;
      Alerts.fire({
        icon: 'error',
        title: error,
      });
    }
    setIsLoading(false);
  };

  const exportToExcel = async () => {
    const dataToExcel = [
      [
        'Name',
        'Ruangan Tahanan',
        'Nomor DMAC Gelang',
        'Tanggal diTahan',
        'Kasus Perkara',
        'Alamat',
      ],
      ...data.map((item: any) => [
        // item.nama,
        // item.nama_hunian_wbp_otmil,
        // item.DMAC,
        // item.tanggal_ditahan_otmil,
        // item.nama_kategori_perkara,
        // item.alamat,
      ]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'data.xlsx');
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className='container py-[16px]'>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-center w-full">
          <div className="mb-4 flex gap-2 items-center border-[1px] border-slate-800 px-4 py-2 rounded-md">
            <div className="w-full">
              {/* <SearchInputButton
              value=''
              placehorder="Cari nama binaan"
              onChange={}
            /> */}
            </div>

            <select
              // value={filterHunian}
              // onChange={handleFilterChangeHunian}
              className=" rounded border border-stroke py-1 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
            >
              <option value="">Semua perkara</option>
              {/* {hunian.map((item: any) => (
              <option value={item.hunian_wbp_otmil}>
                {item.nama_hunian_wbp_otmil}
              </option>
            ))} */}
            </select>

            <button
              className=" rounded-sm bg-blue-300 px-6 py-1 text-xs font-medium "
              type="button"
              // onClick={handleSearchClick}
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
        <div className="flex justify-between">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Data Daftar Sidang
          </h4>
          <button
            onClick={() => setModalAddOpen(true)}
            className=" text-black rounded-md bg-blue-300 w-20 h-10"
          >
            Tambah
          </button>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-6 text-center  rounded-t-md bg-gray-2 dark:bg-slate-600 ">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nama WBP
              </h5>
            </div>

            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Jenis Sidang
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Jadwal Sidang
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Ketua Hakim
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Ketua Jaksa
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 ">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Aksi
              </h5>
            </div>
          </div>

          {data.length == 0 ? (
            <div className="flex justify-center p-4 w-ful">No Data</div>
          ) : (
            <>
              {data.map((item: any) => {
                return (
                  <div>
                    <div className="grid grid-cols-6 rounded-sm  bg-gray-2 dark:bg-meta-4  ">
                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer"
                      >
                        <p className="hidden text-black dark:text-white sm:block">
                          {item.nama_wbp}
                        </p>
                      </div>

                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer truncate"
                      >
                        <p className="hidden text-black dark:text-white sm:block">
                          {item.nama_jenis_persidangan}
                        </p>
                      </div>

                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer"
                      >
                        <p className="hidden text-black dark:text-white sm:block">
                          {item.jadwal_sidang}
                        </p>
                      </div>
                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer capitalize"
                      >
                        <p className="hidden text-black dark:text-white sm:block">
                          {item?.sidang_hakim.find(
                            (item: any) => item.ketua_hakim === '1'
                          ).nama_hakim}
                        </p>
                      </div>
                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer capitalize"
                      >
                        <p className="hidden text-black dark:text-white sm:block">
                          <p className="hidden text-black dark:text-white sm:block">
                            {item?.sidang_jaksa.find(
                              (item: any) => item.ketua_jaksa === '1'
                            ).nama_jaksa}
                          </p>
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-2 p-2.5 xl:p-5">
                        {/* <button
                        onClick={() => handleEditClick(item)}
                        className="py-1 px-2  text-black rounded-md bg-blue-300"
                      >
                        Ubah
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="py-1  px-2 text-white rounded-md bg-red-400"
                      >
                        Hapus
                      </button> */}
                        <div className="relative">
                          <DropdownAction
                            handleEditClick={() => handleEditClick(item)}
                            handleDeleteClick={() => handleDeleteClick(item)}
                          ></DropdownAction>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-slate-600"></div>
                  </div>
                );
              })}
            </>
          )}

          {modalDetailOpen && (
            <AddSidangModal
              closeModal={() => setModalDetailOpen(false)}
              onSubmit={handleSubmitAddUser}
              defaultValue={detailData}
              isDetail={true}
              token={token}
            />
          )}
          {modalEditOpen && (
            <AddSidangModal
              closeModal={handleCloseEditModal}
              onSubmit={handleSubmitEditUser}
              defaultValue={editData}
              isEdit={true}
              token={token}
            />
          )}
          {modalAddOpen && (
            <AddSidangModal
              closeModal={handleCloseAddModal}
              onSubmit={handleSubmitAddUser}
              token={token}
            />
          )}
          {modalDeleteOpen && (
            <DeleteSidangModal
              closeModal={handleCloseDeleteModal}
              onSubmit={handleSubmitDeleteDataPetugas}
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
        )} */}
        </div>

        {data.length === 0 ? null : (
          <div className="mt-5">
            <p>
              Total Rows: {rows} Page: {rows ? currentPage : null} of {pages}
            </p>
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

export default SidangList;
