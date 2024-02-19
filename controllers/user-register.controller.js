import { hash } from 'bcrypt';

import UserSchema from '../Schemas/user.schema.js';

export default async function userRegisterController(req, res) {
  const { username, email, password } = req.body;

  const existingUserByEmail = await UserSchema.findOne({ where: { email } });

  if (existingUserByEmail)
    return res.status(409).json({
      msg: 'Email already exists',
    });

  const hashedPwd = await hash(password, 12);

  const user = new UserSchema({ username, email, password: hashedPwd });
  await user.save();

  return res.status(200).json({
    msg: 'User registered!',
  });
}
