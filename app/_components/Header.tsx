"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
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

export default function MainHeader() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    if (!searchTerm.trim()) return;

    router.push(`/search/${searchTerm}`);
  };

  return (
    <header className="relative top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out backdrop-blur-sm px-4 py-2">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-600 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  alt="logo"
                  src={"/audionix_logo_short.png"}
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
              </motion.div>
            </Link>
          </div>

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
                  },
                }}
              />
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
