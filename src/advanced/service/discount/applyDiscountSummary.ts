import { sumItemInCart } from '@advanced/service/cart/sumItemInCart';
import { calcDiscountRate } from '@advanced/utils/calcDiscountRate';
import { validBulk } from './bulk/validBulk';
import { validDay } from './day/validDay';
import { applyBulk } from './bulk/applyBulk';
import { applyDay } from './day/applyDay';

export const applyDiscountSummary = (items: ItemType[]) => {
  // (10개이상 , 대량, 요일 등 ) 할인 이벤트 조건부 적용
  const { totalPrice, discountedPrice, totalQuantity } = sumItemInCart(items);

  //GET 할인율 구하기
  const discountRate = calcDiscountRate(totalPrice, discountedPrice);

  // [ 할인된 값 , 할인율 ] 변수 초기화
  let [price, rate] = [discountedPrice, discountRate];

  // 대량 할인
  const isValidBulk = validBulk(discountRate, totalQuantity);
  if (isValidBulk) [price, rate] = applyBulk(totalPrice);

  // 요일 할인
  const isValidDay = validDay();
  if (isValidDay) [price, rate] = applyDay(price, rate);

  // 할인된 값 / 할인율
  return [price, rate];
};
