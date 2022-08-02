import { Post } from "../models/post/post.js"
import { Topic } from "../models/topic.js"

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

const indexPosts = async (req, res) => {
  try {
    const { topicId } = req.params
    const { search, sort, page } = req.query
    console.log(sort, page, search)
    const topic = await Topic.findById(topicId, 'title category')
    const posts = await Post.findPostsAndIteration(topicId, search, sort, page)
    res.status(200).json({ topic: topic, posts: posts })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  show,
  index,
  create,
  indexPosts
}