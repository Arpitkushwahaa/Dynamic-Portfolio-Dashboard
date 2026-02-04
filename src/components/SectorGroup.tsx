'use client';

import { SectorSummary } from '@/types/portfolio';
import StockRow from './StockRow';

interface SectorGroupProps {
  sector: SectorSummary;
}

export default function SectorGroup({ sector }: SectorGroupProps) {
  const isProfit = sector.totalGainLoss >= 0;

  return (
    <div className="mb-8">
      <div className="bg-blue-700 text-white px-4 py-3 rounded-t-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{sector.sectorName}</h2>
          <div className="flex gap-6 text-sm">
            <span>Investment: ₹{sector.totalInvestment.toFixed(2)}</span>
            <span>Present Value: ₹{sector.totalPresentValue.toFixed(2)}</span>
            <span className={isProfit ? 'text-green-300 font-semibold' : 'text-red-300 font-semibold'}>
              Gain/Loss: ₹{sector.totalGainLoss.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Stock Name</th>
              <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700">Purchase Price</th>
              <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700">Quantity</th>
              <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700">Investment</th>
              <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700">Portfolio %</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700">Exchange</th>
              <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700">CMP</th>
              <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700">Present Value</th>
              <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700">Gain/Loss</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700">P/E Ratio</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700">Latest Earnings</th>
            </tr>
          </thead>
          <tbody>
            {sector.stocks.map((stock, index) => (
              <StockRow key={index} stock={stock} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
