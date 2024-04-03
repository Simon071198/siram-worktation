import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import { time } from 'console';

interface ChatMessagesProps {
  roomMessages: any[];
  selectedRoom: string | null;
  messagesRef: React.RefObject<HTMLDivElement>;
  base64Image: string | null;
}

const Messages: React.FC<ChatMessagesProps> = ({
  roomMessages,
  selectedRoom,
  base64Image,
  messagesRef,
}) => {
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
  const [adaImage, setAdaImage] = useState(false);

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

  console.log(roomMessages, 'message room');

  roomMessages.forEach((message: any) => {
    const content = message.message;
    const from = message.username;
    const foto_wajah = message.foto_wajah;
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
      foto_wajah: foto_wajah,
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
            foto_wajah={data.foto_wajah}
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

  // useEffect(() => {
  //   if (base64Image !== null) {
  //     setAdaImage(true);
  //     console.log('ada gambar', base64Image);
  //   }
  // }, [base64Image]);

  return (
    <>
      {adaImage ? (
        <>
          <div className='bg-slate-200 p-[10px] h-[490px] overflow-hidden'>
            <div className='bg-slate-200 h-[490px] flex justify-center items-center overflow-hidden'>
              <img src={base64Image} alt='gambar' className='h-[350px]' />
            </div>
          </div>
        </>
      ) : (
        <div
          ref={messagesContainerRef}
          className='bg-slate-200 p-[10px] h-[490px] overflow-scroll'
        >
          {messageGroups}
        </div>
      )}
    </>
  );
};

export default Messages;
