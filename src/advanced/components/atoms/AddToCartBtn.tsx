import { addToCart } from '@advanced/service/cart/addToCart';
import { RootState } from '@advanced/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

const AddToCartBtn: React.FC<{
  lastPickItemId: string;
}> = ({ lastPickItemId }) => {
  const { productList } = useSelector((state: RootState) => state.productStore);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const product = productList[lastPickItemId];
    addToCart(product, dispatch);
  };

  return (
    <button
      id="add-to-cart"
      data-testid="add-to-cart"
      onClick={handleAddToCart}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      추가
    </button>
  );
};

export default AddToCartBtn;
