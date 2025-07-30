"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ModeToggle";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";
import LinkLogo from "../common/LinkLogo";
import Link from "next/link";
import { useAppSelector } from "@/hooks/redux";
import UserPopover from "./UserPopover";

export default function MainHeader({
  className = "",
  showLogo = true,
  showSearch = true,
}: MainHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const user = useAppSelector((state) => state.user);

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    if (!searchTerm.trim()) return;

    router.push(`/search/${searchTerm}`);
  };

  return (
    <header
      className={cn(
        "relative top-0 right-0 left-0 z-50 px-4 py-2 backdrop-blur-sm transition-all duration-300 ease-in-out",
        className,
      )}
    >
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showLogo && <LinkLogo />}
          </div>

          {showSearch && (
            <div className="relative hidden md:flex">
              <Search className="absolute top-3.5 left-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="What do you want to play ?"
                className="placeholder:text-md h-9 w-[180px] rounded-full p-6 pl-9 lg:w-[400px]"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <ModeToggle />

            {!user.isAuthenticated && (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" className="rounded-full">
                    Log In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="rounded-full">Register</Button>
                </Link>
              </>
            )}
            {user.isAuthenticated && <UserPopover user={user} />}
          </div>
        </div>
      </div>
    </header>
  );
}

interface MainHeaderProps {
  showSearch?: boolean;
  showLogo?: boolean;
  className?: string;
}
