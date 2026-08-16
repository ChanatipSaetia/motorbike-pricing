import { useMemo } from 'react';

/**
 * Custom hook for single loan calculation
 */
export function useCalculations(price, down, month, interest) {
  return useMemo(() => {
    const validPrice = isNaN(price) ? 0 : price;
    const validDown = isNaN(down) ? 0 : down;
    const validMonth = isNaN(month) || month <= 0 ? 1 : month;
    const validInterest = parseFloat(interest) || 0;

    const financing = Math.max(0, validPrice - validDown);
    const interestEachMonth = (financing * validInterest) / 100;
    const overallInterest = interestEachMonth * validMonth;
    const overall = validPrice + overallInterest;
    const remainingToPay = overall - validDown;
    const eachMonth = validMonth > 0 ? remainingToPay / validMonth : 0;

    return {
      financing,
      interestEachMonth,
      overallInterest,
      overall,
      remainingToPay,
      eachMonth: Math.round(eachMonth * 100) / 100
    };
  }, [price, down, month, interest]);
}
