import CommentSchema from '../schemas/comment.schema.js';
import PostSchema from '../schemas/post.schema.js';

export default async function getPostCommentsController(req, res) {
  const { postId } = req.params;

  const post = await PostSchema.findByPk(postId);
  if (!post)
    return res.status(404).json({
      msg: `Post with id ${postId} does not exist`,
    });

  const comments = await CommentSchema.findAll({ where: { post_id: postId } });

  if (!comments || comments.length === 0)
    return res.status(404).json({
      msg: `The post with id ${postId} has no comments`,
    });

  return res.status(200).json({
    comments,
  });
}
