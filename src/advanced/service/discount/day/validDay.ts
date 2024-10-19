// 요일 할인 조건
export const validDay = () => {
  const today = new Date().getDay();
  const validDay = today === 2;

  return validDay;
};
