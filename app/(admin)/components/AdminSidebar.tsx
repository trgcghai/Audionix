"use client";

import LinkLogo from "@/components/common/LinkLogo";
import { NavMain } from "@/components/ui/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { Settings } from "lucide-react";
import * as React from "react";

const navItems = [
  {
    title: "Management",
    url: "#",
    icon: Settings,
    items: [
      {
        title: "Tracks",
        url: "/dashboard/tracks",
      },
      {
        title: "Albums",
        url: "/dashboard/albums",
      },
      {
        title: "Users",
        url: "/dashboard/users",
      },
      {
        title: "Playlists",
        url: "/dashboard/playlists",
      },
    ],
  },
];

export default function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="flex items-center justify-start p-4 pb-0">
        <LinkLogo href="/dashboard" />
      </div>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
