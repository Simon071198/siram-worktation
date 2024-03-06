import React, { useState, useEffect } from 'react';

import {
  apiSearchVisitorByName,
  apiWatchlistHistory,
} from '../../services/api';
import { webserviceurl } from '../../services/api';

export default function InmateDatabaseSearchByName() {
  const [searchName, setSearchName] = useState('');

  const [imagePreview, setImagePreview] = useState(null);
  let [searchResult, setSearchResult] = useState(null);
  let [totalResult, setTotalResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [detailWatchlist, setDetailDpo] = useState([{}]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClose = (event:any, reason:any) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsFound(false);
    setIsNotFound(false);
  };
  const handleCardClick = async (data:any) => {
    await setSelectedCard(data);
    console.log(data);
    await apiWatchlistHistory({ visitorId: data.visitor_id, pageSize: 5 }).then(
      (res) => {
        console.log(res);
        setDetailDpo(res.records);
      }
    );
    await setIsModalOpen(true); // Open the modal when a card is clicked
  };
  const handleSearch = async () => {
    try {
      setLoading(true);
      let params = JSON.stringify({
        name: searchName,
      });
      let data = await apiSearchVisitorByName(params);
      console.log(data);
      setSearchResult(data.records);
      setTotalResult(data.total);
      if (data.total > 0) {
        setIsFound(true);
      } else {
        setIsNotFound(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative w-full h-60 bg-boxdark shadow-md">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 "></div>
        <div className="mx-4 relative ">
          <h1 className="py-4 text-white text-xl">
            Pencarian Prajurit Binaan di Database
          </h1>
          <div className="border-[0.1px] border-b border-white opacity-30 "></div>
          <div className="mt-10 grid grid-cols-1 text-center">
            <div className="flex flex-col text-white">
              {/* <p className="text-3xl">LOGO SIRAM</p> */}
              <p className="text-2xl">SIRAM Workstation</p>
              <p className='text-sm text-slate-500 font-light'> Pencarian berdasarkan nama prajurit binaan</p>
            </div>
            <div className="flex justify-center mt-4">
              <div className="flex items-center bg-white px-4 py-2 rounded-full focus:border-teal-500">
                <input
                  className="w-[400px] text-lg focus-visible:outline-none text-black"
                  placeholder="Cari prajurit binaan"
                ></input>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="text-black"
                    width="25"
                    height="25"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 mb-5">
        <div className="flex items-center justify-center">
          <div className="w-full border-b border-white opacity-30 "></div>
          <p className="w-full text-center text-white">HASIL PENCARIAN</p>
          <div className="w-full border-b border-white opacity-30 "></div>
        </div>
      </div>

      <div className="h-[400px] overflow-y-scroll">
        <div className="xl:mx-[300px] lg:mx-[200px] md:mx-[100px]">
          <div className=" grid grid-cols-1 gap-6">
            <div className="bg-boxdark px-4 py-4 flex">
              <div className="bg-blue-500 w-[150px] h-[150px] overflow-hidden border border-slate-400">
                <img
                  src="https://source.unsplash.com/random/150x150"
                  alt="picture"
                  className="object-cover"
                ></img>
              </div>
              <div className="ml-10 grid grid-cols-1 items-center">
                <div className="flex flex-col w-full">
                  <p className="text-3xl font-bold text-white">
                    Bagas Arya Pradipta
                  </p>
                  <p className="text-2xl font-base text-slate-500">
                    Bagas Arya Pradipta
                  </p>
                </div>
                <div className="flex flex-col mt-6 item-center  w-full">
                  <p className="text-lg">Keterangan</p>
                  <div className='flex items-center gap-2'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      width='15'
                      height='15'
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <p className="text-md">16/01/2023 10:11</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-boxdark px-4 py-4 flex">
              <div className="bg-blue-500 w-[150px] h-[150px] overflow-hidden border border-slate-400">
                <img
                  src="https://source.unsplash.com/random/150x150"
                  alt="picture"
                  className="object-cover"
                ></img>
              </div>
              <div className="ml-10 grid grid-cols-1 items-center">
                <div className="flex flex-col w-full">
                  <p className="text-3xl font-bold text-white">
                    Bagas Arya Pradipta
                  </p>
                  <p className="text-2xl font-base text-slate-500">
                    Bagas Arya Pradipta
                  </p>
                </div>
                <div className="flex flex-col mt-6 item-center  w-full">
                  <p className="text-lg">Keterangan</p>
                  <div className='flex items-center gap-2'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      width='15'
                      height='15'
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <p className="text-md">16/01/2023 10:11</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-boxdark px-4 py-4 flex">
              <div className="bg-blue-500 w-[150px] h-[150px] overflow-hidden border border-slate-400">
                <img
                  src="https://source.unsplash.com/random/150x150"
                  alt="picture"
                  className="object-cover"
                ></img>
              </div>
              <div className="ml-10 grid grid-cols-1 items-center">
                <div className="flex flex-col w-full">
                  <p className="text-3xl font-bold text-white">
                    Bagas Arya Pradipta
                  </p>
                  <p className="text-2xl font-base text-slate-500">
                    Bagas Arya Pradipta
                  </p>
                </div>
                <div className="flex flex-col mt-6 item-center  w-full">
                  <p className="text-lg">Keterangan</p>
                  <div className='flex items-center gap-2'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      width='15'
                      height='15'
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <p className="text-md">16/01/2023 10:11</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    // <>
    //   <div>
    //     <h5 className="text-2xl mb-2">Pencarian Prajurit Binaan di Database</h5>

    //     <p className="mb-2">
    //       Fitur untuk mencari data prajurit binaan berdasarkan nama, silahkan
    //       masukan parameter yang diperlukan
    //     </p>
    //     <br />
    //     <form className="flex flex-col gap-4 w-full px-4 py-1">
    //       <div
    //         style={{
    //           gap: '2rem',
    //           width: '100%',
    //           justifyContent: 'center',
    //         }}
    //       >
    //         <div>
    //           <div className="mt-3 p-1 flex flex-col items-center rounded-10 ">
    //             <input
    //               type="text"
    //               placeholder="Nama Prajurit Binaan"
    //               value={searchName}
    //               onChange={(e) => setSearchName(e.target.value)}
    //               className="w-[500px] rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
    //             />

    //               <button
    //                 type="button"
    //                 className="bg-primary text-white px-6 py-2 mt-3 w-50 rounded-md cursor-pointer"
    //                 onClick={handleSearch}
    //               >
    //                 Cari
    //               </button>

    //           </div>
    //         </div>

    //         <div>
    //           <div className="w-[500px] mx-auto bg-meta-4 shadow-md rounded-t-md overflow-hidden mt-5">
    //             <table className="min-w-full">
    //               <thead>
    //                 <tr>
    //                   <th className="py-2 px-3 bg-slate-600">Hasil Pencarian</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {searchResult?.map((row) => (
    //                   <tr
    //                     onClick={() => handleCardClick(row)}
    //                     className="cursor-pointer"
    //                     key={row.name}
    //                   >
    //                     <td className="px-6 py-4 border-t border-slate-600 capitalize">{row.name}</td>
    //                   </tr>
    //                 ))}
    //               </tbody>
    //             </table>
    //           </div>
    //         </div>
    //       </div>
    //     </form>
    //     {isModalOpen && (
    //       <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70">
    //         <div className="dark:bg-boxdark border border-slate-400 w-4/5 h-4/5 max-w-3xl p-6 rounded-xl overflow-y-scroll">
    //           <div className="flex justify-between items-center mb-6">
    //             <h3 className="text-2xl font-semibold">
    //               Detail Prajurit Binaan
    //             </h3>
    //             <button
    //               type="button"
    //               className="bg-primary text-white px-4 py-2 rounded-md"
    //               onClick={() => setIsModalOpen(false)}
    //             >
    //               Tutup
    //             </button>
    //           </div>
    //           {selectedCard && (
    //             <div className="flex">
    //               <div className="w-72 h-72">
    //                 <img
    //                   className="w-full h-full object-contain"
    //                   src={
    //                     selectedCard.face_pics
    //                       ? webserviceurl + selectedCard.face_pics
    //                       : 'https://via.placeholder.com/200x300'
    //                   }
    //                   alt={selectedCard.name}
    //                 />
    //               </div>
    //               <div>
    //                 <table>
    //                   <tbody>
    //                     <tr>
    //                       <td className="font-semibold">Nama</td>
    //                       <td className='pl-4 capitalize'>{selectedCard.name}</td>
    //                     </tr>
    //                     <tr>
    //                       <td className="font-semibold">Tanggal Lahir</td>
    //                       <td className='pl-4 capitalize'>{selectedCard.dob}</td>
    //                     </tr>
    //                     <tr>
    //                       <td className="font-semibold">Kebangsaan</td>
    //                       <td className='pl-4 capitalize'>{selectedCard.country_name}</td>
    //                     </tr>
    //                     <tr>
    //                       <td className="font-semibold">Nomor Identitas</td>
    //                       <td className='pl-4 capitalize'>{selectedCard.identity}</td>
    //                     </tr>
    //                     <tr>
    //                       <td className="font-semibold">Jenis Kelamin</td>
    //                       <td className='pl-4 capitalize'>{selectedCard.gender ? 'Male' : 'Female'}</td>
    //                     </tr>
    //                     <tr>
    //                       <td className="font-semibold">ID Prajurit Binaan</td>
    //                       <td className='pl-4 capitalize'>{selectedCard.visitor_id}</td>
    //                     </tr>
    //                     <tr>
    //                       <td className="font-semibold">Tanggal Input</td>
    //                       <td className='pl-4 capitalize'>{selectedCard.create_stamp}</td>
    //                     </tr>
    //                   </tbody>
    //                 </table>
    //               </div>
    //             </div>
    //           )}
    //           <div className="flex justify-between items-center mt-6">
    //             <h5 className="text-xl font-semibold">
    //               Riwayat Tangkapan Kamera Prajurit Binaan
    //             </h5>
    //           </div>
    //           <div className="flex gap-4 mt-6">
    //             {detailWatchlist.map((data, index) => (
    //               <div
    //                 className="cursor-pointer"
    //                 key={index}
    //                 onClick={() => handleCardClick(data)}
    //               >
    //                 <div className="max-w-xs bg-slate-600 h-full shadow-md rounded-md overflow-hidden">
    //                   <img
    //                     className="h-48 w-full object-cover"
    //                     src={
    //                       selectedCard.face_pics
    //                         ? webserviceurl + data.image
    //                         : 'https://via.placeholder.com/200x300'
    //                     }
    //                     alt={selectedCard.name}
    //                   />
    //                   <div className="px-4 py-2">
    //                     <p className="text-lg font-semibold">
    //                       {data.timestamp}
    //                     </p>
    //                     <p className="text-lg">{data.device_name}</p>
    //                     <p className="text-lg">{data.location_name}</p>
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //     {isFound && (
    //       <div className="fixed bottom-0 right-0 mr-8 mb-8">
    //         <div className="bg-green-500 text-white px-6 py-3 rounded-md">
    //           Data Ditemukan
    //         </div>
    //       </div>
    //     )}
    //     {isNotFound && (
    //       <div className="fixed bottom-0 right-0 mr-8 mb-8">
    //         <div className="bg-red-500 text-white px-6 py-3 rounded-md">
    //           Data Tidak Ditemukan
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </>
  );
}
