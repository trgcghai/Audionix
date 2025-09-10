"use client";

import LoaderSpin from "@/components/common/LoaderSpin";
import { useUserSlice } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdmindashboardPage = () => {
  const router = useRouter();
  const { roles } = useUserSlice();

  useEffect(() => {
    if (roles && roles.includes("admin")) {
      router.push("/admin/dashboard");
    } else {
      router.push("/");
    }
  }, [roles, router]);

  return <LoaderSpin />;
};
export default AdmindashboardPage;
