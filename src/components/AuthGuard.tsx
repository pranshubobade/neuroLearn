/**
 * AuthGuard — Login-required gate for AI tool pages.
 *
 * WHY LOGIN IS REQUIRED:
 * - User uploaded content must be stored per-account
 * - AI conversions must be associated with users for history
 * - Learning progress must be tracked and persisted
 * - Accessibility settings need to be saved across sessions
 *
 * Currently uses localStorage for frontend testing.
 * Replace with real auth provider when backend is integrated.
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, ArrowRight } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

const isAuthenticated = () => localStorage.getItem("isLoggedIn") === "true";

export default function AuthGuard({ children }: Props) {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(isAuthenticated());

  useEffect(() => {
    const handler = () => setAuthed(isAuthenticated());
    window.addEventListener("loginStateChanged", handler);
    return () => window.removeEventListener("loginStateChanged", handler);
  }, []);

  if (authed) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="filter blur-sm opacity-30 pointer-events-none select-none">
        {children}
      </div>

      <Dialog open onOpenChange={(v) => { if (!v) navigate("/"); }}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <DialogTitle className="font-heading text-xl">Login Required</DialogTitle>
            </div>
            <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
              You need to log in to access the AI accessibility tools.
              This allows us to save your progress and store your conversions.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 mt-4">
            <Button className="flex-1 gap-2" onClick={() => navigate("/login")}>
              Login <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => navigate("/login")}>
              Create Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
