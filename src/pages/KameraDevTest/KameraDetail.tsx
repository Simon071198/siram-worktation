import React from 'react';
import ReactPlayer from 'react-player';
import { useParams, useOutletContext } from 'react-router-dom';

const KameraDetail = (props: any) => {
  const [bottomKamera, rightKamera]: any = useOutletContext();
  const { id } = useParams();

  return (
    <div className="mx-6 my-1 ">
      <div
        className={`${
          rightKamera ? 'grid grid-cols-1' : 'grid grid-cols-2'
        } gap-4`}
      >
        <div className="grid grid-cols-1">
          <div>
            <div>
              <p className="text-white"> KameraDetail ID {id} </p>
            </div>
            <div className="w-full h-full">
              <div
                className={`player-wrapper  bg-slate-900 ${
                  bottomKamera ? 'h-[570px]' : 'h-[400px]'
                }`}
              >
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                  width="100%"
                  height="100%"
                  playing={true}
                  playsinline={true}
                  controls
                />
              </div>
            </div>
          </div>

          <div className={`mt-3 ${bottomKamera ? 'hidden' : ''}`}>
            <p>Kamera Terdeteksi : </p>
            <div className="mt-2">
              <div className="w-full flex gap-4 overflow-x-scroll ">
                <img
                  src="https://source.unsplash.com/random/500x500"
                  alt="picture"
                  className="object-cover w-30 h-30"
                ></img>
                <img
                  src="https://source.unsplash.com/random/300x300"
                  alt="picture"
                  className="object-cover w-30 h-30"
                ></img>

                <img
                  src="https://source.unsplash.com/random/150x150"
                  alt="picture"
                  className="object-cover w-30 h-30"
                ></img>

                <img
                  src="https://source.unsplash.com/random/150x150"
                  alt="picture"
                  className="object-cover w-30 h-30"
                ></img>

                <img
                  src="https://source.unsplash.com/random/150x150"
                  alt="picture"
                  className="object-cover w-30 h-30"
                ></img>

                <img
                  src="https://source.unsplash.com/random/150x150"
                  alt="picture"
                  className="object-cover w-30 h-30"
                ></img>
              </div>
            </div>
          </div>
        </div>
        <div className={` ${rightKamera ? 'hidden' : ''}`}>
          <div className="grid grid-cols-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 ">
                <div>
                  <p>Kemiripan Terdeteksi : 10</p>
                </div>
                <div className="h-[400px] flex flex-col  gap-4 overflow-y-scroll px-1">
                  <div className=" border-[0.5px] border-slate-800 py-1 ">
                    <div className="grid grid-cols-2 gap-2 px-1">
                      <img
                        src="https://source.unsplash.com/random/600x500"
                        alt="picture"
                        className="object-cover w-[200px] h-[150px]"
                      ></img>
                      <img
                        src="https://source.unsplash.com/random/500x500"
                        alt="picture"
                        className="object-cover w-[200px] h-[150px]"
                      ></img>
                    </div>
                    <div className="mt-1 grid grid-cols-1 mx-1 px-1 bg-slate-500 rounded text-white">
                      <p className="text-base font-bold max-w-lg ">
                        Bagas Arya Pradipta
                      </p>
                      <p className="text-xs font-light max-w-lg ">
                        Pria - 33 Tahun
                      </p>
                      <p className="text-xs font-light max-w-lg ">Indonesia</p>
                      <p className="text-xs font-light max-w-lg ">
                        30 Agustus 2023 08:05:23
                      </p>
                    </div>
                  </div>

                  <div className=" border-[0.5px] border-slate-800 py-1 ">
                    <div className="grid grid-cols-2 gap-2 px-1">
                      <img
                        src="https://source.unsplash.com/random/600x500"
                        alt="picture"
                        className="object-cover w-[200px] h-[150px]"
                      ></img>
                      <img
                        src="https://source.unsplash.com/random/500x500"
                        alt="picture"
                        className="object-cover w-[200px] h-[150px]"
                      ></img>
                    </div>
                    <div className="mt-1 grid grid-cols-1 mx-1 px-1 bg-slate-500 rounded text-white">
                      <p className="text-base font-bold max-w-lg ">
                        Dandan Ismail
                      </p>
                      <p className="text-xs font-light max-w-lg ">
                        Pria - 30 Tahun
                      </p>
                      <p className="text-xs font-light max-w-lg ">Indonesia</p>
                      <p className="text-xs font-light max-w-lg ">
                        30 Agustus 2023 08:05:23
                      </p>
                    </div>
                  </div>

                  <div className=" border-[0.5px] border-slate-800 py-1 ">
                    <div className="grid grid-cols-2 gap-2 px-1">
                      <img
                        src="https://source.unsplash.com/random/600x500"
                        alt="picture"
                        className="object-cover w-[200px] h-[150px]"
                      ></img>
                      <img
                        src="https://source.unsplash.com/random/500x500"
                        alt="picture"
                        className="object-cover w-[200px] h-[150px]"
                      ></img>
                    </div>
                    <div className="mt-1 grid grid-cols-1 mx-1 px-1 bg-slate-500 rounded text-white">
                      <p className="text-base font-bold max-w-lg ">
                        Fikri Saputra
                      </p>
                      <p className="text-xs font-light max-w-lg ">
                        Pria - 33 Tahun
                      </p>
                      <p className="text-xs font-light max-w-lg ">Indonesia</p>
                      <p className="text-xs font-light max-w-lg ">
                        30 Agustus 2023 08:05:23
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 ">
                <div>
                  <p>Tidak Dikenal : 20</p>
                </div>
                <div className="h-[400px] flex flex-col gap-4 overflow-y-scroll px-1">
                  <div className=" border-[0.5px] border-slate-800 py-1 ">
                    <div className="grid grid-cols-2 px-1 items-center">
                      <img
                        src="https://source.unsplash.com/random/600x500"
                        alt="picture"
                        className="object-cover w-[100px] h-[150px]"
                      ></img>
                      <div className="flex flex-col text-white">
                        <p className="text-xs max-w-md font-bold">
                          Kamera Ruang 1
                        </p>
                        <p className="text-xs max-w-md">4 September 2023</p>
                        <p className="text-xs max-w-md">15:49:14</p>
                      </div>
                    </div>
                  </div>

                  <div className=" border-[0.5px] border-slate-800 py-1 ">
                    <div className="grid grid-cols-2 px-1 items-center">
                      <img
                        src="https://source.unsplash.com/random/600x500"
                        alt="picture"
                        className="object-cover w-[100px] h-[150px]"
                      ></img>
                      <div className="flex flex-col text-white">
                        <p className="text-xs max-w-md font-bold">
                          Kamera Ruang 1
                        </p>
                        <p className="text-xs max-w-md">4 September 2023</p>
                        <p className="text-xs max-w-md">15:49:14</p>
                      </div>
                    </div>
                  </div>

                  <div className=" border-[0.5px] border-slate-800 py-1 ">
                    <div className="grid grid-cols-2 px-1 items-center">
                      <img
                        src="https://source.unsplash.com/random/600x500"
                        alt="picture"
                        className="object-cover w-[100px] h-[150px]"
                      ></img>
                      <div className="flex flex-col text-white">
                        <p className="text-xs max-w-md font-bold">
                          Kamera Ruang 1
                        </p>
                        <p className="text-xs max-w-md">4 September 2023</p>
                        <p className="text-xs max-w-md">15:49:14</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-3'>Informasi Kamera :</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KameraDetail;
