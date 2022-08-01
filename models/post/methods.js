import mongoose from 'mongoose'

function findPostsAndIteration(topicId, search, sort, page) {
  const searchText = search ? search : ''
  const skipCount = page ? parseInt(page) * 10 : 0
  const order = { recent: { 'createdAt': -1 }, popular: { 'rating': -1 } }
  console.log('CHECK', search, sort, page)
  return this.aggregate([
    { $match: { topic: mongoose.Types.ObjectId(topicId) } },
    {
      $lookup: {
        from: 'profiles', localField: 'author', foreignField: '_id', as: 'author',
        pipeline: [{ $project: { name: 1, avatar: 1 } }],
      }
    },
    {
      $lookup: {
        from: "iterations",
        as: 'iterations',
        foreignField: '_id',
        localField: 'iterations',
        pipeline: [
          { $match: { text: { $regex: searchText, $options: 'i' } } },
          { $project: { text: 1, rating: 1, createdAt: 1 } },
          { $sort: sort ? order[sort] : order.recent},
          { $limit: 1 },
        ],
      }
    },
    {
      $project: {
        author: { $first: "$author" },
        text: { $first: "$iterations.text" },
        rating: { $first: "$iterations.rating" },
        createdAt: { $first: "$iterations.createdAt" },
      }
    },
    { $match: { text: { $exists: true } } },
    { $sort: sort ? order[sort] : order.recent },
    { $skip: skipCount },
    { $limit: 10 },
  ])
}

export {
  findPostsAndIteration
}