import UserSchema from '../Schemas/user.schema.js';
import PostSchema from '../schemas/post.schema.js';

export default async function getUserPostController(req, res) {
  const { userId } = req.params;

  const user = await UserSchema.findByPk(userId);

  if (!user)
    return res.status(404).json({
      msg: `User with id ${userId} not found`,
    });

  const userPosts = await PostSchema.findAll({ where: { user_id: userId } });

  if (!userPosts)
    return res.status(404).json({
      msg: `User with id: ${userId} does not have posts`,
    });

  const { username } = user;

  return res.send({ username, userPosts });
}
