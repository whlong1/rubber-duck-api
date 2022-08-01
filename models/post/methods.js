import mongoose from 'mongoose'

function findPostByIterationText(topicId, search) {
  console.log(topicId, search)
  return this.aggregate([
    { $match: { topic: mongoose.Types.ObjectId(topicId) } },
    {
      $lookup: {
        pipeline: [{ $project: { name: 1, avatar: 1 } }],
        from: 'profiles', localField: 'author', foreignField: '_id', as: 'author',
      }
    },
    {
      $lookup: {
        from: "iterations",
        as: 'iterations',
        foreignField: '_id',
        localField: 'iterations',
        pipeline: [{ $match: { text: { $regex: search, $options: 'i' } } }],
      }
    }
  ])
}

export {
  findPostByIterationText
}