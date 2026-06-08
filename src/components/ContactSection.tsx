"use client";
import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { createInquiry } from "@/lib/api";

const schema = z.object({
  patient_name: z.string().min(2, "Name required"),
  contact:      z.string().min(7, "Phone required"),
  message:      z.string().min(10, "Min 10 characters"),
});
type FormData = z.infer<typeof schema>;

const iStyle: React.CSSProperties = {
  width:"100%", padding:"0.8125rem 1rem", border:"1.5px solid #E5E7EB",
  borderRadius:"10px", fontSize:"0.9375rem", fontFamily:"inherit",
  color:"#111827", background:"rgba(255,255,255,0.85)", outline:"none", transition:"border-color 0.15s, box-shadow 0.15s",
};
const lStyle: React.CSSProperties = {
  display:"block", fontSize:"0.6875rem", fontWeight:600,
  letterSpacing:"0.1em", textTransform:"uppercase", color:"#374151", marginBottom:"0.5rem",
};

export default function ContactSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [apiError,  setApiError]  = useState("");
  const { register, handleSubmit, reset, formState:{ errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setApiError("");
    try { await createInquiry(data); setSubmitted(true); reset(); }
    catch { setApiError("Could not send. Please try again."); }
  };

  const focus = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => { e.target.style.borderColor="#60A5FA"; e.target.style.boxShadow="0 0 0 3px rgba(96,165,250,0.1)"; };
  const blur  = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => { e.target.style.borderColor="#E5E7EB"; e.target.style.boxShadow="none"; };

  return (
    <section id="contact" ref={ref} className="section" style={{ background: "transparent", position: "relative", zIndex: 1 }}>
      <div className="wrap">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.3fr", gap:"5rem", alignItems:"start" }}>
          {/* Info */}
          <div style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>
            <div>
              <motion.p className="eyebrow" initial={{opacity:0}} animate={inView?{opacity:1}:{}} style={{marginBottom:"0.875rem"}}>Get In Touch</motion.p>
              <motion.h2 className="headline" initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.08}}>
                Have a <span className="text-grad">Question?</span>
              </motion.h2>
              <motion.p className="body-lg" style={{marginTop:"1rem",maxWidth:"22rem"}} initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.16}}>
                Send us your inquiry — we respond within 2 hours.
              </motion.p>
            </div>
            <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.22}} style={{display:"flex",flexDirection:"column"}}>
              {[
                {l:"Address",       v:"123 Medical Avenue, Lahore, Pakistan"},
                {l:"Phone",         v:"+92 300 123 4567"},
                {l:"Email",         v:"info@cliniccare.pk"},
                {l:"Working Hours", v:"Mon – Sat · 9:00 AM – 6:00 PM"},
              ].map(({l,v},i,arr) => (
                <div key={l} style={{display:"flex",gap:"1.25rem",alignItems:"flex-start",padding:"1.25rem 0",borderBottom:i<arr.length-1?"1px solid #E5E7EB":"none"}}>
                  <span style={{width:6,height:6,background:"#60A5FA",display:"inline-block",marginTop:"0.5rem",flexShrink:0,borderRadius:"50%"}} />
                  <div>
                    <p style={{fontSize:"0.6875rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"#9CA3AF",marginBottom:"0.2rem"}}>{l}</p>
                    <p style={{fontSize:"0.9rem",color:"#374151",fontWeight:500}}>{v}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.3}} style={{display:"flex",gap:"0.5rem"}}>
              {["Facebook","Instagram","WhatsApp"].map((s) => (
                <a key={s} href="#" style={{padding:"0.4375rem 0.875rem",border:"1px solid #E5E7EB",borderRadius:"8px",fontSize:"0.8125rem",fontWeight:500,color:"#374151",textDecoration:"none",background:"rgba(255,255,255,0.6)",backdropFilter:"blur(8px)",transition:"border-color 0.15s, color 0.15s"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="#60A5FA";(e.currentTarget as HTMLElement).style.color="#3B82F6";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="#E5E7EB";(e.currentTarget as HTMLElement).style.color="#374151";}}>
                  {s}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Form */}
          <motion.div initial={{opacity:0,x:32}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.65,delay:0.1,ease:[0.22,1,0.36,1]}}>
            <div className="glass-card" style={{padding:"2.5rem",border:"1px solid rgba(229,231,235,0.85)"}}>
              {submitted ? (
                <motion.div initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} style={{textAlign:"center",padding:"2.5rem 1rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"}}>
                  <div style={{width:48,height:48,background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"14px",display:"flex",alignItems:"center",justifyContent:"center"}}><CheckCircle2 size={24} color="#22C55E" /></div>
                  <h3 style={{fontFamily:"var(--font-jakarta)",fontSize:"1.25rem",fontWeight:700}}>Message Sent</h3>
                  <p style={{fontSize:"0.875rem",color:"#6B7280"}}>We&apos;ll respond within 2 hours.</p>
                  <button className="btn btn-ghost" onClick={()=>setSubmitted(false)}>Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
                  <div>
                    <label htmlFor="c_name" style={lStyle}>Your Name *</label>
                    <input id="c_name" {...register("patient_name")} placeholder="Ahmed Khan" style={iStyle} onFocus={focus} onBlur={blur} />
                    {errors.patient_name && <p style={{fontSize:"0.75rem",color:"#EF4444",marginTop:"0.3rem"}}>{errors.patient_name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="c_contact" style={lStyle}>Contact Number *</label>
                    <input id="c_contact" type="tel" {...register("contact")} placeholder="+92 300 0000000" style={iStyle} onFocus={focus} onBlur={blur} />
                    {errors.contact && <p style={{fontSize:"0.75rem",color:"#EF4444",marginTop:"0.3rem"}}>{errors.contact.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="c_msg" style={lStyle}>Message *</label>
                    <textarea id="c_msg" rows={4} {...register("message")} placeholder="Write your question or feedback..." style={{...iStyle,resize:"none"}} onFocus={focus} onBlur={blur} />
                    {errors.message && <p style={{fontSize:"0.75rem",color:"#EF4444",marginTop:"0.3rem"}}>{errors.message.message}</p>}
                  </div>
                  {apiError && <div style={{background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"10px",padding:"0.75rem 1rem",fontSize:"0.875rem",color:"#DC2626"}}>{apiError}</div>}
                  <button type="submit" disabled={isSubmitting} className="btn btn-blue" style={{width:"100%",justifyContent:"center",padding:"1rem",fontSize:"0.9375rem",opacity:isSubmitting?0.65:1}}>
                    {isSubmitting ? <><Loader2 size={17} className="animate-spin" />Sending...</> : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
