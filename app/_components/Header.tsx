"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LogOutIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "../_hooks/redux";
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";

export default function MainHeader() {
  const user = useAppSelector((state) => state.user);

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
              placeholder="What do you want to play ?"
              className="p-6 pl-9 w-[180px] lg:w-[400px] h-9 rounded-full placeholder:text-md"
            />
          </div>

          <div className="flex items-center space-x-2">
            <ModeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="User"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        John Doe
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john.doe@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" className="m-2 p-0">
                    <SignOutButton>
                      <Button
                        variant="destructive"
                        className="w-full justify-start"
                      >
                        <LogOutIcon className="mr-2 h-4 w-4 dark:text-white" />
                        Log out
                      </Button>
                    </SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
