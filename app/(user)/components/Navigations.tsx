"use client";

import { Button } from "@/components/ui/button";
import { Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigations = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-2">
      <Link href="/profile">
        <Button
          variant={pathname.includes("profile") ? "default" : "ghost"}
          className="w-full flex items-center justify-start gap-3 px-3 py-2 rounded-md text-left transition-colors"
        >
          <User className="w-5 h-5" />
          Profile
        </Button>
      </Link>
      <Link href="/setting">
        <Button
          variant={pathname.includes("setting") ? "default" : "ghost"}
          className="w-full flex items-center justify-start gap-3 px-3 py-2 rounded-md text-left transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Button>
      </Link>
    </nav>
  );
};
export default Navigations;
