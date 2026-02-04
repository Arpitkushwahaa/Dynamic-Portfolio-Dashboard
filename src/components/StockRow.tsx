'use client';

import { StockWithLiveData } from '@/types/portfolio';

interface StockRowProps {
  stock: StockWithLiveData;
}

export default function StockRow({ stock }: StockRowProps) {
  const isProfit = stock.gainLoss >= 0;

  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{stock.name}</td>
      <td className="px-4 py-3 text-sm text-right text-gray-700">₹{stock.purchasePrice.toFixed(2)}</td>
      <td className="px-4 py-3 text-sm text-right text-gray-700">{stock.quantity}</td>
      <td className="px-4 py-3 text-sm text-right text-gray-700">₹{stock.investment.toFixed(2)}</td>
      <td className="px-4 py-3 text-sm text-right text-gray-700">{stock.portfolioPercent.toFixed(2)}%</td>
      <td className="px-4 py-3 text-sm text-center text-gray-700">{stock.exchange}</td>
      <td className="px-4 py-3 text-sm text-right font-semibold text-blue-700">₹{stock.cmp.toFixed(2)}</td>
      <td className="px-4 py-3 text-sm text-right text-gray-700">₹{stock.presentValue.toFixed(2)}</td>
      <td className={`px-4 py-3 text-sm text-right font-semibold ${isProfit ? 'text-green-700' : 'text-red-700'}`}>
        ₹{stock.gainLoss.toFixed(2)} ({((stock.gainLoss / stock.investment) * 100).toFixed(2)}%)
      </td>
      <td className="px-4 py-3 text-sm text-center text-gray-700">{stock.peRatio}</td>
      <td className="px-4 py-3 text-sm text-center text-gray-700">{stock.latestEarnings}</td>
    </tr>
  );
}
