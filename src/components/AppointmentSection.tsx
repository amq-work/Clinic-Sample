"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarDays, CheckCircle2, Loader2, ChevronDown } from "lucide-react";
import { getAvailableSlots, createAppointment, type TimeSlot } from "@/lib/api";

const schema = z.object({
  patient_name:     z.string().min(2, "Full name is required"),
  phone:            z.string().min(7, "Valid phone number required"),
  email:            z.string().email("Invalid email").optional().or(z.literal("")),
  service:          z.string().min(1, "Please select a service"),
  appointment_date: z.string().min(1, "Please choose a date"),
  slot_id:          z.string().min(1, "Please select a time slot"),
  notes:            z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const SERVICES = ["Dental Checkup", "General Consultation", "Physiotherapy", "Skin Treatment"];
const todayStr = () => new Date().toISOString().split("T")[0];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.8125rem 1rem",
  border: "1.5px solid #E5E7EB",
  borderRadius: "10px",
  fontSize: "0.9375rem",
  fontFamily: "inherit",
  color: "#111827",
  background: "rgba(255,255,255,0.85)",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.6875rem",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#374151",
  marginBottom: "0.5rem",
};

export default function AppointmentSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [slots,     setSlots]     = useState<TimeSlot[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [apiError,  setApiError]  = useState("");

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    getAvailableSlots()
      .then((r) => setSlots(r.data.filter((s) => s.availability)))
      .catch(() => {});
  }, []);

  const onSubmit = async (data: FormData) => {
    setApiError("");
    try {
      await createAppointment({ ...data, email: data.email || undefined, notes: data.notes || undefined });
      setSubmitted(true);
      reset();
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { error?: string } } })?.response?.data?.error ?? "Something went wrong. Please try again.";
      setApiError(msg);
    }
  };

  const FocusField = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      {...props}
      style={inputStyle}
      onFocus={(e)  => { e.target.style.borderColor = "#60A5FA"; e.target.style.boxShadow = "0 0 0 3px rgba(96,165,250,0.1)"; }}
      onBlur={(e)   => { e.target.style.borderColor = errors[(props.id ?? "") as keyof FormData] ? "#EF4444" : "#E5E7EB"; e.target.style.boxShadow = "none"; }}
    />
  );

  return (
    <section id="appointment" ref={ref} className="section" style={{ background: "transparent", position: "relative", zIndex: 1 }}>
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-12 lg:gap-20">

          {/* ── LEFT — info ────────────────────────────────────── */}
          <div style={{ paddingTop: "0.5rem" }}>
            <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} style={{ marginBottom: "0.875rem" }}>
              Book Appointment
            </motion.p>
            <motion.h2
              className="headline"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 }}
            >
              Schedule Your <br /><span className="text-grad">Visit</span>
            </motion.h2>

            <motion.p className="body-lg" style={{ marginTop: "1.5rem", maxWidth: "22rem" }}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.16 }}
            >
              Fill in your details and we&apos;ll confirm your appointment. No account needed.
            </motion.p>

            {/* Process steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.24 }}
              style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              {[
                { n: "01", t: "Fill the form",        d: "Enter your details and select a service." },
                { n: "02", t: "Choose a slot",         d: "Pick an available date and time." },
                { n: "03", t: "Confirmation",          d: "We call to confirm within 30 minutes." },
              ].map(({ n, t, d }) => (
                <div key={n} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <div style={{ fontSize: "0.6875rem", fontWeight: 800, color: "#60A5FA", letterSpacing: "0.08em", minWidth: "1.75rem", paddingTop: "0.15rem" }}>
                    {n}
                  </div>
                  <div style={{ borderLeft: "1px solid #E5E7EB", paddingLeft: "1.25rem" }}>
                    <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "#080808" }}>{t}</p>
                    <p style={{ fontSize: "0.8125rem", color: "#9CA3AF", marginTop: "0.2rem" }}>{d}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — Form ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="glass-card"
              style={{ padding: "2.5rem", border: "1px solid rgba(229,231,235,0.85)" }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "3rem 1rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}
                >
                  <div style={{ width: 56, height: 56, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CheckCircle2 size={28} color="#22C55E" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: "1.375rem", fontWeight: 700, color: "#080808" }}>
                    Request Received
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#6B7280", maxWidth: "20rem", lineHeight: 1.6 }}>
                    We&apos;ll contact you within 30 minutes to confirm your appointment.
                  </p>
                  <button className="btn btn-ghost" onClick={() => setSubmitted(false)} style={{ marginTop: "0.5rem" }}>
                    Book Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {/* Name + Phone */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label htmlFor="f_name" style={labelStyle}>Full Name *</label>
                      <FocusField id="f_name" placeholder="Ahmed Khan" {...register("patient_name")} />
                      {errors.patient_name && <p style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.3rem" }}>{errors.patient_name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="f_phone" style={labelStyle}>Phone *</label>
                      <FocusField id="f_phone" type="tel" placeholder="+92 300 0000000" {...register("phone")} />
                      {errors.phone && <p style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.3rem" }}>{errors.phone.message}</p>}
                    </div>
                  </div>

                  {/* Email + Service */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label htmlFor="f_email" style={labelStyle}>Email <span style={{ color: "#9CA3AF", textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                      <FocusField id="f_email" type="email" placeholder="you@example.com" {...register("email")} />
                    </div>
                    <div>
                      <label htmlFor="f_service" style={labelStyle}>Service *</label>
                      <div style={{ position: "relative" }}>
                        <select id="f_service" {...register("service")} defaultValue=""
                          style={{ ...inputStyle, appearance: "none", paddingRight: "2.5rem" }}
                          onFocus={(e)  => { e.target.style.borderColor = "#60A5FA"; }}
                          onBlur={(e)   => { e.target.style.borderColor = "#E5E7EB"; }}
                        >
                          <option value="" disabled>Select service</option>
                          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={15} style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
                      </div>
                      {errors.service && <p style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.3rem" }}>{errors.service.message}</p>}
                    </div>
                  </div>

                  {/* Date + Slot */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label htmlFor="f_date" style={labelStyle}>Date *</label>
                      <FocusField id="f_date" type="date" min={todayStr()} {...register("appointment_date")} />
                      {errors.appointment_date && <p style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.3rem" }}>{errors.appointment_date.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="f_slot" style={labelStyle}>Time Slot *</label>
                      <div style={{ position: "relative" }}>
                        <select id="f_slot" {...register("slot_id")} defaultValue=""
                          style={{ ...inputStyle, appearance: "none", paddingRight: "2.5rem" }}
                          onFocus={(e)  => { e.target.style.borderColor = "#60A5FA"; }}
                          onBlur={(e)   => { e.target.style.borderColor = "#E5E7EB"; }}
                        >
                          <option value="" disabled>{slots.length ? "Select slot" : "No slots"}</option>
                          {slots.map((s) => <option key={s.id} value={s.id}>{s.start_time} – {s.end_time}</option>)}
                        </select>
                        <ChevronDown size={15} style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
                      </div>
                      {errors.slot_id && <p style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.3rem" }}>{errors.slot_id.message}</p>}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="f_notes" style={labelStyle}>Notes <span style={{ color: "#9CA3AF", textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                    <textarea id="f_notes" rows={3} {...register("notes")} placeholder="Any specific concerns or requests..."
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={(e)  => { e.target.style.borderColor = "#60A5FA"; }}
                      onBlur={(e)   => { e.target.style.borderColor = "#E5E7EB"; }}
                    />
                  </div>

                  {apiError && (
                    <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "10px", padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#DC2626" }}>
                      {apiError}
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting} className="btn btn-blue" style={{ width: "100%", justifyContent: "center", padding: "1rem", fontSize: "0.9375rem", opacity: isSubmitting ? 0.65 : 1 }}>
                    {isSubmitting ? <><Loader2 size={17} className="animate-spin" /> Submitting...</> : <><CalendarDays size={17} /> Confirm Appointment</>}
                  </button>

                  <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#9CA3AF" }}>
                    We confirm via call within 30 minutes.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
