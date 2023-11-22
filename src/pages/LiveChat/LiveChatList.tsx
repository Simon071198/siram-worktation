// ChatApp.tsx
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import SidebarLiveChat from "./SidebarLiveChat/SidebarLiveChat";
import BeforeActiveChat from "./Chat/BeforeActiveChat";
import LiveChatDisplay from "./Chat/LiveChatDisplay";

const socket = io("http://192.168.1.135:4010");

const LiveChatList: React.FC = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [roomList, setRoomList] = useState<any[]>([]);
  const [roomMessages, setRoomMessages] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [isActiveChat, setIsActiveChat] = useState(false);


  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }

    socket.on("chat-message", (data) => {
      if (data.roomName === selectedRoom) {
        console.log(data, "chat-message");
        setRoomMessages((prevMessages) => [...prevMessages, data]);
      }
    });
  }, [selectedRoom]);

  socket.on("connected", (results) => {
    setRoomList(results);
  });

  socket.on("roomMessages", (data) => {
    console.log(data, "roomMessages");
    setRoomMessages(data);
  });

  const handleSendMessage = () => {
    if (username && message) {
      if (file) {
        const fileName = file.name;
        socket.emit("message", {
          username,
          message,
          file,
          fileName,
          roomName: selectedRoom,
        });
      } else {
        socket.emit("message", { username, message, roomName: selectedRoom });
      }
      setMessage("");
      setFile(null);
    }
  };

  return (
    <div className="container py-[16px] ">
      <div className="w-full bg-slate-600 px-4 py-4 rounded-md">
        <label className="font-bold text-white">Live Chat</label>
      </div>
      <div className="grid grid-cols-7 gap-x-4 box-border">
        <div className="col-span-2 w-full ">
          <SidebarLiveChat
            roomList={roomList}
            selectedRoom={selectedRoom}
            onRoomClick={(roomID: string) => {
              setSelectedRoom(roomID);
              socket.emit("joinRoom", roomID);
            }}
          /> 
        </div> 
        <div className="col-span-5 w-full">
          {/* {isActiveChat ? ( */}
            <LiveChatDisplay
            username={username}
            // nama={nama}
            message={message}
            file={file}
            roomMessages={roomMessages}
            selectedRoom={selectedRoom}
            messagesRef={messagesRef}
            onSendMessage={handleSendMessage}
            setUsername={setUsername}
            // setNamaPetugas={setNamaPetugas}
            setMessage={setMessage}
            setFile={setFile}
          />
          {/* ) : (
            <BeforeActiveChat />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default LiveChatList;
