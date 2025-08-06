"use client";

import LoaderSpin from "@/components/common/LoaderSpin";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const ArtistPortalPage = () => {
  const router = useRouter();
  const hasRedirected = useRef(false); // đảm bảo chỉ redirect 1 lần

  useEffect(() => {
    if (!hasRedirected.current) {
      hasRedirected.current = true;
      router.push("/artist-tracks");
    }
  }, [router]);

  return <LoaderSpin />;
};
export default ArtistPortalPage;
