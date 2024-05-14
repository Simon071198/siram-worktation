import { useState } from 'react';
import GambarKamera from '../../images/camera_images_test.jpeg';
import { IoAdd } from 'react-icons/io5';
import { set } from 'react-hook-form';

const CameraSave = () => {
  const [addCamera, setAddCamera] = useState(false);
  const DataKamera = [
    { name: 'Favorite 1', img: GambarKamera },
    { name: 'Favorite 2', img: GambarKamera },
    { name: 'Favorite 3', img: GambarKamera },
  ];

  const handleAddCamera = () => {
    setAddCamera(true);
    console.log('Add Camera');
  };

  return (
    <>
      {!addCamera ? (
        <>
          <div className=" flex flex-row gap-6 py-6 px-10">
            {DataKamera.map((item, index) => (
              <div key={index}>
                <div className="bg-slate-500 py-10 px-16 rounded-2xl text-2xl text-white">
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
            <div className="text-white" onClick={handleAddCamera}>
              <div className="bg-meta-4-dark rounded-2xl py-2 px-2">
                <div className="bg-slate-600 py-6 px-18 rounded-2xl">
                  <IoAdd size={51} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <form action="">
            <div className=" flex py-6 flex-col items-center gap-5">
              <div className="flex flex-row gap-3 bg-slate-500 w-3/4 text-xl justify-start px-6 py-3 rounded-xl">
                <p className=" text-white">Nama Tampilan :</p>
                <input
                  type="text"
                  className="border-none focus:outline-none bg-transparent text-white w-[74%]"
                />
              </div>
              <div className="flex flex-row gap-6 w-3/4 h-[60vh] text-xl justify-start py-3 rounded-xl">
                <div className="h-full w-1/2 bg-slate-500 rounded-2xl">
                  Test1
                </div>
                <div className="h-full w-1/2 bg-slate-500 rounded-2xl">
                  Test2
                </div>
              </div>
              <div className="flex flex-row gap-3 w-3/4 text-xl rounded-xl justify-end mt-[-1%]">
                <div className="bg-green-500 py-2 px-8 rounded-lg">
                  <p className="text-black text-[1rem]">Save</p>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default CameraSave;
