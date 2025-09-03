"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useLogout } from "@/hooks/useAuthUser";
import { UserSliceState } from "@/store/slices/userSlice";
import {
  ChevronDown,
  Headphones,
  LogOut,
  Mic,
  Settings,
  User,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface UserPopoverProps {
  user: UserSliceState;
}

export default function UserPopover({ user }: UserPopoverProps) {
  const { handleLogout } = useLogout();
  const pathname = usePathname();

  const isAtArtistPortal = useMemo(
    () => pathname.includes("/artist-"),
    [pathname],
  );

  const hasArtistRole = useMemo(
    () => user.roles.includes("artist"),
    [user.roles],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-auto items-center gap-3 px-3 py-2"
        >
          <Avatar className="h-8 w-8">
            <Image
              src={(user.avatar && user.avatar[0].url) || ""}
              alt={user.username}
              width={(user.avatar && user.avatar[0].width) || 500}
              height={(user.avatar && user.avatar[0].height) || 500}
              className="rounded-full object-cover aspect-square"
            />
            <AvatarFallback className="text-sm">
              <User2 />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{user.username}</span>
          <ChevronDown className="text-muted-foreground h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-14 w-14">
              <Image
                src={(user.avatar && user.avatar[0].url) || ""}
                alt={user.username}
                width={(user.avatar && user.avatar[0].width) || 500}
                height={(user.avatar && user.avatar[0].height) || 500}
                className="rounded-full object-cover aspect-square"
              />
              <AvatarFallback className="text-lg">
                <User2 />
              </AvatarFallback>
            </Avatar>
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
              <User className="h-4 w-4" />
              <span className="text-sm">Profile</span>
            </Button>
          </Link>
          <Link href="/settings">
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

        {hasArtistRole && (
          <>
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
                <Link href="/artist-home">
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
          </>
        )}

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
