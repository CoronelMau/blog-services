import UserSchema from '../Schemas/user.schema.js';
import PostSchema from '../schemas/post.schema.js';

export default async function postRegisterController(req, res) {
  const { url, text, user_id } = req.body;

  const existingUserById = await UserSchema.findOne({ where: { id: user_id } });
  if (!existingUserById)
    return res.status(409).json({
      msg: `User with id ${user_id}, not found`,
    });

  const post = new PostSchema({ url, text, user_id });
  await post.save();

  return res.status(200).json({
    msg: 'Post registered!',
  });
}
