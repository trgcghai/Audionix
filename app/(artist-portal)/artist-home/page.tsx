"use client";

import LoaderSpin from "@/components/common/LoaderSpin";
import { useUserSlice } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ArtistPortalPage = () => {
  const router = useRouter();
  const { roles } = useUserSlice();

  useEffect(() => {
    if (roles && roles.includes("artist")) {
      router.push("/artist-tracks");
    } else {
      router.push("/");
    }
  }, [roles, router]);

  return <LoaderSpin />;
};
export default ArtistPortalPage;
