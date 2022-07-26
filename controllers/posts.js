import { Post } from "../models/post.js"
import { Profile } from "../models/profile.js"
import { Topic } from "../models/topic.js"

const create = async (req, res) => {
  try {
    const oldPost = await Post.findOne({ author: req.user.profile, topic: req.body.topic })
      .populate('author')
    if (oldPost) {
      res.status(401).json({ msg: 'You already made a post on this topic!' })
    } else {
      const post = await Post.create(req.body)
      await Topic.updateOne(
        { _id: req.body.topic },
        { $push: { posts: post } }
      )
      await Profile.updateOne(
        { _id: req.user.profile },
        { $push: { posts: post } }
      )
      res.status(201).json(post)
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const { search, page, sort } = req.query
    console.log(req.query)
    const filter = { topic: req.query.search }
    const fields = 'views iterations author createdAt'
    const limit = req.query.limit ? req.query.limit : 10
    const order = { recent: { createdAt: 'desc' }, popular: { views: 'desc' } }
    const posts = await Post.find(search ? filter : {}, fields)
      .limit(limit)
      .skip(parseInt(page) * limit)
      .sort(sort ? order[sort] : order.recent)
      .populate('author', 'name occupation')
      .populate('topic')
      .populate({
        path: 'iterations',
        perDocumentLimit: 1,
        select: 'text rating createdAt',
        options: { sort: { 'rating': 'desc' } },
      })
    res.status(200).json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('topic', 'title category')
      .populate('author', 'name occupation')
      .populate({
        path: 'iterations',
        select: 'text rating createdAt comments',
        options: { sort: { 'rating': 'desc' } },
        populate: { path: 'comments.author', model: 'Profile', select: 'name occupation' }
      })
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
      res.status(200).send('Already viewed.')
    } else {
      post.views = post.views + 1
      post.viewers.push(req.user.profile)
      await post.save()
      res.status(200).send('OK')
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
  index,
  show,
  create,
  bookmarkPost,
  removeBookmark,
  incrementViews,
  deletePost as delete,
}