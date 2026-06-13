// Builds the human-readable WhatsApp message from a saved calculation record.
// Localized to the customer's language via the passed `t` function.
import { formatConfigurationSummary, formatPrice } from './calculationUtils';

const buildOptionLines = (config, t) =>
  formatConfigurationSummary(config)
    .map((item) => `• ${typeof item === 'string' ? item : t(item.key)}`)
    .join('\n');

const buildBudgetLine = (budget, language, t) => {
  if (!budget || budget === 'undecided' || budget === 'unknown') return null;
  const amount = budget === 'plus' ? formatPrice(800, language) + '+' : formatPrice(Number(budget), language);
  return `${t('whatsapp.budgetAround')} ${amount}`;
};

const buildAppliedLines = (recommendationKeys, t) =>
  (recommendationKeys || []).map((key) => `• ${t(key)}`).join('\n');

// record: the stored calculation record. optimized: include before/after + applied recommendations.
export const buildWhatsAppMessage = (record, { t, language, optimized }) => {
  const lines = [];
  lines.push(t('whatsapp.greeting'));
  lines.push('');
  lines.push(`${t('whatsapp.calculationId')}: ${record.id}`);
  lines.push('');

  const optionsText = buildOptionLines(record.config, t);
  const budgetLine = buildBudgetLine(record.budget, language, t);

  if (optimized && record.optimizedPrice != null) {
    lines.push(`${t('whatsapp.originalEstimate')}: ${formatPrice(record.originalPrice, language)}`);
    lines.push(`${t('whatsapp.optimizedEstimate')}: ${formatPrice(record.optimizedPrice, language)}`);
    lines.push('');
    lines.push(`${t('whatsapp.selectedOptionsBefore')}:`);
    lines.push(optionsText);
    const applied = buildAppliedLines(record.recommendationsApplied, t);
    if (applied) {
      lines.push('');
      lines.push(`${t('whatsapp.appliedRecommendations')}:`);
      lines.push(applied);
    }
    if (budgetLine) {
      lines.push('');
      lines.push(budgetLine);
    }
    lines.push('');
    lines.push(t('whatsapp.closingOptimized'));
  } else {
    lines.push(`${t('whatsapp.estimatedPrice')}: ${formatPrice(record.finalPrice, language)}`);
    lines.push('');
    lines.push(`${t('whatsapp.selectedOptions')}:`);
    lines.push(optionsText);
    if (budgetLine) {
      lines.push('');
      lines.push(budgetLine);
    }
    lines.push('');
    lines.push(t('whatsapp.closing'));
  }

  return lines.join('\n');
};
