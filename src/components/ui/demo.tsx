import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";

const teamAvatars = [
  { initials: "JD", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" },
  { initials: "HJ", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
  { initials: "PI", src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
  { initials: "KD", src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
  { initials: "LD", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face" },
];

const stats = [
  { emoji: "🚀", label: "IN CLIENT REVENUE GENERATED", value: "$5M+" },
  { emoji: "📈", label: "BUSINESSES LAUNCHED", value: "200+" },
  { emoji: "💰", label: "SAVED IN OPERATIONAL COSTS", value: "$500K+" },
];

function AvatarStack() {
  return (
    <div className="flex items-center -space-x-3">
      {teamAvatars.map((member, i) => (
        <Avatar key={i} className="size-10 border-2 border-background">
          <AvatarImage src={member.src} />
          <AvatarFallback>{member.initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

function StatsMarquee() {
  return (
    <Marquee className="[--duration:25s]">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-3 px-6">
          <span className="text-3xl sm:text-4xl font-bold font-heading text-primary">
            {stat.value}
          </span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider max-w-[120px]">
            {stat.label}
          </span>
          <span className="text-2xl">{stat.emoji}</span>
        </div>
      ))}
    </Marquee>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="border-b border-border py-4 overflow-hidden">
        <StatsMarquee />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-start gap-8">
            <div className="flex items-center gap-4">
              <AvatarStack />
            </div>
          </div>

          <div className="mt-8 max-w-4xl">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold font-heading leading-[0.95] tracking-tight">
              We think, you{" "}
              <span className="text-primary">grow</span>
              <br />
              <span className="text-muted-foreground">— that's the deal</span>
            </h1>
            <Button variant="hero" size="xl" className="mt-8">
              Get Template
              <span className="flex items-center">
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </div>

          <div className="mt-12 max-w-xl">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We take your big ideas and turn them into clear, winning
              strategies. From setting up your company to scaling it worldwide,
              we're here every step of the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
