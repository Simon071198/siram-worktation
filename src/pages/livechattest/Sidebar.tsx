// Sidebar.tsx
import React from "react";

interface SidebarProps {
  roomList: any[];
  selectedRoom: string | null;
  onRoomClick: (roomID: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ roomList, selectedRoom, onRoomClick }) => {
  return (
    <div className="h-[80vh] w-1/3 border-4 border-gray-500 p-4 rounded overflow-y-auto">
      {roomList.map((data, index) => (
        <p
          key={index}
          className={`${
            data.lokasi_lemasmil_id === selectedRoom ? "bg-green-200" : ""
          } p-2 font-extrabold text-lg rounded text-cyan-800 cursor-pointer hover:bg-green-300 ease-in-out w-full  `}
          onClick={(e) => {
            e.preventDefault();
            onRoomClick(data.lokasi_lemasmil_id);
          }}
        >
          {data.nama_lokasi_lemasmil}
        </p>
      ))}
    </div>
  );
};

export default Sidebar;
