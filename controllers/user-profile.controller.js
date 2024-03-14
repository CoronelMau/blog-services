import UserSchema from '../Schemas/user.schema.js';

export default async function getProfileController(req, res) {
  const { id } = req.params;

  const existingUserById = await UserSchema.findByPk(id);

  if (!existingUserById)
    return res.status(404).json({
      msg: `User with id ${id} not found`,
    });

  if (existingUserById.state === false)
    return res.status(401).json({
      msg: `User with id ${id} was deleted`,
    });

  const { username, email, url } = existingUserById;

  return res.status(200).send({
    username,
    email,
    url,
  });
}
