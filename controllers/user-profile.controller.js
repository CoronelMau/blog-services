import User from '../Schemas/user.schema.js';

export default async function getProfileController(req, res) {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user)
    return res.status(400).json({
      msg: `User with id ${id} not found`,
    });

  if (user.state === false)
    return res.status(400).json({
      msg: `User with id ${id} was deleted`,
    });

  res.send({
    user,
  });
}
