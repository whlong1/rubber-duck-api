import { Post } from "../models/post.js"
import { Profile } from "../models/profile.js"
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

const castVote = async (req, res) => {
  try {
    const vote = req.body.vote
    const { iterationId, postId } = req.params
    const profile = await Profile.findById(req.user.profile, 'votes')
    if (profile.votes.find((v) => v.iterationId === iterationId)) {
      return res.status(401).json({
        msg: `You cannot ${vote === 1 ? 'upvote' : 'downvote'} the same comment twice!`
      })
    }
    const post = await Post.findById(postId)
    const iteration = await Post.findById(iterationId)
    if (post.author.equals(req.user.profile)) {
      return res.status(401).json({ msg: 'You cannot vote for your own comment.' })
    }
    iteration.rating += vote
    profile.votes.push({ vote: vote, iterationId: iterationId })
    await Promise.all([iteration.save(), profile.save()])
    res.status(200).json(iteration)
  } catch (err) {
    res.status(500).json(err)
  }
}

const undoVote = async (req, res) => {
  try {
    const { iterationId } = req.params
    const profile = await Profile.findById(req.user.profile, 'votes')
    const iteration = await Iteration.findById(iterationId)
    const prev = profile.votes.find((v) => v.iterationId === iterationId)
    if (!prev) { return res.status(404).json({ msg: 'Vote note found!' }) }
    iteration.rating -= prev.vote
    profile.votes.remove({ _id: prev._id })
    await Promise.all([post.save(), profile.save()])
    res.status(200).json(comment)
  } catch (err) {
    res.status(500).json(err)
  }
}

const createComment = async (req, res) => {
  try {
    const iteration = await Iteration.findById(req.params.iterationId)
    iteration.comments.push(req.body)
    await iteration.save()
    const newComment = iteration.comments[post.comments.length - 1]
    const profile = await Profile.findById(req.user.profile, 'name avatar')
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
  createIteration,
}


