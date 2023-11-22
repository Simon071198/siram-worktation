import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import ChatMessages from "./Messages";
import Input from "./InputChat";
// import iconPicture from '../../../../../assets/icon.png'
import iconPicture from '../../../images/logo/logo.png'

const socket = io("http://192.168.1.135:4010");

interface LiveChatDisplayProps {
  username: string;
  message: string;
  file: File | null;
  roomMessages: any[];
  selectedRoom: string | null;
  messagesRef: React.RefObject<HTMLDivElement>;
  onSendMessage: () => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const LiveChatDisplay: React.FC<LiveChatDisplayProps> = ({
  username,
  message,
  file,
  roomMessages,
  selectedRoom,
  messagesRef,
  onSendMessage,
  setUsername,
  setMessage,
  setFile,
}) => {
    // const [chatValue , setChatValue] = useState('')

    // const handleChangeChatValue = (event: any) => {
    //   if (event.target.value === ' '){
    //     setChatValue(event.target.value.trim());

    //   }else {
    //     setChatValue(event.target.value)
    //   }
    // };

    useEffect(() => {
      // Mengisi nilai username dari localStorage saat komponen diinisialisasi
      const dataUser = JSON.parse(localStorage.getItem('dataUser') || '{}') as any;
      if (dataUser && dataUser.nama_petugas) {
        setUsername(dataUser.nama_petugas);
      }
    }, [setUsername]);



  return (
    <div className='mt-6'>
        <div className='bg-slate-600 rounded-t-md px-4 py-2 text-white flex items-center h-[50px]'>
          <img src={iconPicture} className='w-10 h-10'></img>
          <div className='flex-col py-2'>
            {/* <p className='pl-2 box-border'>{data.nama_lokasi_lemasmil}</p> */}
            <p className='pl-2 text-[14px] font-light'>Petugas {username}</p>
          </div>
        </div>
        <ChatMessages roomMessages={roomMessages} selectedRoom={selectedRoom} messagesRef={messagesRef} />
        <Input
          onSendMessage={onSendMessage}
          message={message}
          setFile={setFile}
          setMessage={setMessage}
        />
    </div>
  )
}

export default LiveChatDisplay