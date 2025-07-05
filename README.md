# TradeVerse – Virtual Stock Trading Platform

TradeVerse is a full-stack virtual trading platform that simulates real-world stock market investing using live stock data. It enables users to register, log in, trade with virtual money, and track their portfolio performance in real time. This project mimics the experience of modern trading platforms like Zerodha and is ideal for testing investment strategies without real financial risk.

## Project Highlights

- Full-stack MERN application with modern UI/UX
- Real-time stock data integration
- Virtual trading engine with balance deduction and P&L calculation
- Secure authentication using JWT
- Interactive charts for profit/loss visualization
- Mobile-responsive, dark-themed layout

## Tech Stack

**Frontend:**
- React.js with Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Recharts
- Axios
- React Toastify

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- RESTful APIs for trading, portfolio, and auth
- Twelve Data / Alpha Vantage API for live stock information

## Features

### Authentication
- User registration and login
- JWT-based session management
- Protected routes and persistent auth state

### Dashboard
- Live stock prices displayed using external API
- Portfolio summary including total investment and net P&L
- Profit/loss graph using Recharts

### Trading Engine
- Buy and sell stocks using virtual balance
- Balance updates in real time after trades
- Trades reflected immediately in the portfolio
- Toast notifications on success or error

### Portfolio Management
- View all holdings with real-time price updates
- Profit/loss displayed as a percentage with color indicators
- Calculated net worth and historical tracking


### UI/UX Enhancements
- Fully responsive design
- Dark mode theme
- Smooth page transitions
- Active navigation link highlighting
- Get Started/Login buttons with redirection

