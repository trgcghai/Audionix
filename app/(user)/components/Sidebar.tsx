import Navigations from "@/app/(user)/components/Navigations";
import LinkLogo from "@/components/common/LinkLogo";

const Sidebar = () => {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border p-6">
      <div className="flex items-center justify-center gap-3 mb-8">
        <LinkLogo />
        <span className="text-2xl font-bold">Audionix</span>
      </div>

      <Navigations />
    </div>
  );
};
export default Sidebar;
