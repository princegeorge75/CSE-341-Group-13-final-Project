const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Only required if it's not a Google user
      }
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true // allows multiple users without googleId
    },
    name: {
      type: String
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = function (password) {
  return bcryptjs.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
