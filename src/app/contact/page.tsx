import type { Metadata } from "next";

import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";

export const metadata: Metadata = {
  title: "Contact | GutGuard",
  description: "Get in touch with the GutGuard team.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
