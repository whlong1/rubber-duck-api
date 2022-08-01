import mongoose from 'mongoose'
import * as postSchemaMethods from './methods.js'

const Schema = mongoose.Schema

const postSchema = new Schema({
  views: { type: Number, default: 0 },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  iterations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Iteration' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }
},
  { timestamps: true }
)

postSchema.statics = postSchemaMethods
const Post = mongoose.model('Post', postSchema)

export {
  Post
}