import PostSchema from '../schemas/posts.schema.js';

export default async function getPostsController(req, res) {
  const posts = await PostSchema.findAll();

  return res.status(200).json({
    posts,
  });
}
