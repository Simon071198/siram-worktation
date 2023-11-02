import { useEffect, useState } from 'react';
import Pagination from '../../../components/Pagination/index';
import AddDataGrup from './modalAad';
import { Alerts } from './Alert';
import {
  apiCreatGrupPetugas,
  apiDeleteGrupPetugas,
  apiReadAllGrupPetugas,
  apiReadAllStaff,
  apiUpdateGrupPetugas,
} from '../../../services/api';
import DetailGrup from './ModalDetail';
import { DeleteGrupModal } from './deleteGrupShift';
import EditGrup from './editGrup';
import Loader from '../../../common/Loader/index';

interface Item {
  grup_petugas_id: '';
  nama_grup_petugas: '';
}

const GrupShift = () => {
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const [rows, setRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [dataGrup, setDataGrup] = useState([
    {
      grup_petugas_id: '',
      nama_grup_petugas: '',
      nama_ketua_grup: '',
    },
  ]);
  const [detailData, setDetailData] = useState<Item | null>(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({
    grup_petugas_id: '',
  });

  const handleCloseAddModal = () => {
    setModalAddOpen(false);
  };
  useEffect(() => {
    setIsLoading(true);
    const dataGrup = async () => {
      const response = await apiReadAllGrupPetugas(token);
      setDataGrup(response.data.records);
      setPages(response.data.pagination.totalPages);
      setRows(response.data.pagination.totalRecords);
      setIsLoading(false);
    };
    dataGrup();
  }, []);

  //Tambah Data
  const handleAddShift = async (params: any) => {
    const data = {
      params: params,
      token: token,
    };
    const AddData = await apiCreatGrupPetugas(data);
    
    if (AddData.data.status === 'OK') {
      handleCloseAddModal();
      const response = await apiReadAllGrupPetugas(token);
      Alerts.fire({
        icon: 'success',
        title: 'Berhasil menambah data',
      });
      setDataGrup(response.data.records);
      setPages(response.data.pagination.totalPages);
      setRows(response.data.pagination.totalRecords);
    } else {
      Alerts.fire({
        icon: 'error',
        title: 'Gagal menambah data',
      });
    }
  };

  //Detail
  const handleDetailClick = (item: Item) => {
    setDetailData(item);
    setModalDetailOpen(true);
  };

  //Edit
  const handleEditClick = (item: Item) => {
    setDetailData(item);
    setModalEditOpen(true);
  };

  const handleCloseEditModal = () => {
    setModalEditOpen(false);
  };

  //update
  const handleEditGrup = async (params: any) => {
    const data = {
      params: params,
      token: token,
    };
    const EditData = await apiUpdateGrupPetugas(data);
    
    if (EditData.data.status === 'OK') {
      handleCloseEditModal();
      const response = await apiReadAllGrupPetugas(token);
      Alerts.fire({
        icon: 'success',
        title: 'Berhasil mengedit data',
      });
      setDataGrup(response.data.records);
      setPages(response.data.pagination.totalPages);
      setRows(response.data.pagination.totalRecords);
    } else {
      Alerts.fire({
        icon: 'error',
        title: 'Gagal mengedit data',
      });
    }
  };

  //Delete
  const handleDeleteClick = (item: any) => {
    setDeleteData({ grup_petugas_id: item });
    setModalDeleteOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setModalDeleteOpen(false);
  };

  const handleSubmitDeleteShift = async (params: any) => {
    const data = {
      params: params,
      token: token,
    };
    const AddData = await apiDeleteGrupPetugas(data);
    if (AddData.data.status === 'OK') {
      handleCloseDeleteModal();
      const response = await apiReadAllGrupPetugas(token);
      Alerts.fire({
        icon: 'success',
        title: 'Berhasil menghapus data',
      });
      setDataGrup(response.data.records);
      setPages(response.data.pagination.totalPages);
      setRows(response.data.pagination.totalRecords);
    } else {
      Alerts.fire({
        icon: 'error',
        title: 'Gagal menghapus data',
      });
    }
  };

  const handleChagePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
    // setFilter({ ...filter, jenis_ruangan_otmil: '', nama_ruangan_otmil: '' });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {modalAddOpen && (
        <AddDataGrup
          closeModal={handleCloseAddModal}
          onSubmit={handleAddShift}
        />
      )}
      {modalDetailOpen && (
        <DetailGrup
          closeModal={() => setModalDetailOpen(false)}
          defaultValue={detailData}
          isDetail={true}
        />
      )}
      {modalDeleteOpen && (
        <DeleteGrupModal
          closeModal={handleCloseDeleteModal}
          onSubmit={handleSubmitDeleteShift}
          defaultValue={deleteData}
        />
      )}
      {modalEditOpen && (
        <EditGrup
          closeModal={handleCloseEditModal}
          onSubmit={handleEditGrup}
          defaultValue={detailData}
        />
      )}
      <div className="flex justify-between mb-3">
        <h1 className="text-xl font-semibold text-black dark:text-white">
          Data Grup Shift
        </h1>
        <button
          onClick={() => setModalAddOpen(!modalAddOpen)}
          className="text-black rounded-md font-semibold bg-blue-300 py-2 px-3"
        >
          Tambah
        </button>
      </div>
      <div className="flex flex-col">
        <div className="rounded-b-md rounded-t-md">
          <ul>
            <li className="py-2.5 my-1 flex rounded-t-md bg-gray-2 dark:bg-slate-600">
              <div className="flex items-center justify-center w-1/5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama Grup
                </h5>
              </div>
              <ul className="w-5/6 py-2.5">
                <li className="flex items-center justify-center grid grid-cols-4">
                  <div className="flex items-center justify-center text-sm font-medium uppercase xsm:text-base">
                    Ketua Grup
                  </div>
                  <div className="flex items-center justify-center text-sm font-medium uppercase xsm:text-base">
                    Total Jam Kerja
                  </div>
                  <div className="flex items-center justify-center text-sm font-medium uppercase xsm:text-base">
                    Jumlah Cuti
                  </div>
                  <div className="flex items-center justify-center text-sm font-medium uppercase xsm:text-base ">
                    Aksi
                  </div>
                </li>
              </ul>
            </li>
            <div className="dark:bg-meta-4 rounded-b-md pb-1">
              {dataGrup.map((itemGrup: any, index: any) => (
                <li className="my-1 flex dark:bg-meta-4" key={index}>
                  <div className="w-1/5 mr-1 flex items-center justify-center">
                    <h2 className="pl-3 flex items-center h-full flex items-center justify-center">
                      {itemGrup.nama_grup_petugas}
                    </h2>
                  </div>
                  <div className="w-5/6">
                    <ul>
                      <li className="flex grid grid-cols-4 my-1">
                        <div className="flex items-center justify-center">
                          {itemGrup.nama_ketua_grup}
                        </div>
                        <div className="flex items-center justify-center">
                          10
                        </div>
                        <div className="flex items-center justify-center">
                          10
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleDetailClick(itemGrup)}
                            className="py-1 text-sm px-2 text-black rounded-md bg-blue-300"
                          >
                            Detail
                          </button>
                          <button
                            onClick={() => handleEditClick(itemGrup)}
                            className="py-1 text-sm px-2 text-black rounded-md bg-blue-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteClick(itemGrup.grup_petugas_id)
                            }
                            className="py-1 text-sm px-2 text-white rounded-md bg-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={pages}
          onChangePage={handleChagePage}
        />
      </div>
    </div>
  );
};
export default GrupShift;
