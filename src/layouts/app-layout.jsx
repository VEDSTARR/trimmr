import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-hidden bg-background text-foreground">
      {/* Background gradients */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <main className="flex-1 container mx-auto px-4 md:px-8 relative z-0">
        <Header />
        <Outlet />
      </main>

      <footer className="mt-20 border-t border-border/40 pb-8 pt-10 text-center text-muted-foreground text-sm backdrop-blur-sm relative z-10 w-full">
        <p>Made with ❤️ by Kunal Lagad</p>
      </footer>
    </div>
  );
};

export default AppLayout;
