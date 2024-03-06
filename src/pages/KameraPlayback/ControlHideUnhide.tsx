import React from 'react';
import {
  TbLayoutSidebarLeftCollapse as SidebarHide,
  TbLayoutSidebarLeftExpand as SidebarExpand,
  TbLayoutBottombarExpand as BottomExpand,
  TbLayoutBottombarCollapse as BottomHide,
} from 'react-icons/tb';

const ControlHideUnhide = (props: any) => {
  const {
    sidebarKamera,
    buttonSidebarKamera,

    // bottomKamera,
    // buttonBottomKamera,
  } = props;

  return (
    <div className="flex bg-white py-2 px-3 rounded-r-full">
      <button onClick={buttonSidebarKamera}>
        {sidebarKamera ? (
          <SidebarExpand className="w-6 h-6 text-black"></SidebarExpand>
        ) : (
          <SidebarHide className="w-6 h-6 text-black"></SidebarHide>
        )}
      </button>

      {/* <button onClick={buttonBottomKamera}>
        {bottomKamera ? (
          <BottomHide className="w-6 h-6 text-black"></BottomHide>
        ) : (
          <BottomExpand className="w-6 h-6 text-black"></BottomExpand>
        )}
      </button> */}
    </div>
  );
};

export default ControlHideUnhide;
