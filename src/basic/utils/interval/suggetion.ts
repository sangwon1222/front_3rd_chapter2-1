import {
  SUGGESTION_DISCOUNT_DELAY,
  SUGGESTION_DISCOUNT_INTERVAL,
} from '@basic/constants/discount';
import {
  getIntervals,
  hasIntervals,
  setTrackedInterval,
} from './intervalManager';
import { applySuggestionDiscount } from '../../hooks/discount/suggestion';

const INTERVAL_KEY = 'suggestion-interval';

// 추천 할인 인터벌
export const startSuggestionInterval = () => {
  setTimeout(() => {
    // 기존 인터벌이 있을 경우 먼저 해제
    const hasInterval = hasIntervals(INTERVAL_KEY);
    if (hasInterval) {
      const prevInterval = getIntervals(INTERVAL_KEY);
      clearInterval(prevInterval);
    }

    setTrackedInterval(
      INTERVAL_KEY,
      applySuggestionDiscount,
      SUGGESTION_DISCOUNT_INTERVAL
    );
  }, SUGGESTION_DISCOUNT_DELAY);
};
