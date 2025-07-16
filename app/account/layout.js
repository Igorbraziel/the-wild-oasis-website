import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid-cols-[16rem_1fr] grid h-full gap-12">
      <SideNavigation />
      <div className="py-3">{children}</div>
    </div>
  );
}
