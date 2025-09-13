import mongoose from "mongoose";

const revSchema = new mongoose.Schema(
  {

    user: { type: mongoose.ObjectId, required: true, ref: 'User'}, 
    imdbId: { type: String, required: true, }, // String and Date are shorthands for {type: String}, {type: Date} required: true, },

    rate: { type: Number, required: true, min: 0, max: 5 },
    review: { type: String, required: false, }, // String and Date are shorthands for {type: String}, {type: Date} required: true, },

  },

  { //adds automatically createdAt, modifiedAt
    timestamps: true,
  }
);

const Review = mongoose.model('Review', revSchema);

export default Review;
