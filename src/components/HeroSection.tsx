import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowRight, MessageCircle } from 'lucide-react';
import {
  BUSINESS_INFO,
  HERO_ARRIVAL_IMAGE,
  HERO_VIDEO_SRC,
  buildWhatsAppCustomUrl,
} from '../data/catalog';
import { GoldParticlesCanvas } from './GoldParticlesCanvas';
import { splitLettersForReveal, splitWordsForReveal } from '../utils/motionHelpers';

const HERO_HEADLINE = 'Seu veículo merece um cuidado à altura.';
const HERO_WORDS = splitWordsForReveal(HERO_HEADLINE);
const HERO_SUBTITLE = 'Precisão nos detalhes. Excelência em cada acabamento.';
const HERO_SUBTITLE_WORDS = splitWordsForReveal(HERO_SUBTITLE);
const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const [heroVideoFailed, setHeroVideoFailed] = useState(false);
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '7%']);
  const contentFadeOut = useTransform(scrollYProgress, [0.2, 0.92], [1, 0.38]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    if (shouldReduceMotion) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Browser autoplay guard fallback; poster stays crisp
      });
    }
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    const handleMouseMove = (event: MouseEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 12;
      const ny = (event.clientY / window.innerHeight - 0.5) * 9;
      setPointerOffset({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  const whatsappUrl = buildWhatsAppCustomUrl(
    'Olá! Acessei o site da L.A Estética Automotiva e gostaria de agendar um atendimento.'
  );

  let subtitleCharCounter = 0;

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#070708] pb-16 pt-24 lg:pb-20 lg:pt-28"
    >
      {/* Full-Screen Hero Video Background */}
      <motion.div
        aria-hidden="true"
        style={shouldReduceMotion ? undefined : { y: bgParallaxY }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {!heroVideoFailed ? (
          <video
            ref={videoRef}
            data-testid="hero-background-video"
            src={HERO_VIDEO_SRC}
            poster={HERO_ARRIVAL_IMAGE}
            autoPlay={!shouldReduceMotion}
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            onCanPlay={() => setVideoReady(true)}
            onError={() => setHeroVideoFailed(true)}
            style={
              shouldReduceMotion
                ? undefined
                : {
                    transform: `translate3d(${(-pointerOffset.x).toFixed(1)}px, ${(-pointerOffset.y).toFixed(1)}px, 0) scale(1.06)`,
                    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out',
                  }
            }
            className={`h-full w-full object-cover object-[center_45%] ${
              videoReady ? 'opacity-85' : 'opacity-75'
            }`}
          />
        ) : !heroImgFailed ? (
          <img
            src={HERO_ARRIVAL_IMAGE}
            alt="L.A Estética Automotiva"
            referrerPolicy="no-referrer"
            onError={() => setHeroImgFailed(true)}
            className="h-full w-full object-cover object-[center_45%] opacity-80"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_70%_40%,rgba(212,175,55,0.2),#070708_65%)]" />
        )}

        {/* Measured Dark + Golden Illumination Overlay for Contrast & Luxury Aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070708]/95 via-[#070708]/70 to-[#070708]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/18 to-[#070708]/58" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_28%,rgba(212,175,55,0.24),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_78%,rgba(236,209,118,0.12),transparent_48%)]" />

        {/* Interactive Gold Specular Lighting Glow */}
        <div
          className="ambient-gold-orb absolute -right-24 top-1/4 h-[440px] w-[440px] rounded-full bg-[#D4AF37]/14 blur-[120px]"
          style={
            shouldReduceMotion
              ? undefined
              : {
                  transform: `translate3d(${(pointerOffset.x * 1.4).toFixed(1)}px, ${(pointerOffset.y * 1.4).toFixed(1)}px, 0)`,
                }
          }
        />
      </motion.div>

      {/* Interactive Floating Gold Dust & Moving Light Points */}
      <GoldParticlesCanvas variant="hero" />

      {/* Main Hero Content */}
      <motion.div
        style={shouldReduceMotion ? undefined : { opacity: contentFadeOut }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {/* 1. Elegant Logo Reveal */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 20, scale: 0.88 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.05, ease: CINEMATIC_EASE }}
              className="mb-7 inline-block"
            >
              <div className="logo-entrance-sheen relative overflow-hidden rounded-xl border border-[#D4AF37]/40 bg-black/95 p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.75),0_0_28px_rgba(212,175,55,0.16)]">
                <img
                  src={BUSINESS_INFO.logoSrc}
                  alt="L.A Estética Automotiva"
                  className="relative z-10 h-20 w-20 object-contain sm:h-24 sm:w-24"
                />
              </div>
            </motion.div>

            {/* 2. Title with Staged Masked Word Reveal */}
            <h1
              aria-label={HERO_HEADLINE}
              className="font-display max-w-2xl text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-[#F4F2ED] sm:text-5xl lg:text-[62px]"
            >
              <span aria-hidden="true">
                {HERO_WORDS.map((word, idx) => (
                  <span
                    key={`${word}-${idx}`}
                    className="mr-[0.26em] inline-block overflow-hidden pb-[0.08em] align-bottom"
                  >
                    <motion.span
                      initial={shouldReduceMotion ? false : { opacity: 0, y: '108%' }}
                      animate={{ opacity: 1, y: '0%' }}
                      transition={{
                        duration: 0.65,
                        delay: shouldReduceMotion ? 0 : 0.3 + idx * 0.06,
                        ease: CINEMATIC_EASE,
                      }}
                      className={`inline-block ${
                        word === 'altura.' ? 'text-[#ECD176]' : ''
                      }`}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            {/* Complementary Phrase with Word-Grouped Letter Reveal (never splits mid-word) */}
            <p
              aria-label={HERO_SUBTITLE}
              className="mt-5 max-w-xl text-base leading-relaxed text-[#D4D4D8] sm:text-lg"
            >
              {shouldReduceMotion ? (
                HERO_SUBTITLE
              ) : (
                <span aria-hidden="true" className="inline-flex flex-wrap gap-x-[0.28em]">
                  {HERO_SUBTITLE_WORDS.map((word, wordIdx) => {
                    const chars = splitLettersForReveal(word);
                    return (
                      <span key={`${word}-${wordIdx}`} className="inline-flex whitespace-nowrap">
                        {chars.map((char, charIdx) => {
                          const delayIdx = subtitleCharCounter++;
                          return (
                            <motion.span
                              key={`${char}-${charIdx}`}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.7 + delayIdx * 0.011,
                                ease: CINEMATIC_EASE,
                              }}
                              className="inline-block"
                            >
                              {char}
                            </motion.span>
                          );
                        })}
                      </span>
                    );
                  })}
                </span>
              )}
            </p>

            {/* 3. Primary WhatsApp Action & Catalog Link */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: shouldReduceMotion ? 0 : 1.05, ease: CINEMATIC_EASE }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-sweep-sheen inline-flex min-h-[48px] items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-[#D4AF37] px-6 py-3.5 text-sm font-semibold tracking-wide text-[#070708] shadow-[0_12px_32px_rgba(212,175,55,0.28)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#ECD176] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ECD176]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Agendar pelo WhatsApp</span>
              </a>

              <a
                href="#catalogo"
                className="inline-flex min-h-[48px] items-center gap-2 whitespace-nowrap rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-[#F4F2ED] backdrop-blur-sm transition-colors duration-200 hover:border-[#D4AF37]/50 hover:text-[#ECD176] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
              >
                <span>Ver Catálogo de Serviços</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </motion.div>

            {/* Clean Unboxed Essential Info */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 1.22, ease: CINEMATIC_EASE }}
              className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-1.5 pr-16 text-xs tracking-wide text-[#A1A1AA] sm:pr-0 sm:text-sm"
            >
              <span>{BUSINESS_INFO.address}</span>
              <span aria-hidden="true" className="hidden text-[#D4AF37]/70 sm:inline">
                ·
              </span>
              <span>
                {BUSINESS_INFO.hoursDays}, {BUSINESS_INFO.hoursTime.toLowerCase()}
              </span>
              <span aria-hidden="true" className="text-[#D4AF37]/70">
                ·
              </span>
              <span className="tabular-nums text-[#D4D4D8]">{BUSINESS_INFO.whatsappDisplay}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 1.32, ease: CINEMATIC_EASE }}
        className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center"
      >
        <a
          href="#experiencia"
          aria-label="Explorar o site"
          className="pointer-events-auto flex flex-col items-center gap-2 text-xs font-medium tracking-widest text-[#A1A1AA] transition-colors hover:text-[#ECD176] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
        >
          <span>Explorar</span>
          <motion.span
            animate={shouldReduceMotion ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#0F1012]/80 text-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.2)]"
          >
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
