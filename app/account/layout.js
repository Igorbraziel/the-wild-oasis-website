import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="space-y-2 sm:space-y-0 sm:h-full grid sm:grid-cols-[10rem_1fr] sm:gap-12 lg:grid-cols-[16rem_1fr]">
      <SideNavigation />
      <div className="py-3">{children}</div>
    </div>
  );
}
