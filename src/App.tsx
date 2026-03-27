import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { KineticNavigation } from "@/components/ui/sterling-gate-kinetic-navigation";
import CommandPalette from "@/components/CommandPalette";
import AuthGuard from "@/components/AuthGuard";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import ContentConverterPage from "./pages/ContentConverterPage";
import SignLanguagePage from "./pages/SignLanguagePage";
import VoiceNavigationPage from "./pages/VoiceNavigationPage";
import DoubtSolverPage from "./pages/DoubtSolverPage";
import ContentUploadPage from "./pages/ContentUploadPage";
import AdaptiveLearningPage from "./pages/AdaptiveLearningPage";
import AccessibilitySettingsPage from "./pages/AccessibilitySettingsPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.body.classList.toggle("large-text", largeText);
  }, [largeText]);

  useEffect(() => {
    document.body.classList.toggle("dyslexia", dyslexiaMode);
  }, [dyslexiaMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background flex flex-col">
            <KineticNavigation />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/tools/content-converter" element={<AuthGuard><ContentConverterPage /></AuthGuard>} />
                <Route path="/tools/sign-language" element={<AuthGuard><SignLanguagePage /></AuthGuard>} />
                <Route path="/tools/voice-navigation" element={<AuthGuard><VoiceNavigationPage /></AuthGuard>} />
                <Route path="/tools/doubt-solver" element={<AuthGuard><DoubtSolverPage /></AuthGuard>} />
                <Route path="/tools/content-upload" element={<AuthGuard><ContentUploadPage /></AuthGuard>} />
                <Route path="/tools/adaptive-learning" element={<AuthGuard><AdaptiveLearningPage /></AuthGuard>} />
                <Route path="/settings/accessibility" element={<AuthGuard><AccessibilitySettingsPage /></AuthGuard>} />
                <Route path="/dashboard" element={<AuthGuard><DashboardPage /></AuthGuard>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <CommandPalette />
          </div>

          <div className="fixed bottom-4 right-4 z-[999]">
            <div className="rounded-xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-sm">
              <button
                onClick={() => setPanelOpen((prev) => !prev)}
                className="w-full rounded-md border border-border px-3 py-2 text-left text-sm font-medium hover:bg-muted/40"
                aria-expanded={panelOpen}
                aria-controls="accessibility-toggle-panel"
              >
                Accessibility {panelOpen ? "Hide" : "Show"}
              </button>

              {panelOpen && (
                <div id="accessibility-toggle-panel" className="mt-2 space-y-2">
                  <button
                    onClick={() => setHighContrast((prev) => !prev)}
                    className="w-full rounded-md border border-border px-3 py-2 text-left text-sm hover:bg-muted/40"
                  >
                    High Contrast: {highContrast ? "ON" : "OFF"}
                  </button>
                  <button
                    onClick={() => setLargeText((prev) => !prev)}
                    className="w-full rounded-md border border-border px-3 py-2 text-left text-sm hover:bg-muted/40"
                  >
                    Large Text: {largeText ? "ON" : "OFF"}
                  </button>
                  <button
                    onClick={() => setDyslexiaMode((prev) => !prev)}
                    className="w-full rounded-md border border-border px-3 py-2 text-left text-sm hover:bg-muted/40"
                  >
                    Dyslexia Mode: {dyslexiaMode ? "ON" : "OFF"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
