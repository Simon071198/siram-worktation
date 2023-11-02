import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  apiChangePassword,
  apiCreateUser,
  apiEditUser,
  apiNewDeleteUser,
  apiReadAllUser,
} from '../../services/api';
import { AddBAPModal } from './ModalAddBAP';
import { Alerts } from './AlertBAP';
import Loader from '../../../common/Loader/index';
import Pagination from '../../../components/Pagination/index';
import { DeleteBAPModal } from './ModalDeleteBAP';
import SearchInputButton from '../MasterData/Search';

const BAPList = () => {
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
    console.log(item, 'item item');
    setDetailData(item);
    setModalDetailOpen(true);
  };

  const handleEditClick = (item: any) => {
    console.log(item, 'item item');
    setEditData(item);
    setModalEditOpen(true);
  };

  const handleUbahPassword = (item: any) => {
    console.log(item, 'item password');
    const dataPassword: any = {
      user_id: item.user_id,
      username: item.username,
    };
    setUbahPasswordData(dataPassword);
    setModalUbahPasswordOpen(true);
  };

  const handleCloseAddModal = () => {
    setModalAddOpen(false);
  };

  const handleCloseUbahPassword = () => {
    setModalUbahPasswordOpen(false);
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
      const responseCreate = await apiCreateUser(params);
      if (responseCreate.data.status === 'OK') {
        let fecthParam = {
          filter: {
            lokasi_otmil_id: '1tcb4qwu-tkxh-lgfb-9e6f-xm1k3zcu0vot',
          },
          page: currentPage,
          pageSize: 10,
        };
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menambah data',
        });
        setModalAddOpen(false);

        const responseRead = await apiReadAllUser(fecthParam);
        if (responseRead.data.status === 'OK') {
          const rr = responseRead.data;
          setData(rr.records);
          setPages(rr.pagination.totalPages);
          setRows(rr.pagination.totalRecords);
        } else if (responseRead.data.status === 'error') {
          const errorRead = responseRead.data.message;
          Alerts.fire({
            icon: 'error',
            title: errorRead,
          });
        } else {
          throw new Error(responseRead.data.message);
        }
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
      const responseEdit = await apiEditUser(params);
      if (responseEdit.data.status === 'OK') {
        console.log('edit succes');
        let fecthParam = {
          filter: {
            lokasi_otmil_id: '1tcb4qwu-tkxh-lgfb-9e6f-xm1k3zcu0vot',
          },
          page: currentPage,
          pageSize: 10,
        };
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil mengubah data',
        });
        setModalEditOpen(false);

        const responseRead = await apiReadAllUser(fecthParam);
        if (responseRead.data.status === 'OK') {
          const rr = responseRead.data;
          setData(rr.records);
          setPages(rr.pagination.totalPages);
          setRows(rr.pagination.totalRecords);
        } else if (responseRead.data.status === 'error') {
          const errorRead = responseRead.data.message;
          Alerts.fire({
            icon: 'error',
            title: errorRead,
          });
        } else {
          throw new Error(responseRead.data.message);
        }
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

  const handleSubmitUbahPassword = async (params: any) => {
    console.log(params, 'has submit');
    try {
      const responseUbah = await apiChangePassword(params);
      if (responseUbah.data.status === 'OK') {
        const succesUbah = responseUbah.data.message;
        let fecthParam = {
          filter: {
            lokasi_otmil_id: '1tcb4qwu-tkxh-lgfb-9e6f-xm1k3zcu0vot',
          },
          page: currentPage,
          pageSize: 10,
        };
        Alerts.fire({
          icon: 'success',
          title: succesUbah,
        });
        setModalUbahPasswordOpen(false);
        const responseRead = await apiReadAllUser(fecthParam);
        if (responseRead.data.status === 'OK') {
          const rr = responseRead.data;
          setData(rr.records);
          setPages(rr.pagination.totalPages);
          setRows(rr.pagination.totalRecords);
        } else if (responseRead.data.status === 'error') {
          const errorRead = responseRead.data.message;
          Alerts.fire({
            icon: 'error',
            title: errorRead,
          });
        } else {
          throw new Error(responseRead.data.message);
        }
      } else if (responseUbah.data.status === 'No') {
        const errorUbah = responseUbah.data.message;
        Alerts.fire({
          icon: 'error',
          title: errorUbah,
        });
      } else {
        throw new Error(responseUbah.data.message);
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
      const responseDelete = await apiNewDeleteUser(params);
      if (responseDelete.data.status === 'OK') {
        let fecthParam = {
          filter: {
            lokasi_otmil_id: '1tcb4qwu-tkxh-lgfb-9e6f-xm1k3zcu0vot',
          },
          page: currentPage,
          pageSize: 10,
        };
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menghapus data',
        });
        setModalDeleteOpen(false);
        const responseRead = await apiReadAllUser(fecthParam);
        if (responseRead.data.status === 'OK') {
          const rr = responseRead.data;
          setData(rr.records);
          setPages(rr.pagination.totalPages);
          setRows(rr.pagination.totalRecords);
        } else if (responseRead.data.status === 'error') {
          const errorRead = responseRead.data.message;
          Alerts.fire({
            icon: 'error',
            title: errorRead,
          });
        } else {
          throw new Error(responseRead.data.message);
        }
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
      filter: {
        lokasi_otmil_id: '1tcb4qwu-tkxh-lgfb-9e6f-xm1k3zcu0vot',
      },
      page: currentPage,
      pageSize: 10,
    };
    try {
      await apiReadAllUser(params).then((res) => {
        console.log(res, 'USER');

        setData(res.data.records);
        setPages(res.data.pagination.totalPages);
        setRows(res.data.pagination.totalRecords);
      });
    } catch (e: any) {
      const error = e.message;
      Alerts.fire({
        icon: 'error',
        title: error,
      });
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container py-[16px]">
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-center w-full">
        <div className="mb-4 flex gap-2 items-center border-[1px] border-slate-800 px-4 py-2 rounded-md">
          <div className="w-full">
            <SearchInputButton
              value=''
              placehorder="Cari nama binaan"
              // onChange={}
            />
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
            // onClick={exportToExcel}
            className="text-white rounded-sm bg-blue-500 px-10 py-1 text-sm font-medium"
          >
            Export&nbsp;Excel
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Data Pecatatan BAP
        </h4>
        <button
          onClick={() => setModalAddOpen(true)}
          className=" text-black rounded-md bg-blue-300 w-20 h-10"
        >
          Tambah
        </button>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 text-center  rounded-t-md bg-gray-2 dark:bg-slate-600 ">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nama Pengguna
            </h5>
          </div>
  
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Role
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 xl:p-5 ">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Aksi
            </h5>
          </div>
        </div>

        {/* {data.length == 0 ? ( */}
          <div className="flex justify-center p-4 w-ful">No Data</div>
        {/* ) : ( */}
          {/* <>
            {data.map((item: any) => {
              return (
                <div>
                  <div
                    className="grid grid-cols-4 rounded-sm  bg-gray-2 dark:bg-meta-4  "
                  >
                    <div 
                    onClick={() => handleDetailClick(item)}
                    className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                      <p className="hidden text-black dark:text-white sm:block">
                        {item.username}
                      </p>
                    </div>

                    <div 
                     onClick={() => handleDetailClick(item)}
                    className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                      <p className="hidden text-black dark:text-white sm:block">
                        {item.role_name}
                      </p>
                    </div>

                    <div 
                     onClick={() => handleDetailClick(item)}
                    className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                      <p className="hidden text-black dark:text-white sm:block">
                        {item.email}
                      </p>
                    </div>
                
                    <div className="flex items-center justify-center gap-2 p-2.5 xl:p-5">
                
                      <button
                        onClick={() => handleEditClick(item)}
                        className="py-1 px-2  text-black rounded-md bg-blue-300"
                      >
                        Ubah
                      </button>
                      <button
                        onClick={() => handleUbahPassword(item)}
                        className="py-1  px-2 text-black rounded-md bg-blue-300"
                      >
                        Ganti Pass
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="py-1  px-2 text-white rounded-md bg-red-400"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                <div className="border-t border-slate-600"></div>
                </div>
              );
            })}
          </>
        )} */}

        {modalDetailOpen && (
          <AddBAPModal
            closeModal={() => setModalDetailOpen(false)}
            onSubmit={handleSubmitAddUser}
            defaultValue={detailData}
            isDetail={true}
          />
        )}
        {modalEditOpen && (
          <AddBAPModal
            closeModal={handleCloseEditModal}
            onSubmit={handleSubmitEditUser}
            defaultValue={editData}
            isEdit={true}
          />
        )}
        {modalAddOpen && (
          <AddBAPModal
            closeModal={handleCloseAddModal}
            onSubmit={handleSubmitAddUser}
          />
        )}
        {modalDeleteOpen && (
          <DeleteBAPModal
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

      {/* {data.length === 0 ? null : (
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
      )} */}
    </div>
    </div>
  );
};

export default BAPList;
