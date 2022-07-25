import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  votes: [voteSchema],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  interests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
}, {
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
