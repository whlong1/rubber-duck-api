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
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
},
  { timestamps: true }
)

const Topic = mongoose.model('Topic', topicSchema)

export {
  Topic
}