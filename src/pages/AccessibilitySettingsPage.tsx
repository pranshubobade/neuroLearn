import { useState } from "react";
import { motion } from "framer-motion";
import {
  Contrast, Type, Maximize, MonitorSpeaker, Mic,
  Eye, BookOpen,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const settings = [
  { id: "high-contrast", icon: Contrast, label: "High Contrast Mode", description: "Increases contrast for better visibility" },
  { id: "dyslexia-font", icon: BookOpen, label: "Dyslexia Reading Font", description: "Switches to OpenDyslexic font for easier reading" },
  { id: "large-text", icon: Maximize, label: "Large Text Mode", description: "Increases font size across the platform" },
  { id: "screen-reader", icon: MonitorSpeaker, label: "Screen Reader Mode", description: "Optimizes layout and ARIA labels for screen readers" },
  { id: "voice-nav", icon: Mic, label: "Voice Navigation Mode", description: "Enables hands-free voice command navigation" },
  { id: "reduced-motion", icon: Eye, label: "Reduced Motion", description: "Disables animations and transitions" },
];

export default function AccessibilitySettingsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <p className="text-sm text-primary font-medium mb-1">Settings</p>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading">Accessibility Settings</h1>
            <p className="text-muted-foreground text-sm mt-1">Customize the platform to match your accessibility needs.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8 max-w-4xl">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Settings List */}
            <div className="lg:col-span-3 space-y-3">
              {settings.map((setting) => (
                <div
                  key={setting.id}
                  className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                    enabled[setting.id]
                      ? "bg-primary/5 border-primary/30"
                      : "bg-card border-border"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      enabled[setting.id] ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      <setting.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{setting.label}</p>
                      <p className="text-xs text-muted-foreground">{setting.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={!!enabled[setting.id]}
                    onCheckedChange={() => toggle(setting.id)}
                    aria-label={`Toggle ${setting.label}`}
                  />
                </div>
              ))}
              <p className="text-xs text-muted-foreground pt-2">Settings will persist once backend API is connected.</p>
            </div>

            {/* Preview */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <h2 className="text-sm font-bold font-heading text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" /> Preview
                </h2>
                <div
                  className={`rounded-xl border border-border p-4 min-h-[200px] transition-all ${
                    enabled["high-contrast"] ? "bg-black text-white border-white/20" : "bg-background"
                  }`}
                  style={{
                    fontSize: enabled["large-text"] ? "1.25rem" : "0.875rem",
                    fontFamily: enabled["dyslexia-font"] ? "'OpenDyslexic', 'Comic Sans MS', sans-serif" : "inherit",
                  }}
                >
                  <p className="font-semibold mb-2" style={{ fontFamily: "inherit" }}>Sample Content Preview</p>
                  <p style={{ lineHeight: enabled["dyslexia-font"] ? "1.8" : "1.5" }}>
                    This is how your learning content will appear with the current accessibility settings applied.
                    The platform adapts in real time to your preferences.
                  </p>
                  {enabled["reduced-motion"] && (
                    <p className="text-xs mt-3 opacity-60">✓ Animations disabled</p>
                  )}
                  {enabled["screen-reader"] && (
                    <p className="text-xs mt-1 opacity-60">✓ Screen reader optimized</p>
                  )}
                  {enabled["voice-nav"] && (
                    <p className="text-xs mt-1 opacity-60">✓ Voice navigation active</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
