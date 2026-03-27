import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import cloudImg from "@/assets/cloud.jpg";

export default function CloudWatchForm() {
  const [isTyping, setIsTyping] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const offsetX = ((cursor.x / window.innerWidth) - 0.5) * 40;
    const offsetY = ((cursor.y / window.innerHeight) - 0.5) * 20;
    setEyePos({ x: offsetX, y: offsetY });
  }, [cursor]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = name.trim() || username.trim() || "User";
    localStorage.setItem("userName", displayName);
    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("loginStateChanged"));
    navigate("/");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-2xl p-8 shadow-xl shadow-black/30">
        
        {/* Cloud Character */}
        <div className="flex justify-center mb-6">
          <div className="relative w-36 h-28">
            {/* Cloud image */}
            <img
              src={cloudImg}
              alt="Cloud character"
              className="w-full h-full object-contain"
              draggable={false}
            />

            {/* Eyes on the cloud */}
            {["left", "right"].map((side, idx) => (
              <div
                key={side}
                className="absolute bg-card rounded-full overflow-hidden border-2 border-border"
                style={{
                  width: 24,
                  height: isTyping ? 3 : blink ? 3 : 24,
                  top: "36%",
                  left: idx === 0 ? "32%" : "56%",
                  transition: "height 0.15s ease",
                }}
              >
                {!isTyping && !blink && (
                  <div
                    className="absolute w-3 h-3 bg-foreground rounded-full"
                    style={{
                      top: `calc(50% + ${eyePos.y * 0.25}px - 6px)`,
                      left: `calc(50% + ${eyePos.x * 0.25}px - 6px)`,
                      transition: "top 0.1s, left 0.1s",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-10 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Username</label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex h-10 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
              className="flex h-10 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 mt-2 bg-primary text-primary-foreground font-bold rounded-full shadow-lg hover:brightness-110 hover:shadow-xl transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
