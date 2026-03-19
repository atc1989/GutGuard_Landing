import Container from "@/components/ui/Container";
import { landingData } from "@/data/landing";

export default function Footer() {
  const { brand, legal, links } = landingData.footer;

  return (
    <footer className="border-t border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0.55))] py-16 backdrop-blur" id="footer">
      <Container className="grid gap-12 md:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr] md:items-start" size="xl">
        <div className="max-w-sm">
          <h3 className="font-serif text-2xl font-semibold tracking-[-0.04em] text-[var(--color-primary)]">
            {brand.name}
          </h3>
          <p className="mt-4 text-sm leading-8 text-slate-600">{brand.description}</p>
        </div>
        {links.map((column) => (
          <div key={column.title}>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {column.title}
            </h4>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a className="text-sm text-slate-700 transition hover:text-[var(--color-primary)]" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="mt-12 border-t border-[var(--line)] pt-6 text-sm text-slate-500" size="xl">
        <p>{legal.copyright}</p>
      </Container>
    </footer>
  );
}
