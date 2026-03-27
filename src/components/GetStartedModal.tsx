import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Languages, Hand, Brain, Mic, Sparkles, ArrowRight } from "lucide-react";

const tools = [
  { icon: Languages, label: "AI Content Converter", desc: "Convert text, speech, images to accessible formats" },
  { icon: Hand, label: "Sign Language Avatar", desc: "Real-time sign language translation with AI" },
  { icon: Brain, label: "AI Doubt Solver", desc: "Ask questions and get answers in any format" },
  { icon: Mic, label: "Voice Navigation", desc: "Navigate hands-free with voice commands" },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GetStartedModal({ open, onOpenChange }: Props) {
  const navigate = useNavigate();

  const goTo = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-primary" />
            <DialogTitle className="font-heading text-xl">Welcome to NeuroLearn</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
            AI-powered accessible learning for every student. Convert content, learn with sign language, ask an AI tutor, and navigate hands-free.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 my-4">
          {tools.map((tool) => (
            <div
              key={tool.label}
              className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <tool.icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{tool.label}</p>
                <p className="text-xs text-muted-foreground">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1 gap-2"
            onClick={() => goTo("/login")}
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => goTo("/login")}
          >
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
