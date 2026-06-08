"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

const STATS = [
  { value: "5,000+", label: "Patients" },
  { value: "12 yr",  label: "Experience" },
  { value: "4.9★",   label: "Rating" },
];

export default function HeroSection() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "7rem",
        paddingBottom: "6rem",
        position: "relative",
        textAlign: "center",
      }}
    >
      <div className="wrap" style={{ position: "relative", zIndex: 1, maxWidth: "860px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>

          {/* Eyebrow pill */}
          <motion.span className="chip" {...fadeUp(0)}>
            Accepting Online Bookings
          </motion.span>

          {/* Headline */}
          <motion.h1 {...fadeUp(0.1)} className="display" style={{ color: "#080808" }}>
            Your Health,{" "}
            <span className="text-grad">Our Priority</span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            {...fadeUp(0.2)}
            className="body-lg"
            style={{ maxWidth: "32rem", textAlign: "center" }}
          >
            World-class dental and medical care — accessible from anywhere.
            Book an appointment in under 60 seconds, no account needed.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.3)}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}
          >
            <button className="btn btn-blue" onClick={() => go("appointment")}>
              Book Appointment <ArrowRight size={16} />
            </button>
            <button className="btn btn-ghost" onClick={() => go("contact")}>
              <Phone size={15} /> Contact Us
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-wrap justify-center w-full pt-6 mt-2 border-t border-gray-200/70 gap-y-6"
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`px-4 sm:px-10 ${i < STATS.length - 1 ? 'border-r border-gray-200' : ''}`}
              >
                <p style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#080808",
                  lineHeight: 1.1,
                  fontFamily: "var(--font-jakarta)",
                }}>
                  {s.value}
                </p>
                <p style={{
                  fontSize: "0.75rem",
                  color: "#9CA3AF",
                  marginTop: "0.25rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>



        </div>
      </div>
    </section>
  );
}
