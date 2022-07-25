import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
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
  interests: [String],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
}, {
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
