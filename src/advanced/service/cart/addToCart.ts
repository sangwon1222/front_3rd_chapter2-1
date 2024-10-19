import { updateStock } from '@advanced/redux/features/productList/productSlice';
import { addItem } from '@advanced/redux/features/cart/cartSlice';
import { Dispatch } from '@reduxjs/toolkit';

export const addToCart = (product: ItemType, dispatch: Dispatch) => {
  // 재고 있는지 확인
  if (product?.quantity === 0) {
    alert('재고가 부족합니다.');
    return;
  }

  // store 값 update
  dispatch(addItem({ id: product.id, productData: { ...product } }));
  dispatch(updateStock({ id: product.id, changeStock: -1 }));
};
