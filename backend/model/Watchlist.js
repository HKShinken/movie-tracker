import mongoose from "mongoose";
import User from './User.js';;
import bcrypt from 'bcryptjs';

const wlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.ObjectId, required: true, ref: 'User'}, 

    imdbId: { type: String, required: true, }, // String and Date are shorthands for {type: String}, {type: Date} required: true, },

    watched: { type: Boolean, required: true, default: false, },
  },

  { //adds automatically createdAt, modifiedAt
    timestamps: true,
  }
);

const Watchlist = mongoose.model('Watchlist', wlistSchema);

export default Watchlist;
