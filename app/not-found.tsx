import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Page = () => {
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
        <div className="flex justify-center">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-full",
            )}
          >
            <div>
              <ArrowLeft className="h-7 w-7" />
            </div>
            <p>Return to home page</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Page;
