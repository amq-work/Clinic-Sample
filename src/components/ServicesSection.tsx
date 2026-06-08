"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Smile, Activity, Zap, Sparkles, Clock } from "lucide-react";

const SERVICES = [
  { Icon: Smile,    name: "Dental Checkup",       desc: "Comprehensive oral exam, scaling, and professional cleaning.", duration: "45 min", price: "PKR 1,500" },
  { Icon: Activity, name: "General Consultation",  desc: "Personalised health assessment and treatment planning.",       duration: "30 min", price: "PKR 1,000" },
  { Icon: Zap,      name: "Physiotherapy",          desc: "Targeted rehabilitation to restore mobility and eliminate pain.", duration: "60 min", price: "PKR 2,000" },
  { Icon: Sparkles, name: "Skin Treatment",         desc: "Advanced dermatological care tailored to your skin concerns.", duration: "45 min", price: "PKR 2,500" },
];

export default function ServicesSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="section" style={{ background: "transparent", position: "relative", zIndex: 1 }}>
      <div className="wrap">

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} style={{ marginBottom: "0.75rem" }}>
              Our Services
            </motion.p>
            <motion.h2 className="headline" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }}>
              What We <span className="text-grad">Offer</span>
            </motion.h2>
          </div>
          <motion.p className="body-lg" style={{ maxWidth: "22rem" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.14 }}>
            Comprehensive care delivered with clinical excellence and modern technology.
          </motion.p>
        </div>



        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map(({ Icon, name, desc, duration, price }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="glass-card"
                style={{ padding: "2rem 1.75rem", height: "100%", display: "flex", flexDirection: "column", cursor: "default" }}
              >
                {/* Number */}
                <p style={{ fontSize: "0.6875rem", color: "#D1D5DB", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "1.25rem" }}>
                  0{i + 1}
                </p>

                {/* Icon box */}
                <div style={{
                  width: 42, height: 42, border: "1px solid #BFDBFE",
                  background: "rgba(239,246,255,0.8)", borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.25rem",
                }}>
                  <Icon size={18} color="#60A5FA" />
                </div>

                <h3 style={{ fontFamily: "var(--font-jakarta)", fontWeight: 700, fontSize: "1rem", color: "#080808", marginBottom: "0.625rem", lineHeight: 1.25 }}>
                  {name}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.65, flex: 1 }}>{desc}</p>

                <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(229,231,235,0.7)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "#9CA3AF", fontSize: "0.78125rem" }}>
                    <Clock size={13} /> {duration}
                  </div>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#3B82F6" }}>{price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
