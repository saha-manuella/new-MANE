import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Bell, LogOut, LogOutIcon } from "lucide-react";
import logo from "../../assets/Images/Logo.png";
import NotificationBell from "./NotificationBell";
import LogoutButton from "./LogoutButton";


const AppNav = () => {
  return (
    <div className="bg-yellow-500 z-50 p-3  sticky top-0 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-x-5">
        <SidebarTrigger />
        <img src={logo} alt="Logo" width={110} />
      </div>

      <div className="flex gap-x-8 mr-4">
        <NotificationBell />
        <LogoutButton />
      </div>
    </div>
  );
};




export default AppNav;
