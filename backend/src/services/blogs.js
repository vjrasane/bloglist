const Blog = require('../models/blog')

const populate = call => {
  return call()
    .populate('user', { username: 1, major: 1 })
    .populate({ path: 'comments', populate: { path: 'user' } })
}

const getAll = () => {
  return populate(() => Blog.find({}))
}

const getById = id => {
  return populate(() => Blog.findById(id))
}

const save = async blog => {
  const saved = await new Blog(blog).save()
  return populate(() => Blog.findById(saved._id))
}

const update = async (id, blog) => {
  const updated = await Blog.findByIdAndUpdate(id, blog, { new: true })
  return populate(() => Blog.findById(updated._id))
}

const remove = id => {
  return Blog.findByIdAndRemove(id)
}

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove
}
