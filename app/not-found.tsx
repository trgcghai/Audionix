"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Oops! Page not found.
          </h1>
          <p className="my-4 text-gray-500">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>
        <Button
          variant={"default"}
          size={"lg"}
          className="rounded-full text-base"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-7 w-7" />
          <p>Return to website</p>
        </Button>
      </div>
    </div>
  );
};
export default Page;
