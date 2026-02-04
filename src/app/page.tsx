import PortfolioTable from '@/components/PortfolioTable';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Portfolio Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time tracking of your stock investments with live market data
          </p>
        </header>

        <PortfolioTable />

        <footer className="mt-12 text-center text-sm text-gray-500 border-t pt-6">
          <p>Data refreshes every 15 seconds</p>
          <p className="mt-2">
            Note: Market data is fetched from unofficial sources and may vary in accuracy.
            This is for educational purposes only.
          </p>
        </footer>
      </div>
    </main>
  );
}
