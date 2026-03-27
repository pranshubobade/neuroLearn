import { useState } from "react";
import { motion } from "framer-motion";
import { Hand, Play, Type, Video, ToggleLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

export default function SignLanguagePage() {
  const [avatarOn, setAvatarOn] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <p className="text-sm text-primary font-medium mb-1">Platform Tool</p>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading">Sign Language Avatar</h1>
            <p className="text-muted-foreground text-sm mt-1">AI avatar translates content into sign language in real time.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Video / Avatar Area */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="aspect-video bg-muted/30 relative flex items-center justify-center">
                  {loading ? (
                    <div className="text-center space-y-3">
                      <Skeleton className="w-32 h-32 rounded-full mx-auto" />
                      <Skeleton className="w-48 h-4 mx-auto" />
                      <p className="text-xs text-muted-foreground">Generating sign language animation...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Hand className="w-10 h-10 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Sign language avatar will render here.</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">Reserved for 3D avatar / animation model.</p>
                    </div>
                  )}

                  {/* Avatar toggle */}
                  {avatarOn && (
                    <div className="absolute bottom-4 right-4 w-28 h-28 rounded-xl bg-card border border-border flex items-center justify-center">
                      <Hand className="w-8 h-8 text-primary/40" />
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="p-4 border-t border-border flex items-center gap-3 flex-wrap">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Video className="w-4 h-4" /> Upload Video
                  </Button>
                  <Button
                    variant={avatarOn ? "default" : "outline"}
                    size="sm"
                    className="gap-2"
                    onClick={() => setAvatarOn(!avatarOn)}
                    aria-label="Toggle avatar overlay"
                  >
                    <ToggleLeft className="w-4 h-4" /> Avatar {avatarOn ? "On" : "Off"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Text → Sign Panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-sm font-bold font-heading text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                  <Type className="w-4 h-4 text-primary" /> Text → Sign Language
                </h2>
                <Textarea placeholder="Enter text to convert to sign language..." className="min-h-[120px] bg-background mb-4" aria-label="Text for sign language conversion" />
                <Button onClick={handleGenerate} className="w-full gap-2">
                  <Play className="w-4 h-4" /> Generate Sign Animation
                </Button>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-sm font-bold font-heading text-foreground mb-3 uppercase tracking-wider">Supported Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {["ASL", "BSL", "ISL", "JSL", "Auslan"].map((lang) => (
                    <span key={lang} className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-foreground">{lang}</span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">Backend will provide real-time translation models.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
