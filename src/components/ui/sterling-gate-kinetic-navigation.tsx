import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import GetStartedModal from "@/components/GetStartedModal";

function useLoginState() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");

  useEffect(() => {
    const handler = () => {
      setLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setUserName(localStorage.getItem("userName") || "");
    };
    window.addEventListener("loginStateChanged", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("loginStateChanged", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    window.dispatchEvent(new Event("loginStateChanged"));
  };

  return { loggedIn, userName, logout };
}

const menuItems = [
  { label: "Home", to: "/", shape: "1" },
  { label: "Content Converter", to: "/tools/content-converter", shape: "2" },
  { label: "Sign Language", to: "/tools/sign-language", shape: "3" },
  { label: "Doubt Solver", to: "/tools/doubt-solver", shape: "4" },
  { label: "Voice Navigation", to: "/tools/voice-navigation", shape: "5" },
  { label: "Upload Content", to: "/tools/content-upload", shape: "1" },
  { label: "Adaptive Learning", to: "/tools/adaptive-learning", shape: "2" },
  { label: "Settings", to: "/settings/accessibility", shape: "3" },
];

export function KineticNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedIn, userName, logout } = useLoginState();

  // Shape hover effects
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.defaults({ ease: "power2.out", duration: 0.7 });

    const ctx = gsap.context(() => {
      const menuItemEls = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");

      menuItemEls.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer?.querySelector(`.bg-shape-${shapeIndex}`);
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          shapesContainer?.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          shape.classList.add("active");
          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto",
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        (item as any)._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        containerRef.current.querySelectorAll(".menu-list-item[data-shape]").forEach((item: any) => item._cleanup?.());
      }
    };
  }, []);

  // Menu open/close animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
      const menu = containerRef.current!.querySelector(".menu-content");
      const overlay = containerRef.current!.querySelector(".overlay");
      const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
      const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
      const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");
      const menuButton = containerRef.current!.querySelector(".nav-close-btn");
      const menuButtonTexts = menuButton?.querySelectorAll("p");
      const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

      const tl = gsap.timeline();

      if (isMenuOpen) {
        navWrap?.setAttribute("data-nav", "open");
        tl.set(navWrap, { display: "block" })
          .set(menu, { xPercent: 0 }, "<")
          .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 })
          .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
          .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35");

        if (fadeTargets.length) {
          tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
        }
      } else {
        navWrap?.setAttribute("data-nav", "closed");
        tl.to(overlay, { autoAlpha: 0 })
          .to(menu, { xPercent: 120 }, "<")
          .to(menuButtonTexts, { yPercent: 0 }, "<")
          .to(menuButtonIcon, { rotate: 0 }, "<")
          .set(navWrap, { display: "none" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const handleNavigate = useCallback((to: string) => {
    setIsMenuOpen(false);
    setTimeout(() => navigate(to), 400);
  }, [navigate]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div ref={containerRef} className="kinetic-nav-root">
      {/* Top Bar */}
      <header className="kinetic-header">
        <div className="kinetic-header-inner">
          {/* Logo */}
          <button onClick={() => handleNavigate("/")} className="kinetic-logo">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">N</span>
            </div>
            <span className="text-foreground font-heading font-bold text-lg">neurolearn</span>
          </button>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {loggedIn ? (
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-sm font-medium text-foreground px-3 py-2">
                  Hi, {userName}
                </span>
                <button
                  onClick={() => { logout(); navigate("/"); }}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => handleNavigate("/login")} className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
                  Log in
                </button>
                <button onClick={() => setGetStartedOpen(true)} className="hidden sm:block text-sm font-medium bg-primary text-primary-foreground px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
                  Get Started
                </button>
              </>
            )}

            {/* Hamburger / Menu Toggle */}
            <button className="kinetic-menu-trigger" onClick={toggleMenu} aria-label="Toggle menu">
              <div className="menu-button-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Navigation */}
      <div className="nav-overlay-wrapper" data-nav="closed" style={{ display: "none" }}>
        <div className="overlay" onClick={() => setIsMenuOpen(false)} />

        <div className="menu-content">
          {/* Backdrop layers for animation */}
          <div className="backdrop-layer backdrop-layer-1" />
          <div className="backdrop-layer backdrop-layer-2" />
          <div className="backdrop-layer backdrop-layer-3" />

          {/* Abstract shapes */}
          <div className="ambient-background-shapes">
            {/* Shape 1 */}
            <div className="bg-shape bg-shape-1">
              <div className="shape-element" style={{ width: 80, height: 80, borderRadius: "50%", background: "hsl(var(--primary) / 0.3)", position: "absolute", top: "10%", left: "10%" }} />
              <div className="shape-element" style={{ width: 50, height: 50, borderRadius: "50%", background: "hsl(var(--primary) / 0.2)", position: "absolute", top: "40%", left: "30%" }} />
              <div className="shape-element" style={{ width: 30, height: 30, borderRadius: "50%", background: "hsl(var(--primary) / 0.4)", position: "absolute", top: "20%", left: "60%" }} />
              <div className="shape-element" style={{ width: 60, height: 60, borderRadius: "50%", background: "hsl(var(--primary) / 0.15)", position: "absolute", top: "60%", left: "20%" }} />
            </div>
            {/* Shape 2 */}
            <div className="bg-shape bg-shape-2">
              <div className="shape-element" style={{ width: 120, height: 40, borderRadius: "20px", background: "hsl(var(--primary) / 0.2)", position: "absolute", top: "20%", left: "5%", transform: "rotate(-15deg)" }} />
              <div className="shape-element" style={{ width: 100, height: 35, borderRadius: "18px", background: "hsl(var(--primary) / 0.3)", position: "absolute", top: "50%", left: "25%", transform: "rotate(10deg)" }} />
            </div>
            {/* Shape 3 */}
            <div className="bg-shape bg-shape-3">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="shape-element" style={{ width: 8, height: 8, borderRadius: "50%", background: "hsl(var(--primary) / 0.4)", position: "absolute", top: `${10 + Math.floor(i / 5) * 25}%`, left: `${10 + (i % 5) * 18}%` }} />
              ))}
            </div>
            {/* Shape 4 */}
            <div className="bg-shape bg-shape-4">
              <div className="shape-element" style={{ width: 100, height: 100, borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", background: "hsl(var(--primary) / 0.2)", position: "absolute", top: "15%", left: "15%" }} />
              <div className="shape-element" style={{ width: 70, height: 70, borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", background: "hsl(var(--primary) / 0.3)", position: "absolute", top: "45%", left: "40%" }} />
            </div>
            {/* Shape 5 */}
            <div className="bg-shape bg-shape-5">
              <div className="shape-element" style={{ width: 2, height: 80, background: "hsl(var(--primary) / 0.3)", position: "absolute", top: "10%", left: "20%", transform: "rotate(45deg)" }} />
              <div className="shape-element" style={{ width: 2, height: 60, background: "hsl(var(--primary) / 0.2)", position: "absolute", top: "30%", left: "50%", transform: "rotate(-30deg)" }} />
              <div className="shape-element" style={{ width: 2, height: 100, background: "hsl(var(--primary) / 0.25)", position: "absolute", top: "5%", left: "70%", transform: "rotate(60deg)" }} />
            </div>
          </div>

          {/* Close button inside overlay */}
          <button className="nav-close-btn" onClick={toggleMenu} aria-label="Close menu">
            <div className="nav-close-btn-text-wrap">
              <p>Menu</p>
              <p>Close</p>
            </div>
            <div className="menu-button-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </div>
          </button>

          {/* Menu Links */}
          <nav className="kinetic-menu-list">
            <ul>
              {menuItems.map((item) => (
                <li key={item.to} className="menu-list-item" data-shape={item.shape}>
                  <button
                    className="nav-link"
                    onClick={() => handleNavigate(item.to)}
                  >
                    <span className="nav-link-label">{item.label}</span>
                    {location.pathname === item.to && (
                      <span className="nav-link-active-dot" />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Extra links */}
            <div className="kinetic-menu-extra" data-menu-fade>
              <button onClick={() => handleNavigate("/login")} className="kinetic-extra-link">Log in</button>
              <button onClick={() => { setIsMenuOpen(false); setTimeout(() => setGetStartedOpen(true), 400); }} className="kinetic-extra-link kinetic-extra-cta">Get Started →</button>
            </div>
          </nav>
        </div>
      </div>

      <GetStartedModal open={getStartedOpen} onOpenChange={setGetStartedOpen} />
    </div>
  );
}
