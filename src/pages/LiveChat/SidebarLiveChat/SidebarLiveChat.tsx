"use client";
import React, { useState } from "react";
import IconProfile from '../../../images/logo/logo.png'
import SearchChat from './SearchChat';

interface SidebarLiveChatProps {
  roomList: any[];
  selectedRoom: string | null;
  onRoomClick: (roomID: string) => void;
}

function SidebarLiveChat({ roomList, selectedRoom, onRoomClick }: SidebarLiveChatProps) {
  const [isActiveButton, setIsActiveButton] = useState<number | null>(null);
  const [isActiveChat, setIsActiveChat] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filtered = roomList.filter((item: { nama_lokasi_lemasmil: string }) =>
    item.nama_lokasi_lemasmil.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="mt-6">
      <div className="bg-slate-600 rounded-md">
        <div className="bg-slate-600 rounded-t-md p-[10px] text-white flex items-center h-[50px]">
          <label className="pl-2">Chat</label>
        </div>

        <SearchChat
          handleChange={handleChange}
          handleClose={handleCloseSearch}
          searchTerm={searchTerm}
        />

        <div className="overflow-scroll overflow-x-hidden  h-[70vh] pt-2 px-2">
          {filtered.length === 0 ? (
            <div className="text-center mt-4">
              <p className="font-bold text-slate-300">Nama tidak ada</p>
            </div>
          ) : (
            filtered.map((data: any, index: number) => (
              <React.Fragment key={index}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onRoomClick(data.lokasi_lemasmil_id);
                    setIsActiveButton(index);
                    setIsActiveChat(true);
                  }}
                  className={`w-full hover:bg-slate-400  rounded-lg text-white hover:text-black  ${
                    isActiveButton === index ? 'bg-slate-400' : ''
                  } `}
                >
                  <div className="px-2 flex items-center ">
                    <img
                      className="w-15 h-15 rounded-full"
                      src={IconProfile}
                      alt="iconProfile"
                    />
                    <div className="ml-4 items-center">
                      <div className="flex items-center">
                        <label className="font-semibold ">{data.nama_lokasi_lemasmil}</label>
                      </div>
                    </div>
                  </div>
                </button>
                <div className="border-b items-center mb-2 opacity-30"></div>
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SidebarLiveChat;
