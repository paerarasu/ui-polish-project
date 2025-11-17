import { Home, Map, BarChart3 } from "lucide-react";
import { NavLink } from "@/components/NavLink";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-gradient-to-br from-primary to-accent p-2">
            <Home className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">RentMap</span>
        </div>
        
        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeClassName="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
          >
            <Home className="h-4 w-4" />
            Home
          </NavLink>
          <NavLink
            to="/explorer"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeClassName="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
          >
            <Map className="h-4 w-4" />
            Explorer
          </NavLink>
          <NavLink
            to="/compare"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeClassName="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
          >
            <BarChart3 className="h-4 w-4" />
            Compare
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
