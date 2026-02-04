import { Stock, StockWithLiveData } from '@/types/portfolio';

// Calculate investment amount
export function calculateInvestment(purchasePrice: number, quantity: number): number {
  return purchasePrice * quantity;
}

// Calculate present value
export function calculatePresentValue(cmp: number, quantity: number): number {
  return cmp * quantity;
}

// Calculate gain or loss
export function calculateGainLoss(presentValue: number, investment: number): number {
  return presentValue - investment;
}

// Calculate portfolio percentage
export function calculatePortfolioPercent(investment: number, totalInvestment: number): number {
  return (investment / totalInvestment) * 100;
}

// Get total investment from all stocks
export function getTotalInvestment(stocks: Stock[]): number {
  return stocks.reduce((total, stock) => {
    return total + calculateInvestment(stock.purchasePrice, stock.quantity);
  }, 0);
}
