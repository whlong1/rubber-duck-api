import mongoose from 'mongoose'

const Schema = mongoose.Schema

const topicSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      'Math',
      'Science',
      'History',
      'Literature',
      'CompSci',
    ],
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
},
  { timestamps: true }
)

const Topic = mongoose.model('Topic', topicSchema)

export {
  Topic
}