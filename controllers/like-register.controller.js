import LikeSchema from '../schemas/like.schema.js';
import PostSchema from '../schemas/post.schema.js';
import UserSchema from '../Schemas/user.schema.js';

export default async function likeRegisterController(req, res) {
  const { user_id, post_id } = req.body;

  const user = await UserSchema.findOne({ where: { id: user_id } });
  if (!user)
    return res.status(409).json({
      msg: `User with id: ${user_id} does not exist`,
    });

  const post = await PostSchema.findOne({ where: { id: post_id } });
  if (!post)
    return res.status(409).json({
      msg: `Post with id ${post_id} does not exist`,
    });

  const like = new LikeSchema({ user_id, post_id });
  await like.save();

  return res.status(200).json({
    msg: 'Like registered!',
  });
}
