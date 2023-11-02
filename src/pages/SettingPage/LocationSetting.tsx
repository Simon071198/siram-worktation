import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiReadAllGateway } from '../../services/api';
import Loader from '../../../common/Loader/index';
const GatewayList = () => {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading]= useState(false);

  useEffect(() => {
    let fetchData = async () => {
    
    // await setIsLoading(true);
      let params = {
        filter: ' ',
      };
    await apiReadAllGateway(params).then((res) => {
        console.log(res, 'res');
  
        setData(res);
      });
      setIsLoading(false);} 
      fetchData();
  }, []);

  return isLoading ? (
    <Loader/>
  ) : (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Data Perangkat Gateway
        </h4>
        <button
          // onClick={() => setModalAddOpen(true)}
          className=" text-black rounded-sm bg-blue-300"
        >
          Tambah
        </button>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nama Gateway
            </h5>
          </div>
          {/* <div className="p-2.5 text-center xl:p-5 hidden xl:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base ">
              ID Kamera
            </h5>
          </div> */}
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              GMAC
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Kode Ruangan
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Model
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Aksi
            </h5>
          </div>
        </div>

        {data.map((item) => {
          return (
            <div className="grid grid-cols-6 border-b border-stroke dark:border-strokedark sm:grid-cols-6">
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {item.nama}
                </p>
              </div>

              {/* <div className="flex items-center justify-center p-2.5 xl:p-5 hidden xl:block">
                <p className="text-black dark:text-white text-xs">{item.deviceId}</p>
              </div> */}

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{item.gmac}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{item.kode_ruangan}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{item.status}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5"> {item.model}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 flex gap-2">
                <button
                  // onClick={() => handleDetailClick(item)}
                  className="p-1 text-black rounded-sm bg-blue-300"
                >
                  Detail
                </button>

                <button
                  // onClick={() => handleEditClick(item)}
                  className="p-1 text-black rounded-sm bg-blue-300"
                >
                  Edit
                </button>
                <button 
                // onClick={() => handleDeleteClick(item)}
                className="p-1 text-black rounded-sm bg-blue-300">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GatewayList;
