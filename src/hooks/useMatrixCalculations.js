import { useMemo } from 'react';
import { MONTH_OPTIONS, DEFAULT_INTEREST_RATES } from '../constants/financeData';

/**
 * Custom hook for installment matrix calculations
 */
export function useMatrixCalculations(price, matrixDownOptionType) {
  return useMemo(() => {
    const validPrice = isNaN(price) ? 0 : price;
    let downSteps = [];

    if (matrixDownOptionType === 'baht') {
      downSteps = [0, 5000, 10000, 15000, 20000, 25000, 30000];
    } else {
      downSteps = [0, 10, 15, 20, 25, 30].map(pct => Math.round((validPrice * pct) / 100));
    }

    return downSteps.map((dAmount) => {
      const financing = Math.max(0, validPrice - dAmount);
      const monthsData = {};

      MONTH_OPTIONS.forEach((m) => {
        const rate = DEFAULT_INTEREST_RATES[m] || 1.07;
        const interestEachMonth = (financing * rate) / 100;
        const overallInterest = interestEachMonth * m;
        const overall = validPrice + overallInterest;
        const remainingToPay = overall - dAmount;
        const eachMonth = m > 0 ? remainingToPay / m : 0;

        monthsData[m] = {
          rate,
          eachMonth: Math.round(eachMonth),
          financing,
          overallInterest: Math.round(overallInterest),
          remainingToPay: Math.round(remainingToPay),
        };
      });

      return {
        downAmount: dAmount,
        downPct: validPrice > 0 ? Math.round((dAmount / validPrice) * 100) : 0,
        financing,
        monthsData,
      };
    });
  }, [price, matrixDownOptionType]);
}
