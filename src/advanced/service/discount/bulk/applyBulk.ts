import { BULK_DISCOUNT_RATE } from '@advanced/constants/discount';
import { getDiscountedPrice } from '@advanced/utils/getDiscountedPrice';

// 대량 구매 할인 적용
export const applyBulk = (totalPrice: number) => {
  const price = getDiscountedPrice(totalPrice, BULK_DISCOUNT_RATE);
  return [price, BULK_DISCOUNT_RATE];
};
