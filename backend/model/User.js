import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // String and Date are shorthands for {type: String}, {type: Date} required: true, },

    surname: { type: String, required: true },

    email: { type: String, required: true, unique: true, },

    password: { type: String, required: true, },

    isAdmin: { type: Boolean, required: true, default: false, }
    
  },

  { //createdAt, modifiedAt
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt BEFORE savind to database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) { // if the password is not involved it skips next instructions
    return next(); // next() without return doesn't block the following code. next() goes to next pre-middleware
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
