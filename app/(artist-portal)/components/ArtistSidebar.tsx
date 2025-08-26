"use client";

import { NavMain } from "@/components/ui/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { Disc, Music2 } from "lucide-react";
import * as React from "react";

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
