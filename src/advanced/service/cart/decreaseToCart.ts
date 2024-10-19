import { updateStock } from '@advanced/redux/features/productList/productSlice';
import { decreaseItem } from '@advanced/redux/features/cart/cartSlice';
import { Dispatch } from '@reduxjs/toolkit';

export const decreaseToCart = (product: ItemType, dispatch: Dispatch) => {
  // 장바구니 수량 -1 업데이트
  dispatch(decreaseItem({ id: product.id }));
  // 재고 수량 +1 업데이트
  dispatch(updateStock({ id: product.id, changeStock: 1 }));
};
