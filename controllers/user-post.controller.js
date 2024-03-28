import UserSchema from '../Schemas/user.schema.js';
import CommentSchema from '../schemas/comment.schema.js';
import LikeSchema from '../schemas/like.schema.js';
import PostSchema from '../schemas/post.schema.js';

export default async function getUserPostController(req, res) {
  const { userId } = req.params;

  const existingUserById = await UserSchema.findByPk(userId);

  if (!existingUserById)
    return res.status(404).json({
      msg: `User with id ${userId} not found`,
    });

  const userPosts = await PostSchema.findAll({ where: { user_id: userId } });

  const postsWithDetails = await Promise.all(
    userPosts.map(async (post) => {
      const comments = await CommentSchema.findAll({
        where: { post_id: post.id },
      });

      const commentsData = await Promise.all(
        comments.map(async (comment) => {
          const userComment = await UserSchema.findOne({
            where: { id: comment.user_id },
          });

          return {
            id: comment.id,
            user: userComment.username,
            content: comment.content,
          };
        })
      );
      const likesCount = await LikeSchema.count({
        where: { post_id: post.id },
      });

      return {
        id: post.id,
        url: post.url,
        content: post.text,
        comments: commentsData,
        likes: likesCount,
        date: post.createdAt,
      };
    })
  );

  const { username } = existingUserById;

  return res.send({
    username,
    posts: postsWithDetails.sort((a, b) => b.date - a.date),
  });
}
