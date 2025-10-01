import LinkLogo from "@/components/common/LinkLogo";
import { NavMain } from "@/components/ui/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import {
  Album,
  FileText,
  HelpCircle,
  LifeBuoy,
  ListMusic,
  Mail,
  Music,
  Settings,
  Shapes,
  User2,
  UserCog,
  Users,
} from "lucide-react";
import NextLink from "next/link";
import * as React from "react";

const navItems = [
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
            <Users className="w-4 h-4" /> Users
          </p>
        ),
        key: "users",
        url: "/admin/management/users",
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
            <User2 className="w-4 h-4" /> Artists
          </p>
        ),
        key: "artists",
        url: "/admin/management/artists",
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
      {
        title: (
          <p className="flex items-center gap-2">
            <Shapes className="w-4 h-4" /> Genres
          </p>
        ),
        key: "genres",
        url: "/admin/management/genres",
      },
    ],
  },
  {
    title: "Support",
    url: "#",
    icon: LifeBuoy,
    isActive: true,
    items: [
      {
        title: (
          <p className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" /> FAQ
          </p>
        ),
        key: "faq",
        url: "/admin/support/faq",
      },
      {
        title: (
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> Tickets
          </p>
        ),
        key: "tickets",
        url: "/admin/support/tickets",
      },
      {
        title: (
          <p className="flex items-center gap-2">
            <FileText className="w-4 h-4" /> Email templates
          </p>
        ),
        key: "email-templates",
        url: "/admin/support/email-templates",
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
