import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ClinicCare — Modern Dental & Health Clinic",
  description:
    "Book your appointment at ClinicCare. Professional dental and health services with experienced doctors. Easy online appointment scheduling.",
  keywords: [
    "clinic",
    "dental",
    "appointment booking",
    "health",
    "doctor",
    "medical",
  ],
  openGraph: {
    title: "ClinicCare — Modern Dental & Health Clinic",
    description: "Book your appointment online. Professional healthcare services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
