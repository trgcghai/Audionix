"use client";

import * as React from "react";
import { Disc, Music2 } from "lucide-react";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { NavMain } from "@/components/ui/nav-main";

const navItems = [
  {
    title: "Tracks",
    url: "#",
    icon: Music2,
    isActive: true,
    items: [
      {
        title: "My Tracks",
        url: "/artist-tracks",
      },
      {
        title: "Upload New",
        url: "/artist-tracks/upload",
      },
    ],
  },
  {
    title: "Albums",
    url: "#",
    icon: Disc,
    isActive: true,
    items: [
      {
        title: "My Albums",
        url: "/artist-albums",
      },
      {
        title: "Release New Album",
        url: "/artist-albums/create",
      },
    ],
  },
];

export default function ArtistSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
