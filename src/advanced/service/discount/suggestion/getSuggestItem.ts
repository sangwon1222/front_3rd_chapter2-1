import { find } from 'lodash-es';

export const getSuggestItem = (list: ItemType[], findId: string) => {
  const item = find(
    list,
    ({ id, quantity }: ItemType) => id !== findId && quantity > 0
  );

  return item ? item : null;
};
