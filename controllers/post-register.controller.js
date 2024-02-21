import UserSchema from '../Schemas/user.schema.js';
import PostSchema from '../schemas/post.schema.js';

export default async function postRegisterController(req, res) {
  const { id } = req;
  const { url, text } = req.body;

  const existingUserById = await UserSchema.findByPk(id);
  if (!existingUserById)
    return res.status(409).json({
      msg: `User with id ${id}, not found`,
    });

  const post = new PostSchema({ url, text, user_id: id });
  await post.save();

  return res.status(200).json({
    msg: 'Post registered!',
  });
}
