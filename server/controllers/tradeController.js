const Transaction = require("../models/Transaction");
const User = require("../models/User");

exports.placeTrade = async (req, res) => {
  const { stockSymbol, quantity, price, type } = req.body;

  if (!stockSymbol || !quantity || !price || !type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(req.user.id);

  const totalAmount = quantity * price;

  if (type === "buy") {
    if (user.virtualBalance < totalAmount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    user.virtualBalance -= totalAmount;
  } else if (type === "sell") {
  // Fetch user's transactions to calculate current holdings
  const transactions = await Transaction.find({ user: req.user.id, stockSymbol });

  let holding = 0;
  transactions.forEach(tx => {
    if (tx.type === "buy") holding += tx.quantity;
    else if (tx.type === "sell") holding -= tx.quantity;
  });

  if (holding < quantity) {
    return res.status(400).json({ message: "Not enough shares to sell" });
  }

  // Proceed with sale
  user.virtualBalance += totalAmount;
}
    else {
    return res.status(400).json({ message: "Invalid trade type" });
  }

  await user.save();

  const trade = await Transaction.create({
    user: req.user.id,
    stockSymbol,
    quantity,
    price,
    type,
  });

  res.status(201).json(trade);
};

// View user trade history
exports.getTrades = async (req, res) => {
  const trades = await Transaction.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(trades);
};
