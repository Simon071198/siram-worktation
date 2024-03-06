// ChatApp.tsx
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import DisplayChat from "./DisplayChat";
import io from "socket.io-client";

const socket = io("http://192.168.1.135:4010");

const ChatApp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [roomList, setRoomList] = useState<any[]>([]);
  const [roomMessages, setRoomMessages] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

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
    <div className="flex h-screen bg-gray-300">
      <Sidebar
        roomList={roomList}
        selectedRoom={selectedRoom}
        onRoomClick={(roomID: string) => {
          setSelectedRoom(roomID);
          socket.emit("joinRoom", roomID);
        }}
      />
      <DisplayChat
        username={username}
        message={message}
        file={file}
        roomMessages={roomMessages}
        selectedRoom={selectedRoom}
        messagesRef={messagesRef}
        onSendMessage={handleSendMessage}
        setUsername={setUsername}
        setMessage={setMessage}
        setFile={setFile}
      />
    </div>
  );
};

export default ChatApp;
