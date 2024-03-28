import UserSchema from '../Schemas/user.schema.js';

export default async function profileImageUpdateController(req, res) {
  const { id } = req;
  const { url } = req.body;

  const existingUserById = await UserSchema.findByPk(id);
  if (!existingUserById) return res.status(404).json({ msg: 'User not found' });

  existingUserById.url = url;
  await existingUserById.save();

  return res.status(200).json({ msg: 'Image updated!' });
}
