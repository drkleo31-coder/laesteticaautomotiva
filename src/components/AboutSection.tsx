import { motion, useReducedMotion } from 'motion/react';
import { BUSINESS_INFO } from '../data/catalog';
import {
  ParallaxGlowBackdrop,
  RevealParagraph,
  SectionTransitionLine,
  SplitRevealEyebrow,
  SplitRevealHeadline,
} from './ScrollEffects';

const PILLARS = [
  {
    number: '01',
    title: 'Cuidado completo',
    text: 'Da lavagem detalhada à vitrificação, cada etapa é conduzida com atenção às superfícies externas, internas e componentes do veículo.',
  },
  {
    number: '02',
    title: 'Atenção às especificidades',
    text: 'Carros e motocicletas recebem tratamento dedicado conforme a necessidade de cada área: pintura, vidros, faróis, rodas, motor e couro.',
  },
  {
    number: '03',
    title: 'Transparência no atendimento',
    text: 'Catálogo claro e atendimento direto pelo WhatsApp para alinhar os detalhes e confirmar o valor ideal para o seu veículo.',
  },
] as const;

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-gradient-to-b from-[#070708] via-[#09090B] to-[#09090B] py-20 lg:py-28"
    >
      <SectionTransitionLine />
      <ParallaxGlowBackdrop align="center" intensity="medium" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Editorial Statement */}
          <div className="lg:col-span-6">
            <SplitRevealEyebrow
              text={BUSINESS_INFO.name}
              className="text-xs font-medium tracking-widest text-[#D4AF37]"
            />
            <SplitRevealHeadline
              text="Cada detalhe importa. Cada acabamento faz a diferença."
              highlightWords={['diferença.']}
              className="font-display mt-3 text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-[#F4F2ED] sm:text-4xl lg:text-[46px]"
            />

            {/* Animated Golden Hairline Divider */}
            <motion.div
              initial={shouldReduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.85, ease: CINEMATIC_EASE }}
              className="mt-6 h-px w-36 origin-left bg-gradient-to-r from-[#ECD176] via-[#D4AF37]/60 to-transparent"
            />

            <RevealParagraph
              delay={0.24}
              className="mt-6 max-w-xl text-sm leading-relaxed text-[#D4D4D8] sm:text-base"
            >
              A L.A Estética Automotiva reúne serviços dedicados à conservação, limpeza profunda,
              polimento e proteção automotiva. Nosso compromisso é entregar um acabamento refinado,
              valorizando cada superfície do seu veículo com seriedade e cuidado.
            </RevealParagraph>
          </div>

          {/* Right Architectural Pillars List */}
          <div className="space-y-4 lg:col-span-6">
            {PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.number}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 20, y: 12 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.58,
                  delay: shouldReduceMotion ? 0 : index * 0.11,
                  ease: CINEMATIC_EASE,
                }}
                className="gold-card-sheen rounded-xl border border-white/[0.08] bg-[#0F1013] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/35 hover:shadow-[0_18px_40px_rgba(0,0,0,0.5)] sm:p-6"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-semibold tabular-nums text-[#D4AF37]">
                    {pillar.number}.
                  </span>
                  <h3 className="text-base font-semibold text-[#F4F2ED] sm:text-lg">
                    {pillar.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                  {pillar.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
