import UserSchema from '../Schemas/user.schema.js';
import PostSchema from '../schemas/posts.schema.js';

export default async function getUserPostController(req, res) {
  const { id } = req.params;

  const user = await UserSchema.findByPk(id);

  if (!user)
    return res.status(404).json({
      msg: `User with id ${id} not found`,
    });

  const userPosts = await PostSchema.findOne({ where: { user_id: id } });

  if (!userPosts)
    return res.status(404).json({
      msg: `User with id: ${id} does not have posts`,
    });

  const { username } = user;

  return res.send({ username, userPosts });
}
