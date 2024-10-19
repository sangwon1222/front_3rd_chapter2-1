import { LIGHTNING_SALE_PROBABILITY } from '@advanced/constants/discount';

// 번개 할인 확률
export const validLightning = (stock: number) => {
  const rate = Math.random() < LIGHTNING_SALE_PROBABILITY;

  return stock > 0 && rate;
};
