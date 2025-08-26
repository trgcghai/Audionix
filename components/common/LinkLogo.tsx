"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface LinkLogoProps {
  href?: string;
  className?: string;
}

const LinkLogo = ({ href = "/", className }: LinkLogoProps) => {
  return (
    <Link href={href} className={`flex items-center space-x-2 ${className}`}>
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
          className="rounded-full object-cover"
        />
      </motion.div>
    </Link>
  );
};
export default LinkLogo;
