import { compare } from 'bcrypt';
import { SignJWT } from 'jose';

import UserSchema from '../Schemas/user.schema.js';

export default async function userLogInController(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      msg: 'Email and password are required',
    });

  const existingUserByEmail = await UserSchema.findOne({ where: { email } });
  if (!existingUserByEmail)
    return res.status(401).json({
      msg: 'Incorrect data',
    });

  const checkPwd = await compare(password, existingUserByEmail.password);
  if (!checkPwd)
    return res.status(401).json({
      msg: 'Incorrect data',
    });

  const jwtContructor = new SignJWT({ id: existingUserByEmail.id });
  const encoder = new TextEncoder();

  const jwt = await jwtContructor
    .setProtectedHeader({ alg: 'HS256', type: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

  return res.status(200).json({
    jwt,
  });
}
