import User from '../Schemas/user.schema.js';

export default async function getUsersController(req, res) {
  const users = await User.findAll({ where: { state: true } });

  if (!users)
    return res.status(500).json({
      msg: 'Internal error, data not found',
    });

  res.send({
    users,
  });
}
