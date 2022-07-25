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
  dob: {
    type: Date,
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
