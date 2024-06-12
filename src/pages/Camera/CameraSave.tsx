import { useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { ModalAddCameraSave } from './ModalAddCameraSave';
import {
  apiCreateKameraTersimpan,
  apiReadKameraTersimpan,
  apiUpdateKameraTersimpan,
} from '../../services/api';
import { SlOptionsVertical } from 'react-icons/sl';
import MenuItemComponent from '../../components/MenuItemCameraSave';
import { Alerts } from './AlertCamera';

interface Item {
  nama_grup: string;
}
const CameraSave = () => {
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [data, setData] = useState<Item[]>([]);
  const [editData, setEditData] = useState<Item | null>(null);
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  // const tokenItem = localStorage.getItem('token');
  // const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = '9|1Til7VYngnpA9cCOIazI6s8UbRGGfVI8EUMTm1PW2485e30a';

  const handleIconClick = (index: number) => {
    setMenuIndex(index === menuIndex ? null : index);
  };
  useEffect(() => {
    fetchKameraTersimpan();
  }, []);
  const fetchKameraTersimpan = async () => {
    const params = {
      page: 1,
    };
    try {
      const response = await apiReadKameraTersimpan(params, token);
      if (response.data.status !== 'OK') {
        throw new Error(response.data.message);
      }
      const result = response.data.records;
      setData(result);
      console.log(response.data.records);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseAddModal = () => {
    setModalAddOpen(false);
  };
  const handleCloseEditModal = () => {
    setModalEditOpen(false);
  };

  const handleSubmitAdd = async (params: any) => {
    console.log('DATA DARI LIST', params);
    try {
      const responseCreate = await apiCreateKameraTersimpan(params, token);
      if (responseCreate.data.status === 'OK') {
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil menambah data',
        });
        setModalAddOpen(false);
        fetchKameraTersimpan();
      } else if (responseCreate.data.status === 'NO') {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal membuat data',
        });
      } else {
        throw new Error(responseCreate.data.message);
      }
    } catch (e: any) {
      console.log(e, 'error catch');
    }
  };
  const handleSubmitEdit = async (params: any) => {
    console.log('DATA DARI edit', params);
    try {
      const responseEdit = await apiUpdateKameraTersimpan(params, token);
      if (responseEdit.data.status === 'OK') {
        Alerts.fire({
          icon: 'success',
          title: 'Berhasil mengubah data',
        });
        setModalEditOpen(false);
        fetchKameraTersimpan();
      } else if (responseEdit.data.status === 'NO') {
        Alerts.fire({
          icon: 'error',
          title: 'Gagal membuat data',
        });
      } else {
        throw new Error(responseEdit.data.message);
      }
    } catch (e: any) {
      console.log(e, 'error catch');
    }
  };

  const handleEditClick = (item: Item) => {
    console.log(item, 'item nih');
    setEditData(item);
    setModalEditOpen(true);
  };

  // const handleSubmitEdit = async (params: any) => {
  //   console.log(params, 'edit');
  //   try{
  //     const responseEdit = await apiUpdateKameraTersimpan(params, token);
  //     if(responseEdit.data.status === 'OK'){
  //       Alerts.fire({
  //         icon: 'success',
  //         title: 'Berhasil mengubah data',
  //       });
  //       setModalEditOpen(false);
  //       fetchKameraTersimpan();
  //   } else if(responseEdit.data.status === 'NO'){
  //       Alerts.fire({
  //         icon: 'error',
  //         title: 'Gagal mengubah data',
  //       });
  //     } else {
  //       throw new Error(responseEdit.data.message);
  //     }
  //   } catch (e: any) {
  //     console.log(e, 'error catch');
  //   }
  // }
  return (
    <>
      <div className="px-10 py-3">
        <button
          onClick={() => setModalAddOpen(true)}
          className="  text-black rounded-md font-semibold bg-slate-600 py-2 px-6 border-2 border-white"
        >
          <IoAdd className="text-2xl text-white" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 py-6 px-10">
        {data.map((item: any, index) => (
          <div
            key={index}
            className="bg-slate-500  flex px-8 text-center font-bold justify-center items-center rounded-2xl text-2xl text-white relative w-full h-36 cursor-pointer hover:bg-slate-600"
            onClick={() => console.log('test2', index)}
          >
            <div className="absolute top-3 right-2 zIndex-10 hover:cursor-pointer hover:bg-slate-400 hover:rounded-full flex items-center justify-center w-9 h-9">
              <span
                className="flex items-center justify-center w-full h-full text-slate-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleIconClick(index);
                  console.log('test1', index);
                }}
              >
                <SlOptionsVertical size={17} />
              </span>
            </div>

            <p className="text-xl cursor-pointer">{item.nama_grup}</p>
            <div className="absolute bottom-1 right-4">
              <p className="text-sm text-slate-200 ">
                Total kamera : {item.kamera_tersimpan.length}
              </p>
            </div>
            {menuIndex === index && (
              <MenuItemComponent
                onEdit={() => handleEditClick(item)}
                onClose={() => setMenuIndex(null)}
              />
            )}
          </div>
        ))}
      </div>

      {modalAddOpen && (
        <ModalAddCameraSave
          closeModal={handleCloseAddModal}
          onSubmit={handleSubmitAdd}
          // token={token}
        />
      )}
      {modalEditOpen && (
        <ModalAddCameraSave
          closeModal={handleCloseEditModal}
          onSubmit={handleSubmitEdit}
          isEdit={true}
          defaultValue={editData}
          // token={token}
        />
      )}
    </>
  );
};

export default CameraSave;
