import { Stock } from '@/types/portfolio';

// Hardcoded portfolio holdings - represents typical investment portfolio
export const portfolioHoldings: Stock[] = [
  {
    name: 'Reliance Industries',
    purchasePrice: 2450.00,
    quantity: 10,
    exchange: 'NSE',
    sector: 'Energy',
    symbol: 'RELIANCE.NS'
  },
  {
    name: 'Tata Consultancy Services',
    purchasePrice: 3520.00,
    quantity: 8,
    exchange: 'NSE',
    sector: 'Technology',
    symbol: 'TCS.NS'
  },
  {
    name: 'HDFC Bank',
    purchasePrice: 1650.00,
    quantity: 15,
    exchange: 'NSE',
    sector: 'Financials',
    symbol: 'HDFCBANK.NS'
  },
  {
    name: 'Infosys',
    purchasePrice: 1480.00,
    quantity: 12,
    exchange: 'NSE',
    sector: 'Technology',
    symbol: 'INFY.NS'
  },
  {
    name: 'ICICI Bank',
    purchasePrice: 920.00,
    quantity: 20,
    exchange: 'NSE',
    sector: 'Financials',
    symbol: 'ICICIBANK.NS'
  },
  {
    name: 'Bharti Airtel',
    purchasePrice: 850.00,
    quantity: 18,
    exchange: 'NSE',
    sector: 'Telecom',
    symbol: 'BHARTIARTL.NS'
  },
  {
    name: 'ITC Limited',
    purchasePrice: 420.00,
    quantity: 25,
    exchange: 'NSE',
    sector: 'FMCG',
    symbol: 'ITC.NS'
  },
  {
    name: 'Larsen & Toubro',
    purchasePrice: 3100.00,
    quantity: 7,
    exchange: 'NSE',
    sector: 'Infrastructure',
    symbol: 'LT.NS'
  }
];
