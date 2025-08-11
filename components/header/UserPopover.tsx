"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

interface UserPopoverProps {
  user: UserSliceState;
}

export default function UserPopover({ user }: UserPopoverProps) {
  const { handleLogout } = useLogout();
  const router = useRouter();
  const pathname = usePathname();

  const isAtArtistPortal = useMemo(
    () => pathname.includes("/artist-"),
    [pathname],
  );

  const goToProfile = () => {
    console.log("Go to profile. (Not implemented yet)");
  };

  const goToSettings = () => {
    console.log("Go to settings. (Not implemented yet)");
  };

  const goToArtistPortal = () => {
    router.push("/artist-home");
  };

  const goToUser = () => {
    router.push("/");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-auto items-center gap-3 px-3 py-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={"/audionix_logo_short.png"} alt={user.username} />
            <AvatarFallback className="text-sm">
              {user.username
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{user.username}</span>
          <ChevronDown className="text-muted-foreground h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={"/audionix_logo_short.png"}
                alt={user.username}
              />
              <AvatarFallback className="text-lg">
                {user.username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
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
          <Button
            variant="ghost"
            className="h-auto w-full justify-start gap-2 px-3 py-2"
            onClick={goToProfile}
          >
            <User className="h-4 w-4" />
            <span className="text-sm">Profile</span>
          </Button>
          <Button
            variant="ghost"
            className="h-auto w-full justify-start gap-2 px-3 py-2"
            onClick={goToSettings}
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm">Setting</span>
          </Button>
        </div>

        <Separator />

        <div className="p-1">
          {isAtArtistPortal ? (
            <Button
              variant="ghost"
              className="h-auto w-full justify-start gap-2 px-3 py-2"
              onClick={goToUser}
            >
              <Headphones className="h-4 w-4" />
              <span className="text-sm capitalize">Change to user</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="h-auto w-full justify-start gap-2 px-3 py-2"
              onClick={goToArtistPortal}
            >
              <Mic className="h-4 w-4" />
              <span className="text-sm capitalize">Change to artist</span>
            </Button>
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
