import UserSchema from '../Schemas/user.schema.js';
import PostSchema from '../schemas/post.schema.js';
import FollowerSchema from '../schemas/follower.schema.js';
import CommentSchema from '../schemas/comment.schema.js';
import LikeSchema from '../schemas/like.schema.js';

export default async function getFollowPostController(req, res) {
  const { id } = req;

  const user = await UserSchema.findByPk(id);
  if (!user)
    return res.status(409).json({
      msg: 'User not found',
    });

  const follows = await FollowerSchema.findAll({
    where: { follower_id: id },
  });
  if (!follows)
    return res.status(401).json({
      msg: `User with id ${id} does not follow nobody`,
    });

  const followPosts = await Promise.all(
    follows.map(async (follow) => {
      const posts = await PostSchema.findAll({
        where: { user_id: follow.following_id },
      });

      const userPoster = await UserSchema.findOne({
        where: { id: follow.following_id },
      });

      const postsWithDetails = await Promise.all(
        posts.map(async (post) => {
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
            user: userPoster.username,
            url: post.url,
            content: post.text,
            comments: commentsData,
            likes: likesCount,
            date: post.createdAt,
          };
        })
      );

      return postsWithDetails;
    })
  );

  const userPosts = await PostSchema.findAll({ where: { user_id: id } });

  const userPostsDetails = await Promise.all(
    userPosts.map(async (post) => {
      const comments = await CommentSchema.findAll({
        where: { post_id: post.id },
      });

      const commentsData = await Promise.all(
        comments.map(async (comment) => {
          const userComment = await UserSchema.findAll({
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

  const finalPosts = followPosts
    .reduce((acc, curr) => acc.concat(curr), [])
    .concat(userPostsDetails);

  finalPosts.sort((a, b) => b.date - a.date);

  return res.status(200).json({ finalPosts });
}
