import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let pricesData = null;

const LEVEL_MAPPING = {
  'Standart': 'Standard',
  'Stamdart': 'Standard',
  'Standard': 'Standard',
  'Advanced': 'Standard',
  'Elite': 'Elite',
  'Economy': 'Economy'
};

async function initializePrices() {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '../../Prices.csv');
    console.log('Looking for CSV at:', csvPath);
    const prices = {};
    let levelHeaders = [];

    fs.createReadStream(csvPath)
      .pipe(csv({ separator: ';', headers: false }))
      .on('data', (row) => {
        const rowArray = Object.values(row);

        if (levelHeaders.length === 0) {
          levelHeaders = rowArray.slice(1).map(h => h ? h.trim() : '').filter(h => h);
          levelHeaders = levelHeaders.map(h => LEVEL_MAPPING[h] || h);
          return;
        }

        const attribute = rowArray[0]?.trim();
        if (attribute && attribute !== '') {
          prices[attribute] = {};
          for (let i = 0; i < levelHeaders.length; i++) {
            const level = levelHeaders[i];
            prices[attribute][level] = rowArray[i + 1]?.trim() || '';
          }
        }
      })
      .on('end', () => {
        pricesData = prices;
        console.log('✓ Prices CSV loaded');
        resolve(prices);
      })
      .on('error', reject);
  });
}

function parsePercentage(value) {
  if (!value) return 0;
  value = String(value).trim();
  const match = value.match(/(\d+)\s*%/);
  return match ? parseInt(match[1]) : 0;
}

function parsePrice(value) {
  if (!value) return 0;
  value = String(value).trim();
  const match = value.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function parsePriceString(value) {
  if (!value) return 0;
  value = String(value).trim();
  if (value.includes('скидка')) {
    return -parsePercentage(value);
  }
  return parsePercentage(value);
}

function calculatePrice(level, height, sleeves = 0, skirt = '', decorativeElements = '', shoulder = '', aerography = '', combinaison = '', premiumStones = '', urgency = '', design = '', budget = null) {
  if (!pricesData) {
    throw new Error('Prices not initialized');
  }

  // Ensure sleeves is a number
  sleeves = parseInt(sleeves) || 0;

  // Budget mapping: convert budget code to actual budget amount in EUR
  const BUDGET_MAP = {
    'unknown': 800,
    '800': 800,
    '400': 400,
    '200': 200
  };
  const budgetAmount = budget ? BUDGET_MAP[budget] : null;


  const basePriceStr = pricesData['Базовая цена']?.[level];
  if (!basePriceStr) {
    throw new Error(`Base price not found for level: ${level}`);
  }
  let basePrice = parseInt(basePriceStr);

  // Height modifier
  let heightModifier = 0;
  if (height === '170+') {
    heightModifier = parsePriceString(pricesData['Рост 170+'][level]);
  } else if (height === '150-170') {
    heightModifier = parsePriceString(pricesData['Рост 150-170'][level]);
  } else if (height === '130-150') {
    heightModifier = parsePriceString(pricesData['Рост 130-150'][level]);
  } else if (height === '<130') {
    heightModifier = parsePriceString(pricesData['Рост до 130'][level]);
  }

  let priceWithHeight = basePrice;
  if (heightModifier !== 0) {
    priceWithHeight = basePrice + (basePrice * heightModifier / 100);
  }

  // Sleeves - new structure with explicit entries
  let sleevePrice = 0;
  if (sleeves === 1) {
    sleevePrice = parsePrice(pricesData['Один рукав']?.[level] || '0');
  } else if (sleeves === 2) {
    sleevePrice = parsePrice(pricesData['Два рукава']?.[level] || '0');
  }

  // Skirt - handle both and separate prices
  let skirtFrontPrice = 0, skirtBackPrice = 0;
  if (skirt === 'front') {
    skirtFrontPrice = parsePrice(pricesData['Юбка спереди']?.[level] || '0');
  } else if (skirt === 'back') {
    skirtBackPrice = parsePrice(pricesData['Юбка сзади']?.[level] || '0');
  } else if (skirt === 'both') {
    // Use combined price for front and back
    const combinedPrice = parsePrice(pricesData['Юбка спереди и сзади']?.[level] || '0');
    skirtFrontPrice = combinedPrice;
    skirtBackPrice = 0; // Already included in skirtFrontPrice
  }

  // Decorative Elements - new simplified key names
  let decorativeElementsPrice = 0;
  if (decorativeElements && decorativeElements !== 'none' && decorativeElements !== 'nothing') {
    const decorativeMap = {
      'feathers': 'Перья',
      'belt': 'Имитация ремня с кнопками',
      'fringe': 'Бахрома',
      'flowers': 'Цветы',
      'other': 'Другое'
    };

    const selections = decorativeElements.split(',').map(s => s.trim());

    for (const selection of selections) {
      if (decorativeMap[selection]) {
        decorativeElementsPrice += parsePrice(pricesData[decorativeMap[selection]]?.[level] || '0');
      }
    }
  }

  // Shoulder decorative elements
  let shoulderPrice = 0;
  if (shoulder && shoulder !== 'none') {
    const shoulderElements = {
      'decorated_shoulder': 'Погон, украшенный камнями и/или бахромой',
      'wing': 'Крылышко',
      'pendants': ['Подвесы (бретели, свисающие на предплечье)', 'Подвесы']
    };

    const selections = shoulder.split(',').map(s => s.trim());

    for (const selection of selections) {
      if (shoulderElements[selection]) {
        const key = shoulderElements[selection];
        let price = 0;
        if (Array.isArray(key)) {
          // Try both key variations
          for (const k of key) {
            price = parsePrice(pricesData[k]?.[level] || '0');
            if (price > 0) break;
          }
        } else {
          price = parsePrice(pricesData[key]?.[level] || '0');
        }
        shoulderPrice += price;
      }
    }
  }

  // Aerography - new simplified key names
  let aerographyPrice = 0;
  if (aerography && aerography !== 'none') {
    const aerographyElements = {
      'tint': 'Тонировка',
      'gradient': 'Переход нескольких цветов',
      'volumetric': 'Рисунок  (персонаж, предмет, здание и т.д.)'
    };

    const selections = aerography.split(',').map(s => s.trim());

    for (const selection of selections) {
      if (aerographyElements[selection]) {
        // For volumetric (drawing), use 15% of base price
        if (selection === 'volumetric') {
          const aeroPercent = 15;
          aerographyPrice += Math.round(basePrice * aeroPercent / 100);
        } else {
          // For tint and gradient, use fixed price from CSV
          aerographyPrice += parsePrice(pricesData[aerographyElements[selection]]?.[level] || '0');
        }
      }
    }
  }

  // Model type (combinaison)
  let combinaisonPrice = 0;
  if (combinaison && combinaison !== 'standard') {
    const modelPrices = {
      'straps': 'Купальник на беретелях',
      'full': 'Комбинезон',
      'full_straps': 'Комбинезон на бретелях'
    };

    if (combinaison === 'straps') {
      // Fixed price for straps
      combinaisonPrice = parsePrice(pricesData[modelPrices['straps']]?.[level] || '0');
    } else if (modelPrices[combinaison]) {
      // Percentage price for full models
      const modelKey = modelPrices[combinaison];
      const percentage = parsePercentage(pricesData[modelKey]?.[level] || '0');
      combinaisonPrice = Math.round(priceWithHeight * percentage / 100);
    }
  }

  // Premium Stones - checkbox-based system with multiple selections
  let premiumStonesPrice = 0;
  if (premiumStones && premiumStones !== 'none') {
    const selections = premiumStones.split(',').map(s => s.trim());

    for (const selection of selections) {
      let csvKey = '';
      let price = 0;

      // Map selection values to CSV row names
      if (selection === 'standard') {
        // Standard stones (included in base price, no extra cost)
        csvKey = 'Стандартные стразы (Азия, Китай), входящие в базовую стоимость (-3000 шт.)';
        price = parsePrice(pricesData[csvKey]?.[level] || '0');
      } else if (selection.startsWith('premium-small-')) {
        // Premium small stones (ss10-ss20)
        const quantity = selection.replace('premium-small-', '');
        csvKey = `Премиум стразы ss10-ss20 - ${quantity} штук`;
        price = parsePrice(pricesData[csvKey]?.[level] || '0');
      } else if (selection === 'premium-medium') {
        // Premium medium stones (ss30-ss40)
        csvKey = 'Премиум стразы средние (ss30-ss40) на весь купальник, пропрционально мелким и крупных камням';
        price = parsePrice(pricesData[csvKey]?.[level] || '0');
      } else if (selection.startsWith('premium-sew-')) {
        // Premium sew-on stones
        const quantity = selection.replace('premium-sew-', '');
        csvKey = `Пришивные Премиум стразы - ${quantity} штук`;
        price = parsePrice(pricesData[csvKey]?.[level] || '0');
      } else if (selection === 'premium-mixed') {
        // Premium mixed stones
        csvKey = 'Премиум стразы микс ss10-ss34 + пришивные - в соответсnвии с логикой узора на купальнике';
        price = parsePrice(pricesData[csvKey]?.[level] || '0');
      }

      if (price > 0) {
        premiumStonesPrice += price;
      }
    }
  }

  // Discounts for no options - DISABLED (not displayed to user)
  let sleeveDiscount = 0;
  let skirtDiscount = 0;
  let decorativeDiscount = 0;

  // Design discount - 5% for customer design
  let designDiscount = 0;
  if (design === 'customer-design') {
    const discountPercent = 5;
    designDiscount = Math.round(basePrice * discountPercent / 100);
  }

  // Urgency surcharge
  let urgencyPrice = 0;
  if (urgency && urgency !== 'none') {
    let urgencyKey = '';
    if (urgency === 'urgent') {
      urgencyKey = 'Срочный заказ (3 дня)';
    } else if (urgency === 'accelerated') {
      urgencyKey = 'Ускоренный заказ (5 дней)';
    }

    if (urgencyKey && pricesData[urgencyKey]) {
      const urgencyPercentage = parsePercentage(pricesData[urgencyKey][level]);
      const subtotal = priceWithHeight + sleevePrice + skirtFrontPrice + skirtBackPrice +
                       decorativeElementsPrice + shoulderPrice + aerographyPrice +
                       combinaisonPrice + premiumStonesPrice - sleeveDiscount - skirtDiscount - decorativeDiscount - designDiscount;
      urgencyPrice = Math.round(subtotal * urgencyPercentage / 100);
    }
  }

  const finalPrice = priceWithHeight + sleevePrice + skirtFrontPrice + skirtBackPrice +
                    decorativeElementsPrice + shoulderPrice + aerographyPrice +
                    combinaisonPrice + premiumStonesPrice - sleeveDiscount - skirtDiscount - decorativeDiscount - designDiscount + urgencyPrice;

  // Budget validation
  const budgetExceeded = budgetAmount ? Math.round(finalPrice) > budgetAmount : false;
  const excessAmount = budgetExceeded ? Math.round(finalPrice) - budgetAmount : 0;
  const requiredDiscountPercent = budgetExceeded ? Math.ceil((excessAmount / Math.round(finalPrice)) * 100) : 0;

  // Additional fields for frontend display labels
  let modelType = 'standard';
  if (combinaison === 'straps') {
    modelType = 'straps';
  } else if (combinaison === 'full') {
    modelType = 'combinaison';
  } else if (combinaison === 'full_straps') {
    modelType = 'combinaison_straps';
  }

  // Determine which types of stones were selected (standard and/or premium)
  let hasStandardStones = false;
  let premiumStonesArray = [];

  if (premiumStones && premiumStones !== 'none') {
    const selections = premiumStones.split(',').map(s => s.trim());
    hasStandardStones = selections.includes('standard');
    premiumStonesArray = selections.filter(s => s !== 'standard');
  }

  let stonesType = premiumStonesArray.length > 0 ? premiumStonesArray[0] : 'standard';

  let urgencyType = 'standard';
  if (urgency === 'accelerated') {
    urgencyType = 'accelerated';
  } else if (urgency === 'urgent') {
    urgencyType = 'urgent';
  }

  let skirtType = 'none';
  if (skirt === 'front') {
    skirtType = 'front';
  } else if (skirt === 'back') {
    skirtType = 'back';
  } else if (skirt === 'both') {
    skirtType = 'front_and_back';
  }

  const drawingIncluded = aerography && aerography.includes('volumetric');

  return {
    basePrice,
    heightModifier,
    priceWithHeight: Math.round(priceWithHeight),
    sleevePrice,
    skirtFrontPrice,
    skirtBackPrice,
    decorativeElementsPrice,
    shoulderPrice,
    aerographyPrice,
    combinaisonPrice,
    premiumStonesPrice,
    sleeveDiscount,
    skirtDiscount,
    decorativeDiscount,
    designDiscount,
    urgencyPrice,
    finalPrice: Math.round(finalPrice),
    currency: pricesData['Валюта'][level],
    budgetExceeded,
    excessAmount,
    requiredDiscountPercent,
    // Display information for frontend
    modelType,
    stonesType,
    urgencyType,
    skirtType,
    drawingIncluded,
    // Stones separation for proper display
    hasStandardStones,
    premiumStonesArray,
    breakdown: {
      base: basePrice,
      height: `${heightModifier}%`,
      sleeves: sleevePrice,
      skirtFront: skirtFrontPrice,
      skirtBack: skirtBackPrice,
      decorativeElements: decorativeElementsPrice,
      shoulder: shoulderPrice,
      aerography: aerographyPrice,
      combinaison: combinaisonPrice,
      premiumStones: premiumStonesPrice,
      sleeveDiscount: sleeveDiscount,
      skirtDiscount: skirtDiscount,
      decorativeDiscount: decorativeDiscount,
      designDiscount: designDiscount
    }
  };
}

function getPrices() {
  if (!pricesData) {
    throw new Error('Prices not initialized');
  }
  return pricesData;
}

export {
  initializePrices,
  calculatePrice,
  getPrices
};
