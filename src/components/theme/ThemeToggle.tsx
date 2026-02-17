import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
    description: "Clean & bright",
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
    description: "Easy on the eyes",
  },
  {
    value: "dark-blue",
    label: "Dark Blue",
    icon: Moon,
    description: "Deep ocean theme",
  },
  {
    value: "midnight",
    label: "Midnight",
    icon: Moon,
    description: "Pure black OLED",
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
    description: "Auto sync with OS",
  },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];
  const Icon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-9 w-9 rounded-full transition-colors hover:bg-accent"
          aria-label="Toggle theme"
        >
          <Icon className="h-[1.2rem] w-[1.2rem] transition-all" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Choose Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((themeOption) => {
          const ThemeIcon = themeOption.icon;
          const isActive = theme === themeOption.value;
          
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className={`cursor-pointer ${
                isActive ? "bg-accent" : ""
              }`}
            >
              <div className="flex items-start gap-3 w-full">
                <ThemeIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm">{themeOption.label}</span>
                    {isActive && (
                      <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {themeOption.description}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
