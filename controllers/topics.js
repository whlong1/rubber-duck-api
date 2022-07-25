import { Topic } from "../models/topic.js"

const create = async (req, res) => {
  try {
    const topic = await Topic.create(req.body)
    res.status(201).json(topic)
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
    const topics = await Topic.findById(req.params.id).populuate('posts')
    res.status(200).json(topics)
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  create,
  index,
  show,
}