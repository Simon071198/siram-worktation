import React from 'react';
import {
  TbLayoutBottombarExpand as BottomExpand,
  TbLayoutBottombarCollapse as BottomHide,
  TbLayoutSidebarLeftCollapse as SidebarHide,
  TbLayoutSidebarLeftExpand as SidebarExpand,
  TbLayoutSidebarRightCollapse as RightHide,
  TbLayoutSidebarRightExpand as RightExpand,
} from 'react-icons/tb';

const KontrolHideUnhide = (props: any) => {
  const {
    sidebarKamera,
    buttonSidebarKamera,

    bottomKamera,
    buttonBottomKamera,

    rightKamera,
    buttonRightKamera,
  } = props;

  return (
    <div className="flex bg-white py-1 px-4 rounded-l-full">
      <button onClick={buttonSidebarKamera}>
        {sidebarKamera ? (
          <SidebarExpand className="w-6 h-6 text-black"></SidebarExpand>
        ) : (
          <SidebarHide className="w-6 h-6 text-black"></SidebarHide>
        )}
      </button>

      <button onClick={buttonBottomKamera}>
        {bottomKamera ? (
          <BottomHide className="w-6 h-6 text-black"></BottomHide>
        ) : (
          <BottomExpand className="w-6 h-6 text-black"></BottomExpand>
        )}
      </button>

      <button onClick={buttonRightKamera}>
        {rightKamera ? (
          <RightHide className="w-6 h-6 text-black"></RightHide>
        ) : (
          <RightExpand className="w-6 h-6 text-black"></RightExpand>
        )}
      </button>
    </div>
  );
};

export default KontrolHideUnhide;
