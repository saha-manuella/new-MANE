import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { NavLink, useNavigate } from "react-router-dom";
import {
  Dock,
  FileQuestion,
  LayoutDashboard,
  MessageCircleQuestion,
  Scroll,
} from "lucide-react";

const AppSideBar = () => {
  const navigate = useNavigate();
  const Data = [
    {
      title: "Documentation",
      icon: <Dock />,
      sub: [
        {
          title: "Charte Utilisateurs",
          route: "/home/utilisateurs",
        },
        {
          title: "Charte Administrateurs",
          route: "/home/administrateurs",
        },
        {
          title: "Code Ethique",
          route: "/home/ethique",
        },
        {
          title: "Whistle blowing",
          route: "/home/whistle",
        },
        {
          title: "Notes de Services",
          // route: "/home/notes de services",
        },
      ],
    },
    {
      title: "Quizz",
      icon: <FileQuestion />,
      route: "/home/quizz",
    },
    {
      title: "Declaration",
      icon: <Scroll />,
      route: "/home/declaration",
    },
    {
      title: "FAQ",
      icon: <MessageCircleQuestion />,
      route: "/home/faq",
    },
    {
      title: "Tableau de bord",
      icon: <LayoutDashboard />,
      route: "/home/dashboard",
    },
  ];

  const TypeOne = (props) => {
    return (
      <NavLink
        to={props.route}
        className={({ isActive }) =>
          `${isActive ? "text-red-600 bg-gray-200" : ""}`
        }
      >
        <SidebarMenuItem>
          <SidebarMenuButton className="p-5 font-bold rounded-none cursor-pointer">
            {props.icon}
            {props.title}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </NavLink>
    );
  };

  const TypeTwo = (props) => {
    return (
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="p-5 font-bold rounded-none cursor-pointer">
              {props.icon}
              <p>{props.title}</p>
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub className="border-none px-0 mr-0 gap-[1px]">
              {props.sub.map((item) => (
                <SidebarMenuSubItem key={item.title}>
                  {item.title === "Notes de Services" ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="w-full">
                          <SidebarMenuSubButton
                            className={`p-5 font-bold rounded-none bg-white cursor-pointer ${
                              item.route ===
                              `/home/${window.location.pathname.split("/")[2]}`
                                ? "bg-gray-200 text-red-600"
                                : ""
                            }`}
                            onClick={() => navigate(item.route)}
                          >
                            {item.title}
                          </SidebarMenuSubButton>
                        </TooltipTrigger>
                        <TooltipContent className="right-0 bg-gray-300">
                          <p>Pas disponible pour le moment revenez plustard</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <SidebarMenuSubButton
                      className={`p-5 font-bold rounded-none bg-white cursor-pointer ${
                        item.route ===
                        `/home/${window.location.pathname.split("/")[2]}`
                          ? "bg-gray-200 text-red-600"
                          : ""
                      }`}
                      onClick={() => navigate(item.route)}
                    >
                      {item.title}
                    </SidebarMenuSubButton>
                  )}
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  };
  return (
    <Sidebar>
      <SidebarContent className="pt-[45px] overflow-hidden">
        <SidebarGroup className="px-0">
          <SidebarMenu>
            {Data.map((item) => {
              if (item.sub) {
                return <TypeTwo key={item.title} {...item} />;
              } else {
                return <TypeOne key={item.title} {...item} />;
              }
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSideBar;
