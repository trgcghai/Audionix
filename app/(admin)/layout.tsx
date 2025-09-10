import AdminSidebar from "@/app/(admin)/components/AdminSidebar";
import Footer from "@/components/common/Footer";
import MainHeader from "@/components/header/MainHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const AdmindashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <SidebarProvider>
        <div className="flex h-full w-full overflow-hidden">
          <AdminSidebar />
          <SidebarInset className="flex h-full flex-col overflow-hidden">
            <MainHeader
              showSearch={false}
              showLogo={false}
              className="relative top-0 right-0 left-0 h-12 shrink-0"
            />

            <ScrollArea className="w-full flex-1 overflow-auto">
              <div className="h-full p-4">
                <div className="px-3 py-6 bg-card border rounded-sm">
                  {children}
                </div>
                <Separator className="my-12" />
                <Footer />
              </div>
            </ScrollArea>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};
export default AdmindashboardLayout;
