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
        background: scrolled || mobileOpen
          ? "rgba(255,255,255,0.88)"
          : "transparent",
        backdropFilter: scrolled || mobileOpen ? "blur(24px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled || mobileOpen ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrolled || mobileOpen ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
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
        <nav className="hidden md:flex gap-1">
          {NAV.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="bg-transparent border-none cursor-pointer px-4 py-2 text-[0.875rem] font-medium text-gray-700 tracking-wide transition-colors duration-150 hover:text-blue-400"
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
          className="md:hidden bg-transparent border-none cursor-pointer p-2 text-gray-700 flex items-center justify-center"
          onClick={() => setMobileOpen((v) => !v)}
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
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-xl overflow-hidden"
          >
            <div className="wrap py-6 flex flex-col gap-1">
              {NAV.map((l) => (
                <button
                  key={l.href}
                  onClick={() => { setMobileOpen(false); scrollTo(l.href); }}
                  className="text-left bg-transparent border-none cursor-pointer py-3 px-2 text-[0.9375rem] font-medium text-gray-700 border-b border-gray-100 hover:text-blue-500 hover:bg-gray-50 transition-colors rounded-t-md"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => { setMobileOpen(false); scrollTo("#map"); }}
                className="btn btn-blue w-full mt-4 justify-center"
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
