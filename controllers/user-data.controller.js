import UserSchema from '../Schemas/user.schema.js';

export default async function getUserDataController(req, res) {
  const { id } = req;

  const existUserById = await UserSchema.findByPk(id);
  if (!existUserById)
    return res.status(404).json({
      msg: 'User not found',
    });

  const { username, url } = existUserById;

  return res.status(200).json({ id, username, url });
}
