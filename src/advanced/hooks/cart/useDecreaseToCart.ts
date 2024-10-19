import { updateStock } from '@redux/features/productList/productSlice';
import { decreaseItem } from '@redux/features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { useCallback } from 'react';

export const useDecreaseToCart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const decreaseToCart = (productId: string) => {
    const item = items[productId];

    // 장바구니에 없는 항목이면 return
    if (!item) return;

    // 장바구니 수량 -1 업데이트
    dispatch(decreaseItem({ id: productId }));
    // 재고 수량 +1 업데이트
    dispatch(updateStock({ id: productId, changeStock: 1 }));
  };

  return { decreaseToCart };
};
