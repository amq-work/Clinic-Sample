"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export default function AboutSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="section" style={{ background: "transparent", position: "relative", zIndex: 1 }}>
      <div className="wrap">
        <div
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-20"
        >
          {/* ── LEFT — Doctor photo in glass frame ─────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ position: "relative" }}
          >
            {/* Glass photo frame */}
            <div
              className="glass-card"
              style={{ overflow: "hidden", padding: 0, position: "relative" }}
            >
              {/* Blue accent bar at top */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: 4,
                background: "linear-gradient(90deg, #60A5FA, #3B82F6)",
                zIndex: 1,
              }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="./doctor.png"
                alt="Dr. Asma Riaz — Chief Dental Officer at ClinicCare"
                style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }}
              />

              {/* Name overlay at bottom */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "1.5rem",
                background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
              }}>
                <p style={{
                  fontFamily: "var(--font-jakarta)", fontWeight: 700,
                  fontSize: "1.125rem", color: "#ffffff", lineHeight: 1.1,
                }}>
                  Dr. Asma Riaz
                </p>
                <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.75)", marginTop: "0.25rem" }}>
                  Chief Dental Officer · BDS, MDS
                </p>
              </div>
            </div>

            {/* Floating experience badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="glass"
              style={{
                position: "absolute", bottom: "3.5rem", right: "-1.5rem",
                padding: "0.75rem 1.125rem",
                display: "flex", alignItems: "center", gap: "0.625rem",
                borderRadius: "12px",
              }}
            >
              <span style={{ width: 8, height: 8, background: "#60A5FA", display: "inline-block", borderRadius: "50%" }} />
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#080808", lineHeight: 1 }}>12+ Years</p>
                <p style={{ fontSize: "0.6875rem", color: "#9CA3AF", marginTop: "0.15rem" }}>Experience</p>
              </div>
            </motion.div>

            {/* Floating patient count badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 2, ease: "easeInOut" }}
              className="glass"
              style={{
                position: "absolute", top: "2rem", left: "-1.25rem",
                padding: "0.75rem 1.125rem",
                display: "flex", alignItems: "center", gap: "0.625rem",
                borderRadius: "12px",
              }}
            >
              <span style={{ fontSize: "1rem" }}>🦷</span>
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#080808", lineHeight: 1 }}>5,000+</p>
                <p style={{ fontSize: "0.6875rem", color: "#9CA3AF", marginTop: "0.15rem" }}>Happy Patients</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Text content ───────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <motion.p
              className="eyebrow"
              {...fadeUp(0.05)}
              style={inView ? {} : { opacity: 0 }}
            >
              About Us
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              className="headline"
            >
              Care You Can <span className="text-grad">Trust</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <p className="body-lg">
                ClinicCare was founded on a simple belief: every patient deserves
                exceptional, transparent, and comfortable healthcare — delivered with
                genuine compassion.
              </p>
              <p className="body-lg">
                From routine dental checkups to advanced physiotherapy, our team
                combines deep clinical expertise with a patient-first philosophy.
                We listen before we treat.
              </p>
            </motion.div>

            {/* Stat tiles — glass cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.26, ease: "easeOut" }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginTop: "0.5rem" }}
            >
              {[
                { n: "5k+",  l: "Patients" },
                { n: "12yr", l: "Practice" },
                { n: "4.9★", l: "Rating" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="glass-card"
                  style={{ padding: "1.25rem 1rem", textAlign: "center" }}
                >
                  <p style={{ fontSize: "1.375rem", fontWeight: 800, color: "#080808", lineHeight: 1, fontFamily: "var(--font-jakarta)" }}>
                    {s.n}
                  </p>
                  <p style={{ fontSize: "0.6875rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.35rem", fontWeight: 600 }}>
                    {s.l}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Doctor quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.34 }}
              style={{
                fontSize: "0.9375rem",
                color: "#374151",
                lineHeight: 1.7,
                borderLeft: "3px solid #60A5FA",
                paddingLeft: "1.25rem",
                fontStyle: "italic",
                marginTop: "0.5rem",
              }}
            >
              &quot;Dedicated to delivering pain-free, precise, and lasting dental care
              for every patient who walks through our doors.&quot;
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
