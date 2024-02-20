import { compare } from 'bcrypt';

import UserSchema from '../Schemas/user.schema.js';

export default async function userDeleteController(req, res) {
  const { id } = req;
  const { password } = req.body;

  const existingUserById = await UserSchema.findByPk(id);
  if (!existingUserById)
    return res.statud(401).json({
      msg: `User with id ${id} does not exist`,
    });

  if (existingUserById.state === false)
    return res.status(401).json({
      msg: `User with id ${id} does not exist`,
    });

  const checkPwd = await compare(password, existingUserById.password);
  if (!checkPwd)
    return res.status(401).json({
      msg: 'Incorrect data',
    });

  existingUserById.state = false;
  await existingUserById.save();

  return res.status(200).json({
    msg: 'User deleted!',
  });
}
