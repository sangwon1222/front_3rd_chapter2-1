import { updateStock } from '@advanced/redux/features/productList/productSlice';
import { removeItem } from '@advanced/redux/features/cart/cartSlice';
import { Dispatch } from '@reduxjs/toolkit';

export const removeToCart = (product: ItemType, dispatch: Dispatch) => {
  dispatch(removeItem({ id: product.id }));
  dispatch(updateStock({ id: product.id, changeStock: product.quantity }));
};
