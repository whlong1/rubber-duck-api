import { Post } from "../models/post.js"
import { Topic } from "../models/topic.js"

const create = async (req, res) => {
  try {
    const filter = { title: { $regex: `^${req.body.title}$`, $options: 'i' } }
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
    const topics = await Topic.find({})
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

const findPostByTopic = async (req, res) => {
  try {
    const { id } = req.params
    const filter = { author: req.user.profile, topic: id }
    const post = await Post.findOne(filter)
      .populate('iterations', 'text rating createdAt comments')
      .populate('topic', 'title')
    res.status(200).json(post)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  show,
  index,
  create,
  findPostByTopic
}