import LikeSchema from '../schemas/like.schema.js';
import PostSchema from '../schemas/post.schema.js';

export default async function getPostLikesController(req, res) {
  const { postId } = req.params;

  const existingPostById = await PostSchema.findByPk(postId);
  if (!existingPostById)
    return res.status(404).json({
      msg: `Post with id ${postId} does not exist`,
    });

  const existingLikesByPostId = await LikeSchema.findAll({
    where: { post_id: postId },
  });

  if (!existingLikesByPostId || existingLikesByPostId.length === 0)
    return res.status(404).json({
      msg: `The post with id ${postId} has no likes`,
    });

  return res.status(200).json({
    likes: existingLikesByPostId,
  });
}
