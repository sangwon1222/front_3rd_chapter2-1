import { decreaseToCart } from '@advanced/service/cart/decreaseToCart';
import { removeToCart } from '@advanced/service/cart/removeToCart';
import { addToCart } from '@advanced/service/cart/addToCart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@advanced/redux/store';
import React, { useMemo } from 'react';
import { map } from 'lodash-es';

const ItemsInCart: React.FC<{ items: ItemType[] }> = ({ items }) => {
  const { productList } = useSelector((state: RootState) => state.productStore);
  const dispatch = useDispatch();

  // - 버튼
  const handleDecreaseToCart = (id: string) => {
    decreaseToCart(productList[id], dispatch);
  };

  // + 버튼
  const handleAddToCart = (id: string) => addToCart(productList[id], dispatch);

  // 제거 버튼
  const handleRemoveToCart = (id: string) => {
    removeToCart(productList[id], dispatch);
  };

  return (
    <div id="cart-items" data-testid="cart-items">
      {map(items, ({ id, name, price, quantity }) => (
        <div
          key={`${id}-${name}`}
          id={id}
          data-testid={id}
          className="flex justify-between items-center mb-2"
        >
          <span role={`${id}-cart-data-label`}>
            {name} - {price}원 x {quantity}
          </span>
          <div>
            <button
              data-testid={`${id}-item-decrease-btn`}
              onClick={() => handleDecreaseToCart(id)}
              className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
            >
              -
            </button>
            <button
              data-testid={`${id}-item-increase-btn`}
              onClick={() => handleAddToCart(id)}
              className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
            >
              +
            </button>
            <button
              data-testid={`${id}-item-remove-btn`}
              onClick={() => handleRemoveToCart(id)}
              className="remove-item bg-red-500 text-white px-2 py-1 rounded"
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsInCart;
