import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { CarFront, MessageCircle } from 'lucide-react';
import { buildWhatsAppCustomUrl } from '../data/catalog';
import {
  RevealParagraph,
  SectionTransitionLine,
  SplitRevealEyebrow,
  SplitRevealHeadline,
} from './ScrollEffects';

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

export function PickupDeliverySection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const orbParallaxY = useTransform(scrollYProgress, [0, 1], [-30, 36]);

  const whatsappPickupUrl = buildWhatsAppCustomUrl(
    'Olá! Acessei o site da L.A Estética Automotiva e gostaria de consultar a disponibilidade do serviço Busca e Leva.'
  );

  return (
    <section
      ref={sectionRef}
      id="busca-e-leva"
      className="relative overflow-hidden bg-gradient-to-b from-[#09090B] via-[#070708] to-[#070708] py-20 lg:py-24"
    >
      <SectionTransitionLine />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 26, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: CINEMATIC_EASE }}
          className="gold-card-sheen relative overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#121317] via-[#0B0C0E] to-[#08080A] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.55)] sm:p-10 lg:p-14"
        >
          {/* Parallax Golden Corner Glow */}
          <motion.div
            aria-hidden="true"
            style={shouldReduceMotion ? undefined : { y: orbParallaxY }}
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D4AF37]/14 blur-3xl"
          />

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2.5 text-xs font-medium tracking-widest text-[#D4AF37]">
                <CarFront className="h-4 w-4 shrink-0" aria-hidden="true" />
                <SplitRevealEyebrow text="Comodidade" className="text-xs font-medium tracking-widest text-[#D4AF37]" />
              </div>

              <SplitRevealHeadline
                text="Mais praticidade para você. Nós buscamos e levamos."
                highlightWords={['levamos.']}
                className="font-display mt-3 text-balance text-3xl font-semibold tracking-tight text-[#F4F2ED] sm:text-4xl lg:text-[42px]"
              />

              <RevealParagraph
                delay={0.22}
                className="mt-4 max-w-2xl text-sm leading-relaxed text-[#D4D4D8] sm:text-base"
              >
                Para facilitar a sua rotina, oferecemos o serviço de busca e leva para o seu
                veículo. Entre em contato pelo WhatsApp para consultar a disponibilidade e combinar
                os detalhes do atendimento.
              </RevealParagraph>
            </div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: 0.28, ease: CINEMATIC_EASE }}
              className="flex lg:col-span-4 lg:justify-end"
            >
              <a
                href={whatsappPickupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-sweep-sheen inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-[#D4AF37] px-6 py-3.5 text-sm font-semibold text-[#070708] shadow-[0_10px_28px_rgba(212,175,55,0.22)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#ECD176] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ECD176] sm:w-auto"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Consultar disponibilidade</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
