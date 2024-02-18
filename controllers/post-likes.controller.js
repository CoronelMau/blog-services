import LikeSchema from '../schemas/like.schema.js';
import PostSchema from '../schemas/post.schema.js';

export default async function getPostLikesController(req, res) {
  const { postId } = req.params;

  const post = await PostSchema.findByPk(postId);
  if (!post)
    return res.status(404).json({
      msg: `Post with id ${postId} does not exist`,
    });

  const likes = await LikeSchema.findAll({ where: { post_id: postId } });

  if (!likes || likes.length === 0)
    return res.status(404).json({
      msg: `The post with id ${postId} has no likes`,
    });

  return res.status(200).json({
    likes,
  });
}
