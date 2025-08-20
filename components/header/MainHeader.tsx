"use client";

import { ModeToggle } from "@/components/common/theme/ModeToggle";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";
import LinkLogo from "../common/LinkLogo";
import UserInfo from "@/components/header/UserInfo";
import SearchSection from "@/components/header/SearchSection";

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
            <SearchSection
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
            />
          )}

          <div className="flex items-center space-x-2">
            <ModeToggle />

            <UserInfo />
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
