import mongoose from 'mongoose'

const Schema = mongoose.Schema

const voteSchema = new Schema({
  vote: { type: Number, max: 1, min: -1, default: 1 },
  profileId: { type: String, required: true }
})

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

const iterationSchema = new Schema({
  votes: [voteSchema],
  comments: [commentSchema],
  rating: { type: Number, default: 0 },
  text: { type: String, required: true },
},
  { timestamps: true }
)

const Iteration = mongoose.model('Iteration', iterationSchema)

export {
  Iteration
}