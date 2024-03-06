// Input.tsx
import React from "react";

interface InputProps {
  onSendMessage: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  message: string; // Perhatikan bahwa tipe data message disesuaikan
}

const Input: React.FC<InputProps> = ({ onSendMessage, setMessage, setFile, message }) => {
  return (
    <div className="mt-4 flex">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded text-cyan-900"
        placeholder="Message"
        value={message}  // Tambahkan nilai dan handler onChange
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="file"
        className="p-2 bg-blue-500 text-white rounded ml-2"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button className="p-2 bg-blue-500 text-white rounded ml-2" onClick={onSendMessage}>
        Send
      </button>
    </div>
  );
};

export default Input;
