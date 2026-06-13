// Utility functions for leotard calculator

// Format a price with the currency symbol placed per locale convention:
// English -> "€180" (symbol first), Spanish/Russian -> "180 €" (symbol after)
export const formatPrice = (price, language) =>
  language === 'en' ? `€${price}` : `${price} €`;

// Mock price calculation (no backend needed)
export const calculatePriceLocal = (config) => {
  const originalBasePrice = 150; // Base price for simple leotard
  let finalPrice = originalBasePrice;

  // Height surcharge (percentage of original base price)
  const heightCategory = config.height || '150-170';
  const heightModifiers = {
    '<130': 0.0,      // 0% surcharge
    '130-150': 0.05,  // +5% surcharge
    '150-170': 0.1,   // +10% surcharge
    '170+': 0.2       // +20% surcharge
  };
  const heightSurcharge = originalBasePrice * (heightModifiers[heightCategory] || 0);
  finalPrice += heightSurcharge;

  // Design source adjustment (percentage of original base price, applied BEFORE adding fixed options)
  let designAdjustment = 0;
  let adjustmentType = 'none'; // 'discount', 'surcharge', or 'none'

  if (config.designSource === 'own-design') {
    // Customer provides their own design: -5% discount of original base price
    designAdjustment = originalBasePrice * 0.05;
    adjustmentType = 'discount';
  } else if (config.designSource === 'inspiration-photos') {
    // Customer provides reference photos: no adjustment
    designAdjustment = 0;
    adjustmentType = 'none';
  } else if (config.designSource === 'custom-design') {
    // Studio designs from scratch: +10% surcharge of original base price
    designAdjustment = originalBasePrice * 0.10;
    adjustmentType = 'surcharge';
  }

  // Apply design adjustment
  finalPrice = adjustmentType === 'discount'
    ? finalPrice - designAdjustment
    : finalPrice + designAdjustment;

  // Sleeves (fixed amounts)
  if (config.sleeves === 1) finalPrice += 15;
  if (config.sleeves === 2) finalPrice += 30;
  if (config.sleeves === 3) finalPrice += 10; // Straps (breteli)

  // Skirt (fixed amounts)
  if (config.skirt === 'front') finalPrice += 15;
  if (config.skirt === 'back') finalPrice += 15;
  if (config.skirt === 'both') finalPrice += 30;

  // Decorative elements (fixed amounts per element)
  if (config.decorativeElements && config.decorativeElements !== 'none') {
    const elements = config.decorativeElements.split(',').filter(e => e.trim());
    elements.forEach(element => {
      const el = element.trim();
      if (el === 'feathers') finalPrice += 10;        // Перья
      else if (el === 'fringe') finalPrice += 20;     // Бахрома
      else if (el === 'flowers') finalPrice += 10;    // Объемные цветы
      else if (el === 'other') finalPrice += 15;      // Другое
    });
  }

  // Aerography (fixed amounts) - supports both single and combined
  if (config.aerography && config.aerography !== 'nothing' && config.aerography !== '') {
    const aeroParts = config.aerography.split(',').filter(a => a.trim());
    if (aeroParts.includes('drawing')) finalPrice += 20;      // Рисунок
    if (aeroParts.includes('aerography')) finalPrice += 20;    // Аэрография
  }

  // Rhinestones (fixed amounts)
  if (config.rhinestone === 'minimal') finalPrice += 30;
  if (config.rhinestone === 'standard') finalPrice += 70;
  if (config.rhinestone === 'maximum') finalPrice += 120;
  if (config.rhinestone === 'premium') finalPrice += 200;

  // Premium stones (fixed amounts)
  if (config.premiumStones === 'swarovski') finalPrice += 200;
  if (config.premiumStones === 'premium') finalPrice += 150;

  // Urgency surcharge (percentage of accumulated price up to this step)
  if (config.urgency === 'accelerated') finalPrice *= 1.10; // 10% surcharge

  // Combinaison (full suit, fixed amount)
  if (config.combinaison === 'full') finalPrice += 50; // Комбинезон

  const roundedFinalPrice = Math.round(finalPrice * 100) / 100;

  return {
    finalPrice: roundedFinalPrice,
    basePrice: originalBasePrice,
    heightSurcharge: Math.round(heightSurcharge * 100) / 100,
    designAdjustment: Math.round(designAdjustment * 100) / 100,
    adjustmentType: adjustmentType,
    breakdown: {
      height: Math.round(heightSurcharge * 100) / 100,
      design: Math.round(designAdjustment * 100) / 100,
      sleeves: config.sleeves === 1 ? 15 : (config.sleeves === 2 ? 30 : (config.sleeves === 3 ? 10 : 0)),
      skirt: config.skirt === 'both' ? 30 : (config.skirt === 'front' || config.skirt === 'back' ? 15 : 0),
      decorativeElements: (() => {
        if (!config.decorativeElements || config.decorativeElements === 'none') return 0;
        let total = 0;
        const elements = config.decorativeElements.split(',').filter(e => e.trim());
        elements.forEach(el => {
          const e = el.trim();
          if (e === 'feathers') total += 10;
          else if (e === 'fringe') total += 20;
          else if (e === 'flowers') total += 10;
          else if (e === 'other') total += 15;
        });
        return total;
      })(),
      aerography: (() => {
        if (!config.aerography || config.aerography === 'nothing' || config.aerography === '') return 0;
        const aeroParts = config.aerography.split(',').filter(a => a.trim());
        let price = 0;
        if (aeroParts.includes('drawing')) price += 20;
        if (aeroParts.includes('aerography')) price += 20;
        return price;
      })(),
      rhinestone: (config.rhinestone === 'minimal' ? 30 : (config.rhinestone === 'standard' ? 70 : (config.rhinestone === 'maximum' ? 120 : (config.rhinestone === 'premium' ? 200 : 0)))),
      combinaison: config.combinaison === 'full' ? 50 : 0,
      premiumStones: (config.premiumStones === 'swarovski' ? 200 : (config.premiumStones === 'premium' ? 150 : 0))
    }
  };
};

// Calculate complexity level based on selected options
// Simple: no sleeves, no skirt, no decorative elements, no aerography
// Advanced/Medium: one sleeve, one skirt, one decorative element
// Luxury/Complex: two sleeves, full skirt, aerography, many decorative elements
export const calculateComplexity = (config) => {
  let complexityScore = 0;

  // Sleeves scoring
  // 0 (none): 0 points (simple)
  // 1 (one): 1 point (medium)
  // 2 (two): 2 points (complex)
  // 3 (straps): 1 point (medium)
  if (config.sleeves === 1) complexityScore += 1;
  if (config.sleeves === 2) complexityScore += 2;
  if (config.sleeves === 3) complexityScore += 1; // Straps are medium complexity

  // Skirt scoring
  // none: 0 points (simple)
  // front or back: 1 point (medium)
  // both: 2 points (complex)
  if (config.skirt === 'front' || config.skirt === 'back') {
    complexityScore += 1;
  } else if (config.skirt === 'both') {
    complexityScore += 2;
  }

  // Decorative elements scoring
  // none: 0 points (simple)
  // 1 element: 1 point (medium)
  // 2+ elements: 2 points (complex)
  if (config.decorativeElements && config.decorativeElements !== 'none') {
    const elements = config.decorativeElements.split(',').filter(e => e);
    if (elements.length === 1) {
      complexityScore += 1;
    } else if (elements.length >= 2) {
      complexityScore += 2;
    }
  }

  // Aerography scoring
  // nothing: 0 points (simple)
  // yes: 2 points (complex)
  if (config.aerography && config.aerography !== 'nothing') {
    complexityScore += 2;
  }

  // Premium stones scoring (adds 1 point but doesn't make it complex alone)
  if (config.premiumStones && config.premiumStones !== 'none') {
    complexityScore += 1;
  }

  // Custom design scoring (doesn't affect complexity directly, as it's about design process)
  // Design source doesn't add to complexity

  // Determine complexity level
  // Simple: score 0
  // Advanced (Medium): score 1-3
  // Luxury (Complex): score 4+
  if (complexityScore === 0) {
    return { level: 'Simple', score: 0, labelKey: 'complexity.simple' };
  } else if (complexityScore <= 3) {
    return { level: 'Advanced', score: complexityScore, labelKey: 'complexity.advanced' };
  } else {
    return { level: 'Luxury', score: complexityScore, labelKey: 'complexity.luxury' };
  }
};

// Calculate estimated number of crystals/stones
export const calculateEstimatedCrystals = (config) => {
  // First determine complexity level
  const complexity = calculateComplexity(config);

  let baseStones;

  // Set base stones based on complexity level
  if (complexity.level === 'Simple') {
    baseStones = 1000; // Simple: 1000-1500
  } else if (complexity.level === 'Advanced') {
    baseStones = 2000; // Advanced: 2000-3000
  } else {
    baseStones = 3000; // Luxury: 3000+
  }

  // Add stones based on decorative elements
  if (config.decorativeElements && config.decorativeElements !== 'none') {
    const elements = config.decorativeElements.split(',');
    baseStones += elements.length * 150; // Each element adds ~150 stones
  }

  // Add stones for aerography (aerography often includes crystals)
  if (config.aerography && config.aerography !== 'nothing') {
    baseStones += 300; // Aerography adds ~300 stones
  }

  // Add stones for skirt
  if (config.skirt && config.skirt !== '') {
    if (config.skirt === 'both') {
      baseStones += 200; // Front and back skirt
    } else {
      baseStones += 100; // Single skirt
    }
  }

  // Add stones for premium stones option
  if (config.premiumStones && config.premiumStones !== 'none') {
    baseStones += 300; // Premium stones add more stones
  }

  // Apply reasonable caps based on complexity
  if (complexity.level === 'Simple') {
    return Math.min(Math.max(baseStones, 1000), 1500);
  } else if (complexity.level === 'Advanced') {
    return Math.min(Math.max(baseStones, 2000), 3000);
  } else {
    return Math.max(baseStones, 3000); // Luxury can go higher
  }
};

// Calculate current estimated price based on configuration
export const calculateCurrentPrice = async (config, apiUrl) => {
  if (!config.height) {
    return null; // Can't calculate without height
  }

  try {
    const response = await fetch(`${apiUrl}/api/calculate-price`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        height: config.height,
        sleeves: config.sleeves || 0,
        skirt: config.skirt || '',
        decorativeElements: config.decorativeElements || 'none',
        shoulder: config.shoulder || '',
        aerography: config.aerography || 'nothing',
        combinaison: config.combinaison || 'standard',
        premiumStones: config.premiumStones || 'none',
        urgency: config.urgency || 'none',
        design: config.design || 'our-design'
      })
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.finalPrice;
  } catch (error) {
    console.error('Error calculating price:', error);
    return null;
  }
};

// Get production time based on urgency - returns translation key
export const getProductionTime = (urgency) => {
  if (urgency === 'accelerated') {
    return 'productionTime.accelerated';
  }
  return 'productionTime.standard';
};

// Get complexity percentage for visual display (0-100)
export const getComplexityPercentage = (complexity) => {
  const scores = {
    'Simple': 25,
    'Advanced': 60,
    'Luxury': 90
  };
  return scores[complexity.level] || 25;
};

// Format configuration for display - returns translation keys
export const formatConfigurationSummary = (config) => {
  const summary = [];

  // Design
  if (config.design === 'our-design') {
    summary.push({ key: 'summary.items.designOur' });
  } else if (config.design === 'customer-design') {
    summary.push({ key: 'summary.items.designYour' });
  }

  // Sleeves
  if (config.sleeves === 1) {
    summary.push({ key: 'summary.items.sleevesOne' });
  } else if (config.sleeves === 2) {
    summary.push({ key: 'summary.items.sleevesTwo' });
  }

  // Skirt
  if (config.skirt === 'front') {
    summary.push({ key: 'summary.items.skirtFront' });
  } else if (config.skirt === 'back') {
    summary.push({ key: 'summary.items.skirtBack' });
  } else if (config.skirt === 'both') {
    summary.push({ key: 'summary.items.skirtBoth' });
  }

  // Decorative elements
  if (config.decorativeElements && config.decorativeElements !== 'none') {
    const elements = config.decorativeElements.split(',').filter(e => e.trim());
    const elementKeys = {
      'feathers': 'summary.items.feathers',
      'fringe': 'summary.items.fringe',
      'flowers': 'summary.items.flowers',
      'other': 'summary.items.other'
    };
    elements.forEach(el => {
      const trimmed = el.trim();
      if (elementKeys[trimmed]) {
        summary.push({ key: elementKeys[trimmed] });
      }
    });
  }

  // Aerography - handle both single and combined selections
  if (config.aerography && config.aerography !== 'nothing' && config.aerography !== '') {
    const aeroParts = config.aerography.split(',').filter(a => a.trim());
    if (aeroParts.length > 0) {
      if (aeroParts.includes('drawing') || (aeroParts.length === 1 && config.aerography === 'drawing')) {
        summary.push({ key: 'summary.items.drawing' });
      }
      if (aeroParts.includes('aerography') || (aeroParts.length === 1 && config.aerography === 'aerography')) {
        summary.push({ key: 'summary.items.aerography' });
      }
    }
  }

  // Urgency
  if (config.urgency === 'accelerated') {
    summary.push({ key: 'summary.items.urgency' });
  }

  // Rhinestones
  if (config.rhinestone && config.rhinestone !== 'none' && config.rhinestone !== '') {
    const rhinestoneKeys = {
      'minimal': 'summary.items.rhinestoneMinimal',
      'standard': 'summary.items.rhinestoneStandard',
      'maximum': 'summary.items.rhinestoneMaximum',
      'premium': 'summary.items.rhinestonePremium'
    };
    if (rhinestoneKeys[config.rhinestone]) {
      summary.push({ key: rhinestoneKeys[config.rhinestone] });
    }
  }

  return summary;
};

// Generate smart personalized recommendation based on configuration
export const generateRecommendation = (config, complexity) => {
  const hasAerography = config.aerography && config.aerography !== 'nothing';
  const hasDecorativeElements = config.decorativeElements && config.decorativeElements !== 'none';
  const hasSkirt = config.skirt && config.skirt !== '' && config.skirt !== 'none';
  const hasTwoSleeves = config.sleeves === 2;
  const hasExpedited = config.urgency === 'accelerated';
  const isPremiumStones = config.premiumStones && config.premiumStones !== 'none';

  const recommendations = {
    simple: [
      "✨ This is a clean, elegant leotard configuration. Perfect for competitions where simplicity and grace are valued.",
      "💡 Tip: Adding aerography or 3D elements would create more stage presence without overwhelming the design.",
      "🎯 Great choice for gymnasts who prefer a streamlined look with classic appeal."
    ],
    advanced: [
      "✨ This configuration creates a balanced leotard with good stage visibility. The combination of elements works well together.",
      "💡 Tip: This level of complexity is ideal for national competitions where visual impact matters.",
      "🎯 Your selection shows attention to detail while maintaining an elegant appearance."
    ],
    luxury: [
      "✨ This is a luxury-level leotard with strong stage presence. The multiple elements create a premium, eye-catching design.",
      "💡 Consider: This configuration will definitely stand out at competitions and make a bold statement.",
      "🎯 Perfect for athletes who want to make a powerful visual impression."
    ]
  };

  const specificTips = [];

  // Aerography-specific tips
  if (hasAerography && hasDecorativeElements) {
    specificTips.push("The combination of aerography with 3D elements creates exceptional visual depth and stage presence.");
  } else if (hasAerography && !hasDecorativeElements) {
    specificTips.push("The aerography will create beautiful visual interest. Consider adding 3D elements if you want to increase impact further.");
  }

  // Price optimization tips
  if (hasTwoSleeves && hasDecorativeElements && hasAerography) {
    specificTips.push("To reduce costs: Consider keeping aerography and reducing decorative elements, or reducing sleeves to one.");
  }

  // Urgency tip
  if (hasExpedited) {
    specificTips.push("⚡ Your expedited order will be completed quickly while maintaining premium quality.");
  }

  // Premium stones tip
  if (isPremiumStones) {
    specificTips.push("💎 Premium stones will add exceptional sparkle and luxury feel under stage lighting.");
  }

  const complexityLevel = complexity?.level?.toLowerCase() || 'advanced';
  const baseRecommendation = recommendations[complexityLevel]?.[0] || recommendations.advanced[0];
  const tip = specificTips.length > 0 ? specificTips[0] : (recommendations[complexityLevel]?.[1] || recommendations.advanced[1]);

  return `${baseRecommendation}\n\n${tip}`;
};

// Generate atelier-style optimization suggestions with cost savings
export const generateWhatWeWouldChange = (config, finalPrice) => {
  const hasAerography = config.aerography && config.aerography !== 'nothing';
  const hasDecorativeElements = config.decorativeElements && config.decorativeElements !== 'none';
  const hasSkirt = config.skirt && config.skirt !== '' && config.skirt !== 'none';
  const hasTwoSleeves = config.sleeves === 2;
  const hasOneSleve = config.sleeves === 1;
  const hasExpedited = config.urgency === 'accelerated';
  const isPremiumStones = config.premiumStones && config.premiumStones !== 'none';

  const suggestions = [];

  // Analyze and suggest optimizations
  if (hasTwoSleeves && hasDecorativeElements && hasAerography && hasExpedited) {
    // Multiple expensive options - suggest reducing expedited first
    const estimatedSavings = Math.round(finalPrice * 0.10); // ~10% for expedited
    suggestions.push({
      key: 'keepSleevesAirbrush',
      savings: estimatedSavings
    });
  } else if (hasTwoSleeves && hasDecorativeElements && hasAerography) {
    // Very complex - suggest reducing decorative elements
    const estimatedSavings = Math.round(finalPrice * 0.12); // ~12% for fewer elements
    suggestions.push({
      key: 'keepAerographySimplifyDecor',
      savings: estimatedSavings
    });
  } else if (hasAerography && hasExpedited && isPremiumStones) {
    // Expensive combination - suggest removing premium stones
    const estimatedSavings = Math.round(finalPrice * 0.15); // ~15% for premium stones
    suggestions.push({
      key: 'keepAerographySimplifyDecor',
      savings: estimatedSavings
    });
  } else if (hasTwoSleeves && hasExpedited && !hasAerography) {
    // Sleeves + urgency without artistic touch - suggest adding aerography instead
    const estimatedIncrease = Math.round(finalPrice * 0.18);
    suggestions.push({
      key: 'addAerography',
      increase: estimatedIncrease
    });
  } else if (hasExpedited && !hasAerography && !hasDecorativeElements) {
    // Only expedited without decoration - suggest adding small details
    const estimatedIncrease = Math.round(finalPrice * 0.08);
    suggestions.push({
      key: 'addSubtleDetails',
      increase: estimatedIncrease
    });
  } else if (hasTwoSleeves && hasTwoSleeves && !hasAerography) {
    // Full sleeves without aerography - suggest adding it
    const estimatedIncrease = Math.round(finalPrice * 0.15);
    suggestions.push({
      key: 'addAerography',
      increase: estimatedIncrease
    });
  } else if (hasDecorativeElements && !hasAerography) {
    // Decorative but no aerography - suggest adding it
    const estimatedIncrease = Math.round(finalPrice * 0.14);
    suggestions.push({
      key: 'addAerography',
      increase: estimatedIncrease
    });
  } else {
    // Default suggestion
    suggestions.push({
      key: 'preserveWellBalanced',
      savings: 0
    });
  }

  return suggestions[0];
};

// Calculate value-for-money rating (1-4 stars)
// Based on complexity/price ratio, not absolute quality
export const calculateValueForMoney = (config, finalPrice, complexity) => {
  const complexityScore = complexity?.score || 0;
  const pricePerUnit = finalPrice / Math.max(complexityScore, 1);

  // Define rating tiers based on price point and complexity balance
  let stars = 2; // Default balanced rating
  let tier = 'balanced';
  let labelKey = 'veryBalanced';
  let descriptionKey = 'veryBalancedDesc';

  // Budget tier (under €300)
  if (finalPrice < 300) {
    if (complexityScore >= 4) {
      stars = 4;
      tier = 'excellent';
      labelKey = 'excellentValue';
      descriptionKey = 'excellentValueDesc';
    } else if (complexityScore >= 2) {
      stars = 3;
      tier = 'very-good';
      labelKey = 'maximumImpact';
      descriptionKey = 'maximumImpactDesc';
    } else {
      stars = 2;
      tier = 'balanced';
      labelKey = 'veryBalanced';
      descriptionKey = 'veryBalancedDesc';
    }
  }
  // Mid tier (€300-€500)
  else if (finalPrice < 500) {
    if (complexityScore >= 6) {
      stars = 4;
      tier = 'luxury';
      labelKey = 'maximumImpact';
      descriptionKey = 'maximumImpactDesc';
    } else if (complexityScore >= 4) {
      stars = 3;
      tier = 'premium';
      labelKey = 'premium';
      descriptionKey = 'premiumDesc';
    } else {
      stars = 2;
      tier = 'balanced';
      labelKey = 'veryBalanced';
      descriptionKey = 'veryBalancedDesc';
    }
  }
  // Premium tier (€500+)
  else {
    if (complexityScore >= 8) {
      stars = 4;
      tier = 'luxury';
      labelKey = 'luxury';
      descriptionKey = 'luxuryDesc';
    } else if (complexityScore >= 6) {
      stars = 3;
      tier = 'premium';
      labelKey = 'maximumImpact';
      descriptionKey = 'maximumImpactDesc';
    } else if (complexityScore >= 4) {
      stars = 2;
      tier = 'balanced';
      labelKey = 'premium';
      descriptionKey = 'premiumDesc';
    } else {
      stars = 1;
      tier = 'expensive';
      labelKey = 'excellentValue';
      descriptionKey = 'excellentValueDesc';
    }
  }

  return { stars, tier, labelKey, descriptionKey };
};

// Get similar designs gallery images based on configuration
export const getMatchingSimilarDesigns = (config, complexity) => {
  // This returns design IDs that should match gallery image metadata
  // In a real implementation, this would query a database or match against gallery items
  // For now, return IDs based on complexity and configuration patterns

  const complexityLevel = complexity?.level?.toLowerCase() || 'advanced';
  const hasAerography = config.aerography && config.aerography !== 'nothing';
  const hasDecorativeElements = config.decorativeElements && config.decorativeElements !== 'none';
  const sleevelevel = config.sleeves || 0;
  const hasSkirt = config.skirt && config.skirt !== '' && config.skirt !== 'none';

  // Pattern-matching gallery selection
  // In production, these would be actual image IDs from your gallery
  const galleryMatrix = {
    'simple-no-decor': ['simple-001', 'simple-002', 'simple-003', 'simple-004', 'simple-005'],
    'simple-with-decor': ['simple-decor-001', 'simple-decor-002', 'simple-decor-003', 'simple-decor-004'],
    'advanced-balanced': ['advanced-001', 'advanced-002', 'advanced-003', 'advanced-004', 'advanced-005', 'advanced-006'],
    'advanced-artistic': ['advanced-art-001', 'advanced-art-002', 'advanced-art-003', 'advanced-art-004', 'advanced-art-005'],
    'luxury-complex': ['luxury-001', 'luxury-002', 'luxury-003', 'luxury-004', 'luxury-005', 'luxury-006', 'luxury-007', 'luxury-008'],
    'luxury-minimal': ['luxury-min-001', 'luxury-min-002', 'luxury-min-003', 'luxury-min-004']
  };

  // Determine category based on complexity and config
  let category = 'advanced-balanced';

  if (complexityLevel === 'simple') {
    category = hasDecorativeElements ? 'simple-with-decor' : 'simple-no-decor';
  } else if (complexityLevel === 'advanced') {
    category = hasAerography ? 'advanced-artistic' : 'advanced-balanced';
  } else if (complexityLevel === 'luxury') {
    category = (sleevelevel >= 2 && hasDecorativeElements && hasAerography) ? 'luxury-complex' : 'luxury-minimal';
  }

  return {
    category,
    designs: galleryMatrix[category] || galleryMatrix['advanced-balanced'],
    previewCount: 3,
    expandedCount: 6
  };
};
