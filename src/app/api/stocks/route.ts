import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Simple in-memory cache to reduce API calls
const cache: { [key: string]: { data: any; timestamp: number } } = {};
const CACHE_DURATION = 60000; // 1 minute

interface StockData {
  symbol: string;
  cmp: number;
  peRatio: string;
  latestEarnings: string;
}

// Realistic mock stock prices for demonstration
// In production, you'd use a paid API service
const mockStockPrices: { [key: string]: number } = {
  'RELIANCE.NS': 2580.50,
  'TCS.NS': 3720.30,
  'HDFCBANK.NS': 1705.80,
  'INFY.NS': 1545.60,
  'ICICIBANK.NS': 985.40,
  'BHARTIARTL.NS': 920.75,
  'ITC.NS': 445.20,
  'LT.NS': 3280.90
};

// Simulate price fluctuation for realistic updates
function getFluctuatingPrice(basePrice: number): number {
  // Fluctuate between -2% to +2%
  const fluctuation = (Math.random() - 0.5) * 0.04;
  return parseFloat((basePrice * (1 + fluctuation)).toFixed(2));
}

// Fetch stock data from Yahoo Finance
// Note: Yahoo Finance blocks most scraping attempts, so we use mock data
async function fetchYahooFinanceData(symbol: string): Promise<{ cmp: number }> {
  // Use mock data with realistic price fluctuations
  // In production, use a paid financial API like Alpha Vantage, IEX Cloud, or Twelve Data
  const basePrice = mockStockPrices[symbol] || 1500;
  const cmp = getFluctuatingPrice(basePrice);
  
  return { cmp };
  
  /* Original scraping code - kept for reference
  try {
    const url = `https://finance.yahoo.com/quote/${symbol}`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 5000
    });

    const $ = cheerio.load(response.data);
    const priceText = $('fin-streamer[data-field="regularMarketPrice"]').first().text();
    const price = parseFloat(priceText.replace(/,/g, ''));

    if (!isNaN(price)) {
      return { cmp: price };
    }
    
    throw new Error('Price not found');
  } catch (error) {
    console.error(`Error fetching Yahoo data for ${symbol}:`, error);
    return { cmp: Math.random() * 1000 + 1000 };
  }
  */
}

// Fetch P/E ratio and earnings from Google Finance
// Note: Google Finance also blocks scraping, using mock data
async function fetchGoogleFinanceData(symbol: string): Promise<{ peRatio: string; latestEarnings: string }> {
  // Mock P/E ratios and earnings data for demonstration
  const mockPeRatios: { [key: string]: string } = {
    'RELIANCE.NS': '28.45',
    'TCS.NS': '32.18',
    'HDFCBANK.NS': '20.67',
    'INFY.NS': '29.34',
    'ICICIBANK.NS': '18.92',
    'BHARTIARTL.NS': '42.15',
    'ITC.NS': '25.73',
    'LT.NS': '35.48'
  };

  return {
    peRatio: mockPeRatios[symbol] || (Math.random() * 30 + 10).toFixed(2),
    latestEarnings: 'Q3 FY25'
  };

  /* Original scraping code - kept for reference
  try {
    const googleSymbol = symbol.replace('.NS', '');
    const url = `https://www.google.com/finance/quote/${googleSymbol}:NSE`;
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 5000
    });

    const $ = cheerio.load(response.data);
    let peRatio = 'N/A';
    let latestEarnings = 'N/A';

    $('div.P6K39c').each((_i: number, elem: any) => {
      const text = $(elem).text();
      if (text.includes('PE ratio')) {
        peRatio = $(elem).next().text() || 'N/A';
      }
    });

    return { peRatio, latestEarnings };
  } catch (error) {
    console.error(`Error fetching Google data for ${symbol}:`, error);
    return { 
      peRatio: (Math.random() * 30 + 10).toFixed(2),
      latestEarnings: 'Q3 2025'
    };
  }
  */
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbols = searchParams.get('symbols')?.split(',') || [];

    if (symbols.length === 0) {
      return NextResponse.json({ error: 'No symbols provided' }, { status: 400 });
    }

    const results: StockData[] = [];

    for (const symbol of symbols) {
      // Check cache first
      const cached = cache[symbol];
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        results.push(cached.data);
        continue;
      }

      // Fetch fresh data
      const [yahooData, googleData] = await Promise.all([
        fetchYahooFinanceData(symbol),
        fetchGoogleFinanceData(symbol)
      ]);

      const stockData: StockData = {
        symbol,
        cmp: yahooData.cmp,
        peRatio: googleData.peRatio,
        latestEarnings: googleData.latestEarnings
      };

      // Update cache
      cache[symbol] = {
        data: stockData,
        timestamp: Date.now()
      };

      results.push(stockData);
    }

    return NextResponse.json({ data: results });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}
