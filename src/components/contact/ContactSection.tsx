"use client";

import { FormEvent, useState } from "react";

import Container from "@/components/ui/Container";

function LocationIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 18 20" width="18">
      <path d="M9 18.5c3.4-3.1 6.5-6.7 6.5-10.4A6.5 6.5 0 0 0 2.5 8.1C2.5 11.8 5.6 15.4 9 18.5Z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="8" r="2.1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 16 21" width="16">
      <rect height="18.5" rx="2.4" stroke="currentColor" strokeWidth="1.4" width="12" x="2" y="1" />
      <circle cx="8" cy="16.4" fill="currentColor" r="1" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 20 18" width="20">
      <rect height="14" rx="3" stroke="currentColor" strokeWidth="1.4" width="18" x="1" y="2" />
      <path d="m3 5 5.2 4.1a2.9 2.9 0 0 0 3.6 0L17 5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
    </svg>
  );
}

const fieldClass =
  "mt-3 w-full rounded-lg border border-slate-200 bg-white px-4 py-4 text-[0.95rem] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1217C9] focus:ring-2 focus:ring-[#1217C9]/10";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="bg-white py-20 sm:py-28 lg:py-32">
      <Container size="xl">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-slate-950">
          Common Questions
        </p>
        <div className="mt-7 grid gap-14 lg:grid-cols-[1fr_1.08fr] lg:gap-20">
          <div>
            <h1 className="max-w-xl text-[3rem] font-normal leading-[1.03] tracking-[-0.065em] text-black sm:text-[4rem]">
              Have inquiries?
              <br />
              Reach out to us!
            </h1>
            <p className="mt-8 max-w-lg text-[1rem] leading-7 text-slate-500">
              We are here to assist you with any questions or concerns you may have. Feel free to reach out to us anytime.
            </p>
            <ul className="mt-10 space-y-6 text-[0.98rem] text-slate-500">
              <li className="flex items-center gap-4">
                <span className="text-[#1824FF]"><LocationIcon /></span>
                <span>Room 13, Villa Abrille St., JP Laurel Ave., Bajada, Davao City</span>
              </li>
              <li>
                <a className="flex items-center gap-4 text-slate-950 transition hover:text-[#1217C9]" href="tel:+639260538831">
                  <span className="text-[#1824FF]"><PhoneIcon /></span>
                  <span>+63 926 053 8831</span>
                </a>
              </li>
              <li>
                <a className="flex items-center gap-4 transition hover:text-[#1217C9]" href="mailto:gutguardhq@gutguard.ph">
                  <span className="text-[#1824FF]"><EmailIcon /></span>
                  <span>gutguardhq@gutguard.ph</span>
                </a>
              </li>
            </ul>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-[0.95rem] font-medium text-slate-950">
                Name <span className="text-red-500">*</span>
                <input className={fieldClass} name="name" placeholder="Enter your name" required type="text" />
              </label>
              <label className="text-[0.95rem] font-medium text-slate-950">
                Email <span className="text-red-500">*</span>
                <input className={fieldClass} name="email" placeholder="Enter your email" required type="email" />
              </label>
            </div>
            <label className="block text-[0.95rem] font-medium text-slate-950">
              Phone
              <input className={fieldClass} name="phone" placeholder="Enter your number" type="tel" />
            </label>
            <label className="block text-[0.95rem] font-medium text-slate-950">
              Message
              <textarea className={`${fieldClass} min-h-36 resize-y`} name="message" placeholder="Enter your message" />
            </label>
            <label className="flex items-start gap-3 text-[0.82rem] leading-5 text-slate-400">
              <input className="mt-1 h-4 w-4 rounded border-slate-300 accent-[#1217C9]" name="consent" required type="checkbox" />
              <span>
                I agree that my submitted data is being{" "}
                <a className="!text-[#1217C9] hover:underline" href="/privacy-policy">
                  collected and stored
                </a>
                .
              </span>
            </label>
            <button className="rounded-lg bg-[#1217C9] px-9 py-4 text-[0.95rem] font-semibold text-white transition hover:bg-[#0B109E]" type="submit">
              Send Message
            </button>
            {submitted && (
              <p className="text-[0.9rem] text-emerald-700" role="status">
                Thanks for reaching out. Your message is ready for review.
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
