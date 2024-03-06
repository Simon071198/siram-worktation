// ChatMessages.tsx
import React, { useEffect } from "react";

interface ChatMessagesProps {
  roomMessages: any[];
  selectedRoom: string | null;
  messagesRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ roomMessages, selectedRoom, messagesRef }) => {
  useEffect(() => {
    if (selectedRoom) {
      // Fetch or listen for messages for the selected room
    }
  }, [selectedRoom]);

  return (
    <div
      className="h-[80vh] w-full border-4 border-gray-300 p-4 rounded overflow-y-auto"
      ref={messagesRef as React.RefObject<HTMLDivElement>}
    >
      {roomMessages.map((roomMessage: any, index: any) => (
        <div
          key={index}
          className={`my-2 ${
            roomMessage.username === "username" ? "justify-end text-right" : "justify-start"
          }`}
        >
          <div
            className={`rounded p-2 ${
              roomMessage.username === "username" ? "bg-green-100 text-right" : "bg-blue-100"
            }`}
          >
            <p
              className={`font-bold ${
                roomMessage.username === "username" ? "text-green-900" : "text-blue-900"
              }`}
            >
              {roomMessage.username}
            </p>
            <p
              className={`${
                roomMessage.username === "username" ? "text-green-900" : "text-blue-900"
              }`}
            >
              {roomMessage.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
