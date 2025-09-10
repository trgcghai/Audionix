import LinkLogo from "@/components/common/LinkLogo";
import { NavMain } from "@/components/ui/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { Album, Disc, ListMusic, Music2, User2, UserCog } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const navItems = [
  {
    title: "Tracks",
    url: "#",
    icon: Music2,
    isActive: true,
    items: [
      {
        title: (
          <p className="flex items-center gap-2">
            <ListMusic className="w-4 h-4" /> My Tracks
          </p>
        ),
        key: "my-tracks",
        url: "/artist/tracks",
      },
      {
        title: (
          <p className="flex items-center gap-2">
            <Music2 className="w-4 h-4" /> Upload New
          </p>
        ),
        key: "upload-track",
        url: "/artist/tracks/upload",
      },
    ],
  },
  {
    title: "Albums",
    url: "#",
    icon: Album,
    isActive: true,
    items: [
      {
        title: (
          <p className="flex items-center gap-2">
            <Disc className="w-4 h-4" /> My Albums
          </p>
        ),
        key: "my-albums",
        url: "/artist/albums",
      },
      {
        title: (
          <p className="flex items-center gap-2">
            <Album className="w-4 h-4" /> Release New Album
          </p>
        ),
        key: "release-album",
        url: "/artist/albums/create",
      },
    ],
  },
  {
    title: "Profile",
    url: "#",
    icon: User2,
    isActive: true,
    items: [
      {
        title: (
          <p className="flex items-center gap-2">
            <UserCog className="w-4 h-4" /> My Profile
          </p>
        ),
        key: "my-profile",
        url: "/artist/profile",
      },
    ],
  },
];

export default function ArtistSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="flex items-center justify-start p-4 pb-0 bg-card gap-4">
        <LinkLogo href="/artist/tracks" />
        <Link href="/artist/tracks" className="text-lg font-bold">
          Audionix
        </Link>
      </div>
      <SidebarContent className="!bg-card">
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
