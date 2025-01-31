// Home.tsx
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://192.168.1.135:4010");

export default function Home() {
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
      <div className="w-3/4 mx-auto mt-4 p-4 border border-gray-300 rounded shadow bg-gray-200">
        <div className="flex justify-center items-center gap-4 mb-2">
          <p className="w-1/3 p-2 font-extrabold text-xl rounded text-cyan-800">
            CHAT APP SUGOI
          </p>
          <input
            type="text"
            className="w-1/3 p-2 border border-gray-300 rounded text-cyan-600"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div
            className="h-[80vh] w-1/3  border-4 border-gray-500 p-4 rounded overflow-y-auto"
            ref={messagesRef}
          >
            {roomList.map((data, index) => (
              <p
                key={index}
                className={`${
                  data.lokasi_lemasmil_id === selectedRoom ? "bg-green-200" : ""
                } p-2 font-extrabold text-lg rounded text-cyan-800 cursor-pointer hover:bg-green-300 ease-in-out w-full  `}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedRoom(data.lokasi_lemasmil_id);
                  socket.emit("joinRoom", data.lokasi_lemasmil_id);
                  console.log(data.nama_lokasi_lemasmil, "clicked");
                }}
              >
                {data.nama_lokasi_lemasmil}
              </p>
            ))}
          </div>
          <div
            className="h-[80vh] w-2/3 border-4 border-gray-300 p-4 rounded overflow-y-auto"
            ref={messagesRef}
          >
            {roomMessages.map((roomMessage, index) => (
              <div
                key={index}
                className={`my-2 ${
                  roomMessage.username === username
                    ? "justify-end text-right"
                    : "justify-start"
                }`}
              >
                <div
                  className={`rounded p-2 ${
                    roomMessage.username === username
                      ? "bg-green-100 text-right"
                      : "bg-blue-100"
                  }`}
                >
                  <p
                    className={`font-bold ${
                      roomMessage.username === username
                        ? "text-green-900"
                        : "text-blue-900"
                    }`}
                  >
                    {roomMessage.username}
                  </p>
                  <p
                    className={`${
                      roomMessage.username === username
                        ? "text-green-900"
                        : "text-blue-900"
                    }`}
                  >
                    {roomMessage.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-cyan-900"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="file"
            className="p-2 bg-blue-500 text-white rounded ml-2"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button
            className="p-2 bg-blue-500 text-white rounded ml-2"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
