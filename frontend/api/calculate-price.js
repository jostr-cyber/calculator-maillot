// Base price - always the same regardless of budget selection
// Budget only serves as a reference point for comparison, not for pricing
const BASE_PRICE = 250;

const HEIGHT_MODIFIERS = {
  '170+': 0.20,
  '150-170': 0.10,
  '130-150': 0.05,
  '<130': -0.05
};

const OPTION_PRICES = {
  'sleeves_1': 15,
  'sleeves_2': 30,
  'skirt_front': 10,
  'skirt_back': 10,
  'decorative': 10,
  'aerography': 20,
  'combinaison': 50,
  'premium_stones': 100,
  'urgency': 0.10
};

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      height = '150-170',
      sleeves = 0,
      skirt = '',
      decorativeElements = '',
      aerography = '',
      combinaison = '',
      premiumStones = '',
      urgency = '',
      design = '',
      shoulder = ''
    } = req.body;

    // Base price is always the same - budget doesn't affect pricing
    const basePrice = BASE_PRICE;

    // Модификатор по росту
    const heightMod = HEIGHT_MODIFIERS[height] || 0;
    let price = basePrice + (basePrice * heightMod);

    // Опции
    if (sleeves == 1) price += OPTION_PRICES['sleeves_1'];
    if (sleeves == 2) price += OPTION_PRICES['sleeves_2'];
    if (skirt === 'front') price += OPTION_PRICES['skirt_front'];
    if (skirt === 'back') price += OPTION_PRICES['skirt_back'];
    if (skirt === 'both') price += OPTION_PRICES['skirt_front'] + OPTION_PRICES['skirt_back'];
    if (decorativeElements && decorativeElements !== 'nothing') price += OPTION_PRICES['decorative'];
    if (aerography && aerography !== 'nothing') price += OPTION_PRICES['aerography'];
    if (combinaison && combinaison !== 'standard') price += OPTION_PRICES['combinaison'];
    if (premiumStones && premiumStones !== 'none') price += OPTION_PRICES['premium_stones'];

    // Дизайн скидка
    let discount = 0;
    if (design === 'customer-design') {
      discount = basePrice * 0.05;
    }

    // Срочность наценка
    let urgencySurcharge = 0;
    if (urgency && urgency !== 'none') {
      urgencySurcharge = price * OPTION_PRICES['urgency'];
    }

    // Final price
    const totalPrice = price - discount + urgencySurcharge;
    const finalPrice = Math.round(totalPrice);

    res.status(200).json({
      finalPrice,
      totalPrice,
      basePrice,
      height,
      sleeves: parseInt(sleeves),
      skirt,
      decorativeElements,
      aerography,
      combinaison,
      premiumStones,
      shoulder,
      urgency,
      design,
      currency: 'EUR',
      discount,
      urgencySurcharge
    });
  } catch (error) {
    console.error('Price calculation error:', error);
    res.status(500).json({ error: 'Failed to calculate price: ' + error.message });
  }
}
