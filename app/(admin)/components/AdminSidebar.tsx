import LinkLogo from "@/components/common/LinkLogo";
import { NavMain } from "@/components/ui/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import {
  Album,
  BarChart3,
  Gauge,
  ListMusic,
  Music,
  Settings,
  UserCog,
} from "lucide-react";
import NextLink from "next/link";
import * as React from "react";

const navItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: BarChart3,
    isActive: true,
    items: [
      {
        title: (
          <p className="flex items-center gap-2">
            <Gauge className="w-4 h-4" /> General
          </p>
        ),
        key: "chart-general",
        url: "/admin/dashboard",
      },
    ],
  },
  {
    title: "Management",
    url: "#",
    icon: Settings,
    isActive: true,
    items: [
      {
        title: (
          <p className="flex items-center gap-2">
            <Music className="w-4 h-4" /> Tracks
          </p>
        ),
        key: "tracks",
        url: "/admin/management/tracks",
      },
      {
        title: (
          <p className="flex items-center gap-2">
            <Album className="w-4 h-4" /> Albums
          </p>
        ),
        key: "albums",
        url: "/admin/management/albums",
      },
      {
        title: (
          <p className="flex items-center gap-2">
            <ListMusic className="w-4 h-4" /> Playlists
          </p>
        ),
        key: "playlists",
        url: "/admin/management/playlists",
      },
      {
        title: (
          <p className="flex items-center gap-2">
            <UserCog className="w-4 h-4" /> Accounts
          </p>
        ),
        key: "accounts",
        url: "/admin/management/accounts",
      },
    ],
  },
];

export default function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="flex items-center justify-start p-4 pb-0 bg-card gap-4">
        <LinkLogo href="/admin/dashboard" />
        <NextLink href="/admin/dashboard" className="text-lg font-bold">
          Audionix
        </NextLink>
      </div>
      <SidebarContent className="!bg-card">
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
