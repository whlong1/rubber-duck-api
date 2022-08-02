import { Topic } from "../models/topic.js"
import { Post } from "../models/post/post.js"
import { Profile } from "../models/profile.js"
import { Iteration } from "../models/iteration.js"
import { compareText } from "./utils/utils.js"

const create = async (req, res) => {
  try {
    const filter = {
      category: req.body.category,
      title: { $regex: `^${req.body.title}$`, $options: 'i' }
    }
    const existingTopic = await Topic.findOne(filter)
    if (existingTopic) {
      res.status(401).json({ msg: 'That topic already exists!' })
    } else {
      const topic = await Topic.create(req.body)
      res.status(201).json(topic)
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const { search } = req.query
    const filter = { category: req.query.search }
    const topics = await Topic.find(search ? filter : {})
    res.status(200).json(topics)
  } catch (err) {
    res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id)
      .populate('posts')
    res.status(200).json(topic)
  } catch (err) {
    res.status(500).json(err)
  }
}

const createPost = async (req, res) => {
  try {
    const filter = { author: req.user.profile, topic: req.body.topic }
    const oldPost = await Post.findOne(filter).populate('author')
    if (oldPost) {
      res.status(401).json({ msg: 'You already made a post on this topic!' })
    } else {
      const post = await Post.create(req.body)
      await Topic.updateOne(
        { _id: req.params.topicId },
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

const indexPosts = async (req, res) => {
  try {
    const { topicId } = req.params
    const { search, sort, page } = req.query
    const topic = await Topic.findById(topicId, 'title category')
    const posts = await Post.findPostsAndIteration(topicId, search, sort, page)
    res.status(200).json({ topic: topic, posts: posts })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const newIteration = async (req, res) => {
  try {
    // return iterations length
    // const data = await postService.show(postId)
    // setIterations(data.iterations.length + 1)
    const filter = { topic: req.params.topicId }
    const post = await Post.findById(req.params.postId)
    const topic = await Topic.findById(req.params.topicId)
    const iterations = await Iteration.find(filter).sort({ rating: 'desc' }).limit(20)

    const index = post.iterations.length
    const keywords = compareText(iterations)

    res.status(201).json({ keywords: keywords, index: index, topic: topic })
  } catch (err) {
    res.status(500).json(err)
  }
}

const createIteration = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (!post.author.equals(req.user.profile)) {
      res.status(401).json({ msg: 'Unauthorized' })
    } else {
      req.body.post = req.params.postId
      req.body.topic = req.params.topicId
      const iteration = await Iteration.create(req.body)
      await Post.updateOne(
        { _id: req.params.postId },
        { $push: { iterations: iteration } }
      )
      res.status(201).json(iteration)
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  show,
  index,
  create,
  createPost,
  indexPosts,
  newIteration,
  createIteration
}