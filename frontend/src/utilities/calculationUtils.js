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
      action: `we would keep the two sleeves and aerography, but choose standard delivery instead of expedited`,
      savings: estimatedSavings,
      rationale: "maintains visual impact while reducing rush fees"
    });
  } else if (hasTwoSleeves && hasDecorativeElements && hasAerography) {
    // Very complex - suggest reducing decorative elements
    const estimatedSavings = Math.round(finalPrice * 0.12); // ~12% for fewer elements
    suggestions.push({
      action: `we would keep the two sleeves and aerography but simplify decorative elements`,
      savings: estimatedSavings,
      rationale: "preserves the sophisticated design while optimizing cost"
    });
  } else if (hasAerography && hasExpedited && isPremiumStones) {
    // Expensive combination - suggest removing premium stones
    const estimatedSavings = Math.round(finalPrice * 0.15); // ~15% for premium stones
    suggestions.push({
      action: `we would keep the aerography and expedited order but use standard stones`,
      savings: estimatedSavings,
      rationale: "maintains quick turnaround and artistic elements without premium pricing"
    });
  } else if (hasTwoSleeves && hasExpedited && !hasAerography) {
    // Sleeves + urgency without artistic touch - suggest adding aerography instead
    const estimatedIncrease = Math.round(finalPrice * 0.18);
    suggestions.push({
      action: `we would add aerography to the design instead of maintaining both sleeves`,
      increase: estimatedIncrease,
      rationale: "aerography creates more visual impact for competitive performance"
    });
  } else if (hasExpedited && !hasAerography && !hasDecorativeElements) {
    // Only expedited without decoration - suggest adding small details
    const estimatedIncrease = Math.round(finalPrice * 0.08);
    suggestions.push({
      action: `we would add subtle aerography or decorative details to enhance visual appeal`,
      increase: estimatedIncrease,
      rationale: "small additions create more stage presence for minimal cost increase"
    });
  } else if (hasTwoSleeves && hasTwoSleeves && !hasAerography) {
    // Full sleeves without aerography - suggest adding it
    const estimatedIncrease = Math.round(finalPrice * 0.15);
    suggestions.push({
      action: `we would add aerography to complement the two-sleeve design`,
      increase: estimatedIncrease,
      rationale: "aerography creates visual balance with the sleeve complexity"
    });
  } else if (hasDecorativeElements && !hasAerography) {
    // Decorative but no aerography - suggest adding it
    const estimatedIncrease = Math.round(finalPrice * 0.14);
    suggestions.push({
      action: `we would add subtle aerography to tie together the decorative elements`,
      increase: estimatedIncrease,
      rationale: "creates cohesive artistic vision with existing 3D elements"
    });
  } else {
    // Default suggestion
    suggestions.push({
      action: `we would preserve this configuration as it's well-balanced`,
      savings: 0,
      rationale: "this design offers good value for the complexity level"
    });
  }

  const bestSuggestion = suggestions[0];
  if (bestSuggestion.savings && bestSuggestion.savings > 0) {
    return `If this were our own leotard, ${bestSuggestion.action}. This would save approximately €${bestSuggestion.savings}. Why? ${bestSuggestion.rationale}`;
  } else if (bestSuggestion.increase && bestSuggestion.increase > 0) {
    return `If this were our own leotard, ${bestSuggestion.action}. This would increase the price by approximately €${bestSuggestion.increase}. Why? ${bestSuggestion.rationale}`;
  } else {
    return `${bestSuggestion.action}. ${bestSuggestion.rationale}`;
  }
};

// Calculate value-for-money rating (1-4 stars)
// Based on complexity/price ratio, not absolute quality
export const calculateValueForMoney = (config, finalPrice, complexity) => {
  const complexityScore = complexity?.score || 0;
  const pricePerUnit = finalPrice / Math.max(complexityScore, 1);

  // Define rating tiers based on price point and complexity balance
  let stars = 2; // Default balanced rating
  let tier = 'balanced';
  let label = '⭐⭐ Very balanced';
  let description = 'Excellent balance of features and price';

  // Budget tier (under €300)
  if (finalPrice < 300) {
    if (complexityScore >= 4) {
      stars = 4;
      tier = 'excellent';
      label = '⭐⭐⭐⭐ Excellent value';
      description = 'Maximum features for budget price';
    } else if (complexityScore >= 2) {
      stars = 3;
      tier = 'very-good';
      label = '⭐⭐⭐ Very good value';
      description = 'Strong features for modest investment';
    } else {
      stars = 2;
      tier = 'balanced';
      label = '⭐⭐ Good starter option';
      description = 'Simple elegance at accessible price';
    }
  }
  // Mid tier (€300-€500)
  else if (finalPrice < 500) {
    if (complexityScore >= 6) {
      stars = 4;
      tier = 'luxury';
      label = '⭐⭐⭐⭐ Maximum visual impact';
      description = 'Rich features create strong stage presence';
    } else if (complexityScore >= 4) {
      stars = 3;
      tier = 'premium';
      label = '⭐⭐⭐ Premium balance';
      description = 'Good sophistication level';
    } else {
      stars = 2;
      tier = 'balanced';
      label = '⭐⭐ Very balanced';
      description = 'Solid mid-range choice';
    }
  }
  // Premium tier (€500+)
  else {
    if (complexityScore >= 8) {
      stars = 4;
      tier = 'luxury';
      label = '⭐⭐⭐⭐ Luxury level';
      description = 'Premium features and exceptional craftsmanship';
    } else if (complexityScore >= 6) {
      stars = 3;
      tier = 'premium';
      label = '⭐⭐⭐ Maximum visual impact';
      description = 'Significant investment in visual presence';
    } else if (complexityScore >= 4) {
      stars = 2;
      tier = 'balanced';
      label = '⭐⭐ Premium investment';
      description = 'Higher price for moderate complexity';
    } else {
      stars = 1;
      tier = 'expensive';
      label = '⭐ High price for simplicity';
      description = 'Consider simplifying to reduce costs';
    }
  }

  return { stars, tier, label, description };
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
