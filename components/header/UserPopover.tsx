"use client";

import { User } from "@/app/types/model";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useLogout } from "@/hooks/useAuthUser";
import {
  ChevronDown,
  Headphones,
  LogOut,
  Mic,
  Settings,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface UserPopoverProps {
  user: User;
  roles: string[];
}

export default function UserPopover({ user, roles }: UserPopoverProps) {
  const { handleLogout } = useLogout();
  const pathname = usePathname();

  const isAtArtistPortal = useMemo(
    () => pathname.includes("/artist/"),
    [pathname],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-auto items-center gap-3 px-3 py-2"
        >
          {user.avatar.length > 0 ? (
            <Image
              src={(user.avatar && user.avatar[0]?.url) || ""}
              alt={user.username}
              width={(user.avatar && user.avatar[0]?.width) || 500}
              height={(user.avatar && user.avatar[0]?.height) || 500}
              className="rounded-full object-cover aspect-square h-8 w-8"
            />
          ) : (
            <div className="rounded-full bg-primary flex h-8 w-8 items-center justify-center">
              <User2 className="text-sm" />
            </div>
          )}
          <span className="text-sm font-medium">{user.username}</span>
          <ChevronDown className="text-muted-foreground h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <div className="p-4">
          <div className="flex items-center gap-3">
            {user.avatar.length > 0 ? (
              <Image
                src={(user.avatar && user.avatar[0]?.url) || ""}
                alt={user.username}
                width={(user.avatar && user.avatar[0]?.width) || 500}
                height={(user.avatar && user.avatar[0]?.height) || 500}
                className="rounded-full object-cover aspect-square h-8 w-8"
              />
            ) : (
              <div className="rounded-full bg-primary flex h-10 w-10 items-center justify-center">
                <User2 className="text-sm" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user.username}</p>
              <p className="text-muted-foreground truncate text-xs">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="p-1">
          <Link href="/profile">
            <Button
              variant="ghost"
              className="h-auto w-full justify-start gap-2 px-3 py-2"
            >
              <User2 className="h-4 w-4" />
              <span className="text-sm">Profile</span>
            </Button>
          </Link>
          <Link href="/setting">
            <Button
              variant="ghost"
              className="h-auto w-full justify-start gap-2 px-3 py-2"
            >
              <Settings className="h-4 w-4" />
              <span className="text-sm">Setting</span>
            </Button>
          </Link>
        </div>

        <Separator />

        <div className="p-1">
          {isAtArtistPortal ? (
            <Link href="/">
              <Button
                variant="ghost"
                className="h-auto w-full justify-start gap-2 px-3 py-2"
              >
                <Headphones className="h-4 w-4" />
                <span className="text-sm capitalize">Change to user</span>
              </Button>
            </Link>
          ) : (
            <Link
              href={
                roles.includes("artist") ? "/artist" : "/artist-auth/register"
              }
            >
              <Button
                variant="ghost"
                className="h-auto w-full justify-start gap-2 px-3 py-2"
              >
                <Mic className="h-4 w-4" />
                <span className="text-sm capitalize">Change to artist</span>
              </Button>
            </Link>
          )}
        </div>
        <Separator />

        <div className="p-1">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="h-auto w-full justify-start gap-2 px-3 py-2 text-red-600"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Đăng xuất</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
