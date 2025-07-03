// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
exports.getProfile = (req, res) => {
  try {
    res.status(200).json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      virtualBalance: req.user.virtualBalance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};
