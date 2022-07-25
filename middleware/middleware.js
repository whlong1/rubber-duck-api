function attributeAuthor(req, res, next) {
  req.body.author = req.user.profile
  next()
}

function removeEmptyFields(req, res, next) {
  for (let key in req.body) req.body[key] === '' && delete req.body[key]
  next()
}

function validateVote(req, res, next) {
  req.body.vote = parseInt(req.body.vote)
  return Math.abs(req.body.vote) === 1 ? next() : res.status(401).json({ msg: 'Invalid vote!' })
}

export {
  attributeAuthor,
  removeEmptyFields,
  validateVote
}