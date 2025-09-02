import Sidebar from "@/app/(user)/components/Sidebar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen bg-background p-8">
      <Sidebar />

      <main className="flex-1  w-full">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>
    </div>
  );
};
export default layout;
