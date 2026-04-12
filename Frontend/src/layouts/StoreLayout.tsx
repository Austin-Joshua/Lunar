import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";

/**
 * Storefront shell: global nav, scrollable main, mobile bottom bar, footer.
 */
export const StoreLayout = () => (
  <div className="app-viewport flex min-h-[100dvh] flex-col overflow-x-hidden bg-background">
    <Navbar />
    <main className="app-main flex-1 min-h-0 overflow-x-clip overscroll-y-contain px-0 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:pb-8 lg:pb-9 xl:pb-10">
      <Outlet />
    </main>
    <BottomNav />
    <Footer />
  </div>
);
