// TypeScript interfaces for portfolio data

export interface Stock {
  name: string;
  purchasePrice: number;
  quantity: number;
  exchange: string;
  sector: string;
  symbol: string;
}

export interface StockWithLiveData extends Stock {
  investment: number;
  portfolioPercent: number;
  cmp: number;
  presentValue: number;
  gainLoss: number;
  peRatio: string;
  latestEarnings: string;
}

export interface SectorSummary {
  sectorName: string;
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  stocks: StockWithLiveData[];
}

export interface MarketData {
  symbol: string;
  cmp: number;
  peRatio: string;
  latestEarnings: string;
}
