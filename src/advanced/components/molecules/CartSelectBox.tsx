import { pickItemId } from '@advanced/redux/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import React from 'react';

type ChangeEvent = React.ChangeEvent<HTMLSelectElement>;

const CartSelectBox: React.FC<SelectPropsType> = ({ productList = [] }) => {
  const dispatch = useDispatch();

  // select 박스에서 선택된 값 업데이트
  const handleSelectChange = (e: ChangeEvent) => {
    dispatch(pickItemId({ id: e.target.value }));
  };
  return (
    <>
      <select
        id="product-select"
        data-testid="product-select"
        className="border rounded p-2 mr-2"
        onChange={handleSelectChange}
      >
        {productList.map(({ id, name, price, quantity }, index) => (
          <option
            value={id}
            disabled={quantity === 0}
            key={`${id}-${index}th-option`}
          >
            {`${name} - ${price}원`}
          </option>
        ))}
      </select>
    </>
  );
};

export default CartSelectBox;
