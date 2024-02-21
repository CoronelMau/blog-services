import CommentSchema from '../schemas/comment.schema.js';
import PostSchema from '../schemas/post.schema.js';

export default async function getPostCommentsController(req, res) {
  const { postId } = req.params;

  const existingPostById = await PostSchema.findByPk(postId);
  if (!existingPostById)
    return res.status(404).json({
      msg: `Post with id ${postId} does not exist`,
    });

  const existingCommentsByPostId = await CommentSchema.findAll({
    where: { post_id: postId },
  });

  if (!existingCommentsByPostId || existingCommentsByPostId.length === 0)
    return res.status(404).json({
      msg: `The post with id ${postId} has no comments`,
    });

  return res.status(200).json({
    comments: existingCommentsByPostId,
  });
}
