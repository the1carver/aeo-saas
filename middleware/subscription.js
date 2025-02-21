const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.subscriptionStatus !== 'active') {
      return res.status(403).json({ error: 'Active subscription required' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: 'Subscription check failed' });
  }
}; 