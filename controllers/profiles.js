import { Profile } from "../models/profile.js"

const index = async (req, res) => {
  try {
    const profiles = await Profile.find({})
    res.status(200).json(profiles)
  } catch (err) {
    res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)
      .populate('following', 'name occupation')
      .populate('followers', 'name occupation')
      .populate({
        path: 'posts',
        populate: { path: 'author', model: 'Profile', select: 'name occupation' },
        populate: {
          model: 'Iteration',
          perDocumentLimit: 1,
          path: 'iterations', 
          select: 'text rating createdAt',
          options: { sort: { 'rating': 'desc' } },
        }
      })
    res.status(200).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const follow = async (req, res) => {
  try {
    const follower = await Profile.findById(req.user.profile)
    const followee = await Profile.findById(req.params.id)
    follower.following.push(followee._id)
    followee.followers.push(follower._id)
    await Promise.all([follower.save(), followee.save()])
    res.status(200).json({ msg: `You are now following ${followee.name}.` })
  } catch (err) {
    res.status(500).json(err)
  }
}

const unfollow = async (req, res) => {
  try {
    const follower = await Profile.findById(req.user.profile)
    const followee = await Profile.findById(req.params.id)
    follower.following.remove(followee._id)
    followee.followers.remove(follower._id)
    await Promise.all([follower.save(), followee.save()])
    res.status(200).json({ msg: `You are no longer following ${followee.name}.` })
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  index,
  show,
  follow,
  unfollow
}