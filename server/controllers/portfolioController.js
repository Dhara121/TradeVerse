const Transaction = require("../models/Transaction");

exports.getPortfolio = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });

    const portfolio = {};

    transactions.forEach(tx => {
      const symbol = tx.stockSymbol;
      if (!portfolio[symbol]) {
        portfolio[symbol] = { quantity: 0, totalCost: 0 };
      }

      if (tx.type === "buy") {
        portfolio[symbol].quantity += tx.quantity;
        portfolio[symbol].totalCost += tx.quantity * tx.price;
      } else if (tx.type === "sell") {
        portfolio[symbol].quantity -= tx.quantity;
        portfolio[symbol].totalCost -= tx.quantity * tx.price; // optional logic
      }
    });

    const formatted = Object.entries(portfolio).map(([symbol, data]) => {
      const avgBuy = data.quantity > 0 ? data.totalCost / data.quantity : 0;
      return {
        stockSymbol: symbol,
        quantity: data.quantity,
        averageBuyPrice: avgBuy.toFixed(2),
        totalInvested: data.totalCost.toFixed(2),
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch portfolio" });
  }
};
