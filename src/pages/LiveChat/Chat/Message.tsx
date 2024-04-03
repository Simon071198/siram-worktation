import React, { useEffect, useState, useRef } from 'react';
import iconPicture from '../../../images/icon.png';
import { time } from 'console';

// Objek untuk menyimpan warna acak untuk setiap pengguna di grup chat
const userColors: { [key: string]: string } = {};

const Message = (props: any) => {
  const { content, from } = props;

  const dataUser = JSON.parse(localStorage.getItem('dataUser') || '{}') as any;
  console.log(dataUser, 'dataUser');

  const image = `https://dev.transforme.co.id/siram_admin_api${dataUser.image}`;

  function getRandomColor(from: string) {
    // Jika warna sudah ada untuk pengguna ini, gunakan warna tersebut
    if (userColors[from]) {
      return userColors[from];
    }

    // Jika belum, hasilkan warna acak baru
    const colors = [
      'text-slate-500',
      'text-gray-500',
      'text-zinc-500',
      'text-neutral-500',
      'text-stone-500',
      'text-red-500',
      'text-orange-500',
      'text-amber-500',
      'text-yellow-500',
      'text-lime-500',
      'text-green-500',
      'text-emerald-500',
      'text-teal-500',
      'text-cyan-500',
      'text-sky-500',
      'text-blue-500',
      'text-indigo-500',
      'text-violet-500',
      'text-purple-500',
      'text-fuchsia-500',
      'text-pink-500',
      'text-rose-500',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Simpan warna acak untuk pengguna ini
    userColors[from] = randomColor;

    return randomColor;
  }

  useEffect(() => {
    //nama user
    console.log(from);
    console.log(dataUser.nama_petugas);

    if (from !== dataUser.nama_petugas) {
    }
  }, []);

  return (
    <div className={from === null ? 'flex justify-end' : ''}>
      <div
        className={`flex mb-[20px] ${
          from === null || from === dataUser.nama_petugas ? 'flex-row-reverse' : 'flex-row'
        } items-start gap-x-3`}
      >
        <div className="flex flex-col">
          <img
            src={image}
            alt="profile"
            className="w-8 h-8 rounded-full "
          ></img>
        </div>

        <div
          className={`max-w-md flex flex-col ${
            from === 'you' ? 'items-end' : 'items-start'
          } gap-y-1`}
        >
          <div className="flex flex-col">
            <p
              className={`px-3 py-1 max-w-fit ${
                from === null || from === dataUser.nama_petugas
                  ? 'text-white bg-slate-400 rounded-l-md rounded-br-md self-end'
                  : 'text-slate-950 bg-white rounded-r-md rounded-bl-md'
              }`}
            >
              <div
                className={`${getRandomColor(from)}  ${from === dataUser.nama_petugas ? 'hidden' : 'text-left'}`}
              >
                {from}
              </div>
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
