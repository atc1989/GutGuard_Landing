import Image from "next/image";

import Container from "@/components/ui/Container";
import { landingData } from "@/data/landing";

export default function Footer() {
  const { brand, legal, links } = landingData.footer;

  return (
    <footer
      className="border-t border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0.55))] py-16 backdrop-blur"
      id="footer"
    >
      <Container className="grid gap-12 lg:grid-cols-[1.65fr_0.65fr_0.8fr_0.9fr] lg:items-start" size="xl">
        <div className="max-w-md">
          <a className="inline-flex" href="#top">
            <Image
              alt={brand.name}
              className="h-auto w-[168px] object-contain"
              height={56}
              src="/images/gutguard-logo.png"
              width={168}
            />
          </a>
          <p className="mt-8 max-w-[31rem] text-[15px] leading-9 text-slate-500">{brand.description}</p>
          <div className="mt-8 flex items-center gap-3">
            {brand.socialLinks.map((link) => (
              <a
                aria-label={link.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:text-[var(--color-primary)]"
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                <svg aria-hidden="true" className="h-4 w-4 fill-current" viewBox="0 0 8 15">
                  <path d="M4.409 5.154V3.279c0-.123.023-.245.068-.359.044-.114.109-.217.192-.304a.887.887 0 0 1 .287-.203.839.839 0 0 1 .338-.072h.882V0H4.411a3.34 3.34 0 0 0-1.013.214 3.115 3.115 0 0 0-.858.609 3.033 3.033 0 0 0-.574.912 3.02 3.02 0 0 0-.201 1.076v2.343H0V7.5h1.765V15H4.41V7.5h1.765l.884-2.346H4.409Z" />
                </svg>
              </a>
            ))}
          </div>
        </div>
        {links.map((column) => (
          <div key={column.title}>
            <h4 className="text-[15px] font-semibold text-slate-950">{column.title}</h4>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a className="text-[15px] leading-9 text-slate-500 transition hover:text-[var(--color-primary)]" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="text-[15px] font-semibold text-slate-950">{brand.contact.title}</h4>
          <div className="space-y-4 text-[15px] leading-9 text-slate-500">
            <a className="block transition hover:text-[var(--color-primary)]" href={`mailto:${brand.contact.email}`}>
              {brand.contact.email}
            </a>
            <p>
              {brand.contact.locationLabel}
              <br />
              {brand.contact.address}
            </p>
          </div>
        </div>
      </Container>
      <Container
        className="mt-14 flex flex-col gap-4 border-t border-[var(--line)] pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between"
        size="xl"
      >
        <p>{legal.copyright}</p>
        <p>
          {legal.creditLabel}{" "}
          <a className="text-slate-950 transition hover:text-[var(--color-primary)]" href={legal.creditHref}>
            {legal.creditName}
          </a>
        </p>
      </Container>
    </footer>
  );
}
