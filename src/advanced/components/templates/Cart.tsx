import { useSuggestionInterval } from '@advanced/hooks/interval/useSuggestionInterval';
import { useLightningInterval } from '@advanced/hooks/interval/useLightningInterval';
import CartSelectBox from '@advanced/components/molecules/CartSelectBox';
import { rateToPercent } from '@advanced/utils/rateToPercent ';
import { useDispatch, useSelector } from 'react-redux';
import CartTotalLabel from '@molecules/CartTotalLabel';
import ItemsInCart from '../molecules/ItemsInCart';
import AddToCartBtn from '../atoms/AddToCartBtn';
import StockLabel from '@molecules/StockLabel';
import { RootState } from '@redux/store';
import React, { useMemo } from 'react';

const Cart: React.FC = () => {
  // Redux 제품 리스트, 장바구니 리스트, 총액, 할인율, 포인트 등 데이터 가져오기
  const { productList } = useSelector((state: RootState) => state.productStore);
  const { items, discountedPrice, point, discount, lastPickItemId } =
    useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  // 메모이제이션
  const memoDisCount = useMemo(() => rateToPercent(discount), [discount]);
  const memoCartItems = useMemo(() => Object.values(items), [items]);
  const memoProducts = useMemo(() => Object.values(productList), [productList]);
  const memoLastId = useMemo(() => lastPickItemId, [lastPickItemId]);

  // 번개 , 제안 할인 팝업 인터벌
  useLightningInterval(memoProducts, dispatch);
  useSuggestionInterval(memoProducts, memoLastId, dispatch);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>

      <ItemsInCart items={memoCartItems} />

      <CartTotalLabel
        totalPrice={discountedPrice}
        discount={memoDisCount}
        point={point}
      />

      <CartSelectBox productList={memoProducts} />
      <AddToCartBtn lastPickItemId={lastPickItemId} />

      <StockLabel productList={memoProducts} />
    </div>
  );
};

export default Cart;
