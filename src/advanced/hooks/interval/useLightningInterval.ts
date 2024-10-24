import { validLightning } from '@advanced/service/discount/lightning/validLightning';
import { updatePrice } from '@advanced/redux/features/productList/productSlice';
import { getDiscountedPrice } from '@advanced/utils/getDiscountedPrice';
import { Dispatch } from '@reduxjs/toolkit';
import { useEffect, useRef } from 'react';
import {
  LIGHTNING_DISCOUNT_RATE,
  LIGHTNING_SALE_INTERVAL,
  LIGHTNING_SALE_DELAY,
} from '@advanced/constants/discount';

// 번개 할인 로직
export const useLightningInterval = (
  productList: ItemType[],
  dispatch: Dispatch
) => {
  const products = useRef(productList);

  useEffect(() => {
    products.current = productList;
  }, [productList]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 랜덤 제품 뽑기
      const randomIndex = Math.floor(Math.random() * products.current.length);
      const { id, name, price, quantity } = products.current[randomIndex];

      // 할인 조건 검사
      const valid = validLightning(quantity);

      if (!valid) return;

      // 할인 적용
      const changePrice = getDiscountedPrice(price, LIGHTNING_DISCOUNT_RATE);
      dispatch(updatePrice({ id, changePrice }));
      alert(`번개세일! ${name}이(가) 20% 할인 중입니다!`);
    }, LIGHTNING_SALE_INTERVAL);

    setTimeout(() => intervalId, LIGHTNING_SALE_DELAY);
    return () => clearInterval(intervalId);
  }, []);
};
