import { motion, useReducedMotion } from 'motion/react';
import { Clock, ExternalLink, MapPin, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppCustomUrl } from '../data/catalog';
import {
  ParallaxGlowBackdrop,
  SectionTransitionLine,
  SplitRevealEyebrow,
  SplitRevealHeadline,
} from './ScrollEffects';

export function LocationSection() {
  const shouldReduceMotion = useReducedMotion();

  const whatsappLocationUrl = buildWhatsAppCustomUrl(
    'Olá! Acessei o site da L.A Estética Automotiva e gostaria de confirmar o endereço e horários para atendimento.'
  );

  return (
    <section
      id="localizacao"
      className="relative overflow-hidden bg-gradient-to-b from-[#070708] via-[#09090B] to-[#09090B] py-20 lg:py-28"
    >
      <SectionTransitionLine />
      <ParallaxGlowBackdrop align="right" intensity="soft" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <SplitRevealEyebrow
            text="Localização e Horário"
            className="text-xs font-medium tracking-widest text-[#D4AF37]"
          />
          <SplitRevealHeadline
            text={`Visite a ${BUSINESS_INFO.name}`}
            highlightWords={['Automotiva']}
            className="font-display mt-3 text-balance text-3xl font-semibold tracking-tight text-[#F4F2ED] sm:text-4xl lg:text-[44px]"
          />
        </div>

        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-12">
          {/* Left Architectural Info Panel */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="gold-card-sheen flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0E0F12] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.45)] sm:p-8 lg:col-span-5"
          >
            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wide text-[#A1A1AA]">Endereço</p>
                  <p className="mt-1 text-base font-semibold text-[#F4F2ED] sm:text-lg">
                    {BUSINESS_INFO.address}
                  </p>
                </div>
              </div>

              <div className="h-px bg-white/[0.07]" />

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wide text-[#A1A1AA]">
                    Horário de funcionamento
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#F4F2ED] sm:text-lg">
                    {BUSINESS_INFO.hoursDays}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-[#ECD176]">
                    {BUSINESS_INFO.hoursTime}
                  </p>
                </div>
              </div>

              <div className="h-px bg-white/[0.07]" />

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wide text-[#A1A1AA]">
                    WhatsApp Oficial
                  </p>
                  <p className="mt-1 text-base font-semibold tabular-nums text-[#F4F2ED] sm:text-lg">
                    {BUSINESS_INFO.whatsappDisplay}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={BUSINESS_INFO.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-sweep-sheen inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#070708] transition-colors duration-200 hover:bg-[#ECD176] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ECD176]"
              >
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Abrir no Google Maps</span>
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>

              <a
                href={whatsappLocationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-[#F4F2ED] transition-colors duration-200 hover:border-[#D4AF37]/50 hover:text-[#ECD176] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Falar pelo WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Right Embedded Google Maps */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.975, y: 14 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="gold-card-sheen min-h-[340px] overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-[#0E0F12] shadow-[0_24px_60px_rgba(0,0,0,0.5)] lg:col-span-7 lg:min-h-[440px]"
          >
            <iframe
              title="Mapa de localização — L.A Estética Automotiva"
              src={BUSINESS_INFO.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[340px] w-full border-0 lg:min-h-[440px]"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
