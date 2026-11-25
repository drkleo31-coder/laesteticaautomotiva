export type ParticleVariant = 'hero' | 'ambient';

export function splitWordsForReveal(text: string): string[] {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
}

export function splitLettersForReveal(text: string): string[] {
  return Array.from(text);
}

export function computeParticleDensity(
  viewportWidth: number,
  variant: ParticleVariant
): { dustCount: number; orbCount: number } {
  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  if (variant === 'hero') {
    if (isMobile) return { dustCount: 18, orbCount: 4 };
    if (isTablet) return { dustCount: 26, orbCount: 5 };
    return { dustCount: 36, orbCount: 7 };
  }

  // Ambient backdrop uses lighter particle budgets across scroll
  if (isMobile) return { dustCount: 14, orbCount: 3 };
  if (isTablet) return { dustCount: 20, orbCount: 4 };
  return { dustCount: 26, orbCount: 5 };
}

export function clampParallaxOffset(progress: number, rangePx: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  return (clamped - 0.5) * 2 * rangePx;
}
