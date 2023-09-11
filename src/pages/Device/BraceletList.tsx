import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiBraceletList } from '../../services/api';
const BraceletList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let params = {
      filter: ' ',
    };
    apiBraceletList(params).then((res) => {
      console.log(res, 'res');

      setData(res);
    });
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className='flex'>
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Data Perangkat Gelang
        </h4>
        <div className="ml-auto">
        <input
          type="search"
          className="px-3 py-1 mb-3 flex-end rounded-lg h-11 border-lg border-[] border-primary placeholder-neutral-200 focus:border-primary focus:shadow-[inset_0_0_0_1px]"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon1"
        />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-12 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-12">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-xs font-medium uppercase ">
              Nama Gelang
            </h5>
          </div>
          {/* <div className="p-2.5 text-center xl:p-5 hidden xl:block">
            <h5 className="text-xs font-medium uppercase  ">
              ID Kamera
            </h5>
          </div> */}
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-xs font-medium uppercase ">
              Alamat MAC
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">
              Baterai
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">
              Step
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">Detak Jantung</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">
              Temperatur
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">
              SPO
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">
              Sistolik
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">
              Diastolik
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">
              RSSI
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">
              Terakhir dilihat
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">
              Aksi
            </h5>
          </div>
        </div>

        {data.map((item) => {
          return (
            <div className="grid grid-cols-12 border-b border-stroke dark:border-strokedark sm:grid-cols-12">
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block text-xs">
                  {item.name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white text-xs">{item.mcAddress}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3 text-xs">{item.battery}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white text-xs">{item.step}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 text-xs"> {item.heartrate}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 text-xs"> {item.temperature}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 text-xs"> {item.spo}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 text-xs"> {item.systolic}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 text-xs"> {item.diastolic}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 text-xs"> {item.rssi}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 text-xs"> {item.lastSeen}</p>
              </div>
              <div 
                className="ml-5 grid grid-cols-3 rounded-sm sm:grid-cols-2">
                <button
                  // onClick={} 
                  className='text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                  </svg>
                </button>
                <button
                className='text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none'
                // onClick={}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path d="M11.625 16.5a1.875 1.875 0 100-3.75 1.875 1.875 0 000 3.75z" />
                    <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 001.06-1.06l-1.047-1.048A3.375 3.375 0 1011.625 18z" clip-rule="evenodd" />
                    <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                  </svg>

                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BraceletList;
