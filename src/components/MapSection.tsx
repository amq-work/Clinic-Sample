"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";

// Replace with your actual clinic coordinates
const LAT = 31.5204;
const LNG = 74.3587;
const MAPS_QUERY = encodeURIComponent("123 Medical Avenue, Lahore, Pakistan");

export default function MapSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="map" ref={ref} className="section-sm" style={{ background: "transparent", position: "relative", zIndex: 1 }}>
      <div className="wrap">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{ marginBottom: "0.75rem" }}
          >
            Find Us
          </motion.p>
          <motion.h2
            className="headline"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
          >
            Visit Our <span className="text-grad">Clinic</span>
          </motion.h2>
          <motion.p
            className="body-lg"
            style={{ marginTop: "1rem", maxWidth: "26rem", marginInline: "auto" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.14 }}
          >
            We&apos;re located in the heart of Lahore. Click the map to get directions.
          </motion.p>
        </div>

        {/* Map card — glass frame */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${LAT},${LNG}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", textDecoration: "none" }}
          >
            <div
              className="glass-card"
              style={{
                overflow: "hidden",
                padding: 0,
                position: "relative",
                cursor: "pointer",
              }}
            >
              {/* Embedded map */}
              <iframe
                title="ClinicCare Location"
                src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0, display: "block", pointerEvents: "none" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Clickable overlay so entire card acts as link */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "transparent",
                  zIndex: 2,
                }}
              />

              {/* Address chip overlay */}
              <div
                className="glass"
                style={{
                  position: "absolute",
                  bottom: "1.25rem",
                  left: "1.25rem",
                  zIndex: 3,
                  padding: "0.75rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  borderRadius: "12px",
                }}
              >
                <div style={{
                  width: 36, height: 36,
                  background: "rgba(96,165,250,0.12)",
                  border: "1px solid rgba(96,165,250,0.25)",
                  borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <MapPin size={16} color="#3B82F6" />
                </div>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#080808", lineHeight: 1.1 }}>
                    123 Medical Avenue
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#6B7280", marginTop: "0.15rem" }}>
                    Lahore, Pakistan · Get Directions →
                  </p>
                </div>
              </div>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
