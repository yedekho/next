import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Content', contentSchema);