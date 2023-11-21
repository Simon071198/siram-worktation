import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import { time } from 'console';

interface ChatMessagesProps {
    roomMessages: any[];
    selectedRoom: string | null;
    messagesRef: React.RefObject<HTMLDivElement>;
  }

const Messages: React.FC<ChatMessagesProps> = ({ roomMessages, selectedRoom, messagesRef }) => {
  useEffect(() => {
    if (selectedRoom) {
      // Fetch or listen for messages for the selected room
    }
  }, [selectedRoom]);

  const namaBulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  {
    /* ScrollToBottom Start*/
  }

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  {
    /* ScrollToBottom End */
  }

  {
    /* DATE KONVERT START */
  }

  const newMessage: any = [];

  console.log(roomMessages,'message room')

  roomMessages.forEach((message: any) => {
    const content = message.message;
    const from = message.username;
    // const picture = message.picture;

    const startDate = new Date(message.timestamp);
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - startDate.getTime();
    const diffInDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    const bulanName = namaBulan[startDate.getMonth()];
    let timeAgoString = '';

    if (diffInDays > 0) {
      timeAgoString = `${startDate.getDate()} ${bulanName} ${startDate.getFullYear()}`;
    } else {
      timeAgoString = 'Today';
    }

    const jam = startDate.getHours().toString().padStart(2, '0');
    const menit = startDate.getMinutes().toString().padStart(2, '0');
    const waktuChat = `${jam}:${menit}`;

    const newArray = {
      content: content,
      from: from,
      timeAgoString: timeAgoString,
      // picture : picture,
      // waktuChat: waktuChat,
      // timeStamp: message.timestamp,
    };

    // console.log('content',content)

    // console.log('---------');
    // console.log(newArray);

    newMessage.push(newArray);
  });

  console.log('NEW ARRAY', newMessage);

  {
    /* DATE KONVERT START */
  }
  const messagesByDate: any = {};

  {
    /* MEMBUAT ARRAY BARU DARI DATA newMessage*/
  }
  newMessage.forEach((message: any) => {
    const date = message.timeAgoString; 
    if (!messagesByDate[date]) {
      messagesByDate[date] = [];
    }
    messagesByDate[date].push(message);
  });

  console.log('SECOND ARRAY', messagesByDate);

  const messageGroups = Object.keys(messagesByDate).map((date) => {
    return (
      <div key={date}>
        <div className="w-full justify-center flex">
          <p className="bg-slate-600 mb-3 rounded-full px-3 w-fit text-white text-[10px] font-light">
            {date}
          </p>
        </div>
        {messagesByDate[date].map((data: any, index: any) => (
          <Message
            key={index}
            content={data.content}
            from={data.from}
            // picture = {data.picture}
            // waktuChat={data.waktuChat}
          />
        ))}
      </div>
    );
  });

  useEffect(() => {
    scrollToBottom();
  }, [messageGroups]);

  return (
    <div
      ref={messagesContainerRef}
      className="bg-slate-200 p-[10px] h-[490px] overflow-scroll"
    >
      {messageGroups}
    </div>
  );
};

export default Messages;


// 
// import React, { useEffect } from "react";

// interface ChatMessagesProps {
//   roomMessages: any[];
//   selectedRoom: string | null;
//   messagesRef: React.RefObject<HTMLDivElement>;
// }

// const ChatMessages: React.FC<ChatMessagesProps> = ({ roomMessages, selectedRoom, messagesRef }) => {
//   useEffect(() => {
//     if (selectedRoom) {
//       // Fetch or listen for messages for the selected room
//     }
//   }, [selectedRoom]);

//   return (
//     <div
//       className="h-[70vh] w-full border-4 border-gray-300 p-4 rounded overflow-y-auto"
//       ref={messagesRef as React.RefObject<HTMLDivElement>}
//     >
//       {roomMessages.map((roomMessage: any, index: any) => (
//         <div
//           key={index}
//           className={`my-2 ${
//             roomMessage.username === "username" ? "justify-end text-right" : "justify-start"
//           }`}
//         >
//           <div
//             className={`rounded p-2 ${
//               roomMessage.username === "username" ? "bg-green-100 text-right" : "bg-blue-100"
//             }`}
//           >
//             <p
//               className={`font-bold ${
//                 roomMessage.username === "username" ? "text-green-900" : "text-blue-900"
//               }`}
//             >
//               {roomMessage.username}
//             </p>
//             <p
//               className={`${
//                 roomMessage.username === "username" ? "text-green-900" : "text-blue-900"
//               }`}
//             >
//               {roomMessage.message}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatMessages;
