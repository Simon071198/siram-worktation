import { NavLink } from 'react-router-dom';
import SidebarLiveChat from './SidebarLiveChat/SidebarLiveChat';

const LiveChatList = () => {
  return (
    <div className="container py-[16px]">
      <div className="w-full bg-slate-600 px-4 py-4 rounded-md">
        <label className="font-bold text-white">Live Chat</label>
      </div>
      <SidebarLiveChat />
    </div>
  );
};

export default LiveChatList;
