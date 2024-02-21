import UserSchema from '../Schemas/user.schema.js';
import PostSchema from '../schemas/post.schema.js';

export default async function getPostController(req, res) {
  const { id } = req.params;

  const existingPostById = await PostSchema.findByPk(id);

  if (!existingPostById)
    return res.status(409).json({
      msg: `Post with id ${id} not found`,
    });

  const user = await UserSchema.findOne({
    where: { id: existingPostById.user_id },
  });

  const { url, text } = existingPostById;
  const { username } = user;

  return res.status(200).json({ username, url, text });
}
