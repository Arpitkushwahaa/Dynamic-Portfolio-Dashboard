import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

// Simple in-memory cache to reduce API calls
const cache: { [key: string]: { data: any; timestamp: number } } = {};
const CACHE_DURATION = 30000; // 30 seconds cache

interface StockData {
  symbol: string;
  cmp: number;
  peRatio: string;
  latestEarnings: string;
}

// Fetch real stock data from Yahoo Finance using yahoo-finance2
async function fetchYahooFinanceData(symbol: string): Promise<{ cmp: number; peRatio: string }> {
  try {
    const quote: any = await yahooFinance.quote(symbol);
    
    const cmp = quote.regularMarketPrice || quote.currentPrice || 0;
    const peRatio = quote.trailingPE ? quote.trailingPE.toFixed(2) : 'N/A';
    
    return { cmp, peRatio };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    throw error;
  }
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

      try {
        // Fetch real market data
        const yahooData = await fetchYahooFinanceData(symbol);

        const stockData: StockData = {
          symbol,
          cmp: yahooData.cmp,
          peRatio: yahooData.peRatio,
          latestEarnings: 'Q3 FY25' // Can be enhanced with earnings calendar API
        };

        // Update cache
        cache[symbol] = {
          data: stockData,
          timestamp: Date.now()
        };

        results.push(stockData);
      } catch (error) {
        console.error(`Failed to fetch data for ${symbol}, using fallback`);
        // Fallback to cached data or default values
        const fallbackData: StockData = {
          symbol,
          cmp: 0,
          peRatio: 'N/A',
          latestEarnings: 'N/A'
        };
        results.push(fallbackData);
      }
    }

    return NextResponse.json({ data: results });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}
