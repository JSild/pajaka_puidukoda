import Link from 'next/link';

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-dark text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand & contact */}
          <div className="flex flex-col gap-4">
            <p className="font-serif text-xl tracking-wide">Pajaka Puidukoda</p>
            <div className="flex flex-col gap-1.5 text-sm text-background/60">
              <a
                href="mailto:info@pajakapuidukoda.ee"
                className="hover:text-gold transition-colors duration-200"
              >
                info@pajakapuidukoda.ee
              </a>
              <a
                href="tel:+37253642534"
                className="hover:text-gold transition-colors duration-200"
              >
                +372 5364 2534
              </a>
              <p>Pajaka küla, Eesti</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3" aria-label="Jaluse menüü">
            {[
              { href: '/tehtud-tood', label: 'Tehtud tööd' },
              { href: '/pakkumine', label: 'Küsi pakkumist' },
              { href: '/meist', label: 'Meist' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.2em] uppercase text-background/60 hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="text-xs tracking-[0.2em] uppercase text-background/40">
              Sotsiaalmeedia
            </p>
            <a
              href="https://instagram.com/pajakapuidukoda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 hover:text-gold transition-colors duration-200"
              aria-label="Pajaka Puidukoda Instagramis"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-background/10 text-xs text-background/30 text-center">
          © {new Date().getFullYear()} Pajaka Puidukoda. Kõik õigused kaitstud.
        </div>
      </div>
    </footer>
  );
}
