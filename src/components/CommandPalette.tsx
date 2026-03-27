import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Languages, Hand, Brain, Mic, Upload,
  Settings, GraduationCap, Search,
} from "lucide-react";

const commands = [
  { icon: Languages, label: "Open Content Converter", to: "/tools/content-converter", group: "AI Tools" },
  { icon: Hand, label: "Open Sign Language Generator", to: "/tools/sign-language", group: "AI Tools" },
  { icon: Brain, label: "Ask AI Tutor", to: "/tools/doubt-solver", group: "AI Tools" },
  { icon: Mic, label: "Open Voice Navigation", to: "/tools/voice-navigation", group: "AI Tools" },
  { icon: Upload, label: "Upload Learning Material", to: "/tools/content-upload", group: "Actions" },
  { icon: GraduationCap, label: "Open Adaptive Learning", to: "/tools/adaptive-learning", group: "Actions" },
  { icon: Settings, label: "Open Accessibility Settings", to: "/settings/accessibility", group: "Actions" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const run = (to: string) => {
    setOpen(false);
    navigate(to);
  };

  const groups = [...new Set(commands.map((c) => c.group))];

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all shadow-lg shadow-black/20 backdrop-blur-sm"
        aria-label="Open command palette"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline text-xs bg-muted px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search tools, actions, settings..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map((group, gi) => (
            <div key={group}>
              {gi > 0 && <CommandSeparator />}
              <CommandGroup heading={group}>
                {commands
                  .filter((c) => c.group === group)
                  .map((cmd) => (
                    <CommandItem
                      key={cmd.to}
                      onSelect={() => run(cmd.to)}
                      className="gap-3 cursor-pointer"
                    >
                      <cmd.icon className="w-4 h-4 text-primary" />
                      <span>{cmd.label}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </div>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
