import { MessageCircle } from 'lucide-react';
import { buildWhatsAppCustomUrl } from '../data/catalog';

export function FloatingWhatsApp() {
  const whatsappUrl = buildWhatsAppCustomUrl(
    'Olá! Acessei o site da L.A Estética Automotiva e gostaria de agendar um atendimento.'
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar atendimento pelo WhatsApp (19) 99705-9898"
      className="fixed bottom-4 right-4 z-30 inline-flex h-13 w-13 items-center justify-center rounded-full border border-[#ECD176]/60 bg-[#D4AF37] text-[#070708] shadow-[0_10px_28px_rgba(0,0,0,0.65)] transition-transform duration-200 hover:scale-105 hover:bg-[#ECD176] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ECD176] sm:bottom-6 sm:right-6 sm:h-auto sm:w-auto sm:gap-2.5 sm:px-5 sm:py-3"
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="hidden whitespace-nowrap text-sm font-semibold sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
