function attributeAuthor(req, res, next) {
  req.body.author = req.user.profile
  next()
}

function removeEmptyFields(req, res, next) {
  for (let key in req.body) req.body[key] === '' && delete req.body[key]
  next()
}

export {
  attributeAuthor,
  removeEmptyFields
}