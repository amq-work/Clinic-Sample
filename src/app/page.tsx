import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import AppointmentSection from "@/components/AppointmentSection";
import ContactSection from "@/components/ContactSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import ScrollGradient from "@/components/ScrollGradient";

export default function Home() {
  return (
    <>
      {/* Fixed scroll-linked gradient orbs — sits behind everything */}
      <ScrollGradient />

      {/* Page content */}
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <AppointmentSection />
        <ContactSection />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
