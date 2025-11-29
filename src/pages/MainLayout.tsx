import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router-dom";
import Navbar, { type NavItem } from "@/components/ui/navbar";
import { BarChart3, Scroll, Coffee, Package ,SquareMenu } from "lucide-react";

const navItems: NavItem[] = [
  { path: "/Stat", icon: <BarChart3 size={24} color="#f97316" /> },   // orange
  { path: "/Log", icon: <Scroll size={24} color="#10b981" /> },   
  { path: "/Menu", icon: <SquareMenu size={24} color="#FFFF00" /> }, // yellow
  { path: "/Tables", icon: <Coffee size={24} color="#3b82f6" /> },    // blue
  { path: "/Requests", icon: <Package size={24} color="#e11d48" /> }, // red
 
];

export default function MainLayout() {
  return (
    <ThemeProvider  defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col bg-background ">
        <Navbar items={navItems} />
        <main className="flex-1 container mx-auto  ">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}
