"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "About",        href: "#about" },
  { label: "Services",     href: "#services" },
  { label: "Appointments", href: "#appointment" },
  { label: "Contact",      href: "#contact" },
];

function scrollTo(href: string) {
  const el = document.getElementById(href.replace("#", ""));
  el?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: "background 0.25s, border-color 0.25s",
        background: scrolled
          ? "rgba(255,255,255,0.88)"
          : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
      }}
    >
      <div className="wrap flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "none", border: "none", cursor: "pointer" }}
        >
          <span
            style={{
              width: 8, height: 8,
              background: "#60A5FA",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span style={{
            fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "1.05rem",
            letterSpacing: "-0.02em",
            color: "#080808",
          }}>
            Clinic<span style={{ color: "#60A5FA" }}>Care</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: "0.25rem" }} className="hidden md:flex">
          {NAV.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#374151",
                letterSpacing: "0.005em",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#60A5FA")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => scrollTo("#map")}
          className="btn btn-blue hidden md:inline-flex"
          style={{ fontSize: "0.8125rem", padding: "0.625rem 1.375rem" }}
        >
          Visit Us
        </button>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", color: "#374151" }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid #E5E7EB",
              overflow: "hidden",
            }}
          >
            <div className="wrap" style={{ paddingBlock: "1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {NAV.map((l) => (
                <button
                  key={l.href}
                  onClick={() => { setMobileOpen(false); scrollTo(l.href); }}
                  style={{
                    textAlign: "left", background: "none", border: "none", cursor: "pointer",
                    padding: "0.75rem 0", fontSize: "0.9375rem", fontWeight: 500, color: "#374151",
                    borderBottom: "1px solid #F3F4F6",
                  }}
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => { setMobileOpen(false); scrollTo("#map"); }}
                className="btn btn-blue"
                style={{ marginTop: "1rem", justifyContent: "center" }}
              >
                Visit Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
