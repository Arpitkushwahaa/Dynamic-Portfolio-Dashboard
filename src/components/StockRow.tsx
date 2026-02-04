'use client';

import { StockWithLiveData } from '@/types/portfolio';

interface StockRowProps {
  stock: StockWithLiveData;
}

export default function StockRow({ stock }: StockRowProps) {
  const isProfit = stock.gainLoss >= 0;

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3 text-sm">{stock.name}</td>
      <td className="px-4 py-3 text-sm text-right">₹{stock.purchasePrice.toFixed(2)}</td>
      <td className="px-4 py-3 text-sm text-right">{stock.quantity}</td>
      <td className="px-4 py-3 text-sm text-right">₹{stock.investment.toFixed(2)}</td>
      <td className="px-4 py-3 text-sm text-right">{stock.portfolioPercent.toFixed(2)}%</td>
      <td className="px-4 py-3 text-sm text-center">{stock.exchange}</td>
      <td className="px-4 py-3 text-sm text-right font-semibold">₹{stock.cmp.toFixed(2)}</td>
      <td className="px-4 py-3 text-sm text-right">₹{stock.presentValue.toFixed(2)}</td>
      <td className={`px-4 py-3 text-sm text-right font-semibold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
        ₹{stock.gainLoss.toFixed(2)} ({((stock.gainLoss / stock.investment) * 100).toFixed(2)}%)
      </td>
      <td className="px-4 py-3 text-sm text-center">{stock.peRatio}</td>
      <td className="px-4 py-3 text-sm text-center">{stock.latestEarnings}</td>
    </tr>
  );
}
