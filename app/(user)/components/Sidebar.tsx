import Navigations from "@/app/(user)/components/Navigations";
import LinkLogo from "@/components/common/LinkLogo";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const Sidebar = () => {
  return (
    <Card className="w-64 p-4">
      <div className="flex items-center justify-center gap-3 mb-8">
        <LinkLogo />
        <Link href="/" className="text-2xl font-bold">
          Audionix
        </Link>
      </div>

      <Navigations />
    </Card>
  );
};
export default Sidebar;
