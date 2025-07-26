import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import MainHeader from "@/components/header/MainHeader";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/common/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import ArtistSidebar from "@/components/sidebar/artist/ArtistSidebar";

export default function ArtistPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <SidebarProvider>
        <div className="flex h-full w-full overflow-hidden">
          <ArtistSidebar />
          <SidebarInset className="h-full flex flex-col overflow-hidden">
            <MainHeader
              showSearch={false}
              showLogo={false}
              className="relative top-0 right-0 left-0 h-12 shrink-0"
            />

            <ScrollArea className="flex-1 w-full overflow-auto">
              <div className="p-4 h-full">
                <div className="px-3">{children}</div>
                <Separator className="my-12" />
                <Footer />
              </div>
            </ScrollArea>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
