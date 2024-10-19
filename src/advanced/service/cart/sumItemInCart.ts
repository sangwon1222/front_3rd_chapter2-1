// (10개이상 , 대량, 요일 등 ) 할인 이벤트 조건부 적용
export const sumItemInCart = (items: ItemType[]) => {
  const { totalPrice, discountedPrice, totalQuantity } = items.reduce(
    (acc, { price, quantity, discount }) => {
      const discountRate = quantity < 10 ? 0 : discount;
      acc.totalPrice += price * quantity;
      acc.discountedPrice += price * quantity * (1 - discountRate);
      acc.totalQuantity += quantity;
      return acc;
    },
    { totalPrice: 0, discountedPrice: 0, totalQuantity: 0 }
  );

  return { totalPrice, discountedPrice, totalQuantity };
};
