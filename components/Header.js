'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/tehtud-tood', label: 'Tehtud tööd' },
  { href: '/pakkumine', label: 'Küsi pakkumist' },
  { href: '/meist', label: 'Meist' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const solidBg = !isHomePage || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidBg
          ? 'bg-background border-b border-dark/10 shadow-[0_1px_8px_rgba(61,43,31,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* Logo pilt — asenda /images/logo.svg oma logofailiga (.svg või .png) */}
          <img
            src="/images/logo.svg"
            alt="Pajaka Puidukoda"
            className="h-10 w-auto"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
          />
          {/* Teksti fallback — kuvatakse kui logo fail puudub */}
          <span
            className="font-serif text-lg tracking-wide text-dark hover:text-gold transition-colors duration-200"
            style={{ display: 'none' }}
          >
            Pajaka Puidukoda
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Peamenüü">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-gold'
                  : 'text-dark hover:text-gold'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Sulge menüü' : 'Ava menüü'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-full h-px bg-dark transition-all duration-300 origin-center ${
              menuOpen ? 'rotate-45 translate-y-[6px]' : ''
            }`}
          />
          <span
            className={`block w-full h-px bg-dark transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-full h-px bg-dark transition-all duration-300 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64' : 'max-h-0'
        } bg-background border-t border-dark/10`}
      >
        <nav className="flex flex-col px-6 py-6 gap-5" aria-label="Mobiilmenüü">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                pathname === link.href ? 'text-gold' : 'text-dark'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
