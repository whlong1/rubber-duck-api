import { Post } from "../models/post.js"
import { Iteration } from "../models/iteration.js"

const createIteration = async (req, res) => {
  try {
    const iteration = await Iteration.create(req.body)
    await Post.updateOne(
      { _id: req.params.id },
      { $push: { iterations: iteration } }
    )
    res.status(201).json(iteration)
  } catch (err) {
    res.status(500).json(err)
  }
}


export {
  createIteration,
}


