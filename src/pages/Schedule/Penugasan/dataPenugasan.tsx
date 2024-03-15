import { useEffect, useState } from 'react';
import {
  apiCreatePenugasanShift,
  apiDeletePenugasanShift,
  apiEditPenugasanShift,
  apiReadAllPenugasanShift,
} from '../../../services/api';
import { Alerts } from '../GrupShift/Alert';
import Loader from '../../../common/Loader';
import ModalAddPenugasan from './modalAddPenugasan';
import ModalEditPenugasan from './modalEditPenugasan';
import { DeleteModal } from './modalDeletePenugasan';
import { useLocation, useNavigate } from 'react-router-dom';
import { Error403Message } from '../../../utils/constants';

const Penugasan = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //get Token
  const tokenItem = localStorage.getItem('token');
  let tokens = tokenItem ? JSON.parse(tokenItem) : null;
  let token = tokens.token;

  const [isLoading, setIsLoading] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [isOperator, setIsOperator] = useState<boolean>();

  const dataUserItem = localStorage.getItem('dataUser');
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  useEffect(() => {
    if (dataAdmin?.role_name === 'operator') {
      setIsOperator(true);
    } else {
      setIsOperator(false);
    }

    console.log(isOperator, 'Operator');
  }, [isOperator]);

  const [dataPenugasan, setDataPenugasan] = useState([
    {
      penugasan_id: '',
      nama_penugasan: '',
    },
  ]);
  const [dataEditPenugasan, setdataEditPenugasan] = useState({
    penugasan_id: '',
    nama_penugasan: '',
  });
  const [dataDeletePenugasan, setdataDeletePenugasan] = useState({
    penugasan_id: '',
  });

  const params = {
    filter: {
      penugasan_id: '',
    },
  };
  const fecthPenugasan = async () => {
    setIsLoading(true);
    try {
      const response = await apiReadAllPenugasanShift(params, token);
      const data = response.data.records;
      if (response.data.status) {
        setDataPenugasan(data);
        setIsLoading(false);
      }
    } catch (e: any) {
      if (e.response.status === 403) {
        navigate('/auth/signin', {
          state: { forceLogout: true, lastPage: location.pathname },
        });
      }
      Alerts.fire({
        icon: e.response.status === 403 ? 'warning' : 'error',
        title: e.response.status === 403 ? Error403Message : e.message,
      });
    }
  };

  useEffect(() => {
    fecthPenugasan();
  }, []);

  const handleCloseModalAdd = () => {
    setModalAddOpen(false);
  };
  const handleCloseModalEdit = () => {
    setModalDetailOpen(false);
    setModalEditOpen(false);
    setModalDeleteOpen(false);
  };

  const handleDetail = (item: any) => {
    setdataEditPenugasan(item);
    setModalDetailOpen(true);
  };

  const handleEdit = (item: any) => {
    setdataEditPenugasan(item);
    setModalEditOpen(true);
  };

  const handleDelete = (item: any) => {
    setdataDeletePenugasan({ penugasan_id: item });
    setModalDeleteOpen(true);
  };

  //create penugasan
  const handleSubmitPenugasan = async (param: any) => {
    try {
      const addData = await apiCreatePenugasanShift(param, token);
      if (addData.data.status === 'OK') {
        const response = await apiReadAllPenugasanShift(params, token);
        const data = response.data.records;
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menambah data',
        });
        setModalAddOpen(false);
        setDataPenugasan(data);
      } else {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal menambah data',
        });
      }
    } catch (e: any) {
      if (e.response.status === 403) {
        navigate('/auth/signin', {
          state: { forceLogout: true, lastPage: location.pathname },
        });
      }
      Alerts.fire({
        icon: e.response.status === 403 ? 'warning' : 'error',
        title: e.response.status === 403 ? Error403Message : e.message,
      });
    }
  };

  //Edit
  const handleEditPenugasan = async (param: any) => {
    try {
      const addData = await apiEditPenugasanShift(param, token);
      if (addData.data.status === 'OK') {
        const response = await apiReadAllPenugasanShift(params, token);
        const data = response.data.records;
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil mengubah data',
        });
        setModalEditOpen(false);
        setDataPenugasan(data);
      } else {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal mengubah data',
        });
      }
    } catch (e: any) {
      if (e.response.status === 403) {
        navigate('/auth/signin', {
          state: { forceLogout: true, lastPage: location.pathname },
        });
      }
      Alerts.fire({
        icon: e.response.status === 403 ? 'warning' : 'error',
        title: e.response.status === 403 ? Error403Message : e.message,
      });
    }
  };

  //Delete
  const handleDeletePenugasan = async (param: any) => {
    try {
      const addData = await apiDeletePenugasanShift(param, token);
      if (addData.data.status === 'OK') {
        const response = await apiReadAllPenugasanShift(params, token);
        const data = response.data.records;
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menghapus data',
        });
        setModalEditOpen(false);
        setDataPenugasan(data);
      } else {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal menghapus data',
        });
      }
    } catch (e: any) {
      if (e.response.status === 403) {
        navigate('/auth/signin', {
          state: { forceLogout: true, lastPage: location.pathname },
        });
      }
      Alerts.fire({
        icon: e.response.status === 403 ? 'warning' : 'error',
        title: e.response.status === 403 ? Error403Message : e.message,
      });
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container py-[16px]">
      <div className="rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {modalAddOpen && (
          <ModalAddPenugasan
            closeModal={handleCloseModalAdd}
            onSubmit={handleSubmitPenugasan}
          />
        )}
        {modalDetailOpen && (
          <ModalEditPenugasan
            closeModal={handleCloseModalEdit}
            onSubmit={handleCloseModalEdit}
            defaultValue={dataEditPenugasan}
            isDetail={true}
          />
        )}
        {modalEditOpen && (
          <ModalEditPenugasan
            closeModal={handleCloseModalEdit}
            onSubmit={handleEditPenugasan}
            defaultValue={dataEditPenugasan}
          />
        )}
        {modalDeleteOpen && (
          <DeleteModal
            closeModal={handleCloseModalEdit}
            onSubmit={handleDeletePenugasan}
            defaultValue={dataDeletePenugasan}
          />
        )}
        <div className="flex justify-between mb-3">
          <h1 className="text-xl font-semibold text-black dark:text-white">
            Data Penugasan Shift
          </h1>
          {!isOperator && (
            <button
              onClick={() => setModalAddOpen(!modalAddOpen)}
              className="text-black rounded-md font-semibold bg-blue-300 py-2 px-3"
            >
              Tambah
            </button>
          )}
        </div>
        <div className="flex flex-col mb-5  ">
          <div className="rounded-b-md rounded-t-md">
            <ul>
              <li className="py-2.5 flex rounded-t-md bg-gray-2 dark:bg-slate-600">
                <ul className="w-full py-2.5">
                  <li className=" items-center justify-center grid grid-cols-2">
                    <div className="flex items-center justify-center text-sm font-medium uppercase xsm:text-base">
                      Nama Penugasan
                    </div>
                    <div className="flex items-center justify-center text-sm font-medium uppercase xsm:text-base ">
                      Aksi
                    </div>
                  </li>
                </ul>
              </li>
              <li className="py-2.5 flex rounded-b-md bg-gray-2 dark:bg-meta-4 ">
                <ul className="w-full py-2.5 space-y-4">
                  {dataPenugasan.map((item: any) => {
                    return (
                      <li className="items-center justify-center grid grid-cols-2">
                        <div className="capitalize flex items-center justify-center text-sm font-medium xsm:text-base">
                          {item.nama_penugasan}
                        </div>
                        <div className="flex items-center justify-center space-x-1 text-sm font-medium uppercase xsm:text-base ">
                          <button
                            onClick={() => handleDetail(item)}
                            className="py-1 text-sm px-2 text-black rounded-md bg-blue-300"
                          >
                            Detail
                          </button>
                          {!isOperator && (
                            <>
                              <button
                                onClick={() => handleEdit(item)}
                                className="py-1 text-sm px-2 text-black rounded-md bg-blue-300"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(item.penugasan_id)}
                                className="py-1 text-sm px-2 text-white rounded-md bg-red-500"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Penugasan;
