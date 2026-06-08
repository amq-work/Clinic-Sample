"use client";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "#080808", color: "#ffffff", position: "relative", zIndex: 1 }}>
      <div className="wrap" style={{ paddingBlock: "5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "3rem" }}>
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ width: 8, height: 8, background: "#60A5FA", display: "inline-block", borderRadius: "50%" }} />
              <span style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: "1.0625rem", letterSpacing: "-0.02em" }}>
                Clinic<span style={{ color: "#60A5FA" }}>Care</span>
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.65, maxWidth: "18rem" }}>
              Modern healthcare accessible to everyone. Book your appointment online.
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {["FB", "IG", "WA"].map((s) => (
                <a key={s} href="#" style={{
                  width: 32, height: 32, border: "1px solid #1F2937", borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.6875rem", fontWeight: 700, color: "#6B7280",
                  textDecoration: "none", transition: "border-color 0.15s, color 0.15s",
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#60A5FA"; (e.currentTarget as HTMLElement).style.color = "#60A5FA"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#1F2937"; (e.currentTarget as HTMLElement).style.color = "#6B7280"; }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {[
            { title: "Navigate",  links: ["Home","About","Services","Appointment","Contact"] },
            { title: "Services",  links: ["Dental Checkup","Consultation","Physiotherapy","Skin Treatment"] },
            { title: "Contact",   links: ["+92 300 123 4567","info@cliniccare.pk","123 Medical Ave, Lahore","Mon–Sat 9AM–6PM"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#ffffff", marginBottom: "1.25rem" }}>{title}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {links.map((l) => (
                  <li key={l}><a href="#" style={{ fontSize: "0.875rem", color: "#6B7280", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6B7280"; }}
                  >{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: "4rem", paddingTop: "1.5rem", borderTop: "1px solid #1F2937", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ fontSize: "0.78125rem", color: "#4B5563" }}>© {year} ClinicCare. All rights reserved.</p>
          <p style={{ fontSize: "0.78125rem", color: "#4B5563" }}>Built for better healthcare.</p>
        </div>
      </div>
    </footer>
  );
}
