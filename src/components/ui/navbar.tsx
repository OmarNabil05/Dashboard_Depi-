import React from "react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

export type NavItem = {
  path: string;
  icon: React.ReactNode;
};

interface NavbarProps {
  items: NavItem[];
}

export default function Navbar({ items }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <nav className="w-full border-b border-gray-200 bg-background">
      <div className="container mx-auto flex items-center justify-between h-12 px-4">

        {/* Left: Icons */}
        <div className="flex items-center justify-center gap-6 flex-1">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className="transition-transform hover:scale-110 flex items-center justify-center"
            >
              {item.icon}
            </button>
          ))}
        </div>

        {/* Right: ModeToggle */}
        <div className="flex items-center justify-center">
          <ModeToggle />
        </div>

      </div>
    </nav>
  );
}
