const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  subscriptionStatus: {
    type: String,
    enum: ['inactive', 'active', 'cancelled'],
    default: 'inactive',
  },
  customerId: {
    type: String,
    sparse: true,
  },
  subscriptionId: {
    type: String,
    sparse: true,
  },
  // Additional fields if needed
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema); 