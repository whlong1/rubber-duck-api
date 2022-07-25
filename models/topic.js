import mongoose from 'mongoose'

const Schema = mongoose.Schema

const topicSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Computer Science', 'Math', 'Science'],
  },
  iterations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Iteration' }],
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }
},
  { timestamps: true }
)

const Topic = mongoose.model('Topic', topicSchema)

export {
  Topic
}