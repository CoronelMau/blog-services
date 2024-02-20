import { compare, hash } from 'bcrypt';

import UserSchema from '../Schemas/user.schema.js';

export default async function passwordUpdateController(req, res) {
  const { id } = req;
  const { oldPwd, newPwd } = req.body;

  const existingUserById = await UserSchema.findByPk(id);
  if (!existingUserById)
    return res.status(401).json({
      msg: `User with id ${id} does not exist`,
    });

  const checkPwd = await compare(oldPwd, existingUserById.password);
  if (!checkPwd)
    return res.status(401).json({
      msg: 'Incorrect data',
    });

  const hashedPwd = await hash(newPwd, 12);

  existingUserById.password = hashedPwd;
  await existingUserById.save();

  return res.status(200).json({
    msg: 'Password updated!',
  });
}
