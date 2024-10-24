import { updatePrice } from '@advanced/redux/features/productList/productSlice';
import { getDiscountedPrice } from '@advanced/utils/getDiscountedPrice';
import { Dispatch } from '@reduxjs/toolkit';
import { useEffect, useRef } from 'react';
import {
  SUGGESTION_DISCOUNT_INTERVAL,
  SUGGESTION_DISCOUNT_DELAY,
  SUGGESTION_DISCOUNT_RATE,
} from '@advanced/constants/discount';
import { getSuggestItem } from '@advanced/service/discount/suggestion/getSuggestItem';

// 추천 할인 로직
export const useSuggestionInterval = (
  productList: ItemType[],
  lastPickItemId: string,
  dispatch: Dispatch
) => {
  const productsRef = useRef(productList);
  const lastIdRef = useRef(lastPickItemId);

  // 제품 리스트 최신화
  useEffect(() => {
    productsRef.current = productList;
  }, [productList]);

  // 마지막 선택한 상품 최신화
  useEffect(() => {
    lastIdRef.current = lastPickItemId;
  }, [lastPickItemId]);

  // 인터벌 등록
  useEffect(() => {
    const intervalId = setInterval(() => {
      const suggestItem = getSuggestItem(
        productsRef.current,
        lastIdRef.current
      );
      if (!suggestItem) return;

      const { id, name, price } = suggestItem;

      // 추천 제품 할인 적용
      const applyDiscountPrice = getDiscountedPrice(
        price,
        SUGGESTION_DISCOUNT_RATE
      );
      dispatch(updatePrice({ id, changePrice: applyDiscountPrice }));

      // 할인 팝업
      alert(`${name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
    }, SUGGESTION_DISCOUNT_INTERVAL);

    setTimeout(() => intervalId, SUGGESTION_DISCOUNT_DELAY);
    return () => clearInterval(intervalId);
  }, []);
};
