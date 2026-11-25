export type CatalogCategory =
  | 'Lavagem'
  | 'Tratamentos e Cuidados'
  | 'Polimentos'
  | 'Higienização'
  | 'Vitrificação'
  | 'Cuidados com os Vidros'
  | 'Pacote';

export type FilterOption = 'Todos' | CatalogCategory;

export interface CatalogItem {
  id: string;
  order: number;
  name: string;
  category: CatalogCategory;
  priceFormatted: string;
  hasStartingFrom: boolean;
  isPackage: boolean;
  image: string;
  imageAlt: string;
  catalogNotes?: string[];
}

export const BUSINESS_INFO = {
  name: 'L.A Estética Automotiva',
  logoSrc: '/assets/aistudio/IMG_5618_ba08fdf1.png',
  whatsappDisplay: '(19) 99705-9898',
  whatsappNumber: '5519997059898',
  whatsappBaseUrl: 'https://wa.me/5519997059898',
  address: 'Av. Visconde de Nova Granada, 1255',
  mapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=Avenida+Visconde+de+Nova+Granada%2C+1255',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Avenida+Visconde+de+Nova+Granada%2C+1255&t=&z=16&ie=UTF8&iwloc=&output=embed',
  hoursDays: 'Segunda a sábado',
  hoursTime: 'Das 8h às 18h',
} as const;

export const FILTER_OPTIONS: FilterOption[] = [
  'Todos',
  'Lavagem',
  'Tratamentos e Cuidados',
  'Polimentos',
  'Higienização',
  'Vitrificação',
  'Cuidados com os Vidros',
  'Pacote',
];

const IMAGES = {
  hero: '/src/assets/images/hero_luxury_car_1795574471456.jpg',
  lavagem: '/src/assets/images/service_lavagem_1795574471449.jpg',
  moto: '/src/assets/images/service_moto_1795574472181.jpg',
  chassiRodas: '/src/assets/images/service_chassi_rodas_1795574472903.jpg',
  motor: '/src/assets/images/service_motor_1795574472804.jpg',
  farol: '/src/assets/images/service_farol_1795574473114.jpg',
  polimentos: '/src/assets/images/service_polimentos_1795574473803.jpg',
  higienizacao: '/src/assets/images/service_higienizacao_1795574473855.jpg',
  vitrificacao: '/src/assets/images/service_vitrificacao_1795574474532.jpg',
  vidros: '/src/assets/images/service_vidros_1795574474357.jpg',
} as const;

export const HERO_IMAGE = IMAGES.hero;
export const HERO_ARRIVAL_IMAGE = '/assets/aistudio/IMG_5633_7db046f8.jpeg';
export const HERO_VIDEO_SRC = '/assets/aistudio/la-estetica-hero-10s_1e227b85.mp4';

export const CATALOG_ITEMS: CatalogItem[] = [
  // LAVAGEM
  {
    id: 'lavagem-premium',
    order: 1,
    name: 'Lavagem Premium',
    category: 'Lavagem',
    priceFormatted: 'R$ 100,00',
    hasStartingFrom: true,
    isPackage: false,
    image: '/assets/aistudio/IMG_5620_6257cd1b.jpeg',
    imageAlt: 'Imagem ilustrativa de lavagem automotiva detalhada com espuma',
  },
  {
    id: 'lavagem-detalhada-motos',
    order: 2,
    name: 'Lavagem Detalhada (motos)',
    category: 'Lavagem',
    priceFormatted: 'R$ 50,00',
    hasStartingFrom: true,
    isPackage: false,
    image: '/assets/aistudio/IMG_5621_93d6bed3.jpeg',
    imageAlt: 'Imagem ilustrativa de motocicleta esportiva em estúdio de detalhamento',
  },

  // TRATAMENTOS E CUIDADOS
  {
    id: 'lavagem-de-chassi',
    order: 3,
    name: 'Lavagem de Chassi',
    category: 'Tratamentos e Cuidados',
    priceFormatted: 'R$ 150,00',
    hasStartingFrom: false,
    isPackage: false,
    image: IMAGES.chassiRodas,
    imageAlt: 'Imagem ilustrativa de roda, freio e área inferior do veículo detalhados',
  },
  {
    id: 'tratamento-de-caixa-de-rodas',
    order: 4,
    name: 'Tratamento de Caixa de Rodas',
    category: 'Tratamentos e Cuidados',
    priceFormatted: 'R$ 250,00',
    hasStartingFrom: false,
    isPackage: false,
    image: '/assets/aistudio/IMG_5635_f383a093.jpeg',
    imageAlt: 'Imagem ilustrativa de caixa de rodas e conjunto de roda tratados',
  },
  {
    id: 'tratamento-de-motor',
    order: 5,
    name: 'Tratamento de Motor',
    category: 'Tratamentos e Cuidados',
    priceFormatted: 'R$ 200,00',
    hasStartingFrom: false,
    isPackage: false,
    image: '/assets/aistudio/IMG_5627_99640d69.jpeg',
    imageAlt: 'Imagem ilustrativa de cofre de motor limpo e protegido',
  },
  {
    id: 'pintura-de-rodas',
    order: 6,
    name: 'Pintura de Rodas',
    category: 'Tratamentos e Cuidados',
    priceFormatted: 'R$ 550,00',
    hasStartingFrom: true,
    isPackage: false,
    image: '/assets/aistudio/IMG_5634_2a81e4ce.jpeg',
    imageAlt: 'Imagem ilustrativa de roda automotiva pintada e detalhada',
  },
  {
    id: 'revitalizacao-de-farois',
    order: 7,
    name: 'Revitalização de Faróis',
    category: 'Tratamentos e Cuidados',
    priceFormatted: 'R$ 250,00',
    hasStartingFrom: true,
    isPackage: false,
    image: '/assets/aistudio/IMG_5625_a74a0e8b.jpeg',
    imageAlt: 'Imagem ilustrativa de farol automotivo revitalizado com transparência',
  },

  // POLIMENTOS
  {
    id: 'polimento-comercial',
    order: 8,
    name: 'Polimento Comercial',
    category: 'Polimentos',
    priceFormatted: 'R$ 550,00',
    hasStartingFrom: true,
    isPackage: false,
    image: '/assets/aistudio/IMG_5638_3cb040ad.jpeg',
    imageAlt: 'Imagem ilustrativa de polimento comercial com brilho intenso na lataria',
  },
  {
    id: 'polimento-tecnico',
    order: 9,
    name: 'Polimento Técnico',
    category: 'Polimentos',
    priceFormatted: 'R$ 750,00',
    hasStartingFrom: true,
    isPackage: false,
    image: '/assets/aistudio/IMG_5636_c22d3148.jpeg',
    imageAlt: 'Imagem ilustrativa de polimento técnico com reflexo e acabamento refinado',
  },

  // HIGIENIZAÇÃO
  {
    id: 'higienizacao-completa',
    order: 10,
    name: 'Higienização Completa',
    category: 'Higienização',
    priceFormatted: 'R$ 500,00',
    hasStartingFrom: true,
    isPackage: false,
    image: '/assets/aistudio/IMG_5628_d725f1c8.jpeg',
    imageAlt: 'Imagem ilustrativa de interior automotivo completo higienizado',
  },
  {
    id: 'higienizacao-parcial',
    order: 11,
    name: 'Higienização Parcial',
    category: 'Higienização',
    priceFormatted: 'R$ 200,00',
    hasStartingFrom: false,
    isPackage: false,
    image: '/assets/aistudio/IMG_5632_6e2fb45a.jpeg',
    imageAlt: 'Imagem ilustrativa de bancos automotivos higienizados',
  },

  // VITRIFICAÇÃO
  {
    id: 'vitrificacao-total',
    order: 12,
    name: 'Vitrificação Total',
    category: 'Vitrificação',
    priceFormatted: 'R$ 1.550,00',
    hasStartingFrom: true,
    isPackage: false,
    image: IMAGES.vitrificacao,
    imageAlt: 'Imagem ilustrativa de gotículas hidrofóbicas em pintura vitrificada',
  },
  {
    id: 'vitrificacao-dos-plasticos',
    order: 13,
    name: 'Vitrificação dos Plásticos',
    category: 'Vitrificação',
    priceFormatted: 'R$ 250,00',
    hasStartingFrom: true,
    isPackage: false,
    image: IMAGES.vitrificacao,
    imageAlt: 'Imagem ilustrativa de proteção e acabamento em superfície escura',
  },
  {
    id: 'vitrificacao-couro',
    order: 14,
    name: 'Vitrificação Couro',
    category: 'Vitrificação',
    priceFormatted: 'R$ 250,00',
    hasStartingFrom: true,
    isPackage: false,
    image: '/assets/aistudio/IMG_5624_409c1ee5.jpeg',
    imageAlt: 'Imagem ilustrativa de bancos em couro automotivo protegidos',
  },
  {
    id: 'vitrificacao-de-lanternas-e-farois',
    order: 15,
    name: 'Vitrificação de Lanternas e Faróis',
    category: 'Vitrificação',
    priceFormatted: 'R$ 250,00',
    hasStartingFrom: true,
    isPackage: false,
    image: '/assets/aistudio/IMG_5629_9f618590.jpeg',
    imageAlt: 'Imagem ilustrativa de farol automotivo com proteção de superfície',
  },

  // CUIDADOS COM OS VIDROS
  {
    id: 'cristalizacao-dos-vidros',
    order: 16,
    name: 'Cristalização dos Vidros',
    category: 'Cuidados com os Vidros',
    priceFormatted: 'R$ 150,00',
    hasStartingFrom: true,
    isPackage: false,
    image: IMAGES.vidros,
    imageAlt: 'Imagem ilustrativa de para-brisa automotivo com repelência à água',
  },
  {
    id: 'remocao-de-chuva-acida',
    order: 17,
    name: 'Remoção de Chuva Ácida',
    category: 'Cuidados com os Vidros',
    priceFormatted: 'R$ 150,00',
    hasStartingFrom: true,
    isPackage: false,
    image: IMAGES.vidros,
    imageAlt: 'Imagem ilustrativa de vidro automotivo cristalino e limpo',
  },

  // PACOTE
  {
    id: 'pacote-mensal',
    order: 18,
    name: 'Pacote Mensal',
    category: 'Pacote',
    priceFormatted: 'R$ 240,00',
    hasStartingFrom: true,
    isPackage: true,
    image: '/assets/aistudio/IMG_5623_df1b857f.jpeg',
    imageAlt: 'Imagem ilustrativa do Pacote Mensal de lavagens automotivas',
    catalogNotes: [
      '4 lavagens por mês, sendo 1 por semana',
      'Flexibilidade no agendamento',
      'Desconto no valor',
    ],
  },
];

export function filterCatalogItems(
  items: CatalogItem[],
  category: FilterOption,
  searchQuery: string
): CatalogItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory = category === 'Todos' || item.category === category;
    if (!matchesCategory) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }
    return (
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function formatServicePriceDisplay(item: CatalogItem): string {
  return item.hasStartingFrom
    ? `A partir de ${item.priceFormatted}`
    : item.priceFormatted;
}

export function buildWhatsAppServiceUrl(serviceName: string): string {
  const text = `Olá! Acessei o site da L.A Estética Automotiva e gostaria de mais informações sobre o serviço de ${serviceName}.`;
  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppCustomUrl(message: string): string {
  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}
