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
