'use client';

import { useEffect, useState } from 'react';
import { portfolioHoldings } from '@/data/holdings';
import { StockWithLiveData, SectorSummary } from '@/types/portfolio';
import {
  calculateInvestment,
  calculatePresentValue,
  calculateGainLoss,
  calculatePortfolioPercent,
  getTotalInvestment
} from '@/utils/calculations';
import SectorGroup from './SectorGroup';

export default function PortfolioTable() {
  const [portfolioData, setPortfolioData] = useState<StockWithLiveData[]>([]);
  const [sectorGroups, setSectorGroups] = useState<SectorSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Fetch live market data
  const fetchMarketData = async () => {
    try {
      const symbols = portfolioHoldings.map(stock => stock.symbol).join(',');
      const response = await fetch(`/api/stocks?symbols=${symbols}`);
      const result = await response.json();

      if (result.data) {
        updatePortfolioData(result.data);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update portfolio with live data
  const updatePortfolioData = (marketData: any[]) => {
    const totalInvestment = getTotalInvestment(portfolioHoldings);
    
    const enrichedData: StockWithLiveData[] = portfolioHoldings.map(stock => {
      const liveData = marketData.find(m => m.symbol === stock.symbol);
      const cmp = liveData?.cmp || stock.purchasePrice;
      const investment = calculateInvestment(stock.purchasePrice, stock.quantity);
      const presentValue = calculatePresentValue(cmp, stock.quantity);
      const gainLoss = calculateGainLoss(presentValue, investment);
      const portfolioPercent = calculatePortfolioPercent(investment, totalInvestment);

      return {
        ...stock,
        investment,
        portfolioPercent,
        cmp,
        presentValue,
        gainLoss,
        peRatio: liveData?.peRatio || 'N/A',
        latestEarnings: liveData?.latestEarnings || 'N/A'
      };
    });

    setPortfolioData(enrichedData);
    groupBySector(enrichedData);
  };

  // Group stocks by sector
  const groupBySector = (stocks: StockWithLiveData[]) => {
    const sectorMap = new Map<string, StockWithLiveData[]>();

    stocks.forEach(stock => {
      if (!sectorMap.has(stock.sector)) {
        sectorMap.set(stock.sector, []);
      }
      sectorMap.get(stock.sector)?.push(stock);
    });

    const sectors: SectorSummary[] = Array.from(sectorMap.entries()).map(([sectorName, stocks]) => {
      const totalInvestment = stocks.reduce((sum, s) => sum + s.investment, 0);
      const totalPresentValue = stocks.reduce((sum, s) => sum + s.presentValue, 0);
      const totalGainLoss = stocks.reduce((sum, s) => sum + s.gainLoss, 0);

      return {
        sectorName,
        totalInvestment,
        totalPresentValue,
        totalGainLoss,
        stocks
      };
    });

    setSectorGroups(sectors);
  };

  // Initialize with static data immediately
  useEffect(() => {
    // Show static data first for fast initial render
    const totalInvestment = getTotalInvestment(portfolioHoldings);
    const initialData: StockWithLiveData[] = portfolioHoldings.map(stock => {
      const investment = calculateInvestment(stock.purchasePrice, stock.quantity);
      const presentValue = calculatePresentValue(stock.purchasePrice, stock.quantity);
      const gainLoss = calculateGainLoss(presentValue, investment);
      const portfolioPercent = calculatePortfolioPercent(investment, totalInvestment);

      return {
        ...stock,
        investment,
        portfolioPercent,
        cmp: stock.purchasePrice,
        presentValue,
        gainLoss,
        peRatio: 'Loading...',
        latestEarnings: 'Loading...'
      };
    });

    setPortfolioData(initialData);
    groupBySector(initialData);

    // Then fetch live data
    fetchMarketData();
    
    // Refresh every 15 seconds
    const interval = setInterval(() => {
      fetchMarketData();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const totalInvestment = portfolioData.reduce((sum, s) => sum + s.investment, 0);
  const totalPresentValue = portfolioData.reduce((sum, s) => sum + s.presentValue, 0);
  const totalGainLoss = portfolioData.reduce((sum, s) => sum + s.gainLoss, 0);
  const totalGainLossPercent = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;



  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Portfolio Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm opacity-80">Total Investment</p>
            <p className="text-2xl font-bold">₹{totalInvestment.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">Present Value</p>
            <p className="text-2xl font-bold">₹{totalPresentValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">Total Gain/Loss</p>
            <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              ₹{totalGainLoss.toFixed(2)} ({totalGainLossPercent.toFixed(2)}%)
            </p>
          </div>
          <div>
            <p className="text-sm opacity-80">Last Updated</p>
            <p className="text-lg">{lastUpdate.toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* Sector Groups */}
      {sectorGroups.map((sector, index) => (
        <SectorGroup key={index} sector={sector} />
      ))}
    </div>
  );
}
