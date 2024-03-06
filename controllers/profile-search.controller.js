import UserSchema from '../Schemas/user.schema.js';

export default async function profileSearchController(req, res) {
  const { user } = req.body;

  const existingUserByUsername = await UserSchema.findAll({
    where: { username: user },
  });
  if (!existingUserByUsername)
    return res.status(404).json({
      msg: 'User not found',
    });

  const usersIds = existingUserByUsername.map((user) => user.id);
  const usernames = existingUserByUsername.map((user) => user.username);
  const userInfo = existingUserByUsername.map((user) => {
    return {
      id: user.id,
      user: usernames[usersIds.indexOf(user.id)],
      url: user.url,
    };
  });

  return res.status(200).send({ userInfo });
}
