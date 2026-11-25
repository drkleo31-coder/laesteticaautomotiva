import { type ReactNode, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { splitLettersForReveal, splitWordsForReveal } from '../utils/motionHelpers';

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

export function ScrollProgressHairline() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[#9E8127] via-[#ECD176] to-[#D4AF37]"
    />
  );
}

export function SectionTransitionLine() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.85, ease: CINEMATIC_EASE }}
        className="h-px w-full origin-center bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent"
      />
      <motion.span
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: CINEMATIC_EASE }}
        className="absolute h-1.5 w-1.5 rotate-45 bg-[#ECD176] shadow-[0_0_12px_rgba(236,209,118,0.85)]"
      />
    </div>
  );
}

interface SplitRevealEyebrowProps {
  text: string;
  className?: string;
}

export function SplitRevealEyebrow({ text, className = '' }: SplitRevealEyebrowProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = splitWordsForReveal(text);

  if (shouldReduceMotion) {
    return <p className={className}>{text}</p>;
  }

  let runningCharIndex = 0;

  return (
    <p aria-label={text} className={className}>
      <span aria-hidden="true" className="inline-flex flex-wrap gap-x-[0.28em]">
        {words.map((word, wordIdx) => {
          const letters = splitLettersForReveal(word);
          return (
            <span key={`${word}-${wordIdx}`} className="inline-flex whitespace-nowrap">
              {letters.map((char, charIdx) => {
                const idx = runningCharIndex++;
                return (
                  <motion.span
                    key={`${char}-${charIdx}`}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(idx * 0.016, 0.35),
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
    </p>
  );
}

interface SplitRevealHeadlineProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  delayOffset?: number;
}

export function SplitRevealHeadline({
  text,
  className = '',
  highlightWords = [],
  delayOffset = 0.06,
}: SplitRevealHeadlineProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = splitWordsForReveal(text);

  if (shouldReduceMotion) {
    return <h2 className={className}>{text}</h2>;
  }

  return (
    <h2 aria-label={text} className={className}>
      <span aria-hidden="true">
        {words.map((word, idx) => {
          const isHighlighted = highlightWords.includes(word);
          return (
            <span
              key={`${word}-${idx}`}
              className="mr-[0.25em] inline-block overflow-hidden align-bottom pb-[0.06em]"
            >
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: 0.58,
                  delay: delayOffset + idx * 0.04,
                  ease: CINEMATIC_EASE,
                }}
                className={`inline-block ${isHighlighted ? 'text-[#ECD176]' : ''}`}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </span>
    </h2>
  );
}

interface RevealParagraphProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RevealParagraph({
  children,
  className = '',
  delay = 0.16,
}: RevealParagraphProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.p
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : delay, ease: CINEMATIC_EASE }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

interface ParallaxGlowBackdropProps {
  align?: 'left' | 'right' | 'center';
  intensity?: 'soft' | 'medium';
}

export function ParallaxGlowBackdrop({
  align = 'right',
  intensity = 'soft',
}: ParallaxGlowBackdropProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yPrimary = useTransform(scrollYProgress, [0, 1], [-45, 55]);
  const ySecondary = useTransform(scrollYProgress, [0, 1], [35, -45]);

  const positionClass =
    align === 'left'
      ? '-left-32 top-1/4'
      : align === 'center'
        ? 'left-1/2 top-1/3 -translate-x-1/2'
        : '-right-32 top-1/4';

  const opacityClass = intensity === 'medium' ? 'bg-[#D4AF37]/[0.085]' : 'bg-[#D4AF37]/[0.055]';

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { y: yPrimary }}
        className={`absolute h-[420px] w-[420px] rounded-full blur-[120px] ${positionClass} ${opacityClass}`}
      />
      <motion.div
        style={shouldReduceMotion ? undefined : { y: ySecondary }}
        className="absolute bottom-10 left-1/4 h-[260px] w-[260px] rounded-full bg-[#ECD176]/[0.035] blur-[100px]"
      />
    </div>
  );
}
