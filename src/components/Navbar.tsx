import { useEffect, useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppCustomUrl } from '../data/catalog';

const NAV_LINKS = [
  { href: '#catalogo', label: 'Serviços' },
  { href: '#experiencia', label: 'Acabamento' },
  { href: '#sobre', label: 'Empresa' },
  { href: '#busca-e-leva', label: 'Busca e Leva' },
  { href: '#localizacao', label: 'Localização' },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const whatsappHeroUrl = buildWhatsAppCustomUrl(
    'Olá! Acessei o site da L.A Estética Automotiva e gostaria de agendar um atendimento.'
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || mobileMenuOpen
          ? 'border-b border-[#D4AF37]/20 bg-[#070708]/92 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-[#070708]/85 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark with untouched original logo */}
        <a
          href="#inicio"
          className="flex shrink-0 items-center gap-3 whitespace-nowrap text-sm font-semibold tracking-wide text-[#F4F2ED] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] sm:text-base"
        >
          <img
            src={BUSINESS_INFO.logoSrc}
            alt="Logo L.A Estética Automotiva"
            className="h-9 w-9 shrink-0 rounded-md object-contain bg-black"
          />
          <span className="whitespace-nowrap">L.A Estética Automotiva</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative shrink-0 whitespace-nowrap py-1 text-sm font-medium text-[#D4D4D8] transition-colors duration-200 hover:text-[#ECD176] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Drawer Toggle */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={whatsappHeroUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-[#D4AF37]/70 bg-[#D4AF37] px-4 py-2 text-xs font-semibold tracking-wide text-[#070708] transition-colors duration-200 hover:bg-[#ECD176] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ECD176] sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Agendar</span>
          </a>

          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[#F4F2ED] transition-colors hover:border-[#D4AF37]/50 hover:text-[#ECD176] focus-visible:outline-2 focus-visible:outline-[#D4AF37] lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Menu mobile"
          className="border-t border-[#D4AF37]/15 bg-[#0A0A0C]/98 px-4 pb-6 pt-4 backdrop-blur-lg lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-[#F4F2ED] transition-colors hover:bg-white/5 hover:text-[#ECD176]"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <div className="mt-4 border-t border-white/10 pt-4">
            <a
              href={whatsappHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-lg bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#070708] transition-colors hover:bg-[#ECD176]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Agendar pelo WhatsApp</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
