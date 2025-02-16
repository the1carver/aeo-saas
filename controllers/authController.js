const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ email, password });
    await user.save();
    return res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        subscriptionStatus: user.subscriptionStatus,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    // Add get user profile logic here
    res.status(200).json({ message: 'User profile retrieved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 