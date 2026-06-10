// Utility functions for leotard calculator

// Calculate complexity level based on selected options
export const calculateComplexity = (config) => {
  let complexityScore = 0;

  // Base score for sleeves
  if (config.sleeves === 1) complexityScore += 1;
  if (config.sleeves === 2) complexityScore += 2;

  // Base score for skirt
  if (config.skirt && config.skirt !== '') complexityScore += 1;
  if (config.skirt === 'both') complexityScore += 1;

  // Score for decorative elements
  if (config.decorativeElements && config.decorativeElements !== 'none') {
    const elements = config.decorativeElements.split(',');
    complexityScore += elements.length;
  }

  // Score for aerography
  if (config.aerography && config.aerography !== 'nothing') complexityScore += 2;

  // Score for premium stones
  if (config.premiumStones && config.premiumStones !== 'none') complexityScore += 1;

  // Score for urgency (indicates high complexity request)
  if (config.urgency && config.urgency !== 'none') complexityScore += 1;

  // Score for custom design
  if (config.design === 'customer-design') complexityScore += 1;

  // Determine complexity level
  if (complexityScore === 0) {
    return { level: 'Simple', score: 0, label: 'Simple' };
  } else if (complexityScore <= 3) {
    return { level: 'Simple', score: complexityScore, label: 'Simple' };
  } else if (complexityScore <= 6) {
    return { level: 'Advanced', score: complexityScore, label: 'Advanced' };
  } else {
    return { level: 'Luxury', score: complexityScore, label: 'Luxury' };
  }
};

// Calculate estimated number of crystals/stones
export const calculateEstimatedCrystals = (config) => {
  let baseStones = 800; // Base for simple design

  // Add stones based on decorative elements
  if (config.decorativeElements && config.decorativeElements !== 'none') {
    const elements = config.decorativeElements.split(',');
    baseStones += elements.length * 300; // Each element adds ~300 stones
  }

  // Add stones for aerography (aerography often includes crystals)
  if (config.aerography && config.aerography !== 'nothing') {
    baseStones += 500; // Aerography adds ~500 stones
  }

  // Add stones for skirt
  if (config.skirt && config.skirt !== '') {
    if (config.skirt === 'both') {
      baseStones += 400; // Front and back skirt
    } else {
      baseStones += 200; // Single skirt
    }
  }

  // Add stones for premium stones option
  if (config.premiumStones && config.premiumStones !== 'none') {
    baseStones += 600; // Premium stones significantly increase count
  }

  // Minimum is 800, maximum reasonable is around 5000
  return Math.min(Math.max(baseStones, 800), 5000);
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

// Get production time based on urgency
export const getProductionTime = (urgency) => {
  if (urgency === 'accelerated') {
    return '1–2 weeks';
  }
  return '3–4 weeks';
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

// Format configuration for display
export const formatConfigurationSummary = (config) => {
  const summary = [];

  // Design
  if (config.design === 'our-design') {
    summary.push('Our design');
  } else if (config.design === 'customer-design') {
    summary.push('Your own design');
  }

  // Sleeves
  if (config.sleeves === 1) {
    summary.push('One sleeve');
  } else if (config.sleeves === 2) {
    summary.push('Two sleeves');
  }

  // Skirt
  if (config.skirt === 'front') {
    summary.push('Front skirt');
  } else if (config.skirt === 'back') {
    summary.push('Back skirt');
  } else if (config.skirt === 'both') {
    summary.push('Front and back skirt');
  }

  // Decorative elements
  if (config.decorativeElements && config.decorativeElements !== 'none') {
    const elements = config.decorativeElements.split(',');
    elements.forEach(el => {
      const labels = {
        'feathers': 'Feathers',
        'fringe': 'Fringe',
        'flowers': 'Volumetric flowers',
        'other': 'Other decorations'
      };
      if (labels[el]) summary.push(labels[el]);
    });
  }

  // Aerography
  if (config.aerography && config.aerography !== 'nothing') {
    summary.push('Airbrush / painted elements');
  }

  // Urgency
  if (config.urgency === 'accelerated') {
    summary.push('Express order');
  }

  return summary;
};
