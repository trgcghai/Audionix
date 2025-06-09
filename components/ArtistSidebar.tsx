"use client";

import * as React from "react";
import { Disc, Music2 } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import LinkLogo from "@/app/_components/LinkLogo";

const navItems = [
  {
    title: "Tracks",
    url: "#",
    icon: Music2,
    items: [
      {
        title: "My Tracks",
        url: "/tracks",
      },
      {
        title: "Upload New",
        url: "/tracks/upload",
      },
    ],
  },
  {
    title: "Albums",
    url: "#",
    icon: Disc,
    items: [
      {
        title: "My Albums",
        url: "/albums",
      },
      {
        title: "Release New Album",
        url: "/albums/create",
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="p-4 pb-0 flex items-center justify-start">
        <LinkLogo href="/home" />
      </div>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
