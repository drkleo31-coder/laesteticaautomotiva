import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Eye, SlidersHorizontal, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/catalog';
import {
  ParallaxGlowBackdrop,
  RevealParagraph,
  SectionTransitionLine,
  SplitRevealEyebrow,
  SplitRevealHeadline,
} from './ScrollEffects';

type StudioMode = 'compare' | 'spotlight';

const STUDIO_SURFACE_IMAGE = HERO_IMAGE;

export function InteractiveFinishStudio() {
  const shouldReduceMotion = useReducedMotion();
  const [mode, setMode] = useState<StudioMode>('compare');
  const [splitPercent, setSplitPercent] = useState(52);
  const [pointerPos, setPointerPos] = useState({ x: 58, y: 46 });
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const updateFromClientCoords = (clientX: number, clientY: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const pctX = Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100));
    const pctY = Math.max(6, Math.min(94, ((clientY - rect.top) / rect.height) * 100));

    if (mode === 'compare') {
      setSplitPercent(Math.round(pctX));
    } else {
      setPointerPos({ x: pctX, y: pctY });
    }
  };

  return (
    <section
      id="experiencia"
      className="relative overflow-hidden bg-gradient-to-b from-[#070708] via-[#09090B] to-[#09090B] py-20 lg:py-28"
    >
      <SectionTransitionLine />
      <ParallaxGlowBackdrop align="left" intensity="soft" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitRevealEyebrow
              text="Experiência Interativa"
              className="text-xs font-medium tracking-widest text-[#D4AF37]"
            />
            <SplitRevealHeadline
              text="Do aspecto opaco à profundidade do brilho"
              highlightWords={['brilho']}
              className="font-display mt-3 text-balance text-3xl font-semibold tracking-tight text-[#F4F2ED] sm:text-4xl lg:text-[44px]"
            />
            <RevealParagraph
              delay={0.22}
              className="mt-3 max-w-2xl text-sm leading-relaxed text-[#A1A1AA] sm:text-base"
            >
              Deslize o controle ou movimente o cursor e o dedo sobre a superfície para comparar o
              contraste entre uma pintura sem tratamento e o reflexo dourado de um acabamento
              vitrificado.
            </RevealParagraph>
          </div>

          {/* Interactive Mode Switcher */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex lg:col-span-5 lg:justify-end"
          >
            <div
              role="group"
              aria-label="Modo de inspeção da superfície"
              className="inline-flex w-full rounded-xl border border-white/10 bg-[#111215] p-1 sm:w-auto"
            >
              <button
                type="button"
                onClick={() => setMode('compare')}
                className={`flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-colors duration-200 sm:flex-initial sm:text-sm ${
                  mode === 'compare'
                    ? 'bg-[#D4AF37] text-[#070708]'
                    : 'text-[#A1A1AA] hover:text-[#F4F2ED]'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Comparar Acabamento</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('spotlight')}
                className={`flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-colors duration-200 sm:flex-initial sm:text-sm ${
                  mode === 'spotlight'
                    ? 'bg-[#D4AF37] text-[#070708]'
                    : 'text-[#A1A1AA] hover:text-[#F4F2ED]'
                }`}
              >
                <Eye className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Explorar Reflexo</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Interactive Surface Viewport */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.975 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="gold-card-sheen mt-10 overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-[#0D0E11] shadow-[0_24px_64px_rgba(0,0,0,0.65)]"
        >
          <div
            ref={stageRef}
            data-testid="interactive-finish-stage"
            onPointerDown={(e) => {
              setIsDragging(true);
              updateFromClientCoords(e.clientX, e.clientY);
            }}
            onPointerMove={(e) => {
              if (mode === 'spotlight' || isDragging) {
                updateFromClientCoords(e.clientX, e.clientY);
              }
            }}
            onPointerUp={() => setIsDragging(false)}
            onPointerLeave={() => setIsDragging(false)}
            onTouchMove={(e) => {
              if (e.touches[0]) {
                updateFromClientCoords(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden touch-none sm:aspect-[16/8.5] lg:aspect-[16/7.2]"
          >
            {/* Base Layer: Opaca / Sem Brilho */}
            {!imageError ? (
              <img
                src={STUDIO_SURFACE_IMAGE}
                alt="Simulação ilustrativa de superfície automotiva opaca"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
                style={{
                  filter: 'grayscale(0.75) brightness(0.56) contrast(0.76) blur(0.7px)',
                }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#18181b] via-[#111113] to-[#09090b]" />
            )}

            {/* Subtle Haze Layer for Dull Side */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_45%,rgba(255,255,255,0.08),rgba(7,7,8,0.52))]"
            />

            {/* Gloss / Golden Reflection Layer */}
            {mode === 'compare' ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
                style={{
                  clipPath: `inset(0 0 0 ${splitPercent}%)`,
                }}
              >
                {!imageError ? (
                  <img
                    src={STUDIO_SURFACE_IMAGE}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center"
                    style={{
                      filter: 'contrast(1.16) saturate(1.25) brightness(1.06)',
                    }}
                  />
                ) : (
                  <div className="h-full w-full bg-[radial-gradient(circle_at_70%_40%,rgba(212,175,55,0.35),#09090b_70%)]" />
                )}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(236,209,118,0.18),transparent_60%)]" />
              </div>
            ) : (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  WebkitMaskImage: `radial-gradient(circle 200px at ${pointerPos.x}% ${pointerPos.y}%, #000 0%, rgba(0,0,0,0.88) 45%, transparent 100%)`,
                  maskImage: `radial-gradient(circle 200px at ${pointerPos.x}% ${pointerPos.y}%, #000 0%, rgba(0,0,0,0.88) 45%, transparent 100%)`,
                }}
              >
                {!imageError ? (
                  <img
                    src={STUDIO_SURFACE_IMAGE}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center"
                    style={{
                      filter: 'contrast(1.18) saturate(1.28) brightness(1.1)',
                    }}
                  />
                ) : (
                  <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.38),#09090b_70%)]" />
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle 210px at ${pointerPos.x}% ${pointerPos.y}%, rgba(236,209,118,0.22), transparent 75%)`,
                  }}
                />
              </div>
            )}

            {/* Divider Line & Handle in Compare Mode */}
            {mode === 'compare' && (
              <div
                aria-hidden="true"
                style={{ left: `${splitPercent}%` }}
                className="pointer-events-none absolute inset-y-0 z-10 -translate-x-1/2"
              >
                <div className="h-full w-0.5 bg-gradient-to-b from-transparent via-[#ECD176] to-transparent shadow-[0_0_14px_rgba(212,175,55,0.8)]" />
                <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#ECD176] bg-[#070708]/90 text-[#ECD176] shadow-[0_0_24px_rgba(212,175,55,0.45)]">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>
              </div>
            )}

            {/* Spotlight Reticle in Spotlight Mode */}
            {mode === 'spotlight' && (
              <div
                aria-hidden="true"
                style={{
                  left: `${pointerPos.x}%`,
                  top: `${pointerPos.y}%`,
                }}
                className="pointer-events-none absolute z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#ECD176]/60 bg-[#D4AF37]/10 text-[#ECD176]"
              >
                <Sparkles className="h-4 w-4" />
              </div>
            )}

            {/* Surface State Labels positioned at top corners clear of floating WhatsApp button */}
            <div className="pointer-events-none absolute inset-x-4 top-4 z-10 flex items-center justify-between text-xs font-medium tracking-wide text-[#F4F2ED] sm:inset-x-6 sm:top-5 sm:text-sm">
              <span className="rounded bg-[#070708]/80 px-3 py-1.5 backdrop-blur-sm">
                Superfície opaca
              </span>
              <span className="rounded bg-[#070708]/80 px-3 py-1.5 text-[#ECD176] backdrop-blur-sm">
                Acabamento brilhante
              </span>
            </div>
          </div>

          {/* Accessible Range Control & Illustrative Disclaimer Bar */}
          <div className="flex flex-col gap-4 border-t border-white/[0.08] bg-[#0C0D10] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            {mode === 'compare' ? (
              <div className="flex flex-1 items-center gap-4">
                <label
                  htmlFor="finish-compare-slider"
                  className="shrink-0 whitespace-nowrap text-xs font-medium text-[#D4D4D8]"
                >
                  Ajuste de revelação ({splitPercent}%)
                </label>
                <input
                  id="finish-compare-slider"
                  type="range"
                  min={4}
                  max={96}
                  value={splitPercent}
                  onChange={(e) => setSplitPercent(Number(e.target.value))}
                  className="h-2 w-full max-w-xs cursor-pointer accent-[#D4AF37]"
                />
              </div>
            ) : (
              <p className="text-xs font-medium text-[#D4D4D8]">
                Movimente o cursor ou toque sobre a pintura para inspecionar o reflexo dourado.
              </p>
            )}

            <p className="text-xs text-[#A1A1AA]">
              Simulação visual ilustrativa · Imagens ilustrativas de estúdio.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
