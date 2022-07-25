import { Topic } from "../models/topic.js"

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
    const topics = await Topic.findById(req.params.id)
    res.status(200).json(topics)
  } catch (err) {
    res.status(500).json(err)
  }
}


export {
  index,
  show,
}