"use client";

import LoaderSpin from "@/components/common/LoaderSpin";
import { useRouter } from "next/navigation";

const ArtistPortalPage = () => {
  const router = useRouter();

  router.push("/artist-tracks");

  return <LoaderSpin />;
};
export default ArtistPortalPage;
