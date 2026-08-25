import Image from "next/image";

const SOCIAL_LINKS = [
  {
    label: "X (Twitter)",
    href: "https://x.com/CazurroOrgullo",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M18.9 2H22l-7.6 8.7L23.3 22h-6.9l-5.4-6.9L4.8 22H1.7l8.1-9.3L1 2h7.1l4.9 6.3L18.9 2Zm-1.2 18h1.9L7.4 4h-2l12.3 16Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/orgullocazurro2008?igsi=MW94M255Nnp3NnR1cA==",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
        className="h-4 w-4"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@orgullocazurro2008?si=DT_7rx8M69PbPNtE",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5v-7l6.3 3.5-6.3 3.5Z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M21.6 3.6 2.9 11c-.8.3-.8 1.5 0 1.8l4.6 1.5 1.8 5.6c.2.7 1.1.9 1.6.3l2.5-2.7 4.6 3.4c.7.5 1.7.1 1.9-.7l3.1-14.6c.2-1-.7-1.9-1.4-1.6ZM8.8 13.7l8.6-6.5c.3-.2.6.2.3.4l-7 6.6-.3 3.1-1.6-3.6Z" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-black">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-4">
        <div>
          <Image
            src="/images/logo.png"
            alt="Escudo de Orgullo Cazurro"
            width={72}
            height={72}
            className="h-[72px] w-[72px] rounded-full border border-[var(--color-border)] object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-sm font-semibold tracking-[0.15em] text-white uppercase">
            Síguenos en redes
          </h3>
          <ul className="flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-white hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-2 text-sm text-[var(--color-muted)]">
            info@orgullocazurro.example
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-sm font-semibold tracking-[0.15em] text-white uppercase">
            Privacidad
          </h3>
          <nav
            aria-label="Enlaces del pie de página"
            className="flex flex-col gap-2 text-sm text-[var(--color-muted)]"
          >
            <a href="#" className="hover:text-white">
              Contacto
            </a>
            <a href="#" className="hover:text-white">
              Privacidad
            </a>
          </nav>
        </div>

        <div className="flex items-start sm:justify-end">
          <p className="max-w-xs text-sm text-[var(--color-muted)] italic">
            &ldquo;Nada está por encima, nada es más importante.&rdquo;
          </p>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] px-6 py-4">
        <p className="mx-auto max-w-6xl text-xs text-[var(--color-muted)]">
          © {year} Orgullo Cazurro
        </p>
      </div>
    </footer>
  );
}
