import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Progress",
    path: "/founder/progress",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Library",
    path: "/founder/library",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "My Profile",
    path: "/founder",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
];
