import {
  BULK_DISCOUNT_RATE,
  MINIMUM_BULK_DISCOUNT_QTY,
} from '@advanced/constants/discount';

// 대량 구매 할인 조건
export const validBulk = (discountRate: number, itemQty: number) => {
  const validQty = itemQty >= MINIMUM_BULK_DISCOUNT_QTY;
  const validRate = discountRate < BULK_DISCOUNT_RATE;

  return validQty && validRate;
};
