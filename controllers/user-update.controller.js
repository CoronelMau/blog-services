import UserSchema from '../Schemas/user.schema.js';

export default async function userUpdateController(req, res) {
  const { id } = req;
  const { url, username } = req.body;

  const existingUserById = await UserSchema.findByPk(id);
  if (!existingUserById)
    return res.status(401).json({
      msg: `User with id ${id} does not exist`,
    });

  existingUserById.url = url;
  existingUserById.username = username;
  existingUserById.save();

  return res.status(200).json({
    msg: 'User updated!',
  });
}
