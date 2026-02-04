# Portfolio Dashboard

A dynamic web application for tracking stock portfolio performance with real-time market data.

## Features

- **Real-time Stock Prices**: Fetches current market prices (CMP) from Yahoo Finance
- **Financial Metrics**: Displays P/E ratios and latest earnings data
- **Automatic Updates**: Refreshes market data every 15 seconds
- **Sector Grouping**: Organizes stocks by sector with sector-level summaries
- **Visual Indicators**: Color-coded gains (green) and losses (red)
- **Portfolio Analytics**: Shows investment value, present value, and gain/loss percentages

## Technology Stack

- **Frontend**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: Axios with Cheerio for web scraping
- **Backend**: Next.js API Routes

## Project Structure

```
portfolio-dashboard/
├── src/
│   ├── app/
│   │   ├── api/stocks/route.ts    # Backend API for market data
│   │   ├── page.tsx                # Main dashboard page
│   │   └── layout.tsx              # Root layout
│   ├── components/
│   │   ├── PortfolioTable.tsx      # Main table with auto-refresh
│   │   ├── SectorGroup.tsx         # Sector grouping component
│   │   └── StockRow.tsx            # Individual stock display
│   ├── types/
│   │   └── portfolio.ts            # TypeScript interfaces
│   ├── data/
│   │   └── holdings.ts             # Static portfolio data
│   └── utils/
│       └── calculations.ts         # Portfolio calculation helpers
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Arpitkushwahaa/Dynamic-Portfolio-Dashboard.git
cd Dynamic-Portfolio-Dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

### Data Model

The portfolio uses static JSON data representing stock holdings. Each stock includes:
- Stock name
- Purchase price
- Quantity
- Exchange code (NSE/BSE)
- Sector classification
- Symbol for API fetching

### Live Data Fetching

**Important Note:** This application currently uses **realistic mock data** with price fluctuations for demonstration purposes.

**Why Mock Data?**
- Yahoo Finance and Google Finance actively block web scraping attempts
- Both services don't offer free official APIs
- Scraping results in 404 errors and is unreliable

**Current Implementation:**
- Uses predefined base prices for each stock
- Simulates market fluctuations (±2% variation)
- Updates every 15 seconds to demonstrate real-time capability
- Includes realistic P/E ratios and earnings data

**For Production Use:**
Replace mock data with paid API services:
- **Alpha Vantage** - Free tier available
- **IEX Cloud** - Good for US markets
- **Twelve Data** - Supports Indian markets
- **Finnhub** - Real-time stock data

The scraping code is preserved in comments for reference.

### Calculations

All derived metrics are calculated in real-time:
- **Investment** = Purchase Price × Quantity
- **Portfolio %** = (Investment / Total Investment) × 100
- **Present Value** = CMP × Quantity
- **Gain/Loss** = Present Value − Investment

### Auto-Refresh

The dashboard automatically updates every 15 seconds using `setInterval`, ensuring you always see current market conditions.

## Technical Challenges Addressed

### API Limitations
- **Solution**: Implemented realistic mock data instead of unreliable scraping
- Price fluctuations simulate real market behavior
- Caching mechanism ready for when real APIs are integrated
- Original scraping code preserved for educational reference

### Performance
- In-memory caching reduces redundant API calls
- Memoization prevents unnecessary component re-renders
- Batches API requests for multiple stocks

### Error Handling
- Graceful fallbacks when APIs are unavailable
- User-friendly error messages
- Console logging for debugging

### Responsiveness
- Tailwind CSS for mobile-first responsive design
- Horizontal scrolling for tables on small screens

## Interview-Ready Notes

**About Excel Reference:**
The assignment mentioned an Excel sheet as a conceptual reference for portfolio structure. The actual application uses static JSON data and dynamic calculations, which is more realistic for production systems.

**Key Technical Decisions:**
1. **Static Data**: Portfolio holdings are hardcoded rather than uploaded, simplifying deployment
2. **Client-Side Refresh**: Used `setInterval` for simplicity; WebSockets would be better for production
3. **Caching Strategy**: Simple in-memory cache; Redis would be better at scale
4. **Scraping Approach**: Acknowledged as fragile; production apps would use paid APIs

## Deployment

The app can be deployed on Vercel:

```bash
npm run build
# Then deploy to Vercel
```

## Known Limitations

- Web scraping may break if source websites change their structure
- No authentication or user management
- Static portfolio data (no CRUD operations)
- In-memory cache clears on server restart

## License

This project is for educational purposes.

## Author

Built as a technical assignment to demonstrate full-stack development skills.
