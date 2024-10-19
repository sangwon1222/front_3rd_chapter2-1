import { getDiscountedPrice } from '@advanced/utils/getDiscountedPrice';
import { DAY_DISCOUNT_RATE } from '@advanced/constants/discount';

// 요일 할인 적용
export const applyDay = (totalPrice: number, discountRate: number) => {
  const rate = Math.max(discountRate, DAY_DISCOUNT_RATE);
  const price = getDiscountedPrice(totalPrice, rate);

  return [price, rate];
};
1;
