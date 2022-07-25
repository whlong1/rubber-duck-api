import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

const iterationSchema = new Schema({
  text: { type: String, required: true },
  rating: { type: Number, default: 0 },
  comments: [commentSchema],
},
  { timestamps: true }
)

const Iteration = mongoose.model('Iteration', iterationSchema)

export {
  Iteration
}