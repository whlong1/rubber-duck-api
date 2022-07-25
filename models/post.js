import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({
  views: { type: Number, default: 0 },
  iterations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Iteration' }],
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }
},
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

export {
  Post
}