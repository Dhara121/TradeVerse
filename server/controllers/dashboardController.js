const User = require("../models/User");
const Transaction = require("../models/Transaction");
const fetchLivePrice = require("../utils/fetchLivePrice");


exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username virtualBalance");
    const transactions = await Transaction.find({ user: req.user.id });

    const portfolio = {};
    let realizedPnl = 0;
    let totalTrades = transactions.length;

    transactions.forEach(tx => {
      const sym = tx.stockSymbol;
      if (!portfolio[sym]) {
        portfolio[sym] = { quantity: 0, totalCost: 0 };
      }

      if (tx.type === "buy") {
        portfolio[sym].quantity += tx.quantity;
        portfolio[sym].totalCost += tx.quantity * tx.price;
      } else if (tx.type === "sell") {
        const avg = portfolio[sym].totalCost / portfolio[sym].quantity || 0;
        realizedPnl += tx.quantity * (tx.price - avg);
        portfolio[sym].quantity -= tx.quantity;
        portfolio[sym].totalCost -= tx.quantity * avg;
      }
    });

    const formattedPortfolio = await Promise.all(
  Object.keys(portfolio).map(async symbol => {
    const stock = portfolio[symbol];
    const quantity = stock.quantity;
    const totalCost = stock.totalCost;
    const avgBuy = totalCost / quantity || 0;

    const livePrice = await fetchLivePrice(symbol); // 🟢 Get real-time price
    const unrealizedPnl = livePrice
      ? ((livePrice - avgBuy) * quantity).toFixed(2)
      : null;

    return {
      stockSymbol: symbol,
      quantity,
      averageBuyPrice: avgBuy.toFixed(2),
      totalInvested: totalCost.toFixed(2),
      livePrice: livePrice?.toFixed(2) || "N/A",
      unrealizedPnl,
    };
  })
);


    const totalInvested = formattedPortfolio.reduce((sum, p) => sum + parseFloat(p.totalInvested), 0);

    res.status(200).json({
      username: user.username,
      virtualBalance: user.virtualBalance,
      totalTrades,
      realizedPnl: realizedPnl.toFixed(2),
      totalInvested: totalInvested.toFixed(2),
      portfolio: formattedPortfolio,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
};
