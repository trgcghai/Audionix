const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full flex-1 flex flex-col">
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
};
export default layout;
