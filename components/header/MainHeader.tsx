"use client";

import { BadgeCheck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ModeToggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { dark } from "@clerk/themes";
import { cn } from "@/libs/utils";
import LinkLogo from "../common/LinkLogo";

export default function MainHeader({
  className = "",
  showLogo = true,
  showSearch = true,
}: MainHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    if (!searchTerm.trim()) return;

    router.push(`/search/${searchTerm}`);
  };

  return (
    <header
      className={cn(
        "relative top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out backdrop-blur-sm px-4 py-2",
        className
      )}
    >
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showLogo && <LinkLogo />}
          </div>

          {showSearch && (
            <div className="hidden md:flex relative">
              <Search className="absolute left-2.5 top-3.5 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="What do you want to play ?"
                className="p-6 pl-9 w-[180px] lg:w-[400px] h-9 rounded-full placeholder:text-md"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <ModeToggle />

            <SignedIn>
              <UserButton
                userProfileUrl="/profile"
                userProfileMode="navigation"
                appearance={{
                  baseTheme: dark,
                  elements: {
                    userButtonPopoverCard: "!w-1/6",
                    userPreview: "!p-3",
                    userButtonPopoverActionButton: "!p-3 !gap-0",
                    userButtonPopoverCustomItemButton: "!p-3 !gap-0",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Change to artist"
                    labelIcon={<BadgeCheck className="w-4 h-4" />}
                    href="/home"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <Button
                  variant="outline"
                  className="rounded-full font-semibold"
                >
                  Log In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button
                  variant="default"
                  className="rounded-full font-semibold"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
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
