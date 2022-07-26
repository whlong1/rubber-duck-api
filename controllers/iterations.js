import { Post } from "../models/post/post.js"
import { Profile } from "../models/profile.js"
import { Iteration } from "../models/iteration.js"
import { calculateStars } from "./utils/utils.js"

const castVote = async (req, res) => {
  try {
    const vote = req.body.vote
    const { iterationId, postId } = req.params
    const post = await Post.findById(postId)
    const iteration = await Iteration.findById(iterationId)

    if (iteration.votes.find((v) => v.profileId === req.user.profile)) {
      return res.status(401).json({
        msg: `You cannot vote for the same post twice!`
      })
    }
    if (post.author.equals(req.user.profile)) {
      return res.status(401).json({ msg: 'You cannot vote for your own post.' })
    }

    iteration.votes.push({ vote: vote, profileId: req.user.profile })
    const length = iteration.votes.length
    const total = iteration.votes.reduce((t, v) => t + parseInt(v.vote), 0)
    iteration.rating = calculateStars((total / length))

    await iteration.save()
    res.status(200).json(iteration)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const undoVote = async (req, res) => {
  try {
    const { iterationId } = req.params
    const iteration = await Iteration.findById(iterationId)
    const prev = iteration.votes.find((v) => v.profileId === req.user.profile)
    if (!prev) { return res.status(404).json({ msg: 'Vote note found!' }) }

    iteration.votes.remove({ _id: prev._id })
    const length = iteration.votes.length
    const total = iteration.votes.reduce((t, v) => t + parseInt(v.vote), 0)
    iteration.rating = isNaN(total / length) ? 0 : calculateStars((total / length))

    await iteration.save()
    res.status(200).json(iteration)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const createComment = async (req, res) => {
  try {
    const iteration = await Iteration.findById(req.params.iterationId)
    iteration.comments.push(req.body)
    await iteration.save()
    const newComment = iteration.comments[iteration.comments.length - 1]
    const profile = await Profile.findById(req.user.profile, 'name')
    newComment.author = profile
    res.status(201).json(newComment)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  undoVote,
  castVote,
  createComment,
}