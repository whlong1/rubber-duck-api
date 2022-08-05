import { Post } from "../models/post/post.js"
import { Profile } from "../models/profile.js"

const show = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('topic', 'title category')
      .populate('author', 'name occupation')
      .populate({
        path: 'iterations',
        options: { sort: { 'rating': 'desc' } },
        select: 'text rating createdAt comments votes',
        populate: { path: 'comments.author', model: 'Profile', select: 'name occupation' }
      })
    console.log('POST', post)
    res.status(200).json(post)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post.author.equals(req.user.profile)) {
      res.status(401).json({ msg: 'Unauthorized' })
    } else {
      const profile = await Profile.findById(req.user.profile)
      profile.posts.remove({ _id: req.params.id })
      await Promise.all([
        await post.delete(),
        await profile.save(),
        await Profile.updateMany({}, { $pull: { bookmarks: req.params.id } })
      ])
      res.status(200).send('OK')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const incrementViews = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id, 'views viewers author')
    if (post.viewers.includes(req.user.profile) || post.author.equals(req.user.profile)) {
      res.status(200).json({ msg: 'Already viewed.', success: false })
    } else {
      post.views = post.views + 1
      post.viewers.push(req.user.profile)
      await post.save()
      res.status(200).json({ msg: 'Success', success: true })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const bookmarkPost = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.profile)
    if (profile.bookmarks.includes(req.params.id)) {
      res.status(401).json({ msg: 'Already bookmarked!' })
    } else {
      profile.bookmarks.push(req.params.id)
      profile.save()
      res.status(200).send('OK')
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

const removeBookmark = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.profile)
    profile.bookmarks.remove({ _id: req.params.id })
    await profile.save()
    res.status(200).send('OK')
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  show,
  bookmarkPost,
  removeBookmark,
  incrementViews,
  deletePost as delete,
}