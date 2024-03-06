// DisplayChat.tsx
import React from "react";
import ChatMessages from "./ChatMessages";
import Input from "./Input";

interface DisplayChatProps {
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

const DisplayChat: React.FC<DisplayChatProps> = ({
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
  return (
    <div className="w-2/3 border-4 border-gray-300 p-4 rounded overflow-y-auto">
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
      <ChatMessages roomMessages={roomMessages} selectedRoom={selectedRoom} messagesRef={messagesRef} />
      <Input
        onSendMessage={onSendMessage}
        message={message}
        setFile={setFile}
        setMessage={setMessage}
      />
    </div>
  );
};

export default DisplayChat;
