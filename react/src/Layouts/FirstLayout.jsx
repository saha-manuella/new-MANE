import AppNav from "@/components/Custom/AppNav";
import AppSideBar from "@/components/Custom/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const FirstLayout = () => {
  return (
    <SidebarProvider className="flex-col min-h-screen " defaultOpen={false}>
      <AppNav />

      <div className="flex grow relative z-0">
        {/* <div className="absolute left-0"> */}
        <AppSideBar />
        {/* </div> */}

        <Outlet />
      </div>
    </SidebarProvider>
  );
};

export default FirstLayout;
