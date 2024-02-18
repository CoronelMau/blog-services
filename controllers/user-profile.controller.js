import UserSchema from '../Schemas/user.schema.js';

export default async function getProfileController(req, res) {
  const { id } = req.params;

  const user = await UserSchema.findByPk(id);

  if (!user)
    return res.status(400).json({
      msg: `User with id ${id} not found`,
    });

  if (user.state === false)
    return res.status(400).json({
      msg: `User with id ${id} was deleted`,
    });

  const { username, email, url } = user;

  return res.status(200).send({
    username,
    email,
    url,
  });
}
