import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampParallaxOffset,
  computeParticleDensity,
  splitLettersForReveal,
  splitWordsForReveal,
} from './motionHelpers';

test('splitWordsForReveal normalizes whitespace and preserves accented words', () => {
  assert.deepEqual(
    splitWordsForReveal('  Seu veículo   merece um cuidado à altura.  '),
    ['Seu', 'veículo', 'merece', 'um', 'cuidado', 'à', 'altura.']
  );
  assert.deepEqual(splitWordsForReveal('   '), []);
});

test('splitLettersForReveal preserves accented characters and spaces', () => {
  assert.deepEqual(splitLettersForReveal('Brilho & Fé'), [
    'B',
    'r',
    'i',
    'l',
    'h',
    'o',
    ' ',
    '&',
    ' ',
    'F',
    'é',
  ]);
});

test('computeParticleDensity scales responsibly for mobile vs desktop and hero vs ambient', () => {
  const mobileHero = computeParticleDensity(390, 'hero');
  const desktopHero = computeParticleDensity(1440, 'hero');
  const mobileAmbient = computeParticleDensity(390, 'ambient');
  const desktopAmbient = computeParticleDensity(1440, 'ambient');

  assert.ok(mobileHero.dustCount < desktopHero.dustCount);
  assert.ok(mobileAmbient.dustCount < desktopAmbient.dustCount);
  assert.ok(desktopAmbient.dustCount < desktopHero.dustCount);
  assert.ok(mobileHero.orbCount >= 3);
});

test('clampParallaxOffset maps normalized scroll progress symmetrically and clamps bounds', () => {
  assert.equal(clampParallaxOffset(0, 40), -40);
  assert.equal(clampParallaxOffset(0.5, 40), 0);
  assert.equal(clampParallaxOffset(1, 40), 40);
  assert.equal(clampParallaxOffset(-0.4, 40), -40);
  assert.equal(clampParallaxOffset(1.6, 40), 40);
});
