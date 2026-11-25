import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppCustomUrl } from '../data/catalog';

const FOOTER_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#experiencia', label: 'Acabamento' },
  { href: '#catalogo', label: 'Catálogo de Serviços' },
  { href: '#sobre', label: 'Sobre a Empresa' },
  { href: '#busca-e-leva', label: 'Busca e Leva' },
  { href: '#localizacao', label: 'Localização e Horário' },
] as const;

export function Footer() {
  const whatsappUrl = buildWhatsAppCustomUrl(
    'Olá! Acessei o site da L.A Estética Automotiva e gostaria de agendar um atendimento.'
  );

  return (
    <footer className="border-t border-[#D4AF37]/20 bg-[#050506] pb-24 pt-16 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <a
              href="#inicio"
              className="inline-flex items-center gap-3.5 text-[#F4F2ED] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
            >
              <img
                src={BUSINESS_INFO.logoSrc}
                alt="Logo L.A Estética Automotiva"
                className="h-14 w-14 rounded-lg border border-[#D4AF37]/25 bg-black object-contain p-0.5"
              />
              <span className="font-display text-2xl font-semibold tracking-tight">
                {BUSINESS_INFO.name}
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#A1A1AA]">
              Precisão nos detalhes. Excelência em cada acabamento.
            </p>

            <div className="mt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-lg bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[#070708] transition-colors hover:bg-[#ECD176] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ECD176]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Agendar pelo WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold tracking-widest text-[#D4AF37]">
              Navegação
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#D4D4D8] transition-colors hover:text-[#ECD176] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours Column */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold tracking-widest text-[#D4AF37]">
              Atendimento e Endereço
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs text-[#A1A1AA]">Endereço</dt>
                <dd className="mt-0.5 font-medium text-[#F4F2ED]">
                  <a
                    href={BUSINESS_INFO.mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#ECD176]"
                  >
                    {BUSINESS_INFO.address}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#A1A1AA]">Horário de funcionamento</dt>
                <dd className="mt-0.5 font-medium text-[#F4F2ED]">
                  {BUSINESS_INFO.hoursDays} · {BUSINESS_INFO.hoursTime}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#A1A1AA]">WhatsApp</dt>
                <dd className="mt-0.5 font-medium tabular-nums text-[#ECD176]">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:underline"
                  >
                    {BUSINESS_INFO.whatsappDisplay}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.08] pt-6 text-xs text-[#71717A] sm:flex sm:items-center sm:justify-between">
          <p>{BUSINESS_INFO.name}</p>
          <p className="mt-2 sm:mt-0">{BUSINESS_INFO.address}</p>
        </div>
      </div>
    </footer>
  );
}
