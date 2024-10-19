import { applyDiscountSummary } from '@advanced/service/discount/applyDiscountSummary';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: { [key: string]: ItemType };
  totalPrice: number;
  discountedPrice: number;
  discount: number;
  point: number;
  lastPickItemId: string;
}

const initialState: CartState = {
  items: {},
  totalPrice: 0,
  discountedPrice: 0,
  discount: 0,
  point: 0,
  lastPickItemId: 'p1',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    pickItemId: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.lastPickItemId = id;
    },
    decreaseItem: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      const findItem = state.items[id];
      if (!findItem) return;

      // 장바구니에 있을 경우 수량 - 1
      findItem.quantity--;

      // 수량이 0이면 장바구니에서 제거
      if (findItem.quantity === 0) delete state.items[id];

      // 장바구니 총액 업데이트
      state.totalPrice -= findItem.price;

      // 값 배열로 변환
      const cartValueList = Object.values(state.items);

      // (10개이상 , 대량, 요일 등 ) 할인 이벤트 조건부 적용
      const [price, rate] = applyDiscountSummary(cartValueList);

      // 할인된 총액, 할인율 state 업데이트
      [state.discountedPrice, state.discount] = [price, rate];

      // 포인트 업데이트
      state.point += Math.floor(price / 1000);
    },
    addItem: (
      state,
      action: PayloadAction<{ id: string; productData: ItemType }>
    ) => {
      const { id, productData } = action.payload;

      const existingItem = state.items[id];

      // 장바구니에 있을 경우 수량 + 1
      if (existingItem) existingItem.quantity++;
      // 장바구니에 없을 경우 추가
      else state.items[id] = { ...productData, quantity: 1 };

      // 장바구니 총액 업데이트
      state.totalPrice += productData.price;

      // 값 배열로 변환
      const cartValueList = Object.values(state.items);

      // (10개이상 , 대량, 요일 등 ) 할인 이벤트 조건부 적용
      const [price, rate] = applyDiscountSummary(cartValueList);
      state.discountedPrice = price;
      state.discount = rate;

      // 포인트 업데이트
      state.point += Math.floor(price / 1000);
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const existingItem = state.items[id];

      // 장바구니에 없으면 return
      if (!existingItem) return;

      // 장바구니 총액 업데이트
      state.totalPrice -= existingItem.price * existingItem.quantity;

      // 장바구니에서 제거
      delete state.items[id];

      // 값 배열로 변환
      const cartValueList = Object.values(state.items);

      // (10개이상 , 대량, 요일 등 ) 할인 이벤트 조건부 적용
      const [price, rate] = applyDiscountSummary(cartValueList);
      state.discountedPrice = price;
      state.discount = rate;
    },
  },
});

export const { addItem, removeItem, decreaseItem, pickItemId } =
  cartSlice.actions;
export default cartSlice.reducer;
