import { useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, MessageCircle, Search, Sparkles, X } from 'lucide-react';
import {
  CATALOG_ITEMS,
  CatalogItem,
  FILTER_OPTIONS,
  FilterOption,
  buildWhatsAppServiceUrl,
  filterCatalogItems,
} from '../data/catalog';
import {
  ParallaxGlowBackdrop,
  RevealParagraph,
  SectionTransitionLine,
  SplitRevealEyebrow,
  SplitRevealHeadline,
} from './ScrollEffects';

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

function ServiceCard({ item, index }: { item: CatalogItem; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 30, active: false });
  const cardRef = useRef<HTMLElement | null>(null);

  const whatsappUrl = buildWhatsAppServiceUrl(item.name);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSheenPos({ x, y, active: true });
  };

  return (
    <motion.article
      ref={cardRef}
      layout={!shouldReduceMotion}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 26, scale: 0.975 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.55,
        delay: shouldReduceMotion ? 0 : Math.min((index % 3) * 0.07, 0.21),
        ease: CINEMATIC_EASE,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSheenPos((prev) => ({ ...prev, active: false }))}
      className={`gold-card-sheen group relative flex flex-col overflow-hidden rounded-2xl border bg-[#0E0F12] transition-all duration-300 hover:-translate-y-1.5 ${
        item.isPackage
          ? 'border-[#D4AF37]/50 shadow-[0_20px_56px_rgba(212,175,55,0.1)] md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-12'
          : 'border-white/[0.08] hover:border-[#D4AF37]/45 hover:shadow-[0_24px_48px_rgba(0,0,0,0.65),0_0_28px_rgba(212,175,55,0.08)]'
      }`}
    >
      {/* Subtle Pointer-Following Golden Specular Reflection */}
      {!shouldReduceMotion && (
        <div
          aria-hidden="true"
          style={{
            opacity: sheenPos.active ? 1 : 0,
            background: `radial-gradient(280px circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(236, 209, 118, 0.09), transparent 70%)`,
          }}
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        />
      )}

      {/* Service Illustrative Image with Smooth Entrance */}
      <div
        className={`relative overflow-hidden bg-[#131418] ${
          item.isPackage
            ? 'aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:h-full'
            : 'aspect-[4/3] w-full'
        }`}
      >
        {!imgError ? (
          <motion.img
            src={item.image}
            alt={item.imageAlt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            initial={shouldReduceMotion ? false : { scale: 1.08, opacity: 0.75 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: CINEMATIC_EASE }}
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.16),#111215)] p-6 text-center">
            <Sparkles className="h-6 w-6 text-[#D4AF37]" aria-hidden="true" />
            <span className="text-xs font-medium text-[#D4D4D8]">{item.name}</span>
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/20 to-transparent opacity-85"
        />

        <span className="pointer-events-none absolute bottom-2.5 right-3 text-[11px] font-medium text-[#A1A1AA]/85">
          Imagem ilustrativa
        </span>
      </div>

      {/* Card Body */}
      <div
        className={`relative z-10 flex flex-1 flex-col justify-between p-5 sm:p-6 ${
          item.isPackage ? 'lg:col-span-7 lg:p-8' : ''
        }`}
      >
        <div>
          {/* Clean Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs font-medium text-[#A1A1AA]">
            <span className="tabular-nums text-[#D4AF37]">
              {String(item.order).padStart(2, '0')}
            </span>
            <span aria-hidden="true">·</span>
            <span>{item.category}</span>
          </div>

          <h3
            className={`mt-2 font-semibold tracking-tight text-[#F4F2ED] transition-colors duration-200 group-hover:text-[#ECD176] ${
              item.isPackage ? 'font-display text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
            }`}
          >
            {item.name}
          </h3>

          {/* Exact Catalog Notes for Pacote Mensal only */}
          {item.catalogNotes && item.catalogNotes.length > 0 && (
            <ul className="mt-4 space-y-1.5 text-sm text-[#D4D4D8]">
              {item.catalogNotes.map((note) => (
                <li key={note} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#D4AF37]" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Price & WhatsApp CTA */}
        <div
          className={`mt-6 flex flex-col gap-4 border-t border-white/[0.07] pt-4 ${
            item.isPackage ? 'sm:flex-row sm:items-end sm:justify-between' : ''
          }`}
        >
          <div>
            {item.hasStartingFrom ? (
              <span className="block text-xs font-medium text-[#A1A1AA]">A partir de</span>
            ) : (
              <span className="block text-xs font-medium text-[#A1A1AA]">Valor</span>
            )}
            <p className="mt-0.5 text-xl font-semibold tabular-nums tracking-tight text-[#ECD176] sm:text-2xl">
              {item.priceFormatted}
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Agendar ${item.name} pelo WhatsApp`}
            className="gold-sweep-sheen inline-flex min-h-[44px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#D4AF37]/45 bg-[#D4AF37]/10 px-4 py-2.5 text-sm font-semibold text-[#ECD176] transition-colors duration-200 hover:bg-[#D4AF37] hover:text-[#070708] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] sm:w-auto"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Agendar pelo WhatsApp</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 opacity-75" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function CatalogSection() {
  const [selectedCategory, setSelectedCategory] = useState<FilterOption>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(
    () => filterCatalogItems(CATALOG_ITEMS, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  return (
    <section
      id="catalogo"
      className="relative overflow-hidden bg-gradient-to-b from-[#09090B] via-[#070708] to-[#070708] py-20 lg:py-28"
    >
      <SectionTransitionLine />
      <ParallaxGlowBackdrop align="right" intensity="soft" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SplitRevealEyebrow
              text="Catálogo Oficial"
              className="text-xs font-medium tracking-widest text-[#D4AF37]"
            />
            <SplitRevealHeadline
              text="Serviços e cuidados automotivos"
              highlightWords={['automotivos']}
              className="font-display mt-3 text-balance text-3xl font-semibold tracking-tight text-[#F4F2ED] sm:text-4xl lg:text-[46px]"
            />
            <RevealParagraph
              delay={0.22}
              className="mt-3 max-w-2xl text-sm leading-relaxed text-[#A1A1AA] sm:text-base"
            >
              Selecione a categoria ou pesquise pelo serviço desejado para conferir os valores e
              solicitar seu agendamento diretamente pelo WhatsApp.
            </RevealParagraph>
          </div>

          <p className="shrink-0 text-sm font-medium tabular-nums text-[#D4D4D8]">
            Exibindo {filteredItems.length} de {CATALOG_ITEMS.length} itens
          </p>
        </div>

        {/* Category Filters + Search Bar */}
        <div className="mt-10 flex flex-col gap-4 border-y border-white/[0.08] py-5 xl:flex-row xl:items-center xl:justify-between">
          <div
            role="tablist"
            aria-label="Filtrar serviços por categoria"
            className="flex items-center gap-1.5 overflow-x-auto pb-1 xl:overflow-visible xl:pb-0"
          >
            {FILTER_OPTIONS.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[40px] shrink-0 whitespace-nowrap rounded-lg border px-3 py-2 text-xs font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#D4AF37] sm:text-[13px] ${
                    isActive
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-[#070708]'
                      : 'border-white/10 bg-[#0F1012] text-[#D4D4D8] hover:border-[#D4AF37]/40 hover:text-[#ECD176]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full shrink-0 xl:w-64">
            <label htmlFor="catalog-search" className="sr-only">
              Buscar serviço no catálogo
            </label>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A1AA]"
              aria-hidden="true"
            />
            <input
              id="catalog-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar serviço..."
              className="min-h-[44px] w-full rounded-lg border border-white/10 bg-[#0F1012] py-2 pl-10 pr-9 text-sm text-[#F4F2ED] placeholder:text-[#71717A] focus:border-[#D4AF37] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Limpar busca"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-[#A1A1AA] hover:text-[#F4F2ED]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredItems.length > 0 ? (
          <div
            data-testid="catalog-grid"
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredItems.map((item, idx) => (
              <ServiceCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0E0F12] px-6 py-14 text-center">
            <p className="text-base font-medium text-[#F4F2ED]">
              Nenhum serviço encontrado para esta busca.
            </p>
            <p className="mt-1.5 text-sm text-[#A1A1AA]">
              Tente outro termo ou visualize todas as categorias do catálogo.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
              }}
              className="mt-5 min-h-[44px] rounded-lg border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-5 py-2.5 text-sm font-semibold text-[#ECD176] transition-colors hover:bg-[#D4AF37] hover:text-[#070708]"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
