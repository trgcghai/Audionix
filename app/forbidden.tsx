import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const forbidden = () => {
  return (
    <div className="flex h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Oops! You don&apos;t have permission to access this page.
          </h1>
          <p className="my-4 text-gray-500">
            You are not authorized to view this page.
          </p>
        </div>
        <Link href="/" className="rounded-full text-base">
          <ArrowLeft className="h-7 w-7" />
          <p>Return to home page</p>
        </Link>
      </div>
    </div>
  );
};
export default forbidden;
