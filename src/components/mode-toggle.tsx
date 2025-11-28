import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UseTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = UseTheme()
  const [isDark, setIsDark] = useState(false)

  // Update isDark whenever theme changes
  useEffect(() => {
    if (theme === "dark") setIsDark(true)
    else if (theme === "light") setIsDark(false)
    else {
      // system
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }
  }, [theme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all ${
              isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"
            }`}
          />
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
              isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"
            }`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
