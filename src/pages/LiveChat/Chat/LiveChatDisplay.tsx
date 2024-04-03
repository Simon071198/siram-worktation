import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import ChatMessages from './Messages';
import Input from './InputChat';
import iconPicture from '../../../images/icon.png';

// const socket = io('http://192.168.1.111:4010');

interface LiveChatDisplayProps {
  username: string;
  nama: string;
  message: string;
  namaLokasi: string;
  file: File | null;
  roomMessages: any[];
  selectedRoom: string | null;
  messagesRef: React.RefObject<HTMLDivElement>;
  onSendMessage: () => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setNama: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const LiveChatDisplay: React.FC<LiveChatDisplayProps> = ({
  username,
  message,
  namaLokasi,
  file,
  nama,
  roomMessages,
  selectedRoom,
  messagesRef,
  onSendMessage,
  setUsername,
  setNama,
  setMessage,
  setFile,
}) => {
  useEffect(() => {
    console.log('room', selectedRoom);
    console.log('Nama Lokasi:', namaLokasi);
  }, [selectedRoom, namaLokasi]);

  const namalokasi = namaLokasi;
  console.log('nama lokasi ', namalokasi);
  useEffect(() => {
    // Mengisi nilai username dari localStorage saat komponen diinisialisasi
    const dataUser = JSON.parse(
      localStorage.getItem('dataUser') || '{}'
    ) as any;
    if (dataUser && dataUser.user_id && dataUser.nama_petugas) {
      setUsername(dataUser.user_id);
      setNama(dataUser.nama_petugas);
    }
  }, [setUsername]);

  //   }else {
  //     setChatValue(event.target.value)
  //   }
  // };

  useEffect(() => {
    // Mengisi nilai username dari localStorage saat komponen diinisialisasi
    const dataUser = JSON.parse(
      localStorage.getItem('dataUser') || '{}'
    ) as any;
    if (dataUser && dataUser.nama_petugas) {
      setUsername(dataUser.nama_petugas);
    }
  }, [setUsername]);

  return (
    <div className="mt-6">
      <div className="bg-slate-600 rounded-t-md px-4 py-2 text-white flex items-center h-[50px]">
        <img src={iconPicture} className="w-10 h-10"></img>
        <div className="flex-col py-2">
          {/* <p className='pl-2 box-border'>{data.nama_lokasi_lemasmil}</p> */}
          <p className="pl-2 text-[14px] font-light">Petugas {nama}</p>
        </div>
      </div>
      <ChatMessages
        roomMessages={roomMessages}
        selectedRoom={selectedRoom}
        messagesRef={messagesRef}
      />
      <Input
        onSendMessage={onSendMessage}
        message={message}
        setFile={setFile}
        setMessage={setMessage}
      />
    </div>
  );
};

export default LiveChatDisplay;
