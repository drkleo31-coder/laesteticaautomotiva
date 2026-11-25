import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BUSINESS_INFO,
  CATALOG_ITEMS,
  buildWhatsAppServiceUrl,
  filterCatalogItems,
  formatServicePriceDisplay,
} from './catalog';

test('catalog contains strictly 17 individual services and 1 package (18 total)', () => {
  assert.equal(CATALOG_ITEMS.length, 18);
  const individualCount = CATALOG_ITEMS.filter((item) => !item.isPackage).length;
  const packageCount = CATALOG_ITEMS.filter((item) => item.isPackage).length;
  assert.equal(individualCount, 17);
  assert.equal(packageCount, 1);
});

test('catalog preserves exact prices and "A partir de" prefix rules', () => {
  const expected: Array<{ name: string; display: string }> = [
    { name: 'Lavagem Premium', display: 'A partir de R$ 100,00' },
    { name: 'Lavagem Detalhada (motos)', display: 'A partir de R$ 50,00' },
    { name: 'Lavagem de Chassi', display: 'R$ 150,00' },
    { name: 'Tratamento de Caixa de Rodas', display: 'R$ 250,00' },
    { name: 'Tratamento de Motor', display: 'R$ 200,00' },
    { name: 'Pintura de Rodas', display: 'A partir de R$ 550,00' },
    { name: 'Revitalização de Faróis', display: 'A partir de R$ 250,00' },
    { name: 'Polimento Comercial', display: 'A partir de R$ 550,00' },
    { name: 'Polimento Técnico', display: 'A partir de R$ 750,00' },
    { name: 'Higienização Completa', display: 'A partir de R$ 500,00' },
    { name: 'Higienização Parcial', display: 'R$ 200,00' },
    { name: 'Vitrificação Total', display: 'A partir de R$ 1.550,00' },
    { name: 'Vitrificação dos Plásticos', display: 'A partir de R$ 250,00' },
    { name: 'Vitrificação Couro', display: 'A partir de R$ 250,00' },
    { name: 'Vitrificação de Lanternas e Faróis', display: 'A partir de R$ 250,00' },
    { name: 'Cristalização dos Vidros', display: 'A partir de R$ 150,00' },
    { name: 'Remoção de Chuva Ácida', display: 'A partir de R$ 150,00' },
    { name: 'Pacote Mensal', display: 'A partir de R$ 240,00' },
  ];

  expected.forEach((entry, index) => {
    const item = CATALOG_ITEMS[index];
    assert.equal(item.name, entry.name);
    assert.equal(formatServicePriceDisplay(item), entry.display);
  });
});

test('filterCatalogItems filters accurately by category and search query', () => {
  assert.equal(filterCatalogItems(CATALOG_ITEMS, 'Todos', '').length, 18);
  assert.equal(filterCatalogItems(CATALOG_ITEMS, 'Polimentos', '').length, 2);
  assert.equal(filterCatalogItems(CATALOG_ITEMS, 'Vitrificação', '').length, 4);
  assert.equal(filterCatalogItems(CATALOG_ITEMS, 'Pacote', '').length, 1);

  const searchResult = filterCatalogItems(CATALOG_ITEMS, 'Todos', 'Faróis');
  assert.equal(searchResult.length, 2);
  assert.deepEqual(
    searchResult.map((item) => item.name),
    ['Revitalização de Faróis', 'Vitrificação de Lanternas e Faróis']
  );
});

test('WhatsApp URLs include official number and dynamic encoded service name', () => {
  const url = buildWhatsAppServiceUrl('Polimento Técnico');
  assert.ok(url.startsWith('https://wa.me/5519997059898?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.equal(
    decoded,
    'Olá! Acessei o site da L.A Estética Automotiva e gostaria de mais informações sobre o serviço de Polimento Técnico.'
  );
  assert.equal(BUSINESS_INFO.address, 'Av. Visconde de Nova Granada, 1255');
  assert.equal(BUSINESS_INFO.hoursDays, 'Segunda a sábado');
  assert.equal(BUSINESS_INFO.hoursTime, 'Das 8h às 18h');
});
