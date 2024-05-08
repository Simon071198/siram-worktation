import React, { useRef, useState } from 'react';

interface InputProps {
  onSendMessage: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setBase64Image: React.Dispatch<React.SetStateAction<string | null>>;
  message: string; // Perhatikan bahwa tipe data message disesuaikan
}

const InputChat: React.FC<InputProps> = ({
  onSendMessage,
  setMessage,
  setFile,
  setBase64Image,
  message,
}) => {
  const [haveImage, setHaveImage] = useState(false);
  const handleGambar = (e: any) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        // Mengubah gambar menjadi base64
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
          const base64Image = reader.result as string;
          console.log('Base64:', base64Image);
          // Mengatur file dan base64 ke state
          setFile(selectedFile);
          setBase64Image(base64Image);
          setHaveImage(true);
        };
        reader.onerror = () => {
          console.error('Error converting image to base64');
        };
      } else {
        alert('Hanya gambar yang diizinkan!');
      }
    }
  };
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && event.shiftKey) {
      setMessage((prevValue: any) => prevValue);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      onSendMessage();
    }
  };

  // Untuk fitur upload
  const imgInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImgClick = () => {
    if (imgInputRef.current) {
      imgInputRef.current.click();
    }
  };

  const handleDocClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      {haveImage ? (
        <div className='flex bg-red-600'>
          <div className=" bg-white rounded-b-md items-center flex justify-between gap-4 shadow-inner overflow-hidden">
            <button
              onClick={() => {
                setBase64Image(null);
                setHaveImage(false);
              }}
              className="mx-2 px-4 py-1 bg-red-600 text-white rounded-md hover:opacity-60"
            >
              Cancel
            </button>
  
            <button
              onClick={onSendMessage}
              className="mx-2 px-4 py-1 bg-slate-600 text-white rounded-md hover:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className=" bg-white rounded-b-md items-center flex justify-between gap-4 shadow-inner overflow-hidden">
            <textarea
              className="px-4 py-2 w-[100%] outline-none border-none text-black h-[50px] resize-none"
              placeholder="Type a message...."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            ></textarea>
  
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              ref={fileInputRef}
              accept=".pdf, .doc, .docx"
              className="hidden"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer"
              onClick={handleDocClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
  
            <input
              type="file"
              accept="image/*"
              ref={imgInputRef}
              className="hidden"
              onChange={handleGambar}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer"
              onClick={handleImgClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
  
            <button
              onClick={haveImage ? handleGambar : onSendMessage}
              className="mx-2 px-4 py-1 bg-slate-600 text-white rounded-md hover:opacity-60"
            >
              Send
            </button>
          </div>
        </>
      )}
    </>
  );
  

};

export default InputChat;
