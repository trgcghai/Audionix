"use client";

import * as React from "react";
import { Settings } from "lucide-react";
import { NavMain } from "@/components/sidebar/artist/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import LinkLogo from "@/components/common/LinkLogo";

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
      <div className="p-4 pb-0 flex items-center justify-start">
        <LinkLogo href="/dashboard" />
      </div>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
