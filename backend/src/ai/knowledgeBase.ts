export const historicalLookup = (prompt: string) => {
  const normalized = prompt.toLowerCase();
  if (normalized.includes('rome')) {
    return {
      period: 'Ancient Rome 100 AD',
      environment: 'marketplace',
      climate: 'temperate' as const,
      buildings: ['roman_shop', 'stone_arch', 'temple'],
      characters: ['merchant', 'soldier', 'citizen'],
      objects: ['fruit_stall', 'coin_table', 'olive_crates'],
      timeline: [100, 500, 1000, 1500]
    };
  }
  if (normalized.includes('harappan')) {
    return {
      period: 'Harappan Civilization 2200 BCE',
      environment: 'planned_city',
      climate: 'arid' as const,
      buildings: ['mud_brick_house', 'fort_wall'],
      characters: ['artisan', 'scribe', 'citizen'],
      objects: ['granary', 'seal_workbench', 'well'],
      timeline: [-2200, -2000, -1800, -1600]
    };
  }
  return {
    period: 'Historical Reconstruction',
    environment: 'city_center',
    climate: 'temperate' as const,
    buildings: ['stone_arch', 'roman_shop'],
    characters: ['citizen', 'merchant'],
    objects: ['market_cart'],
    timeline: [100, 400, 800, 1200]
  };
};
